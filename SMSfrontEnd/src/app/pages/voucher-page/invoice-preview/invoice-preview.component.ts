import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SalesInvoiceService } from 'src/app/services/sales-invoice.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  // invoicePreview: InvoicePreview;
  invoicePreview: any;
  invoicedetail: any;
  printPreviewInvNo: any;
  totalAmount = 0;  
  taxTotal =0; 
  netTotal= 0; 
  constructor(  private salesInvoiceService: SalesInvoiceService,    private activeroute: ActivatedRoute) { }
  
  dtoptions: DataTables.Settings = {};
  // dtTrigger:Subject<any>=new Subject<any>();
  ngOnInit(): void {

    this.printPreviewInvNo = this.activeroute.snapshot.paramMap.get('invoicenNo');
    if (this.printPreviewInvNo != null) {
      // this.pagetitle = "Edit Invoice";
      // this.isedit = true;
      this.getInvoiceByNumber(this.printPreviewInvNo);
      // this.findsum(this.printPreviewInvNo);
    }  
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:false,
     paging:false,
    lengthChange:false,
    
    // pageLength: 5,
    // language:{
    //   searchPlaceholder:'Text Customer'
    // }
  }
  }


  getInvoiceByNumber(invoiceNumber: any) {
    this.salesInvoiceService.getInvoiceByNumber(invoiceNumber).subscribe(
      data => {
        // this.invoiceData = data;
        this.invoicePreview= data;
      },
    );
     this.findsum(this.printPreviewInvNo);
  }


  findsum(invoiceNo00: any){ 
    this.salesInvoiceService.getAllSalesInvoiceDetaileDataByInvoiceNo(invoiceNo00).subscribe(res => {
      this.invoicedetail = res;
      console.log( this.invoicedetail);  
      for (let i = 0; i < this.invoicedetail.length; i++) {   
        this.totalAmount = this.totalAmount + this.invoicedetail[i].total  
        this.taxTotal = this.taxTotal + this.invoicedetail[i].taxTotal 
         this.netTotal = this.taxTotal+ this.totalAmount ;
      };
    });
  
  } 

  generat() {
    console.log(` invo : XXXXXX : ${this.printPreviewInvNo  }`);
    this.salesInvoiceService.generatePdf(this.printPreviewInvNo).subscribe(res => {
      this.invoicedetail = res;
    });

  }
}