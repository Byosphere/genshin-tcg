import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import DeckBuilderPage from "./pages/DeckBuilder.page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/deck-builder",
      element: <DeckBuilderPage />,
    },
  ],
  {
    basename: "/genshin-tcg-site/",
  },
);

export function Router() {
  return <RouterProvider router={router} />;
}
