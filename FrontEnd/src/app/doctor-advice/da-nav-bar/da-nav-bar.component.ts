import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-da-nav-bar',
  templateUrl: './da-nav-bar.component.html',
  styleUrls: ['./da-nav-bar.component.scss']
})
export class DaNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    sessionStorage.clear();
    this.router.navigate(['home']);
    console.log(sessionStorage);
  }


}
