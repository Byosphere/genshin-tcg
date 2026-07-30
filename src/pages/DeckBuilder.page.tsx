import TcgCard from "@/components/Card/Card";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { cardsAtom } from "@/store/cards";
import { Box, Button, Divider, Drawer, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue } from "jotai";

export default function DeckBuilderPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <GlobalLayout>
      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
      <Drawer.Root position="right" opened={opened} onClose={close} size={500}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Deck name</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body px={0}>
            <Divider />
            <Flex h={40}></Flex>
            <Divider />
            <Flex mt="md" wrap="wrap" justify="center"></Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </GlobalLayout>
  );
}
