import React from "react";

// Import signOut from NextAuth
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
          Sign Out
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-2xl">
          <div>
            <button
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
              className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-lg font-bold text-white shadow-sm hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
