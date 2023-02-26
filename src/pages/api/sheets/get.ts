import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends NextApiRequest {
  userId: string;
}

export const withUserId = (
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

// Your API route
const apiRoute = withUserId(async (req, res) => {
  const userId = req.userId; // The user ID is available as a property of the request object

  // Use the user ID to fetch data from the database
  const data = await prisma.bragSheet.findMany({
    where: {
      userId,
    },
  });

  res.json(data);
});

export default apiRoute;
