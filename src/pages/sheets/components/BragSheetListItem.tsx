import { Card, Text, Badge, Group } from "@mantine/core";
import { BragSheet } from "@prisma/client";
import { useRouter } from "next/router";
type Props = Omit<BragSheet, "userId" | "deleted"> & {
  bragCount: number;
};

export default function BragSheetListItem(props: Props) {
  const { title, bragCount, description, id } = props;
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      onMouseOver={() => {
        console.log("hella");
        router.prefetch(`/sheets/${id}`);
      }}
      onClick={() => {
        router.push(`/sheets/${id}`);
      }}
      sx={{
        transition: "box-shadow .3s",
        ":hover": {
          cursor: "pointer",
          boxShadow: "0 0 11px rgba(33,33,33,.2)",
        },
      }}
    >
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="blue" variant="light">
          {bragCount} brag{bragCount > 1 ? "s" : ""}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>
    </Card>
  );
}
