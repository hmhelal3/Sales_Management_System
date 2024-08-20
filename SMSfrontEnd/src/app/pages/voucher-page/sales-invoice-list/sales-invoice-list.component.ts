import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ItemService } from 'src/app/models/item-service';
import { SalesInvoiceService } from 'src/app/services/sales-invoice.service';
import  pdfMake       from 'pdfmake/build/pdfmake'; // Note the import syntax here
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Note the import syntax here
pdfMake.vfs = pdfFonts.pdfMake.vfs;





@Component({
  selector: 'app-sales-invoice-list',
  templateUrl: './sales-invoice-list.component.html',
  styleUrls: ['./sales-invoice-list.component.scss']
})
export class SalesInvoiceListComponent implements OnInit {

  constructor( 
     private modalservice: NgbModal,
     private alert: ToastrService,
    private salesInvoiceService: SalesInvoiceService,
    private router: Router,
    ) { }

  @ViewChild('content') popupview !: ElementRef;

  Invoiceheader: any;
  itemSrvices: ItemService[]; 
  pdfurl = '';
  invoiceno: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:true,
    // pageLength: 5,
    language:{
      searchPlaceholder:'Text Customer'
    }

    };
    this.LoadInvoice();
  }

  LoadInvoice() {
    this.salesInvoiceService.getAllSalesInvoiceData().subscribe(res => {
      this.Invoiceheader = res;  
      // this.itemSrvices = res;   
      // console.log(` object XXXXXX : ${this.Invoiceheader }`);
      this.dtTrigger.next(null);
    });
  }

  invoiceremove(invoiceNo: any) {
    if (confirm('Do you want to remove this Invoice : ' + invoiceNo)) {
      // this.salesInvoiceService.getDeleteSalesInvoiceDataByInvoiceNo(invoiceNo).subscribe(res => {
        this.salesInvoiceService.getDeleteSalesInvoiceDataById(invoiceNo).subscribe(res => {
          this.alert.success('Removed Successfully.', 'Remove Invoice')
          this.LoadInvoice();
      });
    }
  }

  Editinvoice(invoicenNo: any) {
    this.router.navigateByUrl('/editinvoice/' + invoicenNo);
    // this.router.navigate(['/editinvoice/', id]);
  }


  
  PrintInvoice(invoiceno: any) {
    this.salesInvoiceService.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  DownloadInvoice(invoiceno: any) {
    console.log(` invoiceno XXXXXX : ${this.invoiceno }`);
    this.salesInvoiceService.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.download = invoiceno;
      a.href = url;
      a.click();

    });
  }
  invoiceData: any;
  getInvoiceByNumber(invoiceNumber: any) {
    console.log(` invoiceno XXXXXX : ${invoiceNumber }`);
    this.salesInvoiceService.getInvoiceByNumber(invoiceNumber).subscribe(
      data => {
        this.invoiceData = data;
        console.log(`  this.invoiceData XXXXXX : ${this.invoiceData }`);
        console.log(` Invoice Number: XXXXXX : ${this.invoiceData.header.invoiceNo  }`);
        console.log(` createdDate : XXXXXX : ${this.invoiceData.header.createdDate  }`);
        console.log(` paymentType : XXXXXX : ${this.invoiceData.header.paymentType  }`);
        console.log(` customerName : XXXXXX : ${this.invoiceData.header.customerId.customerName  }`);
        console.log(` totalAmount : XXXXXX : ${this.invoiceData.header.netTotalPrice  }`);
        console.log(` details : XXXXXX : ${this.invoiceData.details  }`);
      },
      error => {
        console.error('Error fetching invoice:', error);
      }
    );
    this.generatePDF();
  }

 


  
  generatePDF() {
    const docDefinition = {
      content: [
        { text: 'Invoice Details', style: 'header' },
        { text: ` Customer Name:  ${this.invoiceData.header.customerId.customerName}                            Invoice Number: ${this.invoiceData.header.invoiceNo} ` },
        { text: 'List of Items', style: 'subheader' },
        this.createTable(this.invoiceData.details),

        { text: `Net Amount: ${this.invoiceData.header.netTotalPrice}` },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  }

  createTable(details: any[]): any {
    return {
      table: {
        body: [
          ['Item Name', 'uom', 'Quantity', 'Unit Price', 'Tax ' , 'Tax Total' , 'total amount '],
          ...details.map(detail => [detail.itemServiceName, detail.uom, detail.quantity, detail.sellingUnitPrice, detail.tax , detail.taxTotal,  detail.total]),
        ],
      },
    };
  }

  
  PreviewInvoice(invoicenNo: any) {
    this.router.navigateByUrl('/printPreview/' + invoicenNo);
    // this.invoiceno = invoiceno;
    // console.log(` invoiceno XXXXXX : ${this.invoiceno }`);
    // this.salesInvoiceService.GenerateInvoicePDF(this.invoiceno).subscribe(res => {
    //   let blob: Blob = res.body as Blob;
    //   let url = window.URL.createObjectURL(blob);
    //   this.pdfurl = url;
    //   this.modalservice.open(this.popupview, { size: 'lg' });
    //   window.open(url);
    // });
  }

}
