import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mdr-nav-bar',
  templateUrl: './mdr-nav-bar.component.html',
  styleUrls: ['./mdr-nav-bar.component.scss']
})
export class MdrNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  onClick(){
    sessionStorage.clear();
    this.router.navigate(['home']);
    console.log(sessionStorage);
  }


}
