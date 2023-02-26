import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface FetchWithAuthOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown> | string;
}

export const fetchWithAuth = async (
  ctx: GetServerSidePropsContext,
  options: FetchWithAuthOptions
) => {
  const supabase = createServerSupabaseClient(ctx);
  const session = await supabase.auth.getSession();
  const token = session?.data.session?.access_token;

  if (!session || !token) {
    throw new Error("Not authenticated");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const { url, method, body } = options;

  const res = await fetch(url, {
    method,
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
