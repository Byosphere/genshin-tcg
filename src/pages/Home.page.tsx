import TcgCard, { CARD_SIZE_SCALE, CARD_WIDTH } from "@/components/Card/Card";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { cardSizeAtom, filteredCardsAtom } from "@/store/cards";
import { Box, Divider, Flex } from "@mantine/core";
import { useAtomValue } from "jotai";

export function HomePage() {
  const filteredCards = useAtomValue(filteredCardsAtom);
  const size = useAtomValue(cardSizeAtom);
  const cardWidth = CARD_WIDTH * CARD_SIZE_SCALE[size];

  return (
    <GlobalLayout>
      <Box mx="auto">
        <Flex pos="sticky" bg="red" h={40} align="center" gap="md"></Flex>
        <Divider />
      </Box>
      <Box
        my="md"
        mx="auto"
        maw={1700}
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: `repeat(auto-fit, ${cardWidth}px)`,
          justifyContent: "center",
        }}
      >
        {filteredCards.map((card) => (
          <TcgCard key={card.cardId + "_" + card.rarity} card={card} />
        ))}
      </Box>
    </GlobalLayout>
  );
}
