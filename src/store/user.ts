import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userCards = atomWithStorage<string[]>("userCards", []);

export interface Deck {
  name: string;
  cards: string[];
}

export const userDecks = atomWithStorage<Deck[]>("userDecks", []);
