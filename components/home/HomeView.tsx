"use client";

import { CloverPaymentModal } from "@/components/clover/CloverPaymentModal";
import { CateringSection } from "@/components/catering/CateringSection";
import { FinalConversion } from "@/components/cta/FinalConversion";
import { EssenceSection } from "@/components/essence/EssenceSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { GallerySection } from "@/components/gallery/GallerySection";
import { Hero } from "@/components/hero/Hero";
import { InteractiveMenu } from "@/components/menu/InteractiveMenu";
import { LocationsSection } from "@/components/locations/LocationsSection";
import { EditorialNav } from "@/components/nav/EditorialNav";
import { OrderDrawer } from "@/components/order/OrderDrawer";
import { PopularOrders } from "@/components/popular/PopularOrders";
import { Prologue } from "@/components/prologue/Prologue";
import { ServicesSection } from "@/components/services/ServicesSection";
import { StorySection } from "@/components/story/StorySection";
import { useOrder } from "@/context/OrderContext";

export function HomeView() {
  const { paymentModalOpen, setPaymentModalOpen } = useOrder();

  return (
    <>
      <EditorialNav />
      <main>
        <Hero />
        <Prologue />
        <InteractiveMenu />
        <EssenceSection />
        <ServicesSection />
        <LocationsSection />
        <PopularOrders />
        <StorySection />
        <CateringSection />
        <GallerySection />
        <FinalConversion />
        <SiteFooter />
      </main>
      <OrderDrawer />
      <CloverPaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </>
  );
}
