import { useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { getRequiredParams } from "~/utils/routing";

export default function BragsheetPage() {
  const router = useRouter();
  const bragsheetId = getRequiredParams(router.query, "bragsheetId", router);

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
          setIsModalOpen(false);
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
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a Brag
                </Dialog.Title>

                <div className="mt-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={createBrag}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    Add Brag
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
