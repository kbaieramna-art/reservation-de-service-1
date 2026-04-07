import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
reservationURL: string = 'http://localhost:3000/reservation'; //  your URL

  constructor(private httpClient: HttpClient) { 
    
  }
  addreservation(reservation:any){
  let fdata=new FormData();
    fdata.append('fullname',reservation.fullName);
    fdata.append('email',reservation.email);
    fdata.append('date',reservation.date);
    fdata.append('time',reservation.time);
    fdata.append('phone',reservation.phone);
    fdata.append('service',reservation.service);
    fdata.append('prestataireid',reservation.prestatireid);
    return this.httpClient.post<({ msg: string })>(this.reservationURL + "/addreservation", fdata);
  }
}
