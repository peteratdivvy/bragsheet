import PageHeader from "@/components/PageHeader";
import { ssrFetchWithAuth } from "@/utils/api";
import { Container, Text } from "@mantine/core";
import { BragSheet } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import BragSheetListItem from "./components/BragSheetListItem";

type ExtendedBragSheet = BragSheet & {
  bragCount: number;
};

type RequestData = {
  sheets: ExtendedBragSheet[];
};

export const getServerSideProps: GetServerSideProps<RequestData> = async (
  ctx
) => {
  const { sheets } = await ssrFetchWithAuth(ctx, {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sheets/get`,
    method: "GET",
  });

  return {
    props: {
      sheets,
    },
  };
};

export default function BragSheetPage({
  sheets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHeader />
      <Container size="sm">
        <Text variant="text" size="xl" weight="bolder">
          Bragsheets
        </Text>

        {sheets.map((sheet) => (
          <BragSheetListItem
            key={sheet.id}
            id={sheet.id}
            title={sheet.title}
            description={sheet.description}
            bragCount={sheet.bragCount}
            createdAt={sheet.createdAt}
            updatedAt={sheet.updatedAt}
          />
        ))}
      </Container>
    </>
  );
}
