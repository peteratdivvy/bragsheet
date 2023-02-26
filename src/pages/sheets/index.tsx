import PageHeader from "@/components/PageHeader";
import { fetchWithAuth } from "@/utils/api";
import { BragSheet } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

type RequestData = {
  sheets: BragSheet[];
};

export const getServerSideProps: GetServerSideProps<RequestData> = async (
  ctx
) => {
  const sheets = await fetchWithAuth(ctx, {
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
      <h1>List of brag sheets to choose from</h1>

      {sheets.map((sheet) => {
        return (
          <Link key={sheet.id} href={`sheets/${sheet.id}`}>
            {sheet.title}
          </Link>
        );
      })}
    </>
  );
}
