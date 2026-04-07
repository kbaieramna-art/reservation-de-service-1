import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }
  adduser(user: any ,img:File) {
    let fdata=new FormData();
    fdata.append('photo',img);
    fdata.append('firstname',user.firstname);
    fdata.append('lastname',user.lastname);
    fdata.append('email',user.email);
    fdata.append('password',user.password);
    fdata.append('role',user.role);
    fdata.append('status',user.status);
    fdata.append('location',user.location);
    return this.httpClient.post<({ msg: string })>(this.userURL + "/signup", fdata);

  }
  login(user: any) {
    return this.httpClient.post<({ msg: string , user:string })>(this.userURL + "/login", user);
  }
   Search(speciality: any) {
    return this.httpClient.post<{tab:any}>(this.userURL + "/search/prestataire",speciality);
  }
  Getallusers() {
    return this.httpClient.get<{ tab: any }>(this.userURL + "/allusers");
  }
  
  Deletuser(id: any) {
    return this.httpClient.delete<{ msg: boolean }>(this.userURL + "/deletuser/" + id)
  }
  
  validate( id: any) {
    return this.httpClient.get<{ msg: string }>(this.userURL + "/validate"+"/"+ id)
  }
   Editprestataire(newpres: any) {
    return this.httpClient.put<({ msg: boolean })>(this.userURL+"/edit", newpres);
  }
  

}
