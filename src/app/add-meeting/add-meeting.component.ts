import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrl: './add-meeting.component.css'
})
export class AddMeetingComponent implements OnInit {
  MeetingId: number = 0;
  MeetingAgenda: string = "";
  NoOfPeople: number = 0;
  MeetingDate: Date | null = null;
  MeetingTime: string = "";
  message: string = "";
  isValid: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  addMeeting() {
    if (
      this.MeetingAgenda == "" ||
      this.MeetingDate == null ||
      this.MeetingTime == "" ||
      this.NoOfPeople == 0) {
      alert("Please fill all the fields");
      this.isValid = false;
      return; // This will stop executing the code if the input field is blank
    }

    //nop - number of people
    if (this.NoOfPeople <= 0) {
      alert("Please enter valid number of people");
      return
    }
    //Date validation
    //compare date to current date
    const currentDate = new Date();
    if (this.MeetingDate < currentDate) {
      alert("Please select a future date");
      return
    }

    const meeting = {
      meeting_id: this.MeetingId,
      meeting_agenda: this.MeetingAgenda,
      no_of_people: this.NoOfPeople,
      meeting_date: this.MeetingDate,
      meeting_time: this.MeetingTime
    }
    this.http.post("http://localhost:3200/addmeeting", meeting)
      .subscribe((res: any) => {
        alert("Meeting Added Successfully");
        this.message = res.message;
        this.router.navigate(['/viewmeeting'])
      },
        (error) => {
          console.log("Unable to add Meeting", error)
        });

  }

  ngOnInit(): void {

  }
}
