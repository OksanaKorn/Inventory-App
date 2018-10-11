import { Routes } from '@angular/router';
import { ProductListComponent } from "src/app/product-list/product-list.component";
import { NewProductComponent } from "src/app/new-product/new-product.component";
import { ProductDetailComponent } from "src/app/product-detail/product-detail.component";

export const appRoutes:Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'create-product', component: NewProductComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
]