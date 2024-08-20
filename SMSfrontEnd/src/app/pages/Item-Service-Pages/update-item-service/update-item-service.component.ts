import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ItemService } from 'src/app/models/item-service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-update-item-service',
  templateUrl: './update-item-service.component.html',
  styleUrls: ['./update-item-service.component.scss']
})
export class UpdateItemServiceComponent implements OnInit {
  id: number
  itemSrvices: ItemService = new ItemService();
  category: Category = new Category();
  categorys: Category[]; 
  constructor( private  categoryService: CategoryService, private itemServiceService: ItemServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemServiceDataById();
    this.getCategorysData();
  }

  onSubmit(){
this.getUpdateItemServiceDataById();

  }
  getItemServiceDataById(){ 
  this.id= this.activatedRoute.snapshot.params['id'];
  this.itemServiceService.getItemServiceById(this.id).subscribe(data => {
    this.itemSrvices = data;
    this.category =  this.itemSrvices.categoryId;
    this.getCategoryDataById();
    this.itemSrvices.categoryId = this.category.id;
    // this.itemSrvices.categoryId = this.category.categoryName;
  
    if ( this.itemSrvices.categoryId == this.category.id) {
      this.itemSrvices.categoryId = this.category.categoryName;
    } 

  }, error => error.log(error));
    }
    getUpdateItemServiceDataById(){

      this.itemServiceService.getUpdateItemService(this.itemSrvices).subscribe(data => {
        this.itemSrvices = data;}, error => error.log(error));
        // this.itemSrvices = new ItemService();
        this.navigatinLst();
          this.itemSrvices = new ItemService();
        }
  navigatinLst(){
    this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList

}
getCategorysData(){
  this.categoryService.getAllCategorys()
  .subscribe(res=> {
    this.categorys = res;
    // this.pagingConfig.totalItems = res.length;
  });
}

getCategoryDataById(){
  this.categoryService.getUpdateCategoryData(this.category).subscribe(data => {
    this.category = data;
  }, error => error.log(error));  
}
}
