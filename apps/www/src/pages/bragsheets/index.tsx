// app/routes/bragsheets.tsx

import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

export default function BragsheetsPage() {
  const [showModal, setShowModal] = useState(false);
  const bragsheets = api.bragsheets.getAll.useQuery();
  const { mutate } = api.bragsheets.create.useMutation({
    onSuccess: () => {
      bragsheets.refetch();
    },
  });

  const createBragSheet = (title: string, description: string) => {
    // Add your brag sheet creation logic here
    mutate({
      title,
      description,
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <h1 className="mb-5 text-2xl font-semibold">Bragsheets</h1>
            <ul>
              {bragsheets.data?.map((bragsheet) => (
                <Link key={bragsheet.id} href={`/bragsheets/${bragsheet.id}`}>
                  <li className="border-b border-gray-200 py-3">
                    <h2 className="font-semibold">{bragsheet.title}</h2>
                    <p>{bragsheet.description}</p>
                  </li>
                </Link>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
          <div className="rounded-lg bg-white p-8">
            <h2 className="mb-4 text-xl font-semibold">Create Bragsheet</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                createBragSheet(
                  formData.get("title") as string,
                  formData.get("description") as string
                );
                setShowModal(false);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Create
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
