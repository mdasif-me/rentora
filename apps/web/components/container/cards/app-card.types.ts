export interface AppCardData {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly priceUnit?: string;
  readonly category?: string;
  readonly isFavorite?: boolean;
}

export interface AppCardProps {
  readonly vehicle: AppCardData;
  readonly onFavoriteToggle?: (id: string) => void;
  readonly onRentNow?: (id: string) => void;
  readonly className?: string;
}
