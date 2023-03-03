import { useUser } from "@/hooks/useUser";

import { AppShell, Navbar, Header, Flex, Space } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const user = useUser();
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="lg">
          <Flex justify="space-between">
            <Flex justify="space-between">
              <Link prefetch href="/">
                Home
              </Link>
              <Space w="md" />
              <Link href="/sheets">Sheets</Link>
            </Flex>

            <Link href={user ? "/auth/signout" : "/auth/signin"}>
              {user ? "Sign out" : "Sign in"}
            </Link>
          </Flex>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
