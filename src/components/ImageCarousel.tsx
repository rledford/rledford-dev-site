import {
  createSignal,
  createEffect,
  onCleanup,
  type Component,
} from 'solid-js';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  alt: string;
}

const ImageCarousel: Component<ImageCarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isHovered, setIsHovered] = createSignal(false);
  const [isTransitioning, setIsTransitioning] = createSignal(false);

  let intervalId: ReturnType<typeof setInterval> | undefined;
  let containerRef: HTMLDivElement | undefined;

  const images = () => props.images || [];
  const interval = () => props.interval || 5000;

  // Create extended array with last image at start and first image at end for seamless loop
  const extendedImages = () => {
    const imgs = images();
    if (imgs.length <= 1) return imgs;
    return [imgs[imgs.length - 1], ...imgs, imgs[0]]; // Add last image at start, first at end
  };

  const nextImage = () => {
    if (isTransitioning()) return;

    setIsTransitioning(true);
    const nextIdx = currentIndex() + 1;

    if (nextIdx >= images().length + 1) {
      // Moving to the duplicate first image (at end)
      setCurrentIndex(nextIdx);
      // After transition completes, reset to actual first image
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1); // Index 1 is the real first image in extended array
      }, 500);
    } else {
      setCurrentIndex(nextIdx);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevImage = () => {
    if (isTransitioning()) return;

    setIsTransitioning(true);
    const prevIdx = currentIndex() - 1;

    if (prevIdx < 1) {
      // Moving to the duplicate last image (at start)
      setCurrentIndex(0);
      // After transition completes, reset to actual last image
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images().length); // Index length is the real last image in extended array
      }, 500);
    } else {
      setCurrentIndex(prevIdx);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToImage = (index: number) => {
    if (isTransitioning()) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // Offset by 1 because of duplicate at start
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const startAutoPlay = () => {
    if (images().length <= 1) return;

    intervalId = setInterval(() => {
      if (isHovered()) {
        // Only advance when hovered
        nextImage();
      }
    }, interval());
  };

  const stopAutoPlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  createEffect(() => {
    if (images().length > 1) {
      // Start at index 1 (first real image) when using extended array
      setCurrentIndex(1);
      startAutoPlay();
    }

    onCleanup(() => {
      stopAutoPlay();
    });
  });

  if (images().length === 0) {
    return (
      <div class="w-full h-48 bg-gray-100 flex items-center justify-center">
        <span class="text-gray-400">No images available</span>
      </div>
    );
  }

  if (images().length === 1) {
    return (
      <div class="relative w-full overflow-hidden">
        <img
          src={images()[0]}
          alt={props.alt}
          class="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      class="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class="relative w-full">
        <div
          ref={containerRef}
          class="flex ease-in-out"
          style={{
            transform: `translateX(-${currentIndex() * 100}%)`,
            transition: isTransitioning()
              ? 'transform 0.5s ease-in-out'
              : 'none',
          }}
        >
          {extendedImages().map((image, index) => (
            <div class="w-full flex-shrink-0">
              <img
                src={image}
                alt={`${props.alt} - Image ${(index % images().length) + 1}`}
                class="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevImage}
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
        aria-label="Previous image"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextImage}
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
        aria-label="Next image"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {images().map((_, index) => (
          <button
            onClick={() => goToImage(index)}
            class={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex() - 1
                ? 'bg-white'
                : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
