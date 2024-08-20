import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit   {
  constructor(  
    private builder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private alert: ToastrService,
    private activeroute: ActivatedRoute
    ) { }

    loginSucess: boolean = false;
    userName: string;
    password: string;
    message: any
  ngOnInit(): void {


  }
 


 logInform = this.builder.group({
    userName: this.builder.control('', Validators.required),
    // email: this.builder.control(''),
    password: this.builder.control('', Validators.required),
  
  });


  
  responseMessage:any;

  login() {
    this.router.navigate(['/homePage']);  // navigat to salesInvoiceList
    if (this.logInform.valid) {
      console.log(`userName:\n ${this.logInform.getRawValue().userName}`);
      console.log(`password:\n ${this.logInform.getRawValue().password}`);
      this.userService.login(this.logInform.getRawValue()).subscribe(data => {
        let result: any;
        result= data;
          this.router.navigate(['/homePage']);// navigat to hompage
          this.alert.success('login Successfully.');
        },   (error: any) => {
          // this.alert.error(error.message);
          this.alert.warning('Invalid userName or password.');
        }
        ); 


      
    }else {
      this.alert.warning('Please enter values in all mandatory filed',);
     }
     }


     doLogin() {
      this.router.navigate(['/homePage']);  // navigat to salesInvoiceList
      let resp = this.userService.doLogin(this.userName, this.password);
      resp.subscribe(data => {
        this.message = data;
       this.router.navigate(["/home"])
      });
    }
}
