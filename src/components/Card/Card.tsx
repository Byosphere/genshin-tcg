import {
  ActionIcon,
  Box,
  Card,
  Checkbox,
  CloseIcon,
  Flex,
  Paper,
  Skeleton,
  Space,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import classes from "./Card.module.css";
import { cardDisplay, CardRecord } from "@/store/cards";
import { getCardSize } from "@/hooks/useCardSize";
import {
  MagnifyingGlassPlusIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { modals } from "@mantine/modals";
import { useAtomValue } from "jotai";

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
  const display = useAtomValue(cardDisplay);
  const allCardsMode = display === "all";
  const active = collected || allCardsMode;

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
          <Table variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>ID</Table.Th>
                <Table.Td>{card.cardId}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Rarity</Table.Th>
                <Table.Td>{card.rarity}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Td>{card.cardType}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
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
        {(!active || allCardsMode) && (
          <Tooltip label="Add to collection" withArrow>
            <ActionIcon size="sm" radius="sm" onClick={handleAdd}>
              <PlusIcon />
            </ActionIcon>
          </Tooltip>
        )}
        {active && !allCardsMode && (
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
