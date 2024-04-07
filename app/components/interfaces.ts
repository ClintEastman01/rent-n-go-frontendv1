export interface iPerson {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone: string;
  is_partner: boolean;
  photos_of_docs: [];
}

export interface iVehicle {
  type: string;
  userId: number;
}

export interface iCreatedPersonResponse {
  status: number;
  error: string;
}
