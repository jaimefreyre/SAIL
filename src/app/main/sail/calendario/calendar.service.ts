import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';

import { BehaviorSubject, Observable } from 'rxjs';

import { EventRef, calendarioServer, listcalendarioServer } from 'app/main/sail/calendario/calendar.model';
@Injectable()
export class CalendarService implements Resolve<any> {
  // Public
  public events = [];
  public calendar;
  public currentEvent;
  public tempEvents;

  public onEventChange: BehaviorSubject<any>;
  public onCurrentEventChange: BehaviorSubject<any>;
  public onCalendarChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    this.onEventChange = new BehaviorSubject({});
    this.onCurrentEventChange = new BehaviorSubject({});
    this.onCalendarChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents(), this.getCalendar()]).then(res => {
        resolve(res);
      }, reject);
    });
  }

  /**
   * Get Events
   */
  getEvents(): Promise<any[]> {
    // const url = `api/calendar-events`;
    /*
      /lead_calendar/?start=2021-11-29&end=2022-01-10&_=1639492734328&user=87
      ¿Que son Kpis?
      /lead_calendar/kpis/? end = 2022 - 01 - 10 & start=2021 - 11 - 29 & user=87
      /lead_calendar/kpis/? end = 2022 - 01 - 10 & result=positive & start=2021 - 11 - 29 & user=87
    */

    //  2022 - 01-10

    let hoy = new Date();
    let primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    let ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
    let f = new Date();
    f.getDate() + "-" + f.getMonth() + "-" + f.getFullYear();
  
    let startCalendar = f.getFullYear() + "-" + primerDia.getDay() + "-" +f.getMonth() ;
    let endCalendar = f.getFullYear() + "-" + ultimoDia.getDay() + "-" +f.getMonth() ;
    
    const url = "/API_BASE/lead_calendar/?start="+startCalendar+"&end="+endCalendar+"&_=1639492734328&user=87";
    console.log(url);

    // {
    //   id: 7,
    //     url: '',
    //       title: 'Dinner',
    //         start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -13),
    //           end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -12),
    //             allDay: true,
    //               calendar: 'Family',
    //                 extendedProps: {
    //     location: 'Moscow',
    //       description: 'The party club'
    //   }
    // },

    // allDay: false
    // color: "#009688"
    // description: "Lead no atendido"
    // end: "2021-03-13T11:20:59.411907+01:00"
    // id: 55963
    // resourceIds: 55963
    // selectable: true
    // start: "2021-03-13T11:05:59.411907+01:00"
    // textColor: "#000000"
    // title: "SUNIL


    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: [calendarioServer]) => {
        console.log(response);
        // for (let cita in response) {
          response.forEach(function (cita) {
            let citaSet = {
              id: cita.id, 
              url: " ",
              title: cita.title,
              start: cita.start,
              end: cita.end,
              allDay: cita.allDay,
              calendar: cita.description,
              extendedProps: {
                location: " ",
                description: cita.description
              }
            }
            this.events.push(citaSet)
          });
        
          // }
        // this.events = response;
        this.tempEvents = response;
        this.onEventChange.next(this.events);
        resolve(this.events);
      }, reject);
    });
  }

  getEventsObservable(): Observable<any>{
 

    // let startCalendar = moment("MM-" + primerDia.getDate() + "-YYYY");
    // let endCalendar = moment("MM-" + ultimoDia.getDate() + "-YYYY");

    // using slice
    // let date = new Date();
    // let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    // let month = `0${date.getMonth() + 1}`.slice(-2);
    // let year = date.getFullYear();
        
    // console.log(`${day}-${month}-${year}`);

    let hoy = new Date();
    let primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    let ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    let f = new Date();
    f.getDate() + "-" + f.getMonth() + "-" + f.getFullYear();

    let startCalendar = f.getFullYear() + "-" + primerDia.getDay() + "-" + f.getMonth();
    let endCalendar = f.getFullYear() + "-" + ultimoDia.getDay() + "-" + f.getMonth();

    const url = "/API_BASE/lead_calendar/?start=" + startCalendar + "&end=" + endCalendar + "&_=1639492734328&user=87";
    console.log(url);
    return this._httpClient.get(url);
    // .subscribe((response: any) => {
    //   console.log(response);
    //   this.events = response;
    //   this.tempEvents = response;
    //   this.onEventChange.next(this.events);
    // }, 
    // (err)=>{console.log(err)}
    // )
  }
  
  
  /**
   * Get Calendar
   */
  getCalendar(): Promise<any[]> {
    const url = `api/calendar-filter`;

    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.calendar = response;
        this.onCalendarChange.next(this.calendar);
        resolve(this.calendar);
      }, reject);
    });
  }

  /**
   * Create New Event
   */
  createNewEvent() {
    this.currentEvent = {};
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Calendar Update
   *
   * @param calendars
   */
  calendarUpdate(calendars) {
    const calendarsChecked = calendars.filter(calendar => {
      return calendar.checked === true;
    });

    let calendarRef = [];
    calendarsChecked.map(res => {
      calendarRef.push(res.filter);
    });

    let filteredCalendar = this.tempEvents.filter(event => calendarRef.includes(event.calendar));
    this.events = filteredCalendar;
    this.onEventChange.next(this.events);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  deleteEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient.delete('api/calendar-events/' + event.id).subscribe(response => {
        this.getEvents();
        resolve(response);
      }, reject);
    });
  }

  /**
   * Add Event
   *
   * @param eventForm
   */
  addEvent(eventForm) {
    const newEvent = new EventRef();
    newEvent.url = eventForm.url;
    newEvent.title = eventForm.title;
    newEvent.start = eventForm.start;
    newEvent.end = eventForm.end;
    newEvent.allDay = eventForm.allDay;
    newEvent.calendar = eventForm.selectlabel;
    newEvent.extendedProps.location = eventForm.location;
    newEvent.extendedProps.description = eventForm.description;
    newEvent.extendedProps.addGuest = eventForm.addGuest;
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
    this.postNewEvent();
  }

  /**
   * Update Event
   *
   * @param eventRef
   */
  updateCurrentEvent(eventRef) {
    const newEvent = new EventRef();
    newEvent.allDay = eventRef.event.allDay;
    newEvent.id = parseInt(eventRef.event.id);
    newEvent.url = eventRef.event.url;
    newEvent.title = eventRef.event.title;
    newEvent.start = eventRef.event.start;
    newEvent.end = eventRef.event.end;
    newEvent.calendar = eventRef.event.extendedProps.calendar;
    newEvent.extendedProps.location = eventRef.event.extendedProps.location;
    newEvent.extendedProps.description = eventRef.event.extendedProps.description;
    newEvent.extendedProps.addGuest = eventRef.event.extendedProps.addGuest;
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Post New Event
   */
  postNewEvent() {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/calendar-events/', this.currentEvent).subscribe(response => {
        this.getEvents();
        resolve(response);
      }, reject);
    });
  }

  /**
   * Post Updated Event
   *
   * @param event
   */
  postUpdatedEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/calendar-events/' + event.id, { ...event }).subscribe(response => {
        this.getEvents();
        resolve(response);
      }, reject);
    });
  }
}





// Peticiones
// Get Filter https://sail.artificialintelligencelead.com/api/lead_calendar/?start=2021-11-29&end=2022-01-10&_=1639492734328&user=87
// Get Filter https://sail.artificialintelligencelead.com/api/lead_calendar/kpis/?end=2022-01-10&start=2021-11-29&user=87
// GET Filter https://sail.artificialintelligencelead.com/api/lead_calendar/kpis/?end=2022-01-10&result=positive&start=2021-11-29&user=87