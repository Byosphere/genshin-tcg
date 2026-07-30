import TcgCard from "@/components/Card/Card";
import useCardSize from "@/hooks/useCardSize";
import { GlobalLayout } from "@/layout/GlobalLayout";
import {
  filteredCardsAtom,
  currentPageAtom,
  totalPagesAtom,
  paginatedCardsAtom,
  CardRecord,
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
import { PlusIcon } from "@phosphor-icons/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export function HomePage() {
  const { width, size } = useCardSize();
  const [selected, setSelected] = useState<string[]>([]);
  const setToCollection = useSetAtom(userCards);
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
    setToCollection((c) => [...new Set([...c, ...selected])]);
    setSelected([]);
  };

  return (
    <GlobalLayout>
      <Flex py="sm" px="md" justify="flex-end" gap="sm" align="center">
        {selected.length > 0 && (
          <Flex
            bg="dark.8"
            align="center"
            pl="md"
            gap="sm"
            mr="md"
            h="100%"
            style={{
              border: "1px solid var(--mantine-primary-color-filled)",
              borderRadius: "18px",
            }}
          >
            <Text></Text>
            <Button
              size="xs"
              variant="transparent"
              leftSection={<PlusIcon size={14} />}
              onClick={handleAddToCollection}
            >
              Add {selected.length} card(s) to collection
            </Button>
            <ActionIcon size="sm" radius="xl" mr={4}>
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
      <Divider />
      <Box
        my="md"
        mx="auto"
        maw={1800}
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: `repeat(auto-fit, ${width}px)`,
          justifyContent: "center",
        }}
      >
        {paginatedCards.map((card) => (
          <TcgCard
            key={card.cardId + "_" + card.rarity}
            selected={selected.includes(card.cardId + "/" + card.rarity)}
            card={card}
            toggleSelect={handleSelect}
            size={size}
          />
        ))}
      </Box>
      <Divider />
      <Flex py="sm" px="md" justify="flex-end" gap="sm" align="center">
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
