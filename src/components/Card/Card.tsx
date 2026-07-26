import { Card, Image, Text } from "@mantine/core";

export const CARD_WIDTH = 396;
export const CARD_HEIGHT = 553;

const SIZE_SCALE = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
  lg: 1.25,
} as const;

type TcgCardProps = {
  size?: "xs" | "sm" | "md" | "lg";
  card: {
    cardId: string;
    name: string;
    filename: string;
    rarity: number;
    set: number;
  };
};

export default function TcgCard({ card, size = "md" }: TcgCardProps) {
  const normalizedFilename = card.filename.startsWith("cellImage_")
    ? card.filename
    : `cellImage_${card.filename}`;
  const imageUrl = `/_set${card.set}/${normalizedFilename}`;
  const scale = SIZE_SCALE[size];
  const width = CARD_WIDTH * scale;
  const height = CARD_HEIGHT * scale;
  const radius = 20 * scale;

  return (
    <Card
      shadow="sm"
      radius={radius}
      w={width}
      h={height}
      bg={`url("${imageUrl}") center/cover no-repeat`}
      p={0}
      style={{ overflow: "hidden" }}
    >
      <Text pl="md" py={2} bg="rgba(0, 0, 0, 0.5)">
        {card.name}
      </Text>
    </Card>
  );
}
