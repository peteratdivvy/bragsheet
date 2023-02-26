import Head from "next/head";

export default function PageHeader() {
  return (
    <Head>
      <title>Brag Sheet</title>
      <meta name="description" content="Brag about yourself" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
