import { Component } from '@angular/core';
import { InventoryService } from 'src/app/shared/inventory.service';
import { Router } from "@angular/router";

@Component({
  selector: 'new-product',
  template: `
    <div class="add-new-block">
        <h2>Add new Product</h2>
        <form>
            <label for="pname">Name of Product</label>
            <input #newProdName type="text" id="pname" name="pname">
            <fieldset>      
                <legend>Add batches</legend>      
                <input type="checkbox" name="baches" value="batch_no">batch_no     
                <input type="checkbox" name="baches" value="best_by_date">best by date      
                <input (click)="showValue($event)" id="quantity" type="checkbox" name="quantitybach" value="quantity">quantity
                <input [value]="quantityValue" (input)="quantityValue = $event.target.value" type="text" name="quantity-value" id="quantity-value" value="0" *ngIf="showQuantityValue">   
            </fieldset>  
        </form>
        <button (click)="createNewProduct(newProdName.value)" class="add-new-btn">Add new</button>
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

  .add-new-btn {
    padding: 8px 15px;
    background-color: #B0C4DE;
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 20px;
    margin-top: 30px;
  }
  #pname {
    font-size: 30px;
    color: #607B8B;
    text-transform: capitalize;
    margin-left: 20px;
  }
  `]
})
export class NewProductComponent {
    batches = []
    quantityValue: number = 0
    showQuantityValue: boolean = false

    constructor(private inventoryService: InventoryService, private router: Router) {}

    showValue(event) {
        if(event.target.checked) {
            this.showQuantityValue = true
        } else if (!event.target.checked) {
            this.showQuantityValue = false
        }
    }

    checkBatches() {
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
        let quantityInput = <HTMLInputElement>document.getElementById("quantity")
        let batch = new Batch(quantityInput.value, this.quantityValue)
        this.batches.push(batch)
    }

    createNewProduct(name) {
        if(this.showQuantityValue) {
            this.checkQuantityBatch()
        }
        this.checkBatches()
        let newProduct = new Product(name, this.batches)
        newProduct = JSON.stringify(newProduct)
        this.addNewProduct(newProduct)
        this.batches = []
    }

    addNewProduct(product) {
        console.log(product)
        this.inventoryService.addNewProduct(product)
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

let Product = function(name, batches) {
    this.name = name,
    this.batches = batches
}

let Batch = function(name, value = 0) {
    this.name = name,
    this.value = value
}