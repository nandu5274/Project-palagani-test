import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
    this.router.navigate(['home/graph']);
  }

 openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}



signoutevent() {

}

testevent()
{
 

  
}

hotelevent()
{
  this.router.navigate(['home/hotel']);
  document.getElementById('mySidenav').style.width = '0px';
}

}
