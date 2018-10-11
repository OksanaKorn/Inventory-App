import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { InventoryService } from 'src/app/shared/inventory.service';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { NewProductComponent } from 'src/app/new-product/new-product.component';
import { ProductDetailComponent } from 'src/app/product-detail/product-detail.component';
import { appRoutes } from 'src/app/routes';
import { ProductsService } from 'src/app/shared/products.service';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NewProductComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [InventoryService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
