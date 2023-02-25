import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.brag.findMany({});

  return {
    props: { feed },
    revalidate: 10,
  };
};

export default function BragsList() {
  return (
    <>
      <Head>
        <title>Brags List</title>
        <meta name="description" content="Brags list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
