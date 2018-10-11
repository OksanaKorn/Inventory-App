import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/shared/inventory.service';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'products-list',
  template: `
    <button [routerLink]="['/create-product']" class="new-prod-btn">New Product</button>
    <div *ngFor="let product of products" class="products-container" [routerLink]="['/products', product.id]">
        <div class="products-list">
            <div class="product">{{product.name}}</div>
        </div>
    </div>
  `,
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Object[]
  
  constructor(private inventoryService: InventoryService, private prodService: ProductsService){}

  
  ngOnInit() {
    this.getProducts()
    this.setProducts()
  }

  // getProducts() {
  //   return this.products
  // }

  // products = [
  //   {"id": 1, "name": "chery", "batches": [{"name": "batch_no", "value": 0}, {"name": "quantity", "value": 25}]},
  //   {"id": 2, "name": "water", "batches": []},
  //   {"id": 3, "name": "potato", "batches": []}
  // ]

  setProducts() {
    this.prodService.changeProduct(this.products)
  }

  getProducts() {
    this.inventoryService.getProducts()
      .subscribe( data => {
        this.products = JSON.parse(data)
      })
  }
}
