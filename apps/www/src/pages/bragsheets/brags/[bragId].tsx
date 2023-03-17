import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { getRequiredParams } from "~/utils/routing";

export default function BragPage() {
  const router = useRouter();
  const bragId = getRequiredParams(router.query, "bragId");

  const bragQuery = api.brags.byId.useQuery({
    id: bragId,
  });

  if (bragQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bragQuery.error) {
    return <div>Error: {bragQuery.error.message}</div>;
  }

  const brag = bragQuery.data;

  if (!brag) {
    return null;
  }

  const { title, content, source, createdAt, updatedAt } = brag;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="mb-6 text-4xl font-bold">{title}</h1>
        <p>{content}</p>
        <p>Source: {source}</p>
        <p>Created at: {new Date(createdAt).toLocaleString()}</p>
        <p>Updated at: {new Date(updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
