import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { ItemService } from 'src/app/models/item-service';
import { PagingConfig } from 'src/app/models/pagingConfig';
import { SalesInvoceDetail } from 'src/app/models/salesInvoceDetail';
import { SalesInvoice } from 'src/app/models/salesInvoice';
import { CustomerService } from 'src/app/services/customer.service';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SalesInvoiceService } from 'src/app/services/sales-invoice.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  dataSource: any = []; 
  tableSize: number[] = [5, 10, 15, 20];
  pagingConfig: PagingConfig = {} as PagingConfig;


  collectionSize: number = 1000;
  // itemSrvices: ItemService[]; 
  itemSrvices: ItemService = new ItemService();
  customer: Customer = new Customer();
  salesInvoice: SalesInvoice = new SalesInvoice();
  // List<SalesInvoice> salesInvoceDetailList = new List<>();
  salesInvoceDetailList: Array<SalesInvoceDetail> = [];
  /////////////////

  manageOrderForm:  FormGroup;
  categorys: any = [];
  // itemSrvices: any = [];

  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  itemSrvices1: ItemService[]; 
  customer1: Customer[]; 
  public code: string;
  public tinNo: string;
  public uom: string;

   public category: string;
  public purchasedPrice: number = 0;
  public tax: string;
  public sellingUnitPrice: number = 0;
  public quantity: number= 0;
 public totalPrice: number = 0;
 public itemServiceName: string;
 public  description: string; 
  /////////////////////
  listData: ItemService[]; 


  constructor(    
    private formBulider: FormBuilder,
    // private categoryService: CategoryService,
    private itemServiceService: ItemServiceService,
    private customerService: CustomerService,
    private salesInvoiceService: SalesInvoiceService,
    // private snackbarService: SnackbarService, 
    // private dialog: MatDialog,   
    
    private router: Router
    
    
    ) {
      this.manageOrderForm = this.formBulider.group({
        // customerName: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        itemServiceName:  ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        code: ['', [Validators.required]],
        // contactNumber: ['', [Validators.required]],
        tinNo: ['', [Validators.required]],
        // paymentMethod: ['', [Validators.required]],
        category: ['', [Validators.required]],
        uom: ['', [Validators.required]],
        purchasedPrice: [0, [Validators.required]],
        sellingUnitPrice: [0, [Validators.required]],
        tax: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        totalPrice: ['', [Validators.required]],
        // this.itemServiceName =   this.itemSrvices.itemServiceName, 
      });
      
     }

  ngOnInit(): void {
   
   this.getItemServicesList();
    // this.getProductDetails();
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems    
    }
    this.listData = [];
    
   
  }



  public getItemServicesList(): void {
    this.itemServiceService.getItemServices().subscribe(res => 
    this.itemSrvices1= res)
   
    this.customerService.getCustomers().subscribe(response => 
      this.customer1= response)
  }




  selectedTeam: any;
  public getItemServices(value:any): void {
    this.selectedTeam = value;
    console.log(this.selectedTeam);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    this.itemServiceService.getItemServiceById(this.selectedTeam).subscribe((response: any) => {
    this.itemSrvices1 = response;             
      
        this.code = response.code;
        this.category = response.category;
        this.uom = response.uom;
        this.purchasedPrice = response.purchasedPrice;
        this.sellingUnitPrice = response.sellingUnitPrice;
        this.quantity = response.quantity;
        this.tax = response.tax;
        this.itemSrvices.itemServiceName = response.itemServiceName;
        this.manageOrderForm.controls['itemServiceName'].setValue(response.itemServiceName);
        this.manageOrderForm.controls['code'].setValue(response.code);
        this.manageOrderForm.controls['uom'].setValue(response.uom);
        this.manageOrderForm.controls['category'].setValue(response.category);
        this.manageOrderForm.controls['purchasedPrice'].setValue(response.purchasedPrice);
        this.manageOrderForm.controls['sellingUnitPrice'].setValue(response.sellingUnitPrice);
        this.manageOrderForm.controls['quantity'].setValue(response.quantity);
        this.manageOrderForm.controls['tax'].setValue(response.tax);
        this.manageOrderForm.controls['totalPrice'].setValue(response.quantity * response.sellingUnitPrice);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(this.totalPrice);
        console.log(this.tax);
        this.itemServiceName = this.itemSrvices.itemServiceName, 
        // console.log(this.itemSrvices.categoryName);
        console.log(this.itemSrvices.itemServiceName); 
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(this.itemServiceName);
        console.log(this.description);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );  
  }






 addDataToTable(): void {
  var fromData = this.manageOrderForm.value;
  console.log(this.listData);
  
// this.listData.push(this.manageOrderForm.value);
// this.listData = [...this.listData];
// this.manageOrderForm.reset();

this.totalPrice = this.totalPrice + fromData.totalPrice;
this.dataSource.push(fromData.itemServiceName , fromData.code, fromData.category, fromData.uom, fromData.purchasedPrice, fromData.sellingUnitPrice, fromData.tax, fromData.quantity, fromData.totalPrice );
// this.dataSource.push({id:fromData.product.id , name:fromData.product.name , category:fromData.category.name, quantity:fromData.quantity, price:fromData.price,total:fromData.total});
this.dataSource = [...this.dataSource];

 }


 onClick(value1: any) { 
  this.dataSource.push(value1.value)    
  
   }
 
   rows: Array<{ itemServiceName: string, code: string, category: string, uom: string, 
    purchasedPrice: number,  sellingUnitPrice: number, tax: string,
    quantity: number, totalPrice: Number,   }> = [];
 
       addDataToTable1(): void {
        var fromData = this.manageOrderForm.value;
        console.log("KKKKKKKKKKKKKKKKKKK");
        console.log(fromData);
  
        this.rows.push( {
          itemServiceName: fromData.itemServiceName, 
         code:fromData.code, 
         category: fromData.category,
           uom: fromData.uom,
           purchasedPrice: fromData.purchasedPrice,
           sellingUnitPrice: fromData.sellingUnitPrice,
           tax: fromData.tax,

           quantity: fromData.quantity,
           totalPrice: fromData.totalPrice,
         
        }
       
        )
        console.log(" demis QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
        console.log(this.rows);
        console.log(this.itemServiceName); 
          console.log("demis QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");

          console.log(this.itemServiceName);  
          console.log(this.code);  
          
          console.log(this.uom);  
          console.log(this.category);  
          
          console.log(this.purchasedPrice);  
          console.log(this.tax);  
          console.log(this.sellingUnitPrice);  
          console.log(this.quantity); 
          console.log(this.totalPrice); 
        
          console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTT");
        //if you want to clear input
        this.itemSrvices = new ItemService();
        this.itemServiceName== null;
      
      }  
  selectedCustomer: any;
public getCustomers(value:any): void {
    this.selectedCustomer = value;
    console.log(this.selectedCustomer);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
   
          this.customerService.getCustomerDataById(this.selectedCustomer).subscribe((response: any) => {
          this.customer1 = response;             
        console.log(this.customer1);  
        // this.salesInvoice.tinNo = response.tinNo; 
        this.tinNo = response.tinNo;     
        this.manageOrderForm.controls['tinNo'].setValue(response.tinNo);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.log(this.tinNo);
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      } 
    );  
  }



  searchTerm: string;
  search(value: string): void {
   
    this.itemSrvices1 = this.itemSrvices1.filter((val) => val.itemServiceName.toLowerCase().includes(value));
    this.collectionSize = this.itemSrvices1.length;
 
    }
  getProductDetails1() {
    this.itemServiceService.getItemServices().subscribe((response: any) => {
      this.itemSrvices1 = response;
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      console.log(this.itemSrvices1);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      // this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


  getProductDetails() {
    //console.log("inside getProductDetails");
    // this.itemServiceService.getItemServiceById(value.id).subscribe((response: any) => {
      this.itemServiceService.getItemServices().subscribe((response: any) => {
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXjjjjjjjjjjjjjjjjjjXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      console.log(this.itemServiceService);
      this.code = response.code;
      this.uom = response.uom;
      this.category = response.category;
      this.purchasedPrice = response.purchasedPrice;
      this.sellingUnitPrice = response.sellingUnitPrice;
      this.quantity = response.quantity;
    
      this.manageOrderForm.controls['code'].setValue(response.code);
      this.manageOrderForm.controls['uom'].setValue(response.uom);
      this.manageOrderForm.controls['category'].setValue(response.category);
      this.manageOrderForm.controls['purchasedPrice'].setValue(response.purchasedPrice);
      this.manageOrderForm.controls['sellingUnitPrice'].setValue(response.sellingUnitPrice);
      this.manageOrderForm.controls['quantity'].setValue(response.quantity);
    
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      console.log(this.uom);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZZZXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      // this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    // this.getItemServicesData();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    // this.getItemServicesData();
  }

  saveItemServiceData(){
    // this.itemServiceService.addItemService(this.itemSrvices1).subscribe(date => {
    //   console.log(date);   
    //   this.registerSucess=true;
    //   this.itemSrvices1 = new ItemService();
    //   this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList
    
    // } ,
    // (error: HttpErrorResponse) => {
    //   alert(error.message);
    // } 
    // );
    }
    navigatinLst(){
      this.router.navigate(['/slesInvoiceList']);  // navigat to salesInvoiceList
  
  }
  

  tableData: ItemService[] = [];

  newRow: ItemService = { id: 0, itemServiceName: '', code: '', uom: '', categoryId: '', description: '', quantity: 0, tax: 0.0, purchasedPrice: 0, sellingUnitPrice: 0 };

  addRow(): void {
    // Generate a unique ID for the new row
    this.newRow.id = Date.now();
    // this.newRow.itemServiceName  =  this.itemServiceName;
    // this.newRow.code  =  this.code;
    // this.newRow.uom  =  this.uom;
    // this.newRow.categoryId  =  this.category;
    // this.newRow.description  =  this.description;
    // this.newRow.tax  =  this.tax;
    // this.newRow.purchasedPrice  =  this.purchasedPrice;
    // this.newRow.sellingUnitPrice  =  this.sellingUnitPrice;
    // Push the new row to the tableData array
    this.tableData.push(this.newRow);

    // Reset the newRow object for the next insertion
    this.newRow = {  id: 0, itemServiceName: '', code: '', uom: '', categoryId: '', description: '', quantity: 0, tax: 0.0, purchasedPrice: 0, sellingUnitPrice: 0  };
  }
  itemSrvices2: ItemService[];
  itemServiceObj: ItemService = new ItemService();
  onSearch(): void {
    this.itemServiceService.searchByName(this.newRow.itemServiceName)
      .subscribe(data => {
        this.itemSrvices2 = data;
        console.log(`searchData  : ${this.itemSrvices2 }`);
        console.log(`  this.itemServiceObj 222222222222222222222   : ${this.newRow.itemServiceName}`);
        this.itemServiceService.getItemServiceDataByItemServiceName(this.newRow.itemServiceName).subscribe(data => {
          this.itemServiceObj = data;
          console.log(`  this.itemServiceObj XXXXXXXXXXXXXXXXXXXXXXXXXXXX  `);
          console.log(`   itemServiceName XXXXXXXXXXXXXXXXXXXXXXXXXXXX   : ${this.itemServiceObj.itemServiceName }`);
          this.newRow.code = this.itemServiceObj.code 
          this.newRow.categoryId = this.itemServiceObj.categoryId 
        }, error => error.log(error));

      });
  }




}
