import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewClientComponent } from './view-client/view-client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';


const routes: Routes = [
  { path: '', redirectTo: '/viewclient', pathMatch: 'full' },
  { path: 'viewclient', component: ViewClientComponent },
  { path: 'addclient', component: AddClientComponent },
  { path :'editclient/:client_id' , component : EditClientComponent},
  { path : 'addmeeting' ,component :AddMeetingComponent},
  { path : 'viewmeeting' , component: ViewMeetingComponent},
  { path : 'editmeeting/:meetingId', component:EditMeetingComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
