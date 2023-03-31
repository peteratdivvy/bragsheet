import { signIn } from "next-auth/react";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
          Sign Up with Discord
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-2xl">
          <div>
            <button
              onClick={() =>
                signIn("discord", {
                  callbackUrl: "/bragsheets",
                })
              } // Update 'discord' with the correct provider name
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 py-3 px-4 text-lg font-bold text-white shadow-sm hover:bg-purple-700"
            >
              <i className="fab fa-discord mr-2"></i>
              Sign in with Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
