import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrl: './view-meeting.component.css'
})
export class ViewMeetingComponent implements OnInit{
  meetings : any  = [];
  message :string = "";
  

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.fetchMeeting();
  }

  fetchMeeting(){
    this.http.get('http://localhost:3200/meetings')
    .subscribe((res:any)=>{
      this.meetings = res;
      // console.log(res);
    },(error)=>{
      console.error('Error in fetching the client Data');
    })
  }

  deleteMeeting(id:number){
    // console.log('Id value is '+ id);
    if(confirm("Are you sure you want to delete this meeting?")){
      this.http.delete('http://localhost:3200/deletemeeting/'+ id)
      .subscribe((res:any)=>{
        this.message = res.message;
        this.fetchMeeting();
      })
    }
  }


  //Need to code Edit Option
  editMeeting(id:number){

  }

}
