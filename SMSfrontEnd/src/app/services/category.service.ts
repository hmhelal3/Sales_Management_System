import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private apiBaseUrl: 'http:/localhost:8080';

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){} 

  public getAllCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/category/add`, category);
  }

  
  public getUpdateCategoryData(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/category/update`, category);
  }

  public getDeleteCategoryData(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/delete/${categoryId}`);
  }
  getCategoryDataById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiServerUrl}/category/find/${id}`);
    
  }




}
