import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductsService {

  private productSource = new BehaviorSubject("default");
  currentProducts = this.productSource.asObservable();

  constructor() { }

  changeProduct(products) {
    this.productSource.next(products)
  }

}