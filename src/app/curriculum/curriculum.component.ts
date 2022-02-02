import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'; 


@Component({
  selector: 'app-inicio',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  public url: string;
  public url2!:string;
  public key: string;
  public gif:any;
  public isLoad = false;
 
  
  constructor(private observer: BreakpointObserver,private _http:HttpClient) { 
    this.url=" http://api.giphy.com/v1/gifs/random?api_key=";
    this.key = "tOdCW5iI6l60ab9PPobL1zDXZCo6ydAw";
  }

  ngOnInit(): void {
    this.isLoad = true; 
    this._http.get(this.url+ this.key).toPromise().then(
      (response:any) =>  {
          console.log(response.data);
          const {url} = response.data.images.original;
          console.log(url);
          this.url2 = url;
          this.isLoad = false;
      }
    
      

    ).catch(error=>{console.log(error);}) 

    
}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
