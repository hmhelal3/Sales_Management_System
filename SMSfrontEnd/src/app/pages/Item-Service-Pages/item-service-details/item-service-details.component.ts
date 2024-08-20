import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ItemService } from 'src/app/models/item-service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-item-service-details',
  templateUrl: './item-service-details.component.html',
  styleUrls: ['./item-service-details.component.scss']
})
export class ItemServiceDetailsComponent implements OnInit {
  id: number
  itemSrvices: ItemService = new ItemService();;
  category: Category = new Category();
  constructor(private itemServiceService: ItemServiceService, private  categoryService: CategoryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
this.getItemServiceDetaileById();

  }

navigatinLst(){
  this.router.navigate(['/ItemServiceList']);  // navigat to ItemServiceList
}

getItemServiceDetaileById(){
  console.log(`category id XXXXXXXXXXXXXXXXXXXXXXXXXXXX  `);
  this.id= this.activatedRoute.snapshot.params['id'];
  this.itemServiceService.getItemServiceById(this.id).subscribe(data => {
    this.itemSrvices = data;
    this.category =  this.itemSrvices.categoryId;
    console.log(`category id XXXXXXXXXXXXXXXXXXXXXXXXXXXX  `);
    this.getCategoryDataById();
    this.itemSrvices.categoryId = this.category.id;
    console.log(`category id  : ${this.itemSrvices.categoryId }`);
    if (this.itemSrvices.categoryId == this.category.id) {
      this.itemSrvices.categoryId = this.category.categoryName;
    } 
  }, error => error.log(error));
   


    
}


getCategoryDataById(){
  this.categoryService.getUpdateCategoryData(this.category).subscribe(data => {
    this.category = data;
    console.log(`category nameeee  : ${this.category.categoryName}`);
  }, error => error.log(error));  
}
}
