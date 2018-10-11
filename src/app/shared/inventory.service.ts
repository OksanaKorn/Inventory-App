import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class InventoryService {
  
  constructor(private http: HttpClient){}
  getProducts():Observable<any>  {
    return this.http.get("http://localhost:3000/api/products")
  }

  addNewProduct(newProduct) {
    return this.http.post("http://localhost:3000/api/products", newProduct)
  }

  editProduct(newProduct) {
    return this.http.put("http://localhost:3000/api/products", newProduct)
  }
}