import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { jsDocComment } from '@angular/compiler';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  eventDetail !: FormGroup;   // The Form that is sent from the modal

  eventObject : Event = new Event();    // For the addEvent() method
  eventList : Event[] = [];     // For the getAllEvents() method

  startDateModel : NgbDateStruct;
  endDateModel : NgbDateStruct;

  constructor(private formBuilder : FormBuilder, private eventService : EventService) { }

  ngOnInit(): void {

    this.getAllEvents();

    this.eventDetail = this.formBuilder.group({
      id : [''],
      title : [''],
      old_start_date : [''],
      start_date : [''],
      old_end_date : [''],
      end_date : [''],
      attendance_fee : [''],
      max_quantity : [''],
      description : ['']
    });
  }

  fetchDateSelected() {
    console.log("The Start Date is: " + this.startDateModel);
    console.log("The End date is: " + this.endDateModel);
  }

  addEvent() {

    // If the dates are the same
    if (this.eventDetail.value.start_date.day === this.eventDetail.value.end_date.day &&
        this.eventDetail.value.start_date.week === this.eventDetail.value.end_date.week &&
        this.eventDetail.value.start_date.year === this.eventDetail.value.end_date.year) {
          alert("Warning the dates are the same!")
        }
    
    if (this.eventDetail.value.end_date.year >= this.eventDetail.value.start_date.year) {
      alert("correct 1");
      if (this.eventDetail.value.end_date.month >= this.eventDetail.value.start_date.month) {
        alert("correct 2");
        if (this.eventDetail.value.end_date.day > this.eventDetail.value.start_date.day) {
          alert ("correct 3");
        }
      }
    }

    

    console.log("start date: " + this.eventDetail.value.start_date);
    this.eventObject.id = this.eventDetail.value.id;
    this.eventObject.title = this.eventDetail.value.title;

    this.eventObject.start_date = this.eventDetail.value.start_date.day + "-" +
      this.eventDetail.value.start_date.month + "-" +
      this.eventDetail.value.start_date.year;

    this.eventObject.end_date = this.eventDetail.value.end_date.day + "-" +
      this.eventDetail.value.end_date.month + "-" +
      this.eventDetail.value.end_date.year;

    this.eventObject.max_quantity = this.eventDetail.value.max_quantity;
    this.eventObject.attendance_fee = this.eventDetail.value.attendance_fee;
    this.eventObject.description = this.eventDetail.value.description;

    this.eventService.addEvent(this.eventObject).subscribe(res=> {
      console.log("The result: " + res);
      alert("huh why?");
      this.getAllEvents();
    }, err=> {
      console.log("The error: " + err);
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res =>{
      this.eventList = res;
      console.log("Yay it works:" + res[0].title);
    }, err =>{
      console.log("The error is: " + err);
    });
  }


  editEvent(event : Event) {
    this.eventDetail.controls['id'].setValue(event.id);
    this.eventDetail.controls['title'].setValue(event.title);

    let oldValue = [event.start_date, event.end_date];
    this.eventDetail.controls['old_start_date'].setValue(oldValue[0]);
    this.eventDetail.controls['old_end_date'].setValue(oldValue[1]);

    this.eventDetail.controls['start_date'].setValue(event.start_date);
    this.eventDetail.controls['end_date'].setValue(event.end_date);

    this.eventDetail.controls['max_quantity'].setValue(event.max_quantity);
    this.eventDetail.controls['attendance_fee'].setValue(event.attendance_fee);
    this.eventDetail.controls['description'].setValue(event.description);
  }

  updateEvent() {
    console.log("start date: " + this.eventDetail.value.start_date);
    this.eventObject.id = this.eventDetail.value.id;
    this.eventObject.title = this.eventDetail.value.title;

    this.eventObject.start_date = this.eventDetail.value.start_date.day + "-" +
      this.eventDetail.value.start_date.month + "-" +
      this.eventDetail.value.start_date.year;

    this.eventObject.end_date = this.eventDetail.value.end_date.day + "-" +
      this.eventDetail.value.end_date.month + "-" +
      this.eventDetail.value.end_date.year;

    this.eventObject.max_quantity = this.eventDetail.value.max_quantity;
    this.eventObject.attendance_fee = this.eventDetail.value.attendance_fee;
    this.eventObject.description = this.eventDetail.value.description;

    this.eventService.updateEvent(this.eventObject).subscribe(res=>{
      console.log(res);
      this.getAllEvents();
    },err=>{
      console.log(err);
    })

  }

  
}



