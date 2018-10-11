import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
        <ul>
            <li><h1 class="logo">| Inventory App |</h1></li>
            <li><a class="active" [routerLink]="['/products']">Products List</a></li>
        </ul>
    </nav>
    <div class="wrapper">
    <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
  .wrapper {
        padding-left: 100px;
        margin-top: 50px;
        font-size: 20px;
        font-family: 'Noto Sans', sans-serif;
    }

    .logo {
        margin-right: 40px;
        margin-left: 40px;
        color: #FFFFFF;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    li {
        float: left;
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 22px 16px;
        text-decoration: none;
        font-size: 20px;
    }

    li a:hover {
        background-color: #111;
    }
  `]
})
export class AppComponent {
}
