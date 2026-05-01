import { HomeView } from "@/components/home/HomeView";
import { LocationsCatalogProvider } from "@/context/LocationsCatalogContext";
import { MenuCatalogProvider } from "@/context/MenuCatalogContext";
import { OrderProvider } from "@/context/OrderContext";

export default function Page() {
  return (
    <MenuCatalogProvider>
      <LocationsCatalogProvider>
        <OrderProvider>
          <HomeView />
        </OrderProvider>
      </LocationsCatalogProvider>
    </MenuCatalogProvider>
  );
}
