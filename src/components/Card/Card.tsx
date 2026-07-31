import {
  ActionIcon,
  Box,
  Card,
  Checkbox,
  CloseIcon,
  Divider,
  Flex,
  Paper,
  Skeleton,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import classes from "./Card.module.css";
import { CardRecord } from "@/store/cards";
import { getCardSize } from "@/hooks/useCardSize";
import {
  MagnifyingGlassPlusIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { modals } from "@mantine/modals";

type TcgCardProps = {
  card: CardRecord;
  collected?: boolean;
  toggleSelect?: (selected: boolean, card: CardRecord) => void;
  selected?: boolean;
  onAdd?: (card: CardRecord) => void;
  onDelete?: (card: CardRecord) => void;
};

export default function TcgCard({
  card,
  collected,
  selected,
  toggleSelect,
  onAdd,
  onDelete,
}: TcgCardProps) {
  const { width, height, radius } = getCardSize("xs");
  const active = collected === undefined || collected === true;

  function getImgUrl(c: CardRecord) {
    const rarity = c.rarity > 1 ? "_" + c.rarity : "";
    return `${import.meta.env.BASE_URL}set${c.set}/${c.cardId}${rarity}.jpg`;
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    toggleSelect?.(e.target.checked, card);
  }

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    onAdd?.(card);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    onDelete?.(card);
  }

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { width: w, height: h, radius: r } = getCardSize("md");

    modals.openConfirmModal({
      title: card.name,
      children: (
        <Box>
          <Text size="xs">ID: {card.cardId}</Text>
          <Text size="xs">Rarity: {card.rarity}</Text>
          <Text size="xs">Type: {card.type}</Text>
          <Paper
            bg={`url("${getImgUrl(card)}") center/cover no-repeat`}
            radius={r}
            w={w}
            h={h}
            maw="100%"
            style={{ aspectRatio: w + " / " + h }}
            my="md"
            mx="auto"
          />
        </Box>
      ),
      labels: { confirm: "", cancel: "Close" },
      onConfirm: () => console.log("Confirmed"),
      confirmProps: { display: "none" },
    });
  };

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
      onClick={() => toggleSelect?.(!selected, card)}
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
        onClick={handleZoom}
      >
        <Text fw={600} size="xs">
          {card.name} - {card.cardId.split("-")[1]}
        </Text>
        <ActionIcon size="sm" variant="transparent">
          <MagnifyingGlassPlusIcon />
        </ActionIcon>
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
          <Tooltip label="Add to collection" withArrow>
            <ActionIcon size="sm" radius="sm" onClick={handleAdd}>
              <PlusIcon />
            </ActionIcon>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip label="Remove from collection" withArrow>
            <ActionIcon
              size="sm"
              radius="sm"
              color="red"
              onClick={handleDelete}
            >
              <CloseIcon />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>
    </Card>
  );
}
