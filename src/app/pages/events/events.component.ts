import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventDTO } from 'src/app/admin/models/eventDTO.model';
import { FilterDTO } from 'src/app/admin/models/filterDTO.model';
import { AdminService } from 'src/app/admin/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  list: EventDTO[] = [];
  listBackup: EventDTO[] = [];
  filterEvent: FilterDTO = new FilterDTO()
  urlPictures: string = ""
  event: EventDTO = new EventDTO

  constructor(
    private adminService: AdminService
  ) {
    this.urlPictures = environment.urlPictures
  }

  ngOnInit(): void {
    this.getEvents()
  }

  getEvents() {
    this.adminService.getEvents().subscribe(resp => {
      this.list = this.parseDateList(resp);
      this.listBackup = this.parseDateList(resp);
    })
  }

  filterEvents() {
    this.adminService.filterEvents(this.filterEvent).subscribe(resp => {
      if (resp.length > 0) {
        this.list = this.parseDateList(resp);
      } else {
        alert(resp.message)
        this.list = this.listBackup
      }
    })
  }

  parseDateList(list: EventDTO[]) {
    list.forEach(element => {
      element.date = moment(element.date).format('lll')
    });

    return list
  }

  showDetail(event: EventDTO) {
    this.event
    }
    }

