import { Injectable } from "@angular/core";

import { Http, Headers } from "@angular/http";

import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
  //  Props
  serverURL = "http://localhost:3000/api/clients";

  constructor(private http: Http) {}

  //  Get list of clients from server
  getClients() {
    return this.http.get(this.serverURL).pipe(map(res => res.json()));
  }

  //  Save a client in server
  saveClients(newClient) {
    let headers = new Headers();
    //  Set headers
    headers.append("Content-Type", "application/json");

    //  Post to server
    return this.http
      .post(this.serverURL, newClient, { headers })
      .pipe(map(res => res.json()));
  }
}
