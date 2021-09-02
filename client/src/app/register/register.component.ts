import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  registerForm: FormGroup | any;
  maxDate: Date | undefined;
  validationErrors : string[] = [];
  
  
  constructor(private accountService:AccountService, private toastr:ToastrService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  initializeForm()
  {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

    matchValues(matchTo:string) : ValidatorFn
    {
      return (control: AbstractControl |  any) => {
        return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
      }
    }


  register()
  {   
    // console.log(this.registerForm.value);
    // console.log(this.model.username)
    // console.log(this.model.password)

    this.accountService.register(this.registerForm.value).subscribe(response => {
     this.router.navigateByUrl('/members')
      this.cancel();
    }, err => { 
     this.validationErrors = err;
      
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
