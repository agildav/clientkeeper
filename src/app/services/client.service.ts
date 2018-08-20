import { Injectable } from "@angular/core";

import { Http } from "@angular/http";

import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
  constructor(private http: Http) {}
  getClients() {
    const serverURL = "http://localhost:3000/api/clients";
    return this.http.get(serverURL).pipe(map(res => res.json()));
  }
}
