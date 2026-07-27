import {
  CardFilters,
  cardSizeAtom,
  CardType,
  filtersAtom,
  searchQueryAtom,
} from "@/store/cards";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Image,
  NativeSelect,
  Slider,
  TextInput,
  Title,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  DiamondIcon,
  MagnifyingGlassIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { useAtom } from "jotai";
import classes from "./Header.module.css";
import { startTransition, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { CARD_SIZE_SCALE } from "@/components/Card/Card";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [size, setSize] = useAtom(cardSizeAtom);
  const [filters, setFilters] = useAtom(filtersAtom);

  const handleSetFilter = (filter: CardFilters) => {
    startTransition(() => {
      setFilters(filter);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    debouncedSetSearchQuery(event.currentTarget.value);
  };

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSizeChange = (value: number) => {
    const sizeKeys = Object.keys(
      CARD_SIZE_SCALE,
    ) as (keyof typeof CARD_SIZE_SCALE)[];

    startTransition(() => {
      setSize(sizeKeys[value]);
    });
  };

  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group gap="sm" justify="space-between" align="center" flex={1}>
          <Flex w={140}>
            <Image src="public/genshin_title.png" alt="Logo" height={40} />
          </Flex>
          <Title order={4} mr="md">
            TCG progress tracker
          </Title>
          <TextInput
            visibleFrom="sm"
            placeholder="Search by name, ID, or type"
            flex={1}
            value={search}
            onChange={handleChange}
            leftSection={<MagnifyingGlassIcon size={16} />}
            rightSectionWidth={300}
            rightSection={
              <Flex align="center">
                <NativeSelect
                  classNames={{ input: classes.typeInput }}
                  rightSectionWidth={28}
                  value={filters.cardType}
                  onChange={(value) =>
                    handleSetFilter({
                      ...filters,
                      cardType: value.target.value as CardType | "all",
                    })
                  }
                  data={[
                    { value: "all", label: "All types" },
                    ...Object.values(CardType).map((type) => ({
                      value: type,
                      label: type,
                    })),
                  ]}
                />
                <NativeSelect
                  classNames={{ input: classes.setInput }}
                  rightSectionWidth={28}
                  value={
                    filters.set.length > 0 ? filters.set[0].toString() : "all"
                  }
                  onChange={(value) =>
                    handleSetFilter({
                      ...filters,
                      set:
                        value.target.value === "all"
                          ? []
                          : [parseInt(value.target.value)],
                    })
                  }
                  data={[
                    { value: "all", label: "All sets" },
                    { value: "1", label: "Set 1" },
                    { value: "2", label: "Set 2" },
                    { value: "3", label: "Set 3" },
                  ]}
                />
              </Flex>
            }
          />
          <Tooltip
            label={filters.grouped ? "Unstack rarity" : "Stack rarity"}
            withArrow
          >
            <ActionIcon
              mr="sm"
              size="input-sm"
              variant={filters.grouped ? "filled" : "default"}
              onClick={() =>
                handleSetFilter({ ...filters, grouped: !filters.grouped })
              }
            >
              {filters.grouped ? (
                <DiamondIcon size={18} />
              ) : (
                <StackIcon size={18} />
              )}
            </ActionIcon>
          </Tooltip>
          <Box>
            <Text size="xs" mb={2}>
              Card size
            </Text>
            <Slider
              size="sm"
              value={Object.keys(CARD_SIZE_SCALE).indexOf(size)}
              onChange={handleSizeChange}
              min={0}
              max={2}
              w={100}
              label={(value) => Object.keys(CARD_SIZE_SCALE)[value]}
              step={1}
              marks={Object.entries(CARD_SIZE_SCALE).map(([key], index) => ({
                value: index,
                label: key.toUpperCase(),
              }))}
              styles={{ markLabel: { display: "none" } }}
            />
          </Box>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
