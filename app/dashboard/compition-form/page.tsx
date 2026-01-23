import { getRegistrationFormState } from "../../lib/data";
import RegistrationToggleForm from "./RegistrationToggleForm";

export default async function RegistrationSettings() {
  const settings = await getRegistrationFormState();

  return (
    <RegistrationToggleForm initialOpen={settings?.isOpen} />
  );
}