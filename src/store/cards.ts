import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import cardsData1 from "@/assets/cards_set_1.json";
import cardsData2 from "@/assets/cards_set_2.json";

const cardsData = [...cardsData1, ...cardsData2];

export enum CardType {
  Character = "Character",
  Event = "Event",
  Action = "Action",
  Equipment = "Equipment",
  Status = "Status",
  Summon = "Summon",
  Support = "Support",
}

export type CardRecord = {
  cardId: string;
  name: string;
  filename: string;
  rarity: number;
  set: number;
  cardType: CardType;
  type: string;
  grouped?: CardRecord[];
};

export type CardFilters = {
  cardType: CardType | "all";
  set: number[];
  grouped: boolean;
};

export const cardsAtom = atom<CardRecord[]>(cardsData as CardRecord[]);
export const searchQueryAtom = atom("");
export const cardSizeAtom = atom<"xs" | "sm" | "md">("xs");
export const filtersAtom = atom<CardFilters>({
  cardType: "all",
  set: [],
  grouped: false,
});
export const currentPageAtom = atom(1);
export const cardsPerPageAtom = atom(80);

export const filteredCardsAtom = atom((get) => {
  const cards = get(cardsAtom);
  const searchQuery = get(searchQueryAtom);
  const filters = get(filtersAtom);

  const filtered = filterCards(cards, searchQuery, filters);
  if (filters.grouped) {
    const grouped = groupCardsByID(filtered);
    return grouped;
  }
  return filtered;
});

export const groupedCardsAtom = atom((get) => {
  const cards = get(cardsAtom);
  return groupCardsByID(cards);
});

export const filteredGroupedCardsAtom = atom((get) => {
  const cards = get(cardsAtom);
  const searchQuery = get(searchQueryAtom);
  const filters = get(filtersAtom);

  const filtered = filterCards(cards, searchQuery, filters);
  return groupCardsByID(filtered);
});

export const totalPagesAtom = atom((get) => {
  const cards = get(filteredCardsAtom);
  const cardsPerPage = get(cardsPerPageAtom);
  return Math.ceil(cards.length / cardsPerPage) || 1;
});

export const paginatedCardsAtom = atom((get) => {
  const cards = get(filteredCardsAtom);
  const currentPage = get(currentPageAtom);
  const cardsPerPage = get(cardsPerPageAtom);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  return cards.slice(startIndex, endIndex);
});

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function groupCardsByID(cards: CardRecord[]): CardRecord[] {
  return Object.values(
    cards.reduce(
      (acc, card) => {
        if (!acc[card.cardId]) {
          acc[card.cardId] = { ...card, grouped: [] };
        }
        acc[card.cardId].grouped?.push(card);
        return acc;
      },
      {} as Record<string, CardRecord>,
    ),
  );
}

export function filterCards(
  cards: CardRecord[],
  searchQuery: string,
  filters: CardFilters,
) {
  const normalizedQuery = normalizeSearchValue(searchQuery);

  return cards.filter((card) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [card.name, card.cardId, card.cardType, card.type, card.filename]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCardType =
      filters.cardType === "all" || card.cardType === filters.cardType;

    const matchesSet =
      filters.set.length === 0 || filters.set.includes(card.set);

    return matchesQuery && matchesCardType && matchesSet;
  });
}
