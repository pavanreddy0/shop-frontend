import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {CartRequestBody, Item, PostRequestResponse} from "../models/models";
import {response} from "express";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  items:Item[] = []
  cartItems:Item[] = []

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.fetchItems();
    this.getItemsFromCart();
  }

  fetchItems() {
    this.authService.getItems().subscribe(
      response  => {
        this.items = response.data;
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
  }


  addItemToCart(item:Item){
    const cartRequest = {id: item.id, count: item.count}
    this.authService.addItemToCart(cartRequest).subscribe(
      response => alert("Added item to cart"),
      error => alert("Error fetching items:" + error)
    )
    this.getItemsFromCart();
  }

  placeOrder(){
    this.authService.placeOrder().subscribe(
      response => alert("Succesfully Placed Order"),
      error => alert("Error fetching items:" + error)
    )
    this.getItemsFromCart();

  }
  getItemsFromCart(){
    this.authService.getCartItems().subscribe(
      response => {
        if(response.status === "OK"){
          this.cartItems = response.data;
        }
        else {
          this.cartItems = []
        }
      },
      error => console.log("Error getting items from Cart")
    )
  }

  signOut() {
    this.authService.clearToken();  // Clear the token
    this.router.navigate(['/sign-in']);  // Redirect to sign-in page
  }

  addToCart(item: Item) {
    let cartItem = this.cartItems.find(ci => ci.id === item.id);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {...item}
      cartItem.count = 1
      this.cartItems.push(cartItem);
    }
    this.addItemToCart(cartItem);
  }
}
