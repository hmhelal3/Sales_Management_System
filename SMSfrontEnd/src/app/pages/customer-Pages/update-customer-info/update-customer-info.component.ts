import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer-info',
  templateUrl: './update-customer-info.component.html',
  styleUrls: ['./update-customer-info.component.scss']
})
export class UpdateCustomerInfoComponent implements OnInit {
  id: number
  customers: Customer = new Customer();
  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) { }

 
  ngOnInit(): void {
    this.getCustomerDataById();
  }

  onSubmit(){
this.getUpdateCustomerDataById();

  }
  getCustomerDataById(){ 
  this.id= this.activatedRoute.snapshot.params['id'];
  this.customerService.getCustomerDataById(this.id).subscribe(data => {
    this.customers = data;}, error => error.log(error));
    }
    getUpdateCustomerDataById(){

      this.customerService.getUpdateCustomerData(this.customers).subscribe(data => {
        this.customers = data;}, error => error.log(error));
        // this.itemSrvices = new ItemService();
        this.navigatinLst();
          this.customers = new Customer();
        }
  navigatinLst(){
    this.router.navigate(['/CustomerList']);  // navigat to ItemServiceList

}
}   