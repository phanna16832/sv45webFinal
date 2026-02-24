// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartResponse } from '../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart.html'
})
export class Cart implements OnInit {
  carts: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartData().subscribe(([cartList, productList]) => {
      // Logic to attach images to products inside carts
      this.carts = cartList.map(cart => ({
        ...cart,
        products: cart.products.map(p => {
          const productDetails = productList.find(prod => prod.id === p.productId);
          return { ...p, image: productDetails?.image }; // Attach the image!
        })
      }));
    });
  }
}