import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrl: './edit-meeting.component.css'
})
export class EditMeetingComponent implements OnInit {
  MeetingId : number = 0;
  MeetingAgenda : string = "";
  NoOfPeople : number = 0;
  MeetingDate : string = "";
  MeetingTime : string = "";
  message : string = "";

  constructor(
    private http:HttpClient, 
    private route:ActivatedRoute , 
    private router:Router){}

  updateMeeting(){
    //Update Meeting Data
    const Meeting = {
      MeetingId : this.MeetingId,
      MeetingAgenda : this.MeetingAgenda,
      NoOfPeople : this.NoOfPeople,
      MeetingDate : this.MeetingDate,
      MeetingTime : this.MeetingTime
    };
    console.log(Meeting);
    this.http.put('http://localhost:3200/updatemeeting' , Meeting)
    .subscribe((res: any)=>{
      console.log('Updated Meeing Resp is : ', res)
      {this.message = res.message}
      alert("Meeting Edited Successfully");
      this.router.navigate(['/viewmeeting'])
    } , (error)=>{
      console.error('Error in updating the product' ,error);
    })
  }

  back(){
    this.router.navigate(['/viewmeeting']);
  }

  fetchMeeting(){
    this.http.get('http://localhost:3200/getmeeting/'+ this.MeetingId)
    .subscribe((response : any)=>{
      console.log(response);
      const meeting  = response;
      this.MeetingAgenda = meeting.meeting_agenda;
      this.NoOfPeople = meeting.no_of_people;
      this.MeetingDate = meeting.meeting_date;
      this.MeetingTime = meeting.meeting_time;
    },
  (error) =>{
    console.error('Error in fetching data from the server',error);
  });}


ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const idParam = params.get('meetingId');
      if(idParam!==null){
        this.MeetingId = +idParam;
        this.fetchMeeting();
      }else{
        console.error('ID is missing or Null');
      }
    });
}

}
