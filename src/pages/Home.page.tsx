import TcgCard, { CARD_WIDTH } from "@/components/Card/Card";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { SimpleGrid } from "@mantine/core";

const cards = Array.from({ length: 40 }, (_, index) => <TcgCard key={index} />);

export function HomePage() {
  return (
    <GlobalLayout>
      <SimpleGrid
        maw={{
          base: CARD_WIDTH,
          sm: CARD_WIDTH * 2 + 16,
          lg: CARD_WIDTH * 3 + 32,
        }}
        mx="auto"
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
      >
        {cards}
      </SimpleGrid>
    </GlobalLayout>
  );
}
