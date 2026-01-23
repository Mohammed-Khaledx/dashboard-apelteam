import mongoose, { Schema, models, model } from 'mongoose';

export interface IRegistrationSetting {
  isOpen: boolean;
  // deadline?: Date;
  updatedAt: Date;
}

const RegistrationSettingSchema = new Schema<IRegistrationSetting>({
  isOpen: { type: Boolean, required: true, default: false },
  // deadline: { type: Date },
  updatedAt: { type: Date, default: Date.now },
});

export const RegistrationSetting = models.RegistrationSetting || model<IRegistrationSetting>("RegistrationSetting", RegistrationSettingSchema);

