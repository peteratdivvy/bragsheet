import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Container } from "@mantine/core";
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
      <Container size="sm">
        <Button onClick={handleSignOut}>Sign out</Button>
      </Container>
    </>
  );
}
