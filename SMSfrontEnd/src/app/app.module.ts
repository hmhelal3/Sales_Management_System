import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CustomerRegComponent } from './pages/customer-Pages/customer-reg/customer-reg.component';
import { ItemServiceRegComponent } from './pages/Item-Service-Pages/item-service-reg/item-service-reg.component';
import { CustomerService } from './services/customer.service';
import { ItemServiceService } from './services/item-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemServiceListComponent } from './pages/Item-Service-Pages/item-service-list/item-service-list.component';
import { UpdateItemServiceComponent } from './pages/Item-Service-Pages/update-item-service/update-item-service.component';
import { ItemServiceDetailsComponent } from './pages/Item-Service-Pages/item-service-details/item-service-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { CustomerListComponent } from './pages/customer-Pages/customer-list/customer-list.component';
import { UpdateCustomerInfoComponent } from './pages/customer-Pages/update-customer-info/update-customer-info.component';
import { SalesInvoiceComponent } from './pages/voucher-page/sales-invoice/sales-invoice.component';
import { SalesInvoiceListComponent } from './pages/voucher-page/sales-invoice-list/sales-invoice-list.component';
import { MatTableModule } from '@angular/material/table';
import { CategoryRegComponent } from './pages/loockup/category-reg/category-reg.component';
import { CategoryListComponent } from './pages/loockup/category-list/category-list.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { CreateInvoiceComponent } from './pages/voucher-page/create-invoice/create-invoice.component';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'
import {DataTablesModule} from 'angular-datatables';
import { InvoicePreviewComponent } from './pages/voucher-page/invoice-preview/invoice-preview.component';
import { LoginComponent } from './pages/user-page/login/login.component';
import { UserRegComponent } from './pages/user-page/user-reg/user-reg.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeeComponent } from './pages/homee/homee.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialogModule } from '@angular/material/dialog';



/////
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    AboutComponent, 
    CustomerRegComponent, 
    ItemServiceRegComponent, 
    ItemServiceListComponent, 
    UpdateItemServiceComponent, 
    ItemServiceDetailsComponent, 
    CustomerListComponent, 
    UpdateCustomerInfoComponent, 
    SalesInvoiceComponent,    
    SalesInvoiceListComponent, 
    CategoryRegComponent, 
    CategoryListComponent, 
    FilterPipe, 
    PaginationComponent, 
    CreateInvoiceComponent,
    InvoicePreviewComponent, 
    LoginComponent, 
    UserRegComponent, 
    DashboardComponent,
    HomeeComponent,
  ],
 
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    BrowserModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,  
    ToastrModule.forRoot(),
    NgbModule,
    DataTablesModule,
    NgxExtendedPdfViewerModule,
    TranslateModule.forRoot(
      {
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }
    )
  ],
  providers: [CustomerService, ItemServiceService,],
  bootstrap: [AppComponent],  
})
export class AppModule {}      




