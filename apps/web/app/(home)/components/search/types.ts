export interface LocationOption {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface TimeOption {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface SearchParams {
  readonly pickupCity: string;
  readonly pickupDate?: Date;
  readonly pickupTime: string;
  readonly dropoffCity: string;
  readonly dropoffDate?: Date;
  readonly dropoffTime: string;
}

export interface SearchProps {
  readonly onSearch?: (params: SearchParams) => void;
  readonly className?: string;
}
