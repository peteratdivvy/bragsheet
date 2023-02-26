import { Form } from "@/components/Form";
import PageHeader from "@/components/PageHeader";
import { clientFetchWithAuth } from "@/utils/api";
import { Button } from "@mantine/core";
import { Brag } from "@prisma/client";
import { useRouter } from "next/router";
import { z } from "zod";

const CreateBrag = z.object({
  title: z.string(),
  situation: z.string(),
  action: z.string(),
  result: z.string(),
});

export default function CreateIndividualBrag() {
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof CreateBrag>) {
    const response = (await clientFetchWithAuth({
      url: "/api/brags/create",
      method: "POST",
      body: JSON.stringify({
        bragSheetId: router.query.id,
        title: data.title,
        situation: data.situation,
        action: data.action,
        result: data.result,
      }),
    })) as any as {
      ok: boolean;
      id: string;
      statusText: string;
    };

    if (!response.ok) {
      throw new Error(await response.statusText);
    }

    router.reload();
    return response;
  }

  return (
    <>
      <PageHeader />
      <h1>Create Brag</h1>
      <Form
        schema={CreateBrag}
        onSubmit={onSubmit}
        renderAfter={() => <Button type="submit">Create</Button>}
        formProps={{
          style: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      />
    </>
  );
}
