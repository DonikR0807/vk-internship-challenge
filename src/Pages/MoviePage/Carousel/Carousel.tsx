import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Carousel.css";
import { Box, Button } from "@mui/material";
import { EmblaOptionsType } from "embla-carousel";

interface CarouselProps {
  children?: React.ReactNode[];
  options?: EmblaOptionsType;
  visibleSlides?: number,
}

function Carousel({ options, children, visibleSlides }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Box>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {children?.map((child, index) => {
              return <div key={index} className="embla__slide" style={{
                flex: `0 0 calc(100% / ${visibleSlides ? visibleSlides : 3})`,
              }}>{child}</div>;
            })}
          </div>
        </div>
      </div>
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between", padding: "0 8px" }}
      >
        <Button
          disabled={prevBtnDisabled}
          onClick={onPrevButtonClick}
          variant="outlined"
        >
          Назад
        </Button>
        <Button
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
          variant="outlined"
        >
          Далее
        </Button>
      </Box>
    </Box>
  );
}

export default Carousel;
