import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-reg',
  templateUrl: './category-reg.component.html',
  styleUrls: ['./category-reg.component.scss']
})
export class CategoryRegComponent implements OnInit {
  public Categorys: Category[]; 
  category: Category = new Category();
  registerSucess:boolean = false;



  
 

 
  submitted = false;
  constructor(  private alert: ToastrService, private  categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) {
      }

  ngOnInit(): void {
  
  }



  public getAllCategory(): void {
    this.categoryService.getAllCategorys().subscribe(
      (response: Category[]) => {
        this.Categorys = response;
        console.log(this.Categorys);
      
      },
      (error: HttpErrorResponse) => {  
        alert(error.message);
      } 
    );
  }
private getCategoryData(){
this.categoryService.getAllCategorys().subscribe(Date => 
  this.Categorys= Date)  

}
saveCategoryData(){
  console.log(`  this.name XXXXXX : ${this.category }`);
  if (this.category.categoryName == null  || this.category.categoryName == undefined ) {
    this.alert.warning('Please enter values in all mandatory filed');
}else {
  if(confirm('Are you sure you want to Save?')) {
    this.categoryService.addCategory(this.category).subscribe(date => {
      console.log(date);   
      this.registerSucess=true;
      this.category = new Category();
      this.alert.success('Created Successfully.');
      this.router.navigate(['/categoryList']);  // navigat to ItemServiceList
      // this.gotoItemServiceList;
      });
  }
 }

  }

  navigatinLst(){
    this.router.navigate(['/categoryList']);  // navigat to ItemServiceList

}
  gotoCategoryList(){
  this.router.navigate(['/categoryList']);
  
  }

  public onAddCategory(addForm: NgForm): void {
    console.log(addForm.value); 
  
    if (addForm.invalid) {
      return;
  }
    this.categoryService.addCategory(addForm.value).subscribe((user:any)=>{
      this.gotoCategoryList;
      console.log("Success register");
      this.gotoCategoryList;
      this.registerSucess=true;
      addForm.reset();
      // swal("Hello world!"); 
    });
  

  }











}
