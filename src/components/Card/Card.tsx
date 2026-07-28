import { Card, Checkbox, Flex, Skeleton, Text } from "@mantine/core";
import classes from "./Card.module.css";
import { CardRecord } from "@/store/cards";
import useCardSize from "@/hooks/useCardSize";

type TcgCardProps = {
  card: CardRecord;
  hideOverlay?: boolean;
  onClick?: () => void;
};

export default function TcgCard({ card, onClick }: TcgCardProps) {
  const { width, height, radius, size } = useCardSize();

  function getImgUrl(c: CardRecord) {
    const rarity = c.rarity > 1 ? "_" + c.rarity : "";
    return `${import.meta.env.BASE_URL}set${c.set}/${c.cardId}${rarity}.jpg`;
  }

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
        bg={`url("${getImgUrl(card)}") center/cover no-repeat`}
      />
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
