import type { Category, Vehicle } from "@rentora/types";

export interface PopularDealCategory {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface PopularDealsProps {
  readonly initialCategories: Category[];
  readonly initialVehicles: Vehicle[];
  readonly className?: string;
  readonly onShowMoreCars?: () => void;
  readonly onRentNow?: (vehicleId: string) => void;
}
