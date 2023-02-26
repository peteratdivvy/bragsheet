import PageHeader from "@/components/PageHeader";
import { Button } from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";

export default function CreateBragSheet() {
  const session = useSession();
  async function createBragSheet(title: string, userId: string) {
    const response = await fetch("/api/sheets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const createdSheet = await response.json();
    return createdSheet;
  }

  return (
    <>
      <PageHeader />
      <h1>Create Brag Sheet</h1>
      <Button
        onClick={() => {
          createBragSheet("Peters Test", session?.user.id as string);
        }}
      >
        Create Sheet
      </Button>
    </>
  );
}
