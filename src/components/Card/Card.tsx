import { Card, Checkbox, Flex, Skeleton, Text } from "@mantine/core";
import classes from "./Card.module.css";
import { useAtomValue } from "jotai";
import { cardSizeAtom } from "@/store/cards";

export const CARD_WIDTH = 396;
export const CARD_HEIGHT = 553;

export const CARD_SIZE_SCALE = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
} as const;

type TcgCardProps = {
  card: {
    cardId: string;
    name: string;
    rarity: number;
    set: number;
  };
  hideOverlay?: boolean;
  onClick?: () => void;
};

export default function TcgCard({ card, onClick }: TcgCardProps) {
  const size = useAtomValue(cardSizeAtom);
  const imageUrl = `/_set${card.set}/${card.cardId}.jpg`;
  const scale = CARD_SIZE_SCALE[size];
  const width = CARD_WIDTH * scale;
  const height = CARD_HEIGHT * scale;
  const radius = 20 * scale;

  return (
    <Card
      pos="relative"
      shadow="md"
      radius={radius}
      w={width}
      h={height}
      p={0}
      className={classes.card}
      onClick={onClick}
    >
      <Skeleton w={width} h={height} radius={radius} visible />
      <Flex
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg={`url("${imageUrl}") center/cover no-repeat`}
      ></Flex>
      <Flex
        justify="space-between"
        align="center"
        px="sm"
        py="xs"
        style={{ zIndex: 1 }}
        bg="rgba(0,0,0,0.7)"
      >
        <Text fw={600} size={size}>
          {card.name} - {card.cardId.split("-")[1]}
        </Text>
        <Checkbox size={size} onChange={() => {}} />
      </Flex>
    </Card>
  );
}
