import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService) {
    
  }
  ngOnInit() { 
   this.setCurrentUser();
  }

  setCurrentUser()
  {
    
    //const user: User | null = JSON.parse(localStorage.getItem('user') || null);
   // const user: User | null = JSON.parse(localStorage.getItem('user'));
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
    if(user){
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }

  }

 
}



