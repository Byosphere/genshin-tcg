import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import { Router } from "./Router";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <JotaiProvider>
        <Router />
      </JotaiProvider>
    </MantineProvider>
  );
}
//test push
