import TcgCard, { CARD_WIDTH } from "@/components/Card/Card";
import cardsData from "@/assets/cards.json";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { SimpleGrid } from "@mantine/core";

export function HomePage() {
  return (
    <GlobalLayout>
      <SimpleGrid
        maw={{
          base: CARD_WIDTH,
          sm: CARD_WIDTH * 2 + 16,
          lg: CARD_WIDTH * 3 + 32,
          xl: CARD_WIDTH * 4 + 48,
        }}
        mx="auto"
        cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        spacing="lg"
      >
        {cardsData.map((card) => (
          <TcgCard key={card.cardId} card={card} />
        ))}
      </SimpleGrid>
    </GlobalLayout>
  );
}
