import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.scss']
})
export class UserRegComponent implements OnInit  {
  constructor(  
    private builder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private alert: ToastrService,
    private activeroute: ActivatedRoute
    ) { }

  ngOnInit(): void {


  }

  userform = this.builder.group({
    userName: this.builder.control('', Validators.required),
    fullName: this.builder.control('', Validators.required),
    // customerName: this.builder.control(''),
    email: this.builder.control(''),
    password: this.builder.control('', Validators.required),
    role: this.builder.control('', Validators.required),
  

   

  });

  SaveInvoice() {
    if (this.userform.valid) {
      if(confirm('Are you sure you want to Save?')) {
    
        this.userService.saveUser(this.userform.getRawValue()).subscribe(res => {
          let result: any;
          result= res;
          console.log('Data inserted successfully', result);
        }, 
          );
          this.alert.success('Created Successfully.');
          this.router.navigate(['/loginReg']);  // navigat to salesInvoiceList
      }
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
     }

  }

}
