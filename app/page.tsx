import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PasswordGate from "./PasswordGate";

export default async function Page() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("family-access")?.value === "true";

  if (hasAccess) {
    redirect("/home");
  }

  return <PasswordGate />;
}