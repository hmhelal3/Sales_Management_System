import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalesInvoice } from '../models/salesInvoice';
import { SalesInvoceDetail } from '../models/salesInvoceDetail';

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {
  
 
  private url = environment.apiBaseUrl; 
  // apiBaseUrl: 'http://localhost:8080'
  constructor(private httpClient: HttpClient){} 

  // public getItemServices(): Observable<ItemService[]> { 
  //   return this.httpClient.get<ItemService[]>(`${this.url}/item-service/all`);
  // }

  generateReport(data:any){
    return this.httpClient.post(this.url +"/bill/generateReport" , data,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    })
  }


  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url +"/bill/getPdf" , data,{responseType:'blob'});
  }

  getBills(){
    return this.httpClient.get(this.url +"/bill/getBills");
  }
  delete(id:any){
    return this.httpClient.post(this.url +"/bill/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type' , "application/json")
    });
  }
  generatInvoiceNo(): Observable<string> {
    return this.httpClient.get<string>(`${this.url}/sales-invoice/inv`);
  }


  getSalesInvoiceDataById(id: number): Observable<SalesInvoice> {
    return this.httpClient.get<SalesInvoice>(`${this.url}/sales-invoice/find/${id}`);
    
  }

  public addSalesInvoice(salesInvoice: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/sales-invoice/add`, salesInvoice);  
  }

  insertData(salesInvoice: any): Observable<SalesInvoice> {
    return this.httpClient.post<SalesInvoice>(`${this.url}/sales-invoice/insert-data`, salesInvoice);
  }

  public getAllSalesInvoiceData(): Observable<SalesInvoice[]> {
    return this.httpClient.get<SalesInvoice[]>(`${this.url}/sales-invoice/all`);
  }
 
  
  public getUpdateSalesInvoicerData(updatedData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/sales-invoice/update`, updatedData);
  }
  public getUpdateInvoicData(id: any , salesInvoiceRequestDTO: any ): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/sales-invoice/updateData/${id}`, salesInvoiceRequestDTO); 
  } 
  public getUpdateInvoicData3(salesInvoiceRequestDTO: any ): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/sales-invoice/example`, salesInvoiceRequestDTO); 
  } 
  public updateSalesInvoicerData1(id: number, updatedData: any): Observable<any> {
    const thisUrl = `${this.url}/sales-invoice/updateData/${id}`;
    return this.httpClient.put(thisUrl, updatedData);
  }
  public updateSalesInvoicerData12(updatedData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/sales-invoice/updateData`, updatedData);
  }

  public getUpdateInvoceData(salesInvoice: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/sales-invoice/update`, salesInvoice);
  }
  getTotalCreditSellingPrice(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/sales-invoice/totalCreditSellingPrice`);
}
getTotalCashSellingPrice(): Observable<number> {
  return this.httpClient.get<number>(`${this.url}/sales-invoice/totalCashSellingPrice`);
}
  public getDeleteSalesInvoiceDataById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/sales-invoice/delete/${id}`);
  } 
  public getDeleteSalesInvoiceDataByInvoiceNo(invoiceNo: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/sales-invoice/deletbyInvoiceNo/${invoiceNo}`);
  } 
  
  GenerateInvoicePDF(invoiceNo:any){
    return this.httpClient.get('http://localhost:8080/sales-invoice/generatepdf?invoiceNo='+invoiceNo,{observe:'response',responseType:'blob'});
    
  }
  getInvoiceByNumber(invoiceNo: any): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/sales-invoice/findByInvNo/${invoiceNo}`);
  }
   public getAllSalesInvoiceDetaileData(id: number): Observable<SalesInvoceDetail[]> {
       const url = `${this.url}/sales-invoice/findBySalesInvoiceId/${id}`;
    return this.httpClient.get<SalesInvoceDetail[]>(url);
  }

  public getAllSalesInvoiceDetaileDataByInvoiceNo(invoiceNo: any): Observable<SalesInvoceDetail[]> {
    const url = `${this.url}/sales-invoice/findByInvoiceNoDet/${invoiceNo}`;
 return this.httpClient.get<SalesInvoceDetail[]>(url);
}

  getSalesInvoiceByInvoiceNo(invoiceNo: string): Observable<SalesInvoice> {
    const url = `${this.url}/sales-invoice/findByInvoiceNo/${invoiceNo}`;
    return this.httpClient.get<SalesInvoice>(url);
  }
  // getCustomerDataByName1(customerName: any) {
  //   return this.http.get('http://localhost:8080/customer/findByName?customerName='+customerName);
  // }

  GenerateInvoicePDF1(invoiceno:any){
    return this.httpClient.get('https://localhost:7118/Invoice/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});
    
  }  
  generatePdf(invoiceNumber: string): Observable<Blob> {
    const url = `${this.url}/sales-invoice/invoice/${invoiceNumber}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
