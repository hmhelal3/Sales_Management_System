import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { PagingConfig } from 'src/app/models/pagingConfig';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
 

  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  public customers: Customer[]; 

  constructor(private  customerService: CustomerService, private router: Router,) { }
 
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:true,
    // pageLength: 5,
    language:{
      searchPlaceholder:'Customer Name'
    }

    };
    this.getCustomersData(); 

    
  }


  getCustomersData(){
    this.customerService.getCustomers()
    .subscribe(res=> {
      this.customers = res;
      this.dtTrigger.next(null);
    });
  }

 


 



  navigatinLst(){
    this.router.navigate(['/CustomerReg']);  // navigat to CustomerReg

}


 updateCustomerData(id: number){
 // this.router.navigate(['/Update-item-service/:id']);
 this.router.navigate(['Update-customer-info', id]);

 }
 deleteCustomerData(id: number){
    if(confirm('Are you sure you want to delete?')) {
  this.customerService.getDeleteCustomerData(id).subscribe( data =>{
    console.log(data);
    this.getCustomersData();
  })
}
  }

  getItemServiceDetalsInfo(id: number){
    this.router.navigate(['item-service-details', id]);

  
      this.getCustomersData();
    
   
    }
}
