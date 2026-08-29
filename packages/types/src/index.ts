export interface IVehicle {
  id: string;
  name: string;
  category: string;
  type: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  location: string;
  available: boolean;
}
