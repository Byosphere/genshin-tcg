import { Card } from "@mantine/core";

export const CARD_WIDTH = 397;
export const CARD_HEIGHT = 555;

export default function TcgCard() {
  return (
    <Card
      shadow="sm"
      withBorder
      w={CARD_WIDTH}
      h={CARD_HEIGHT}
      bg="white"
    ></Card>
  );
}
