import { useSession } from "@supabase/auth-helpers-react";

export function useUser() {
  const session = useSession();
  return session?.user;
}
