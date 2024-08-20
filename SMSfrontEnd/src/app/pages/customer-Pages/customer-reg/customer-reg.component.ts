import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

// import { swal } from 'node_modules/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-customer-reg',
  templateUrl: './customer-reg.component.html',
  styleUrls: ['./customer-reg.component.scss']
})
export class CustomerRegComponent implements OnInit {

  
  public customers: Customer[]; 
  registerSucess:boolean = false;
  // model = new Customer();
  // public employees: Customer[];  
  
 
  // public editCustomers: Customer;
  // public deleteCustomers: Customer;


  submitted = false;
 
 

 
  constructor( 
    
    private customerService: 
    CustomerService, private router: Router,
    private alert: ToastrService,
     private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
   
    this.getCustomers(); 
  }
  public getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response: Customer[]) => {
        this.customers = response;
        console.log(this.customers);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxx ccccccccccccccccc ssssssssssssssssssss");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddCustomer1(addForm: NgForm): void {
    console.log(addForm.value); 
    if (addForm.valid) {
      if(confirm('Are you sure you want to Save?')) {
        this.customerService.addCustomer(addForm.value).subscribe((user:any)=>{
          console.log("Success register");
          this.registerSucess=true;
          if( this.registerSucess){  
            this.alert.success('Created Successfully.');
          }    
          addForm.reset();
          this.navigatinLst(); 
          // swal("Hello world!"); 
        });

      }

    } else {
      this.alert.warning('Please enter values in all mandatory filed');
     }

  }
  public onAddCustomer(addForm: NgForm): void {
 
    // document.getElementById('add-employee-form').click(); 
    console.log(addForm.value); 
    //   this.employeeService.addEmployee(addForm.value).subscribe(
    //   (response: Employee) => {
    //     console.log(response);
    //     this.getEmployees();
    //     addForm.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     addForm.reset();
    //   }
    // );

    if(confirm('Are you sure you want to Save?')) {
    if (addForm.invalid) {
      return;
  }
    this.customerService.addCustomer(addForm.value).subscribe((user:any)=>{
      console.log("Success register");
      this.registerSucess=true;
      if( this.registerSucess){  
        this.alert.success('Created Successfully.');
      }    
      addForm.reset();
      this.navigatinLst(); 
      // swal("Hello world!"); 
    });
  }

  }

  navigatinLst(){
    this.router.navigate(['/CustomerList']);  // navigat to customerList

}
  // public onUpdateCustomer(customer: Customer): void {
  //   this.customerService.updateCustomer(customer).subscribe(
  //     (response: Customer) => {
  //       console.log(response);
  //       this.getCustomers();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public onDeleteCustomer(customerId: number): void {
  //   this.customerService.deleteCustomer(customerId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getCustomers();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public searchCustomers(key: string): void {
  //   console.log(key);
  //   const results: Customer[] = [];
  //   for (const customer of this.customers) {
  //     if (customer.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || customer.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || customer.custAddress.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || customer.custContact.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || customer.branchid
  //     || customer.remarks.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(customer);
  //     }
  //   }
  //   this.customers = results;
  //   if (results.length === 0 || !key) {
  //     this.getCustomers();
  //   }
  // }

  // public onOpenModal(customer: Customer, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'add') {
  //     button.setAttribute('data-target', '#addEmployeeModal');
  //   }
  //   if (mode === 'edit') {
  //     this.editCustomers = customer;
  //     button.setAttribute('data-target', '#updateEmployeeModal');
  //   }
  //   if (mode === 'delete') {
  //     this.deleteCustomers = customer;
  //     button.setAttribute('data-target', '#deleteEmployeeModal');
  //   }
  //   container.appendChild(button);
  //   button.click();
  // }


}
