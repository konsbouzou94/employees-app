import { Attribute } from './attribute.model';

export interface Employee {
  id: number;
  name: string;
  birthDate: string;
  hasCar: boolean;
  address: string;
  coordinates: { lat: number; lng: number };
  attribute: Attribute | null;
}
