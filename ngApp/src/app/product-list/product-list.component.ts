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
results;
result=false;
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

//search by product name
  search()
  {
   let search_term = document.getElementById('search-input')['value'].trim();
   if(search_term)
   {
    const search_Results= this.products.filter((arr)=>
        {
            return arr.name == search_term;
        })
        if(search_Results.length > 0)
        {
          this.result = true;
          this.results = search_Results;
        }
        else
        {
          this.results=null;
          this.result=false;
        }
   }
  }
  //sort by name : ascending order
  sortProducts()
  {
    this.products.sort((a,b)=>
    {
      let aName = a.name;
      let bName = b.name;
      if(aName < bName) return -1;
      if(aName > bName) return 1;
      return 0;
    })
  }
}
