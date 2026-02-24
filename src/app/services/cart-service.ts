import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,forkJoin} from 'rxjs';

export interface CartProduct {
  productId: number;
  quantity: number;
}

// Added a separate interface for the actual Product details
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string; // This is the field returned by the /products endpoint
}

export interface CartResponse {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  // We'll fetch both carts and all products to "join" them
  getCartData(): Observable<[CartResponse[], any[]]> {
    return forkJoin([
      this.http.get<CartResponse[]>(`${this.apiUrl}/carts`),
      this.http.get<any[]>(`${this.apiUrl}/products`)
    ]);
  }}