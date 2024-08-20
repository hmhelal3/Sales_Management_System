import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){} 

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiServerUrl}/customer/all`);
  }
  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/customer/count`);
}
  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiServerUrl}/customer/add`, customer);
  }

  
  public getUpdateCustomerData(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiServerUrl}/customer/update`, customer);
  }

  public getDeleteCustomerData(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/customer/delete/${customerId}`);
  }
  getCustomerDataById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiServerUrl}/customer/find/${id}`);
    
  }

  public getCustomersObj(customer: Customer): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiServerUrl}/customer/findByCustomer/${customer}`); 
  }
  getCustomerDataByName(customerName: string): Observable<Customer> {
    const url = `${this.apiServerUrl}/customer/findByName/${customerName}`;
    return this.http.get<Customer>(url);
  }
  getCustomerDataByName1(customerName: any) {
    return this.http.get('http://localhost:8080/customer/findByName?customerName='+customerName);
  }
}
