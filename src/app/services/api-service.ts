import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'https://fakestoreapi.com/products';

  private cartList: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartUpdates = new BehaviorSubject<any[]>(this.cartList);
  cart$ = this.cartUpdates.asObservable();

  private orderList: any[] = JSON.parse(localStorage.getItem('orders') || '[]');
  private orderUpdates = new BehaviorSubject<any[]>(this.orderList);
  orders$ = this.orderUpdates.asObservable();

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<product[]>(this.api);
  }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.cartUpdates.next([...this.cartList]);
  }

  addToCart(product: any) {
    const existingItem = this.cartList.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartList.push({ ...product, quantity: 1, selected: false });
    }
    this.saveToStorage();
  }

  updateQuantity(productId: number, change: number) {
    const item = this.cartList.find((i) => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.cartList = this.cartList.filter((i) => i.id !== productId);
      }
      this.saveToStorage();
    }
  }

  toggleSelect(productId: number) {
    const item = this.cartList.find((i) => i.id === productId);
    if (item) {
      item.selected = !item.selected;
      this.saveToStorage();
    }
  }

  placeOrder() {
    const selectedItems = this.cartList.filter((item) => item.selected);
    if (selectedItems.length === 0) return;

    const newOrder = {
      orderId: Date.now(),
      date: new Date(),
      items: [...selectedItems],
      total: selectedItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      ),
    };

    this.orderList.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(this.orderList));
    this.orderUpdates.next([...this.orderList]);

    this.cartList = this.cartList.filter((item) => !item.selected);
    this.saveToStorage();
  }

  deleteOrder(orderId: number) {
    this.orderList = this.orderList.filter(
      (order) => order.orderId !== orderId
    );

    localStorage.setItem('orders', JSON.stringify(this.orderList));
    this.orderUpdates.next([...this.orderList]);
  }
}

export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
  selected?: boolean;
}