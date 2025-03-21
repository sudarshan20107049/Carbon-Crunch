export interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}

export interface SliderProps {
  slides: SlideData[];
  autoPlayInterval?: number;
  className?: string;
}

export interface SlideProps extends SlideData {
  isActive: boolean;
  index: number;
  totalSlides: number;
} 