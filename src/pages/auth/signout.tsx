import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";

export default function SignOut() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <PageHeader />
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </>
  );
}
