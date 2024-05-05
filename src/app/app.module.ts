import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DisplayComponent } from './display/display.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';



@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ViewClientComponent,
    EditClientComponent,
    DisplayComponent,
    AddMeetingComponent,
    EditMeetingComponent,
    ViewMeetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
