export interface GetBookRequest {
  id: string;
}

export interface Book {
  id: string;
  name: string;
  isAvailable: boolean;
}
