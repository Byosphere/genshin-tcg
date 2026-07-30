import { cardSizeAtom } from "@/store/cards";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";

export const CARD_SIZE_SCALE = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
} as const;

export const CARD_WIDTH = 400;
export const CARD_HEIGHT = 560;

export default function useCardSize() {
  const smallScreem = useMediaQuery("(max-width: 360px)");
  const mediumScreem = useMediaQuery("(max-width: 500px)");
  const userSize = useAtomValue(cardSizeAtom);
  const size = smallScreem ? "xs" : mediumScreem ? "sm" : userSize;

  return {
    size,
    width: CARD_WIDTH * CARD_SIZE_SCALE[size],
    height: CARD_HEIGHT * CARD_SIZE_SCALE[size],
    radius: 20 * CARD_SIZE_SCALE[size],
  };
}

export function getCardSize(size: "xs" | "sm" | "md") {
  return {
    size,
    width: CARD_WIDTH * CARD_SIZE_SCALE[size],
    height: CARD_HEIGHT * CARD_SIZE_SCALE[size],
    radius: 20 * CARD_SIZE_SCALE[size],
  };
}
