import { Anchor, AppShell, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./GlobalLayout.module.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  const handleClick =
    (link: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(link);
    };

  return (
    <AppShell
      header={{
        height: 64,
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding={0}
    >
      <Header opened={opened} toggle={toggle} />

      <AppShell.Main>
        {/* <Flex
          visibleFrom="sm"
          pos="fixed"
          direction="column"
          align="center"
          style={{
            borderRight: "1px solid var(--mantine-color-dark-4)",
          }}
          w={64}
          h="calc(100% - 60px)"
          left={0}
          py="md"
          gap="md"
        >
          <Tooltip position="right" label="All cards list" withArrow>
            <ActionIcon
              component="a"
              variant="default"
              size="lg"
              href="/"
              onClick={handleClick("/")}
            >
              <HouseIcon />
            </ActionIcon>
          </Tooltip>
          <Tooltip position="right" label="My collection" withArrow>
            <ActionIcon
              component="a"
              variant="default"
              size="lg"
              href="/genshin-tcg-site/collection"
              onClick={handleClick("/collection")}
            >
              <ListChecksIcon />
            </ActionIcon>
          </Tooltip>
          <Tooltip position="right" label="Deck builder" withArrow>
            <ActionIcon
              component="a"
              variant="default"
              size="lg"
              // href="/genshin-tcg-site/deck-builder"
              // onClick={handleClick("/deck-builder")}
              disabled
            >
              <CardsThreeIcon />
            </ActionIcon>
          </Tooltip>
          <Divider w="calc(100% - 24px)" />
          <Space flex={1} />
          <SegmentedControl
            visibleFrom="sm"
            orientation="vertical"
            size="xs"
            style={{
              border: "1px solid var(--mantine-color-default-border)",
            }}
            value={size}
            onChange={handleSizeChange}
            data={[
              {
                value: "xs",
                label: (
                  <Center w={20} h={28}>
                    <Box
                      bg="rgba(255,255,255,0.2)"
                      style={{
                        border: "1px solid white",
                        borderRadius: "1px",
                      }}
                      w={10}
                      h={12}
                    />
                  </Center>
                ),
              },
              {
                value: "sm",
                label: (
                  <Center w={20} h={28}>
                    <Box
                      bg="rgba(255,255,255,0.2)"
                      style={{
                        border: "1px solid white",
                        borderRadius: "1px",
                      }}
                      w={12}
                      h={16}
                    />
                  </Center>
                ),
              },
              {
                value: "md",
                label: (
                  <Center w={20} h={28}>
                    <Box
                      bg="rgba(255,255,255,0.2)"
                      style={{
                        border: "1px solid white",
                        borderRadius: "1px",
                      }}
                      w={15}
                      h={18}
                    />
                  </Center>
                ),
              },
            ]}
          />
        </Flex> */}
        {children}
        <Flex h={32} px="md" bg="dark.9" align="center">
          <Text size="xs">
            All images belong to Hoyoverse -{" "}
            <Anchor
              href="https://github.com/Byosphere/genshin-tcg"
              target="_blank"
            >
              App made by Byosphere
            </Anchor>
          </Text>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
