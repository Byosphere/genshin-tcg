import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import { Router } from "./Router";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <ModalsProvider>
        <Notifications />
        <JotaiProvider>
          <Router />
        </JotaiProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
//test push
