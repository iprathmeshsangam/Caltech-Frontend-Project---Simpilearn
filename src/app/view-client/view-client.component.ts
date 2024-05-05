import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent implements OnInit{
  clients :any  =[];
  message : string = "";

  constructor(private http : HttpClient){

  }

  ngOnInit(): void {
      this.fetchClient();

  }

  fetchClient(){
    this.http.get("http://localhost:3100/clients")
    .subscribe((res :any)=>{
      this.clients = res;
      // console.log(res);
      
    },(error)=>{console.error('Error in Fetching the Client Data');});
  }

  deleteClient(id:number){
    console.log("Id value is "+ id)
    if(confirm("Are you sure you want to delete client?")){
      this.http.delete('http://localhost:3100/deleteclient/'+ id)
      .subscribe((res:any)=>{
        this.message = res.message;
        this.fetchClient();
      })
    }
  }

}

