import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDTO } from '../models/eventDTO.model';
import { UserDTO } from '../models/userDTO.model';
import { FilterDTO } from '../models/filterDTO.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //URL PARA LLAMAR A LA API
  private url: string = environment.urlBase

  constructor(
    private http: HttpClient
  ) { }
    //METODO PARA OBTENER LA LISTA DE EVENTOS
  getEvents() {
    return this.http.get<any>(`${this.url}/events`);
  }
  //METODO PARA OBTENER LOS DETALLES DE UN EVENTO ESPECIFICO
  getEvent(id: string | null) {
    return this.http.get<any>(`${this.url}/events/event/${id}`);
  }
  //METODO PARA GUARDAR UN NUEVO EVENTO
  saveEvent(event : EventDTO) {
    return this.http.post<any>(`${this.url}/admin/save`, event);
  }
  //METODO PARA ACTUALIZAR UN EVENTO EXISTENTE
  updateEvent(event : EventDTO) {
    return this.http.put<any>(`${this.url}/admin/edit`, event);
  }
  //METODO PARA ELIMINAR UN EVENTO
  deleteEvent(id: number) {
    return this.http.delete<any>(`${this.url}/admin/delete/${id}`)
  }
   //METODO PARA REALIZAR EL INICIO DE SESION
  login(user: UserDTO) {
    return this.http.post<any>(`${this.url}/admin/login`, user)
  }
  //METODO PARA SUBIR UNA IMAGEN
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.url}/admin/file_upload`, formData);
  }
  //METODO PARA FILTRAR EVENTOS
  filterEvents(filter: FilterDTO) {
    return this.http.post<any>(`${this.url}/events/filter`, filter);
  }
  //METODO PARA OBTENER LA INFORMACION DE LA SESION ALMACENADA EN EL LOCALSTORAGE
  getSession() {
    let datosString = localStorage.getItem("session");

    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return null;
    }
  }

  //METODO PARA ESTABLECER LA INFO DE LA SESION EN EL LOCALSTORAGE
  setSession(success: boolean) {
    let data = JSON.stringify(success);
    localStorage.setItem("session", data);
  }
  //METODO PARA ELIMINAR LA INFO DE LA SESION DEL LOCALSTORAGE
  deleteSession() {
    localStorage.removeItem("session");
  }
}
