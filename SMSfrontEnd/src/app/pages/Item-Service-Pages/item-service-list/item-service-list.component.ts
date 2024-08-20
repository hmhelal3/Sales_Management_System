import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ItemService } from 'src/app/models/item-service';
import { PagingConfig } from 'src/app/models/pagingConfig';
import { CategoryService } from 'src/app/services/category.service';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-item-service-list',
  templateUrl: './item-service-list.component.html',
  styleUrls: ['./item-service-list.component.scss']
})
export class ItemServiceListComponent implements OnInit {
  searchTerm: string;
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  sortProperty: string = 'id';
  sortOrder = 1;
  tableSize: number[] = [5, 10, 15, 20];
  pagingConfig: PagingConfig = {} as PagingConfig;


  collectionSize: number = 1000;
  itemSrvices: ItemService[]; 
  category: Category = new Category();
  Today  = new Date();
    filterText: string = '';
  constructor( private  itemServiceService: ItemServiceService, private  categoryService: CategoryService, private router: Router,) { 
 
  }

  ngOnInit(): void {
    this.getItemServicesData();
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }
  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getItemServicesData();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getItemServicesData();
  }

  search(value: string): void {
  if(value == '') {
   this.getItemServicesData();
} else {  
  this.itemSrvices = this.itemSrvices.filter((val) => val.itemServiceName.toLowerCase().includes(value));
  this.collectionSize = this.itemSrvices.length;
}
  }
 


  public getItemServices(): void {
    this.itemServiceService.getItemServices().subscribe(
      (response: ItemService[]) => {
        this.itemSrvices = response;
        console.log(this.itemSrvices);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );
  }
  navigatinLst(){
    this.router.navigate(['/ItemServiceReg']);  // navigat to ItemServiceReg
}
private getItemServicesData1(){
this.itemServiceService.getItemServices().subscribe(res => 
  this.itemSrvices= res)
//  this.itemServiceService.getItemServices().subscribe(user => this.itemeSrvices = user);
 }
 getItemServicesData(){
  this.itemServiceService.getItemServices().subscribe(res=> {
    this.itemSrvices = res;
    // console.log(`Products:\n ${this.itemSrvices}`);
    // console.log(`size  : ${this.itemSrvices.length}`);
    for (let i=0; i< this.itemSrvices.length; i++){   
      this.category = this.itemSrvices[i].categoryId;
      this.categoryService.getUpdateCategoryData(this.category).subscribe(data => {
      this.category = data;}, ); 
      this.itemSrvices[i].categoryId = this.category.id;
      console.log(`category nameeee111111111  : ${this.itemSrvices[i].categoryId }`);
      if (this.itemSrvices[i].categoryId == this.category.id) {
        this.itemSrvices[i].categoryId = this.category.categoryName;
      } 
      
    }

    // for (let i=0; i< this.products.length; i++){
    //   if (this.products[i].live == 1) {
    //     this.products[i].live = "Y";
    //   } else {
    //     this.products[i].live = "N";
    //   }
    // }

    this.pagingConfig.totalItems = res.length;
  });
}

getCategoryDataById(){
  this.categoryService.getUpdateCategoryData(this.category).subscribe(data => {
    this.category = data;
    console.log(`category id  : ${this.category.id}`);
    console.log(`category nameeee  : ${this.category.categoryName}`);
  }, error => error.log(error));  
    }

 updateItemService(id: number){
 // this.router.navigate(['/Update-item-service/:id']);
 this.router.navigate(['Update-item-service', id]);

 }
 deleteItemService(id: number){
  if(confirm('Are you sure you want to delete this Item?')) {
    this.itemServiceService.getDeleteItemService(id).subscribe( data =>{
    console.log(data);
    this.getItemServicesData();
  })
}
  }
  // deleteUser(index: number) {
  //   if(confirm('Are you sure you want to delete this user?')) {
  //     this.users.splice(index, 1);
  //   }
  // }

  getItemServiceDetalsInfo(id: number){
    this.router.navigate(['item-service-details', id]);
      // this.getItemServicesData();
       }
       items: any[] = [];
       pageOfItems?: Array<any>;
       

       onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }


sortBy(property: string) {
  this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
  this.sortProperty = property;
  this.itemSrvices = [...this.itemSrvices.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
          result = -1;
      }
      if (a[property] > b[property]) {
          result = 1;
      }
      return result * this.sortOrder;
  })];
}


sortIcon(property: string) {
  if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
  }
  return '';
}
}


  
