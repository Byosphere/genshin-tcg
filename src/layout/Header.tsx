import {
  cardDisplay,
  CardFilters,
  CardType,
  filtersAtom,
  searchQueryAtom,
} from "@/store/cards";
import {
  ActionIcon,
  AppShell,
  Badge,
  Burger,
  Center,
  Flex,
  Group,
  Image,
  Menu,
  NativeSelect,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import {
  DownloadIcon,
  GearIcon,
  MagnifyingGlassIcon,
  UploadIcon,
} from "@phosphor-icons/react";
import { useAtom, useAtomValue } from "jotai";
import classes from "./Header.module.css";
import { startTransition, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { exportToCsv } from "@/tools";
import { userCards } from "@/store/user";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const collection = useAtomValue(userCards);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [display, setDisplay] = useAtom(cardDisplay);

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

  const handleImportCollection = () => {
    // TODO
  };

  const handleExportCollection = () => {
    exportToCsv(collection, "collection.csv");
  };

  return (
    <>
      <AppShell.Header>
        <Group px="md" mt="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group
            gap="sm"
            justify="space-between"
            align="center"
            flex={1}
            wrap="nowrap"
            style={{ overflow: "hidden" }}
          >
            <Flex w={120}>
              <Image src="genshin_title.png" alt="Logo" height={40} />
            </Flex>
            <Title order={4} mr="md" lineClamp={1}>
              TCG tracker
            </Title>
            <TextInput
              visibleFrom="sm"
              placeholder="Search by name, ID, or type"
              flex={1}
              value={search}
              onChange={handleChange}
              leftSection={<MagnifyingGlassIcon size={16} />}
              rightSectionWidth={450}
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
                    classNames={{ input: classes.typeInput }}
                    rightSectionWidth={28}
                    value={filters.rarity || "all"}
                    onChange={(value) => {
                      const val = value.target.value;
                      handleSetFilter({
                        ...filters,
                        rarity: val === "all" ? "all" : parseInt(val, 10),
                      });
                    }}
                    data={[
                      { value: "all", label: "All rarity" },
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
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
                      { value: "4", label: "Set 4" },
                    ]}
                  />
                </Flex>
              }
            />
          </Group>
          <SegmentedControl
            size="md"
            data={[
              {
                value: "all",
                label: "All cards",
              },
              {
                value: "mine",
                label: <span>My collection ({collection.length})</span>,
              },
            ]}
            value={display}
            onChange={setDisplay}
          />
          <Menu shadow="md" width={180} withArrow>
            <Menu.Target>
              <ActionIcon variant="default" size="input-sm">
                <GearIcon />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<DownloadIcon size={14} />}
                onClick={handleImportCollection}
              >
                Import collection
              </Menu.Item>
              <Menu.Item
                leftSection={<UploadIcon size={14} />}
                onClick={handleExportCollection}
              >
                Export collection
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SegmentedControl
          size="md"
          data={[
            {
              value: "all",
              label: "All cards",
            },
            {
              value: "mine",
              label: <span>My collection ({collection.length})</span>,
            },
          ]}
          value={display}
          onChange={setDisplay}
        />
        <TextInput
          mb="md"
          mt="md"
          placeholder="Search by name, ID, or type"
          value={search}
          onChange={handleChange}
          leftSection={<MagnifyingGlassIcon size={16} />}
        />
        <Flex align="center" gap="md">
          <NativeSelect
            flex={1}
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
            flex={1}
            rightSectionWidth={28}
            value={filters.rarity || "all"}
            onChange={(value) => {
              const val = value.target.value;
              handleSetFilter({
                ...filters,
                rarity: val === "all" ? "all" : parseInt(val, 10),
              });
            }}
            data={[
              { value: "all", label: "All rarity" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
          />
          <NativeSelect
            flex={1}
            rightSectionWidth={28}
            value={filters.set.length > 0 ? filters.set[0].toString() : "all"}
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
              { value: "4", label: "Set 4" },
            ]}
          />
        </Flex>
      </AppShell.Navbar>
    </>
  );
}
