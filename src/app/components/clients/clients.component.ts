import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "clients",
  templateUrl: "./clients.component.html"
})
export class ClientsComponent implements OnInit {
  //  Props
  clients;
  _id;
  first_name;
  last_name;
  email;
  phone;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    //  Get clients when connecting
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  //  Add a client
  onAddSubmit() {
    let newClient = {
      _id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    };

    //  Send to server and after that, update clients info in page
    this.clientService.saveClients(newClient).subscribe(client => {
      //  Update page
      this.clients.push(client);
      //  Clear form
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.phone = "";
    });
  }
}
