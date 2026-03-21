import { getUserProfile } from "@/lib/actions/market";
import { redirect } from "next/navigation";

export default async function DashboardRedirect({ searchParams }: { searchParams: { bypass?: string } }) {
  const params = await searchParams;
  const bypass = params?.bypass;
  
  const profile = await getUserProfile(bypass);
  
  if (!profile.success || !profile.data) {
    redirect("/access");
  }

  const role = profile.data.role;
  const bypassParam = bypass ? `?bypass=${bypass}` : "";

  if (role === "GOVERNMENT_ADMIN") redirect(`/admin/dashboard${bypassParam}`);
  
  // Default to Buyer
  redirect(`/buyer/dashboard${bypassParam}`);
}
