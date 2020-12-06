import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  title:string="Choose Preffered Edit Action";
  products=<any>[];
  available=true;
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data)=>
                                                  {
                                                    if(data['msg'] == 'success')
                                                    {
                                                      this.available= true;
                                                      this.products=JSON.parse(JSON.stringify(data['products']));
                                                    }
                                                    else
                                                    {
                                                      this.available = false;
                                                    }
                                                  },
                                                  (err)=>{
                                                    if(err instanceof HttpErrorResponse)
                                                    {
                                                      if(err.status==401)
                                                      {
                                                        this.router.navigate(['/login']);
                                                      }
                                                    }
                                                    console.log(err);
                                                          }
                                                                                  );
  
                    }

  deleteProduct(id)
  {
    const userInput = confirm("Are You Sure ?!!")
    if(userInput)
    {
      this.productsService.deleteProduct(id).subscribe((status)=>
    {
           if(status['msg'] == "Product Removed")  
           {
            alert("Product Deleted!");
            this.router.navigate(['/']);
           }
           else
           {
            alert(status['msg']);
           }
    });
    }
    else
    {
      console.log("Canceled!")
    }
  }

}
