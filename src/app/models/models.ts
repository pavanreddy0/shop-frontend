
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;  // Optional properties can be marked with '?'
  imageUrl?: string; // Optional property
}

export interface CartRequestBody {
  id: number,
  count: number
}

export interface PostRequestResponse {
  message: string,
  status: number,
  data : string
}

export interface ItemResponse {
  message: string,
  status: string,
  data : Item[]
}

export interface SignInResponse {
  token: string,
  expiresIn: number
}


export interface ApiResponse<T> {
  message: string;
  status: string;  // You could also use a specific type for status like 'INTERNAL_SERVER_ERROR' | 'OK'
  data: T | null;  // Use a generic type T to make it flexible for different responses
}

