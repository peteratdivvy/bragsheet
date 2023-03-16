// pages/bragsheets/[id].tsx

import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

function BragsheetPage() {
  const router = useRouter();
  const { bragsheetId } = router.query;

  const bragsheetQuery = api.bragsheets.byId.useQuery({
    id: (Array.isArray(bragsheetId) ? bragsheetId[0] : bragsheetId) || "",
  });

  if (bragsheetQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bragsheetQuery.error) {
    return <div>Error: {bragsheetQuery.error.message}</div>;
  }

  const bragsheet = bragsheetQuery.data;

  if (!bragsheet) {
    return null;
  }

  return (
    <div>
      <h1>{bragsheet.title}</h1>
      <p>{bragsheet.description}</p>
      <p>Created at: {new Date(bragsheet.createdAt).toLocaleString()}</p>
      <p>Updated at: {new Date(bragsheet.updatedAt).toLocaleString()}</p>
      <h2>Brags:</h2>
      <ul>
        {bragsheet.brags.map((brag) => (
          <Link key={brag.id} href={`brags/${brag.id}`}>
            <li key={brag.id}>
              <h3>{brag.title}</h3>
              <p>{brag.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default BragsheetPage;
