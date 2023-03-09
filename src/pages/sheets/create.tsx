import { Form } from "@/components/Form";
import PageHeader from "@/components/PageHeader";
import { clientFetchWithAuth } from "@/utils/api";
import { Button, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { z } from "zod";

const CreateBragSheetSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function CreateBragSheet() {
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof CreateBragSheetSchema>) {
    const response = (await clientFetchWithAuth({
      url: "/api/sheets/create",
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    })) as any as {
      ok: boolean;
      id: string;
      statusText: string;
    };

    if (!response.ok) {
      throw new Error(await response.statusText);
    }

    router.push(`/sheets/${response.id}`);
    return response;
  }

  return (
    <>
      <PageHeader />
      <Container size="sm">
        <h1>Create Brag Sheet</h1>
        <Form
          schema={CreateBragSheetSchema}
          onSubmit={onSubmit}
          renderAfter={() => <Button type="submit">Submit</Button>}
        />
      </Container>
    </>
  );
}
