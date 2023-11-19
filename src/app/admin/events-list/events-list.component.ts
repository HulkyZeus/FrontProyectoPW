import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  //LISTA DE EVENTOS
  list: any[] = [];
  //SE INYECTA EL SERVICIO DE ADMINSERVICE
  constructor(
    private adminService: AdminService
  ) { }
  //METODO EJECUTADO AL INICIALIZAR EL COMPONENTE
  ngOnInit(): void {
    this.getEvents()
  }
  //METODO PARA OBTENER LA LISTA DE EVENTOS
  getEvents() {
    this.adminService.getEvents().subscribe(resp => {
      //ASIGNA LA RESPUESTA DEL SERVICIO A LA LISTA
      this.list = resp
      //FORMATEA LA FECHA DEL EVENTO USANDO LA BIBLIOTECA MOMENT
      this.list.forEach(element => {
        element.date = moment(element.date).format('lll')
      });
    })
  }
  //METODO PARA ELIMINAR EL EVENTO SEGUN SU ID
  deleteEvent(id: number) {
    this.adminService.deleteEvent(id).subscribe((resp: any) => {
      //MUESTRA UN MENSAJE DE ALERTA
      alert(resp.message)
      //ACTUALIZA LA LISTA DE EVENTOS DESPUES DE ELIMINAR ALGUN EVENTO
      this.getEvents()
    })
  }
}
