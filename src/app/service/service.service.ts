import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  servicesURL: string = 'http://localhost:3000/services'; //  your URL

  constructor(private httpClient: HttpClient) { }
  addservice(service: any, serviceimg: File) {
    let fdata = new FormData();
    fdata.append('image', serviceimg);
    fdata.append('name', service.name);
    fdata.append('discription', service.discription);
    fdata.append('price', service.price);
    fdata.append('prestataireemail', service.prestataireemail);
    return this.httpClient.post<{ msg: string, isadded: boolean }>(this.servicesURL + "/addservice", fdata);
  }
  Deletservicebyid(id: any) {
    return this.httpClient.delete<{ msg: boolean }>(this.servicesURL + "/delet/" + id)
  }
  editservice(newservice: any, id: any) {
    return this.httpClient.put<{ msg: boolean }>(this.servicesURL + "/edit/" + id, newservice)
  }
  Getallservices() {
    return this.httpClient.get<{ tab: any }>(this.servicesURL + "/allservice");
  }
  Getservicebyprestaitre(email: string) {
    return this.httpClient.get<{ tab: any }>(this.servicesURL + "/servicebyemail" + email);
  }
  Getservicebyid(id: any) {
    return this.httpClient.get<{ serviceobj: any ,prestataireinfo:any}>(this.servicesURL + "/" + id)
  }
}