import { fetchWithAuth } from "@/utils/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const sheetId = params?.id as string;

  const sheet = await fetchWithAuth(ctx, {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sheet/get/${sheetId}`,
    method: "GET",
  });

  if (!sheet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sheet,
    },
  };
};

const BragSheetPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { sheet } = props;
  return (
    <div>
      <h1>{sheet.title}</h1>
    </div>
  );
};

export default BragSheetPage;
