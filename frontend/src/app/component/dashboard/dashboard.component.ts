import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  startDateModel : NgbDateStruct;
  endDateModel : NgbDateStruct;

  eventDetail !: FormGroup;   // The Form that is sent from any modal
  eventObject : Event = new Event();    // For the addEvent() method, the schema data is from the model
  eventList : Event[] = [];     // ngFor in dashboard.component.html, for eachs through all the events

  constructor(private formBuilder : FormBuilder, private eventService : EventService) { }

  ngOnInit(): void {
 
    this.getAllEvents();

    this.eventDetail = this.formBuilder.group({
      id : [''],
      title : [''],
      oldStartDate : [''],
      startDate : [''],
      oldEndDate : [''],
      endDate : [''],
      attendanceFee : [''],
      maxQuantity : [''],
      description : ['']
    });
  }


  dateCompare(d1:any, d2:any) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if(date2 > date1) return true;
    
    swal("The date values do not match!") 
    return false;
  }

  getAllEvents() {
    this.eventService.getAllEventsURL().subscribe(res =>{
      this.eventList = res;
      console.log("The result is: " + res);
    }, err =>{
      console.log("The error is: " + err);
    });
  }

  addEvent() {
    this.eventObject.id = this.eventDetail.value.id;
    this.eventObject.title = this.eventDetail.value.title;

    let startDateString = this.eventDetail.value.startDate.year + '-' + 
      ('0' + this.eventDetail.value.startDate.month).slice(-2) + '-' +
      ('0' + this.eventDetail.value.startDate.day).slice(-2);
    
    let endDateString = this.eventDetail.value.endDate.year + '-' + 
      ('0' + this.eventDetail.value.endDate.month).slice(-2) + '-' +
      ('0' + this.eventDetail.value.endDate.day).slice(-2);
    
    this.eventObject.startDate = new Date(startDateString);
    this.eventObject.endDate = new Date(endDateString);
    this.eventObject.maxQuantity = this.eventDetail.value.maxQuantity;
    this.eventObject.attendanceFee = this.eventDetail.value.attendanceFee;
    this.eventObject.description = this.eventDetail.value.description;

    if (this.dateCompare(startDateString, endDateString)) {
      this.eventService.addEventURL(this.eventObject).subscribe(res=> {
        console.log("The result: " + res);
  
        if (res == null) swal('Event name already taken, please pick a new one.')
        else swal('Success! The Event was added!');
  
        this.getAllEvents();
      }, err=> {
        console.log("The error: " + err);
      });
    }
  }

  editEvent(event : Event) {
    this.eventDetail.controls['id'].setValue(event.id);
    this.eventDetail.controls['title'].setValue(event.title);

    let oldValues = [event.startDate, event.endDate];
    this.eventDetail.controls['oldStartDate'].setValue(oldValues[0]);
    this.eventDetail.controls['oldEndDate'].setValue(oldValues[1]);
    this.eventDetail.controls['startDate'].setValue(event.startDate);
    this.eventDetail.controls['endDate'].setValue(event.endDate);

    this.eventDetail.controls['maxQuantity'].setValue(event.maxQuantity);
    this.eventDetail.controls['attendanceFee'].setValue(event.attendanceFee);
    this.eventDetail.controls['description'].setValue(event.description);
  }

  updateEvent() {
    this.eventObject.id = this.eventDetail.value.id;
    this.eventObject.title = this.eventDetail.value.title;

    let startDateString = this.eventDetail.value.startDate.year + '-' + 
      ('0' + this.eventDetail.value.startDate.month).slice(-2) + '-' +
      ('0' + this.eventDetail.value.startDate.day).slice(-2);
    
    let endDateString = this.eventDetail.value.endDate.year + '-' + 
      ('0' + this.eventDetail.value.endDate.month).slice(-2) + '-' +
      ('0' + this.eventDetail.value.endDate.day).slice(-2);

    this.eventObject.startDate = new Date(startDateString);
    this.eventObject.endDate = new Date(endDateString);
    this.eventObject.maxQuantity = this.eventDetail.value.maxQuantity;
    this.eventObject.attendanceFee = this.eventDetail.value.attendanceFee;
    this.eventObject.description = this.eventDetail.value.description;

    if (this.dateCompare(startDateString, endDateString)) {
      this.eventService.updateEventURL(this.eventObject).subscribe(res=>{
        console.log("The result is: " + res);

        if (res == null) swal('Event name already taken, please pick a new one.')
        else swal('Success! The Event was updated!');
        
        this.getAllEvents();
      },err=>{
        console.log("The error is: " + err);
      })
    }
  }


  deleteEvent(event: Event) {
    this.eventService.deleteEventURL(event).subscribe(res=> {
      console.log("The result is: " + res);
      
      swal('Event deleted successfully');
      this.getAllEvents();
    }, err => {
      console.log("The error is: " + err);
    });
  }
  
}