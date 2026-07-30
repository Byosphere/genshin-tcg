import {
  ActionIcon,
  Card,
  Checkbox,
  Flex,
  Skeleton,
  Space,
  Text,
} from "@mantine/core";
import classes from "./Card.module.css";
import { CardRecord } from "@/store/cards";
import { getCardSize } from "@/hooks/useCardSize";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

type TcgCardProps = {
  card: CardRecord;
  collected?: boolean;
  onClick?: () => void;
  toggleSelect?: (selected: boolean, card: CardRecord) => void;
  selected?: boolean;
  size: "xs" | "sm" | "md";
  onAdd?: (card: CardRecord) => void;
  onDelete?: (card: CardRecord) => void;
};

export default function TcgCard({
  card,
  onClick,
  collected,
  selected,
  toggleSelect,
  size,
  onAdd,
  onDelete,
}: TcgCardProps) {
  const { width, height, radius } = getCardSize(size);
  const active = collected === undefined || collected === true;

  function getImgUrl(c: CardRecord) {
    const rarity = c.rarity > 1 ? "_" + c.rarity : "";
    return `${import.meta.env.BASE_URL}set${c.set}/${c.cardId}${rarity}.jpg`;
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    toggleSelect?.(e.target.checked, card);
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
      data-selected={!!selected}
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
        opacity={active ? 1 : 0.2}
      />
      <Flex
        justify="space-between"
        align="center"
        px="sm"
        py={4}
        style={{ zIndex: 1 }}
        bg="rgba(0,0,0,0.7)"
        opacity={active ? 1 : 0.2}
      >
        <Text fw={600} size={size}>
          {card.name} - {card.cardId.split("-")[1]}
        </Text>
      </Flex>
      <Flex
        className={classes.actions}
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        p={6}
        gap={4}
      >
        {!!toggleSelect && (
          <Checkbox
            className={classes.checkbox}
            checked={selected}
            onChange={handleSelectChange}
          />
        )}
        <Space flex={1} />
        {onAdd && (
          <ActionIcon size="sm" radius="sm" color="blue">
            <PlusIcon />
          </ActionIcon>
        )}
        {onDelete && (
          <ActionIcon size="sm" radius="sm" color="red">
            <TrashIcon />
          </ActionIcon>
        )}
      </Flex>
    </Card>
  );
}
