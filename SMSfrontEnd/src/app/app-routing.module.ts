import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemServiceDetailsComponent } from './pages/Item-Service-Pages/item-service-details/item-service-details.component';
import { ItemServiceListComponent } from './pages/Item-Service-Pages/item-service-list/item-service-list.component';
import { ItemServiceRegComponent } from './pages/Item-Service-Pages/item-service-reg/item-service-reg.component';
import { UpdateItemServiceComponent } from './pages/Item-Service-Pages/update-item-service/update-item-service.component';
import { AboutComponent } from './pages/about/about.component';
import { CustomerListComponent } from './pages/customer-Pages/customer-list/customer-list.component';
import { CustomerRegComponent } from './pages/customer-Pages/customer-reg/customer-reg.component';
import { UpdateCustomerInfoComponent } from './pages/customer-Pages/update-customer-info/update-customer-info.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryListComponent } from './pages/loockup/category-list/category-list.component';
import { CategoryRegComponent } from './pages/loockup/category-reg/category-reg.component';
import { CreateInvoiceComponent } from './pages/voucher-page/create-invoice/create-invoice.component';
import { SalesInvoiceListComponent } from './pages/voucher-page/sales-invoice-list/sales-invoice-list.component';
import { SalesInvoiceComponent } from './pages/voucher-page/sales-invoice/sales-invoice.component';
import { InvoicePreviewComponent } from './pages/voucher-page/invoice-preview/invoice-preview.component';
import { UserRegComponent } from './pages/user-page/user-reg/user-reg.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/user-page/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeeComponent } from './pages/homee/homee.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  // { path: 'customers', component: CustomersComponent, canActivate: [RouteGuardService] },
  // { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  // { path: 'customers/:id', component: CustomerFormComponent, canActivate: [RouteGuardService] },
  // { path: '**', component: ErrorComponent }
  { path: 'homee', component: HomeComponent, },
  // { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: '', redirectTo: 'loginReg', pathMatch: 'full', },
  { path: 'loginReg',    component: LoginComponent,  }, 

  { path: '',    component: DashboardComponent,
   children :[ 
    { path: 'homePage', component: HomeeComponent,  },
    { path: 'CustomerReg', component: CustomerRegComponent,  },
    { path: 'CustomerList', component: CustomerListComponent,  },
    { path: 'Update-customer-info/:id',component: UpdateCustomerInfoComponent, },
    { path: 'ItemServiceReg',component: ItemServiceRegComponent, },
    { path: 'ItemServiceList',component: ItemServiceListComponent, },
    { path: 'Update-item-service/:id',component: UpdateItemServiceComponent, },
    { path: 'item-service-details/:id',component: ItemServiceDetailsComponent, },
    { path: 'salesInvoice', component: SalesInvoiceComponent,  },
    { path: 'createInvoice', component: CreateInvoiceComponent,  },
    
    { path: 'salesInvoiceList', component: SalesInvoiceListComponent,  },
    { path: 'category', component: CategoryRegComponent,  },
    { path: 'categoryList', component: CategoryListComponent,  },
    { path: 'about',    component: AboutComponent,  },
    { path: 'editinvoice/:invoicenNo',    component: CreateInvoiceComponent,  }, 
    { path: 'printPreview/:invoicenNo',    component: InvoicePreviewComponent,  }, 
    { path: 'userReg',    component: UserRegComponent,  }, 

  ] 
}

 
  
 
  
]; 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
