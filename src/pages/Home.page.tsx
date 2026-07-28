import TcgCard from "@/components/Card/Card";
import useCardSize from "@/hooks/useCardSize";
import { GlobalLayout } from "@/layout/GlobalLayout";
import {
  filteredCardsAtom,
  currentPageAtom,
  totalPagesAtom,
  paginatedCardsAtom,
} from "@/store/cards";
import { Box, Divider, Flex, Pagination, Text } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export function HomePage() {
  const filteredCards = useAtomValue(filteredCardsAtom);
  const paginatedCards = useAtomValue(paginatedCardsAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const [page, setCurrentPage] = useAtom(currentPageAtom);
  const { width } = useCardSize();

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [filteredCards.length, setCurrentPage]);

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
    window.scrollTo(0, 0);
  };

  return (
    <GlobalLayout>
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
          <TcgCard key={card.cardId + "_" + card.rarity} card={card} />
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
