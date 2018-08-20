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
  isEdit;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    //  Get clients when connecting
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });

    this.isEdit = false;
  }

  //  TODO: Fields not empty
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

  //  Edit a client event
  onEditClick(client) {
    //  Render edit form
    this.isEdit = true;

    //  Fill form
    this._id = client._id;
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.email = client.email;
    this.phone = client.phone;
  }

  //  TODO: Do not update over existing user | Fields not empty
  //  Edit a client
  onEditSubmit() {
    let updateClient = {
      _id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone
    };

    //  Send to server and after that, update clients info in page
    this.clientService.updateClient(updateClient).subscribe(client => {
      //  Delete old client info
      for (let index = 0; index < this.clients.length; index++) {
        if (client._id == this.clients[index]._id) {
          this.clients.splice(index, 1);
        }
      }

      //  Update page
      this.clients.push(client);
      //  Clear form
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.phone = "";
      this.isEdit = false;
    });
  }
}
