import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productsService:ProductsService) { }
title:string="Product List";
products=<any>[];
available = false;
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data)=>
                                                  {
                                                    let msg=JSON.parse(JSON.stringify(data['msg']))
                                                    if(msg == "success")
                                                    {
                                                      this.available=true;
                                                      this.products=JSON.parse(JSON.stringify(data['products']));
                                                    }
                                                    else
                                                    {
                                                      this.available = false;
                                                    }
                                                  });
  }

}
