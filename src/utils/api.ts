import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends NextApiRequest {
  userId: string;
}

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

export const createHandler = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1]; // Extract the JWT token from the Authorization header
    const decodedToken = jwt.decode(token); // Decode the JWT token to extract the user ID

    if (!decodedToken || !decodedToken.sub) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = decodedToken.sub as string; // Extract the user ID from the decoded token

    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.userId = userId;

    // Call the original handler with the authenticated request object
    await handler(authenticatedReq, res);
  };
};
