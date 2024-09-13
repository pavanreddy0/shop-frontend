import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ApiResponse,
  CartRequestBody,
  ItemResponse,
  PostRequestResponse,
  SignInResponse
} from "./models/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9191';

  constructor(private http : HttpClient) {

  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  signup(userData : any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/signup `, userData);
  }

  signin(userData: any): Observable<ApiResponse<SignInResponse>> {
    return this.http.post<ApiResponse<SignInResponse>>(`${this.apiUrl}/auth/login`, userData);
  }


  // Method to get available items (middle section items)
  getItems(): Observable<ItemResponse> {
    const headers = this.getHeaders();
    return this.http.get<ItemResponse>(`${this.apiUrl}/shop-spring/`, { headers });
  }

  // Method to get cart items for the user
  getCartItems(): Observable<ItemResponse> {
    const headers = this.getHeaders();
    return this.http.get<ItemResponse>(`${this.apiUrl}/shop-spring/cart`, { headers });
  }

  addItemToCart(data: CartRequestBody): Observable<PostRequestResponse> {
    const headers = this.getHeaders();
    return this.http.post<PostRequestResponse>(`${this.apiUrl}/shop-spring/cart`, data, { headers });
  }

  storeToken(token: string) {
    localStorage.setItem('jwtToken', token);  // Store token in localStorage
  }

  // Method to retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');  // Retrieve token from localStorage
  }
  clearToken() {
    localStorage.removeItem('jwtToken');  // Remove token from localStorage
  }

  placeOrder():Observable<PostRequestResponse> {
    const headers = this.getHeaders();
    return this.http.post<PostRequestResponse>(`${this.apiUrl}/shop-spring/order`,{}, { headers });
  }

}

