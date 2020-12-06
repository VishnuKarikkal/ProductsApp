import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {ProductModel} from '../product-list/productmodel';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

title="Add New Product";
  constructor(private _productsService:ProductsService,private router:Router,private formBuilder:FormBuilder) { }
  productItem=new ProductModel(null,null,null);
  newProductForm= this.formBuilder.group
  ({
    p_image:['',Validators.required],
    p_name:['',Validators.required],
    p_description:['',Validators.required],
  })
  ngOnInit(): void {
  }
addProduct()
{
  let inputField=document.getElementById('p_image');
  let file=inputField['files']; //getting the file selected
  
  //appending all form data to the FormData object for handling over to the backend
  let formData = new FormData();
  formData.append('p_image',file[0]);
  formData.append('p_description',this.productItem.description);
  formData.append('p_name',this.productItem.name);
  //connecting to backend
  this._productsService.addProducts(formData)
  .subscribe((res)=>
                       {
                          if(res['msg'] == 'saved')
                          {
                              alert("product uploaded!!!");
                              this.router.navigate(['/']);
                          }
                          else
                          {
                            alert(res['msg']);
                          }
                        })
}

//preview selected image
showFiles()
{
    let inputField=document.getElementById('p_image');
    let file=inputField['files'];
    let fileReader=new FileReader;
    fileReader.onload=function(event)
                        {
                            let imageURL=fileReader.result;
                            document.getElementById('preview').setAttribute("src",`${imageURL}`);
                        }
    fileReader.readAsDataURL(file[0]);
}
}
