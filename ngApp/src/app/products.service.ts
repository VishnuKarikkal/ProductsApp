import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //backend URLs
private _productsUrl='http://localhost:3000/product/products';
private _newProductUrl='http://localhost:3000/product/addNew';
private _deleteProductUrl='http://localhost:3000/product/deleteProduct';

  constructor(private http:HttpClient) { }
  //for getting products data
  getProducts()
  {
    return this.http.get(this._productsUrl);
  }
  //for adding products
  addProducts(item)
  {
    return this.http.post(this._newProductUrl,item)
  }
  //for deleting products
  deleteProduct(id)
  {
    return this.http.post(this._deleteProductUrl,{"id":id});
  }
  
}
