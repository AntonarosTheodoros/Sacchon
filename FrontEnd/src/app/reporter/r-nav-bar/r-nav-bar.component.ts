import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-r-nav-bar',
  templateUrl: './r-nav-bar.component.html',
  styleUrls: ['./r-nav-bar.component.scss']
})
export class RNavBarComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    sessionStorage.clear();
    this.router.navigate(['home']);
    console.log(sessionStorage);
  }


}
