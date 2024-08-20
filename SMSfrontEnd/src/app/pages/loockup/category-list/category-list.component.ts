import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { PagingConfig } from 'src/app/models/pagingConfig';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

 

 
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  collectionSize: number = 1000;
  categorys: Category[]; 
 
  constructor( private  categoryService: CategoryService, private router: Router,) { 
 
  }

  ngOnInit(): void {
    this.getCategorysData();
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:true,
    // pageLength: 5,
    language:{
      searchPlaceholder:'Text category'
    }

    };
   
  }

  

  search(value: string): void {
  if(value == '') {
   this.getCategorysData(); 
} else {  
  this.categorys = this.categorys.filter((val) => val.categoryName.toLowerCase().includes(value));
  this.collectionSize = this.categorys.length;
}
  }
 


  public getCategors(): void {
    this.categoryService.getAllCategorys().subscribe(
      (response: Category[]) => {
        this.categorys = response;
        console.log(this.categorys);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }
  navigatinLst(){
    this.router.navigate(['/category']);  // navigat to ItemServiceReg
}
// private getItemServicesData1(){
// this.itemServiceService.getItemServices().subscribe(res => 
//   this.itemSrvices= res)
// //  this.itemServiceService.getItemServices().subscribe(user => this.itemeSrvices = user);
//  }
 getCategorysData(){
  this.categoryService.getAllCategorys()
  .subscribe(res=> {
    this.categorys = res;
    this.dtTrigger.next(null);
  });
}
 updateCategory(id: number){
 // this.router.navigate(['/Update-item-service/:id']);
 this.router.navigate(['Update-item-service', id]);

 }
 deleteCategory(id: number){
  if(confirm('Are you sure you want to delete this Item?')) {
    this.categoryService.getDeleteCategoryData(id).subscribe( data =>{
    console.log(data);
    this.getCategorysData();
  })
}
  }
 



}
