import TcgCard, { CARD_SIZE_SCALE, CARD_WIDTH } from "@/components/Card/Card";
import { GlobalLayout } from "@/layout/GlobalLayout";
import {
  cardSizeAtom,
  filteredCardsAtom,
  currentPageAtom,
  totalPagesAtom,
  paginatedCardsAtom,
} from "@/store/cards";
import { Box, Divider, Flex, Pagination, Text } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export function HomePage() {
  const filteredCards = useAtomValue(filteredCardsAtom);
  const paginatedCards = useAtomValue(paginatedCardsAtom);
  const totalPages = useAtomValue(totalPagesAtom);
  const [page, setCurrentPage] = useAtom(currentPageAtom);
  const size = useAtomValue(cardSizeAtom);
  const cardWidth = CARD_WIDTH * CARD_SIZE_SCALE[size];

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
      <Flex py="sm" justify="center" gap="md" align="center">
        <Pagination
          size="sm"
          value={page}
          total={totalPages}
          onChange={handlePageChange}
        />
        <Divider orientation="vertical" />
        <Text size="sm">
          {paginatedCards.length} of {filteredCards.length} cards
        </Text>
      </Flex>
      <Divider />
      <Box
        my="md"
        mx="auto"
        maw={1800}
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: `repeat(auto-fit, ${cardWidth}px)`,
          justifyContent: "center",
        }}
      >
        {paginatedCards.map((card) => (
          <TcgCard key={card.cardId + "_" + card.rarity} card={card} />
        ))}
      </Box>
      <Divider />
      <Flex py="sm" justify="center">
        <Pagination
          value={page}
          size="sm"
          total={totalPages}
          onChange={handlePageChange}
        />
      </Flex>
    </GlobalLayout>
  );
}
