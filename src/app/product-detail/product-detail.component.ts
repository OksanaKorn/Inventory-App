import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/shared/inventory.service';
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from 'src/app/shared/products.service';
import { Router } from "@angular/router";

@Component({
  selector: 'product-detail',
  template: `
    <div>
        <h2>Product Details</h2>
        <form>
            <h4>Name of Product: <span class="product-name">{{product.name}}</span></h4>
            <fieldset>      
                <legend>Edit batches</legend>      
                <input type="checkbox" name="baches" id="batch_no" value="batch_no">batch_no     
                <input type="checkbox" name="baches" id="best_by_date" value="best_by_date">best by date      
                <input (click)="showValue($event)" id="quantity" type="checkbox" name="quantitybach" value="quantity">quantity
                <input [value]="quantityValue" (input)="quantityValue = $event.target.value" type="text" name="quantity-value" id="quantity-value" value="0" *ngIf="showQuantityValue">   
            </fieldset>  
        </form>
        <button (click)="updateProduct()" class="save-btn">Save</button>
    </div>
   `,
  styles: [`
  fieldset {
      max-width: 400px;
      height: 50px;
      margin-top: 30px;
  }
  #quantity-value {
      width: 40px;
  }
  .save-btn {
    padding: 8px 15px;
    background-color: #B0C4DE;
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 20px;
    margin-top: 30px;
  }
  .product-name {
    font-size: 30px;
    color: #607B8B;
    text-transform: capitalize;
  }

  `]
})
export class ProductDetailComponent {
    id
    products
    product
    quantityValue:number = 0
    showQuantityValue:boolean = false
    batches = []
    
    constructor(private inventoryService: InventoryService, private route: ActivatedRoute, 
        private prodService: ProductsService, private router: Router) {}

    ngOnInit() {
        this.prodService.currentProducts.subscribe(products => this.products = products)
        this.id = this.route.snapshot.params.id
        this.getProduct(this.id)
        this.checkBatches()
    }

    getProduct(id) {
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i]._id == id) {
                this.product = this.products[i]
            }
        }
    }

    checkBatches() {
        let batches = this.product.batches
        for (let i = 0; i < batches.length; i++) {
            if (batches[i].name == "batch_no") {
                let batch: HTMLInputElement = <HTMLInputElement>document.getElementById("batch_no")
                batch.checked = true
            }
            else if (batches[i].name == "best_by_date") {
                let batch: HTMLInputElement = <HTMLInputElement>document.getElementById("best_by_date")
                batch.checked = true
            }
            else if (batches[i].name == "quantity") {
                let batch: HTMLInputElement = <HTMLInputElement>document.getElementById("quantity")
                batch.checked = true
                this.showQuantityValue = true
                this.quantityValue = batches[i].value
            }
        } 
    }

    showValue(event) {
        if(event.target.checked) {
            this.showQuantityValue = true
        } else if (!event.target.checked) {
            this.showQuantityValue = false
        }
    }

    checkBatchesAfter() {
        let batchesInputs = document.getElementsByName("baches")
        for (let i = 0; i < batchesInputs.length; i++) {
            let currentBatch: HTMLInputElement = <HTMLInputElement>batchesInputs[i]
            if(currentBatch.checked) {
                let batch = new Batch(currentBatch.value)
                this.batches.push(batch)
            }
        }
    }

    checkQuantityBatch() {
        let quantityInput: HTMLInputElement = <HTMLInputElement>document.getElementById("quantity")
        let batch = new Batch(quantityInput.value, this.quantityValue)
        this.batches.push(batch)
    }

    updateProduct() {
        if(this.showQuantityValue) {
            this.checkQuantityBatch()
        }
        this.checkBatchesAfter()
        this.product._id = this.id
        this.product.batches = this.batches
        let updatedProduct = JSON.stringify(this.product)
        this.editProduct(updatedProduct)
        this.batches = []
    }

    editProduct(product) {
        console.log(product)
        this.inventoryService.editProduct(product)
        .subscribe(
            product => { 
             console.log(product);
            }, 
            error => {
               console.log(error)
            }
       );
        this.router.navigate(["/products"])
    }
}

let Batch = function(name, value = 0) {
    this.name = name,
    this.value = value
}