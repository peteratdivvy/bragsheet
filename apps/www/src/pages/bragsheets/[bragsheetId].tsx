// pages/bragsheets/[id].tsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { getRequiredParams } from "~/utils/routing";

export default function BragsheetPage() {
  const router = useRouter();
  const bragsheetId = getRequiredParams(router.query, "bragsheetId");

  const bragsheetQuery = api.bragsheets.byId.useQuery({
    id: (Array.isArray(bragsheetId) ? bragsheetId[0] : bragsheetId) || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const bragMutation = api.brags.create.useMutation();

  const createBrag = () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    bragMutation.mutate(
      {
        title,
        content,
        bragsheetId: bragsheetId,
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          bragsheetQuery.refetch();
        },
      }
    );
  };

  if (bragsheetQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bragsheetQuery.error) {
    return <div>Error: {bragsheetQuery.error.message}</div>;
  }

  const bragsheet = bragsheetQuery.data;

  return !bragsheet ? null : (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="mb-6 text-4xl font-bold">{bragsheet.title}</h1>
        <p className="mb-2 text-xl">{bragsheet.description}</p>
        <p className="text-gray-600">
          Created at: {new Date(bragsheet.createdAt).toLocaleString()}
        </p>
        <p className="mb-8 text-gray-600">
          Updated at: {new Date(bragsheet.updatedAt).toLocaleString()}
        </p>
        <h2 className="mb-4 text-2xl font-semibold">Brags:</h2>
        <ul className="space-y-4">
          {bragsheet.brags.map((brag) => (
            <Link key={brag.id} href={`brags/${brag.id}`}>
              <li key={brag.id} className="rounded-md bg-white p-4 shadow">
                <h3 className="text-xl font-semibold">{brag.title}</h3>
                <p>{brag.content}</p>
              </li>
            </Link>
          ))}
        </ul>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 rounded bg-purple-600 py-2 px-4 font-bold text-white hover:bg-purple-700"
        >
          Add Brag
        </button>
      </div>
    </div>
  );
}
