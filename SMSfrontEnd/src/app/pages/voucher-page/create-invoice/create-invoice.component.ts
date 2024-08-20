import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/models/item-service';
import { SalesInvoice } from 'src/app/models/salesInvoice';
import { CustomerService } from 'src/app/services/customer.service';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SalesInvoiceService } from 'src/app/services/sales-invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  
  constructor(  
    private builder: FormBuilder, 
    // private service: MasterService, 
    private itemServiceService: ItemServiceService,
    private customerService: CustomerService,
    private salesInvoiceService: SalesInvoiceService,
    private router: Router,
    private alert: ToastrService,
    private activeroute: ActivatedRoute
    ) { }
  pagetitle = "Salse Invoice"
  invoicedetail !: FormArray<any>;
  invoiceproduct !: FormGroup<any>;
 
  mastercustomer: any;
  masterproduct: any;
  editinvoiceno: any;
 
  isedit = false;
  editinvdetail: any;
  salesInvoiceId: number;
  updatedSalesInvoiceData: any;
  invoiceNumber: string;
  stringValue: string;
  ngOnInit(): void {

    this.GetCustomers();
    this.GetProducts();   
    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoicenNo');
    console.log(`   editinvoiceno  XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX   : ${this.editinvoiceno }`);
    if (this.editinvoiceno != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
      this.setEditInfo(this.editinvoiceno);
    }else{
      this.generateInvoceNo();
    }
    
   
  }

  generateInvoceNo() {
      this.salesInvoiceService.generatInvoiceNo().subscribe(
      (value: any) => {
        this.invoiceNumber = value.invoiceNo;
        if ( this.invoiceNumber  != null) {
          this.invoiceform.get("invoiceNo")?.setValue( this.invoiceNumber);
        }else{
          this.invoiceNumber = 'INV-000001';
        }
         
        
      },
      (error) => {
        console.error("Error fetching invoice number:", error);
    }
    );
  }



  invoiceform = this.builder.group({
    invoiceNo: this.builder.control({ value: 'INV-000001', disabled: true }),
    customerId: this.builder.control('', Validators.required),
    // customerName: this.builder.control(''),
    tinNo: this.builder.control(''),
    paymentType: this.builder.control(''),
    // remarks: this.builder.control(''),
    totalPrice: this.builder.control({ value: 0, disabled: true }),
    totalTax: this.builder.control({ value: 0, disabled: true }),
    netTotalPrice: this.builder.control({ value: 0, disabled: true }),
    listOfsalesInvoceDetail: this.builder.array([])

   

  });
   editdata: any;
  setEditInfo(invoiceNo: any) { 
    // this.salesInvoiceService.getSalesInvoiceByInvoiceNo(invoiceno).subscribe(res => {
      this.salesInvoiceService.getAllSalesInvoiceDetaileDataByInvoiceNo(invoiceNo).subscribe(res => {
      this.editinvdetail = res;
      for (let i = 0; i < this.editinvdetail.length; i++) {
        this.addnewproduct();
      };
    });
    this.salesInvoiceService.getSalesInvoiceByInvoiceNo(invoiceNo).subscribe(res => {
      // let editdata: any;
      this.editdata = res;
      if (this.editdata != null) {
        this.invoiceform.patchValue({
           invoiceNo: this.editdata.invoiceNo, customerId: this.editdata.customerId.id,
         tinNo: this.editdata.customerId.tinNo, paymentType: this.editdata.paymentType,
          totalPrice: this.editdata.totalPrice, totalTax: this.editdata.totalTax, netTotalPrice: this.editdata.netTotalPrice, listOfsalesInvoceDetail: this.editinvdetail
        })   
      }   
    });  
  }


  addnewproduct() {
    this.invoicedetail = this.invoiceform.get("listOfsalesInvoceDetail") as FormArray;   
    let customercode = this.invoiceform.get("customerId")?.value;
    if ((customercode != null && customercode != '')  || this.isedit) {
      console.log(`   add new product  XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX   :`);
      this.invoicedetail.push(this.Generaterow());
      console.log(`   add new product  XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX 2222222222  :`);
    } else {
      // if(confirm('Please select the customer')) 
      // alert('Please select the customer');
      this.alert.warning('Please select the customer', 'Validation');
    }
  }  

  SaveInvoice() {
    if (this.invoiceform.valid) {
      if(confirm('Are you sure you want to Save?')) {
      // details: this.builder.array([])
         
   
        // if (result.result == 'pass') {
          if(this.isedit){
            this.getUpdateSalesInvoiceDataById();
            this.alert.success('Updated Successfully.' );
          }else{
            this.getSaveSalesInvoiceData();
            this.alert.success('Created Successfully.');
          }
          this.router.navigate(['/salesInvoiceList']);  // navigat to salesInvoiceList
        // } else {
        //   if(confirm('Failed to save')) {          }
        //   // this.alert.error('Failed to save.', 'Invoice');
        // }
   
      }
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
     }

  }

  getSaveSalesInvoiceData(){

    this.salesInvoiceService.addSalesInvoice(this.invoiceform.getRawValue()).subscribe(res => {
      let result: any;
      result= res;
      console.log('Data inserted successfully', result);
    }, 
      );

    // const formData = this.invoiceform.value;
    // console.log('formData data', this.invoiceform.getRawValue());
    // this.salesInvoiceService.insertData(this.invoiceform.getRawValue()).subscribe(response => 
    //   {
    //     let result: any;
    //     result= response;
    //     console.log('Data inserted successfully', result);
    //   },
     
    // );


      this.navigatinLst();
      }

      salesInvoiceHeader: SalesInvoice = new SalesInvoice();
       salesInvoiceData: any;
  getUpdateSalesInvoiceDataById(){
    console.log(`  this.editinvoiceno XXXXXX : ${this.editinvoiceno }`);
    // this.salesInvoiceService.getInvoiceByNumber(this.editinvoiceno).subscribe(
      // this.salesInvoiceService.getSalesInvoiceByInvoiceNo(this.editinvoiceno).subscribe(
      
      // res => {
      //   this.salesInvoiceData= res; 
      //   console.log(this.salesInvoiceData)
        this.salesInvoiceId = this.editdata.id;
        console.log(`  this.salesInvoiceId XXXXXX : ${this.editdata.id}`);
        console.log('formData data', this.invoiceform.getRawValue());
        this.salesInvoiceHeader.id = this.editdata.id;
        this.salesInvoiceHeader.invoiceNo = this.invoiceform.get("invoiceNo")?.value;
        this.salesInvoiceHeader.paymentType = this.invoiceform.get("paymentType")?.value;
        this.salesInvoiceHeader.customerId = this.invoiceform.get("customerId")?.value;
        this.salesInvoiceHeader.totalPrice = this.invoiceform.get("totalPrice")?.value;
        this.salesInvoiceHeader.totalTax = this.invoiceform.get("totalTax")?.value;
        this.salesInvoiceHeader.netTotalPrice = this.invoiceform.get("netTotalPrice")?.value;
        this.salesInvoiceHeader.listOfsalesInvoceDetail = this.invoiceform.get("listOfsalesInvoceDetail")?.value;
        console.log(`  this.salesInvoiceId XXXXXX check: `);
        console.log( this.salesInvoiceHeader.listOfsalesInvoceDetail);
        console.log(`  this.salesInvoiceId XXXXXX check :`);
        // this.salesInvoiceService.getUpdateSalesInvoicerData(this.invoiceform.getRawValue  ).subscribe(data => {
        // this.salesInvoiceService.updateSalesInvoicerData1(this.salesInvoiceId  , this.invoiceform.getRawValue ).subscribe(data => {
          // this.salesInvoiceService.updateSalesInvoicerData12(  this.invoiceform.getRawValue()  ).subscribe(data => {
            // this.salesInvoiceService.getUpdateInvoicData3( this.invoiceform.getRawValue ).subscribe(data => {
              this.salesInvoiceService.getUpdateInvoceData( this.invoiceform.getRawValue() ).subscribe(data => {
              
          this.salesInvoiceData = data;
          console.log('Item updated:',  this.salesInvoiceData);
        }, 
        );  
  
      // },

    // );
      this.navigatinLst();
      }



     
navigatinLst(){
  this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList
}




  get invproducts() {
    return this.invoiceform.get("listOfsalesInvoceDetail") as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      // invoiceNo: this.builder.control(''),
      // invoiceNo: this.builder.control('', Validators.required),
      itemServiceName: this.builder.control('', Validators.required),
      itemServiceId: this.builder.control(null),
      code: this.builder.control(''),
      // itemServiceName: this.builder.control(''),
      uom: this.builder.control(''),
      quantity: this.builder.control(1),
      tax:  this.builder.control({ value: 0.0, disabled: true }),
      sellingUnitPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true }),
      taxTotal:  this.builder.control({ value: 0, disabled: true })
    });
  }


 

  productchange(index: any) {
    this.invoicedetail = this.invoiceform.get("listOfsalesInvoceDetail") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    // let itemServiceId = this.invoiceproduct.get("itemServiceId")?.value; 
    let itemServiceId = this.invoiceproduct.get("itemServiceName")?.value; 
    console.log(`   itemServiceName  XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX   : ${itemServiceId }`);
    this.itemServiceService.getItemServiceDataByItemServiceName(itemServiceId).subscribe(res => { 
    // this.itemServiceService.getItemServiceById(itemServiceId.id).subscribe(res => { 
    // this.itemServiceService.getItemServiceByCode(itemServiceId).subscribe(res => { 
      let proddata: any;
      proddata = res;  
      console.log(`   proddata code XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX   : ${proddata.code }`);
      if (proddata != null) {
        this.invoiceproduct.get("itemServiceId")?.setValue(proddata);
        this.invoiceproduct.get("code")?.setValue(proddata.code);
        this.invoiceproduct.get("uom")?.setValue(proddata.uom);
        this.invoiceproduct.get("tax")?.setValue(proddata.tax);
        this.invoiceproduct.get("sellingUnitPrice")?.setValue(proddata.sellingUnitPrice);
        this.Itemcalculation(index);

      }
    });
  }

  Itemcalculation(index: any) {
    this.invoicedetail = this.invoiceform.get("listOfsalesInvoceDetail") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let quantity = this.invoiceproduct.get("quantity")?.value;
    let tax = this.invoiceproduct.get("tax")?.value;
    let price = this.invoiceproduct.get("sellingUnitPrice")?.value;
    let total = quantity * price;
    let taxTotal = tax * quantity * price;
    this.invoiceproduct.get("taxTotal")?.setValue(taxTotal);
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  Removeproduct(index: any){
    if(confirm('Do you want to remove?')){
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.invoiceform.getRawValue().listOfsalesInvoceDetail;
    let sumtotal = 0
    let sumtaxtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
      sumtaxtotal = sumtaxtotal + x.taxTotal;
    });    
  

    // tax calculation
    console.log(`   tax am XXXXXXXXXXXXXXXXXXXXXXXXXXXX   : ${sumtaxtotal }`);
    let sumtax = sumtaxtotal * sumtotal;
    let nettotal = sumtotal + sumtaxtotal;

    this.invoiceform.get("totalPrice")?.setValue(sumtotal);
    this.invoiceform.get("totalTax")?.setValue(sumtaxtotal);
    this.invoiceform.get("netTotalPrice")?.setValue(nettotal);
  }

/////////////////////////////////

GetCustomers() {
  this.customerService.getCustomers().subscribe(res => {
    this.mastercustomer = res;
  })
}
itemServiceObj: ItemService = new ItemService();
// GetProducts1() {
//   this.itemServiceService.getProducs().subscribe(res => {
//     this.itemService = res;
//   })
// }
GetProducts() {
  this.itemServiceService.getItemServices().subscribe(res => {
    this.masterproduct = res;
  })
}

customerId : any;
// customer: Customer = new Customer();
customerchange() {
   this.customerId = this.invoiceform.get("customerId")?.value;
    this.customerService.getCustomerDataById(this.customerId).subscribe(res => {
    let custdata: any;
    custdata = res;
    if (custdata != null) {
      this.invoiceform.get("tinNo")?.setValue(custdata.tinNo);
    }
  });
}


}
