import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit {
  clientId: number = 0;
  clientName: string = "";
  clientEmail: string = "";
  clientAddress: string = "";
  clientPhone: string = "";
  Message: string = "";
  isValid  : boolean = false;

  constructor(
    private http: HttpClient,
    private router : Router ) {}

  
  addClient() {
    if(
      this.clientName == "" || 
      this.clientEmail == "" || 
      this.clientAddress == "" || 
      this.clientPhone == ""){
      alert("Please fill all the fields");
      this.isValid = false;
      return; // Stop executing if the field is empty
    }

    //Email Verification
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.clientEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    //Phone verification 
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(this.clientPhone)) {
      alert("Please enter a valid phone number");
      return;
    }

    //if all verfication is Cleared save all data as an Object and send it to the server to save data in MySQL Database.
    const client = {
      clientId: this.clientId,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      clientAddress: this.clientAddress,
      clientPhone: this.clientPhone
    };
    this.http.post("http://localhost:3100/addclient", client)
      .subscribe((res: any) => {
        this.Message = res.Message
        this.clientId = 0;
        this.clientName = "";
        this.clientEmail = "";
        this.clientAddress = "";
        this.clientPhone = "";
        alert("Client Added Successfully");
        this.router.navigate(['/viewclient'])

      },
        (error) => {
          console.error('Error in adding the Client', error)
        })
  }

  ngOnInit(): void {

  }
}
