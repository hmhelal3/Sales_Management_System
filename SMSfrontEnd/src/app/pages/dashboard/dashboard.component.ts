import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{
  lang:string ='';
  constructor(  
    private builder: FormBuilder, 
    private translateService:TranslateService,
    private router: Router,
    private alert: ToastrService,
    private  customerService: CustomerService,
    private activeroute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

//Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}
logOut() {
  this.router.navigate(['/loginReg']);  // navigat to salesInvoiceList
  this.alert.success('Successfully LogOut.');
}
ChangeLang(lang:any){
  
  const selectedLanguage = lang.target.value;
  localStorage.setItem('lang',selectedLanguage);
  this.translateService.use(selectedLanguage);
  
}




}
