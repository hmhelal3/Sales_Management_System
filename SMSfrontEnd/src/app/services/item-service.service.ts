import { ItemService } from 'src/app/models/item-service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private apiServerUrl = environment.apiBaseUrl; 
  // apiBaseUrl: 'http://localhost:8080'
  constructor(private http: HttpClient){} 

  public getItemServices(): Observable<ItemService[]> { 
    return this.http.get<ItemService[]>(`${this.apiServerUrl}/item-service/all`);
  }

  public getProducs(): Observable<ItemService> { 
    return this.http.get<ItemService>(`${this.apiServerUrl}/item-service/all`);
  }


  public addItemService(itemservice: ItemService): Observable<ItemService> {
    return this.http.post<ItemService>(`${this.apiServerUrl}/item-service/add`, itemservice);
  }

  getItemServiceById(id: number): Observable<ItemService> {
    return this.http.get<ItemService>(`${this.apiServerUrl}/item-service/find/${id}`);
    
  }
  getItemServiceByCode(code: any): Observable<ItemService> {
    return this.http.get<ItemService>(`${this.apiServerUrl}/item-service/findByCode/${code}`);
    
  }
  // getSearcByKey(key: any): Observable<ItemService> {
  //   return this.http.s<ItemService>(`${this.apiServerUrl}/item-service/find/${key}`);
    
  // }


  public getUpdateItemService(itemservice: ItemService): Observable<ItemService> {
    return this.http.put<ItemService>(`${this.apiServerUrl}/item-service/update`, itemservice);
  }
  // public updateItemService1(id: number, itemservice: ItemService): Observable<object> {
  //   return this.http.put<ItemService>(`${this.apiServerUrl}/item-service/find/${id}`, itemservice);
  // }

  public getDeleteItemService(itemserviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/item-service/delete/${itemserviceId}`);
  }
  searchByName(itemServiceName: string): Observable<any[]> {
    const url = `${this.apiServerUrl}/item-service/search?itemServiceName=${itemServiceName}`;
    return this.http.get<any[]>(url);
  }
  getItemServiceDataByItemServiceName(itemServiceName: string): Observable<ItemService> {
    const url = `${this.apiServerUrl}/item-service/findByName/${itemServiceName}`;
    return this.http.get<ItemService>(url);
  }

 
  getTotalNoOfItems(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/item-service/count`);
}
}
