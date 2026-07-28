import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import CollectionPage from "./pages/Collection.page";
import DeckBuilderPage from "./pages/DeckBuilder.page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/collection",
      element: <CollectionPage />,
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
