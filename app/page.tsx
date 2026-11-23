import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PasswordGate from "./PasswordGate";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ signIn?: string }>;
}) {
  const { signIn } = await searchParams;
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("family-access")?.value === "true";

  if (hasAccess && signIn !== "memory-review") {
    redirect("/home");
  }

  return <PasswordGate />;
}
