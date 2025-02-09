import { useMediaQuery } from "@/hooks/useMediaQuery";
import banner from "../../../assets/images/Promo Banner.png";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Promotion() {
  return (
    <>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="m-auto">
            <img src={banner} className="md:rounded-xl" />
          </CarouselItem>
          <CarouselItem>
            <img src={banner} className="md:rounded-xl" />
          </CarouselItem>
          <CarouselItem>
            <img src={banner} className="md:rounded-xl" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
