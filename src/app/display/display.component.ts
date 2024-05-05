import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{
  username : string | null = "Prathmesh";
  currentDate = new Date();
  

  ngOnInit(): void {
      
  }

}
