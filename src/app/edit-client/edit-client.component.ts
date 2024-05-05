import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {
  id: number = 0;
  clientName: string = "";
  clientEmail: string = "";
  clientAddress: string = "";
  clientPhone: string = "";
  message: string = "";


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  updateClient() {
    //Update Client data.
    const client = {
      id: this.id,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      clientAddress: this.clientAddress,
      clientPhone: this.clientPhone
    };
    console.log(client);
    this.http.put("http://localhost:3100/updateclient", client)
      .subscribe((res: any) => {
        console.log('Update response: ', res);
        this.message = res.message;
        this.router.navigate(['/viewclient'])
      },
        (error) => {
          console.error('Error in Updating Client', error)
        })
  }

  back(){
    this.router.navigate(['/viewclient']);
  }

  //fetch data According to the ID
  fetchClient() {
    this.http.get('http://localhost:3100/getclient/' + this.id)
      .subscribe((response: any) => {
        // console.log(response);
        const selectedClient = response;
        this.clientName = selectedClient.client_name;
        this.clientEmail = selectedClient.client_email;
        this.clientPhone = selectedClient.client_phone;
        this.clientAddress = selectedClient.client_address;
      },
        (error) => {
          console.error('Error in fetching the product ID', error);
        })
  }

  ngOnInit(): void {
    // console.log(this.id);
    // this.fetchClient();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('client_id');
      if (idParam !== null) {
        this.id = +idParam;
        this.fetchClient();
      }
      else {
        console.log('ID is missing or Null or 0');
      }
    })
  }

}
