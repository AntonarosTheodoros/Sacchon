import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  role: string;

 


  ngOnInit():void{

  }


  updateStorage(){
     this.role = sessionStorage.getItem("role");
    // console.log(this.role)
  }

}


