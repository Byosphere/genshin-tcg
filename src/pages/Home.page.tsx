import TcgCard from "@/components/Card/Card";
import { getCardSize } from "@/hooks/useCardSize";
import { GlobalLayout } from "@/layout/GlobalLayout";
import {
  filteredCardsAtom,
  currentPageAtom,
  totalPagesAtom,
  paginatedCardsAtom,
  CardRecord,
  cardDisplay,
} from "@/store/cards";
import { userCards } from "@/store/user";
import {
  ActionIcon,
  Box,
  Button,
  CloseIcon,
  Divider,
  Flex,
  Pagination,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { PlusIcon } from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import classes from "./Home.page.module.css";

export function HomePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [collection, setToCollection] = useAtom(userCards);
  const filteredCards = useAtomValue(filteredCardsAtom);
  const paginatedCards = useAtomValue(paginatedCardsAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const [page, setCurrentPage] = useAtom(currentPageAtom);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [filteredCards.length, setCurrentPage]);

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
    window.scrollTo(0, 0);
  };

  const handleSelect = (isSelected: boolean, card: CardRecord) => {
    if (isSelected) {
      setSelected((s) => {
        return [...s, card.cardId + "/" + card.rarity];
      });
    } else {
      setSelected((s) => {
        return s.filter((c) => c !== card.cardId + "/" + card.rarity);
      });
    }
  };

  const handleAddToCollection = () => {
    const nbElements = selected.length;
    setToCollection((c) => [...new Set([...c, ...selected])]);
    setSelected([]);
    notifications.show({
      title: "Collection updated",
      message: `${nbElements} card${nbElements !== 1 ? "s" : ""} added to the collection!`,
    });
  };

  const handleUnselect = () => {
    setSelected([]);
  };

  const handleAdd = (card: CardRecord) => {
    if (collection.includes(card.cardId + "/" + card.rarity)) return;

    setToCollection((c) => [
      ...new Set([...c, card.cardId + "/" + card.rarity]),
    ]);
    notifications.show({
      title: "Collection updated",
      message: `1 card added to the collection!`,
    });
  };

  const handleRemove = (card: CardRecord) => {
    if (!collection.includes(card.cardId + "/" + card.rarity)) return;

    setToCollection((c) =>
      c.filter((id) => id !== card.cardId + "/" + card.rarity),
    );
    notifications.show({
      title: "Collection updated",
      message: `1 card removed from the collection!`,
    });
  };

  return (
    <GlobalLayout>
      <Flex
        pos="sticky"
        top={64}
        py="xs"
        px="md"
        justify="flex-end"
        gap="sm"
        align="center"
        className={classes.paginationBar}
      >
        {selected.length > 0 && (
          <Flex
            bg="dark.8"
            align="center"
            pl="md"
            gap="sm"
            mr="md"
            className={classes.selectBar}
          >
            <Button
              flex={1}
              size="xs"
              variant="transparent"
              leftSection={<PlusIcon size={14} />}
              onClick={handleAddToCollection}
            >
              Add {selected.length} card(s) to collection
            </Button>
            <ActionIcon size="sm" radius="xl" mr={4} onClick={handleUnselect}>
              <CloseIcon />
            </ActionIcon>
          </Flex>
        )}
        <Text size="sm">{`Showing ${paginatedCards.length * (page - 1) + 1} – ${Math.min(filteredCards.length, paginatedCards.length * page)} of ${filteredCards.length} cards`}</Text>
        <Pagination
          miw={72}
          total={totalPages}
          value={page}
          onChange={handlePageChange}
          withPages={false}
        />
      </Flex>
      <Box
        my="md"
        mx="auto"
        maw={1800}
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: `repeat(auto-fit, ${getCardSize("xs").width}px)`,
          justifyContent: "center",
          minHeight: "calc(100vh - 240px)",
        }}
      >
        {paginatedCards.map((card) => {
          const collected = collection.includes(
            card.cardId + "/" + card.rarity,
          );

          return (
            <TcgCard
              key={card.cardId + "_" + card.rarity}
              selected={selected.includes(card.cardId + "/" + card.rarity)}
              collected={collected}
              card={card}
              toggleSelect={handleSelect}
              onAdd={handleAdd}
              onDelete={handleRemove}
            />
          );
        })}
      </Box>
      <Divider />
      <Flex
        py="sm"
        px="md"
        justify="flex-end"
        gap="sm"
        align="center"
        className={classes.paginationBar}
      >
        <Text size="sm">{`Showing ${paginatedCards.length * (page - 1) + 1} – ${Math.min(filteredCards.length, paginatedCards.length * page)} of ${filteredCards.length} cards`}</Text>
        <Pagination
          miw={72}
          total={totalPages}
          value={page}
          onChange={handlePageChange}
          withPages={false}
        />
      </Flex>
    </GlobalLayout>
  );
}
