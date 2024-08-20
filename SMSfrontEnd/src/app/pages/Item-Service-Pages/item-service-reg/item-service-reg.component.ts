import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { ItemService } from 'src/app/models/item-service';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-item-service-reg',
  templateUrl: './item-service-reg.component.html',
  styleUrls: ['./item-service-reg.component.scss']
})
export class ItemServiceRegComponent implements OnInit {
  public itemSrvices: ItemService[]; 
  categorys: Category[]; 
  
  itemSrvices1: ItemService = new ItemService();
  registerSucess:boolean = false;
 

 
  submitted = false;
  constructor(private  itemServiceService: ItemServiceService, private  categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) {
      }

  ngOnInit(): void {
    this.getCategorysData(); 
  }


  getCategorysData(){
    this.categoryService.getAllCategorys()
    .subscribe(res=> {
      this.categorys = res;
      // this.pagingConfig.totalItems = res.length;
    });
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
private getItemServicesData(){
this.itemServiceService.getItemServices().subscribe(Date => 
  this.itemSrvices= Date)

  
//  this.itemServiceService.getItemServices().subscribe(user => this.itemeSrvices = user);
  

}
saveItemServiceData(){
   if(confirm('Are you sure you want to Save?')) {
  this.itemServiceService.addItemService(this.itemSrvices1).subscribe(date => {
    console.log(date);   
    this.registerSucess=true;
    this.itemSrvices1 = new ItemService();
    
    this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList
    // this.gotoItemServiceList;
  
  } ,
  (error: HttpErrorResponse) => {
    alert(error.message);
  } 
  );
}
  }

  navigatinLst(){
    this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList

}
  gotoItemServiceList(){
  this.router.navigate(['/ItemServiceList']);
  
  }

  public onAddItemService(addForm: NgForm): void {
    console.log(addForm.value); 
  
    if (addForm.invalid) {
      return;
  }
    this.itemServiceService.addItemService(addForm.value).subscribe((user:any)=>{
      this.gotoItemServiceList;
      console.log("Success register");
      this.gotoItemServiceList;
      this.registerSucess=true;
      addForm.reset();
      // swal("Hello world!"); 
    });
  

  }



  
  // ngOnInit(): void {

  //   this.itemServices= [
  //     {
  //       "itemServiceName": "Abay",
  //       "code": "cc1",
  //       "uom": " pc",
  //       "category": "category 1",
  //       "description": "descriptionaa",
  //       "purchasedPrice": 1500,
  //       "tax": " tax 1",
  //       "sellingUnitPrice": 2000,
  //       "quantity": 10
  //   },
  //   {
       
  //       "itemServiceName": "Computer",
  //       "code": "pc1",
  //       "uom": "uom 1",
  //       "category": "Category 1",
  //       "description": "pce des",
  //       "purchasedPrice": 1500.0,
  //       "tax": "tax 2",
  //       "sellingUnitPrice": 2000.0,
  //       "quantity": 10
  //   }


  //   ]
  //   // this.getItemService;
  // }

}
