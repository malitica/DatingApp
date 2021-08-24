import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() cancelRegister = new EventEmitter();
  model:any ={};
  
  
  constructor(private accountService:AccountService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {

    // console.log(this.model.username)
    // console.log(this.model.password)

    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, err => {
      console.log(err.error);
      this.toastr.error(err.error);
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
