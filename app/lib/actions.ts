"use server";

import { put } from '@vercel/blob';


import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { connectDB } from "./db";
import { User } from "./models/User";
import { createJwt } from "./auth";
import { loginSchema } from "./validation/auth-validation";
import type { MemberDTO } from "./types";
import {
  deleteMemberById,
  createMember,
  updateMemberById,
} from "./data";
import { RegistrationSetting } from './models/FormSetting';

// to make track the state of the login action and return a prober
type LoginResult = { success: true } | { success: false; error: string };

export async function login(
  _: unknown,
  formData: FormData
): Promise<LoginResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    const errorMessage =
      errors.email?.[0] ?? errors.password?.[0] ?? "Invalid input";
    return {
      success: false,
      error: errorMessage,
    };
  }
  const { email, password } = parsed.data;

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return { success: false, error: "Invalid email or password" };
  }

  const token = createJwt({
    sub: user._id.toString(),
    email: user.email,
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0), // immediately expire
  });

  redirect('/login');
}

type FormState = { success?: boolean; error?: { message: string } } | null;
type UploadState = { url?: string; error?: { message: string } } | null;

export async function actionDeleteMember(id: string) {
  await deleteMemberById(id);
}

export async function actionCreateMember(
  _prevState: unknown,
  formData: FormData
): Promise<FormState> {
  try {
    const name = String(formData.get("name"));
    const role = String(formData.get("role"));
    const thumbnailEntry = formData.get("thumbnail");
    const thumbnail = typeof thumbnailEntry === "string" ? thumbnailEntry : "";
    const group = String(formData.get("group")) as MemberDTO["group"];
    const order = Number(formData.get("order"));
    const gender = String(formData.get("gender")) as MemberDTO["gender"];
    const status = String(formData.get("status")) as MemberDTO["status"];

    await createMember({ name, role, thumbnail, group, order, gender, status });
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to create member",
      },
    };
  }

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}

export async function actionUpdateMember(
  id: string,
  _prevState: unknown,
  formData: FormData
): Promise<FormState> {
  try {
    const updates: Partial<MemberDTO> = {};

    if (formData.get("name")) updates.name = String(formData.get("name"));
    if (formData.get("role")) updates.role = String(formData.get("role"));
    if (formData.has("thumbnail")) {
      const thumbnailEntry = formData.get("thumbnail");
      updates.thumbnail = typeof thumbnailEntry === "string" ? thumbnailEntry : "";
    }
    if (formData.get("group"))
      updates.group = String(formData.get("group")) as MemberDTO["group"];
    if (formData.has("order")) updates.order = Number(formData.get("order"));
    if (formData.get("gender"))
      updates.gender = String(formData.get("gender")) as MemberDTO["gender"];
    if (formData.get("status"))
      updates.status = String(formData.get("status")) as MemberDTO["status"];

    await updateMemberById(id, updates);
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to update member",
      },
    };
  }

  revalidatePath("/dashboard/team");
  redirect("/dashboard/team");
}
// Vercel Blob usage
export async function actionUploadThumbnail(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  try {
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return { error: { message: "No file provided" } };
    }

    // Validate type on server
    if (!file.type.startsWith("image/")) {
      return { error: { message: "Only image files are allowed." } };
    }

    // Validate size on server (e.g. 4MB)
    if (file.size > 4 * 1024 * 1024) {
      return { error: { message: "File size must be less than 4MB." } };
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const pathname = `team/${Date.now()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return { url: blob.url };
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Failed to upload thumbnail",
      },
    };
  }
}

export async function updateRegistrationSettings(formData: FormData) {
  await connectDB();
  const isOpen = formData.get('isOpen') === 'true';
  // const deadlineStr = formData.get('deadline');
  // const deadline = deadlineStr ? new Date(String(deadlineStr)) : undefined;

  await RegistrationSetting.findOneAndUpdate(
    {},
    { isOpen, updatedAt: new Date() },
    { upsert: true }
  );

  revalidatePath("/dashboard/compition-form");
}