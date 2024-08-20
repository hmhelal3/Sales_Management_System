import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SalesInvoiceService } from 'src/app/services/sales-invoice.service';

@Component({
  selector: 'app-homee',
  templateUrl: './homee.component.html',
  styleUrls: ['./homee.component.scss']
})
export class HomeeComponent implements OnInit{
  constructor(  
    // private builder: FormBuilder, 
    // private translateService:TranslateService,
    // private router: Router,
    // private alert: ToastrService,
    private  customerService: CustomerService,
    private  itemServiceService: ItemServiceService,
    private  salesInvoiceService: SalesInvoiceService
    
    // private activeroute: ActivatedRoute
    ) { }
    ngOnInit(): void {
      this.getTotalNoOfCustomers();
      this.getTotalNoItems();
      this.getTotalCashSellingPrice();
      this.getTotalCreditSellingPrice();
    }
  customerData: any;
  customerCount: any;
  totalNoOfItems: any;
  totalCreditSellingPrice: any;
  totalCashSellingPrice: any;
getCustomersData(){
  this.customerService.getCustomers().subscribe(res=> {
    this.customerData =res;
    // this.customerName= res.customerName;
  });
}  

getTotalNoOfCustomers(){
  this.customerService.getCustomerCount().subscribe(count => {
    this.customerCount = count;
    console.log(`   count  XXXXXXXXXXXXeditdataXXXXXXXXXXXXXXXX   : ${this.customerCount }`);
});
}




getTotalNoItems(){
  this.itemServiceService.getTotalNoOfItems().subscribe(totalNoOfItems => {
    this.totalNoOfItems = totalNoOfItems;
});
}
getTotalCreditSellingPrice(){
  this.salesInvoiceService.getTotalCreditSellingPrice().subscribe(totalCreditSellingPrice => {
    this.totalCreditSellingPrice = totalCreditSellingPrice;
});
}
getTotalCashSellingPrice(){
  this.salesInvoiceService.getTotalCashSellingPrice().subscribe(totalCashSellingPrice => {
    this.totalCashSellingPrice = totalCashSellingPrice;
});
}

}
