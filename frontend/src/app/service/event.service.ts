import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../model/event';
import { apiEvent } from '../const'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }

  getAllEventsURL(): Observable<Event[]> { 
    return this.http.get<Event[]>(`${apiEvent}/all`); }

  addEventURL(event : Event): Observable<Event> {
    return this.http.post<Event>(apiEvent, event);
  }

  updateEventURL(event: Event): Observable<Event> {
    return this.http.put<Event>(apiEvent, event);
  }

  deleteEventURL(event: Event) {
    return this.http.delete<Event>(`${apiEvent}/${event.id}`);
  }
  
}
