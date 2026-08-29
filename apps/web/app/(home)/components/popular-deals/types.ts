export interface PopularDealCategory {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface PopularDealsProps {
  readonly className?: string;
  readonly onShowMoreCars?: () => void;
  readonly onRentNow?: (vehicleId: string) => void;
}
