import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  postEventURL : string;
  getEventURL : string;
  putEventURL : string;

  constructor(private http : HttpClient) { 
    this.postEventURL = 'http://localhost:9091/event/addEvent';
    this.getEventURL = 'http://localhost:9091/event/getAll';
    this.putEventURL = 'http://localhost:9091/event/updateEvent';
  }

  addEvent(event : Event): Observable<Event> {
    return this.http.post<Event>(this.postEventURL, event);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.getEventURL);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(this.putEventURL, event);
  }

  
}
