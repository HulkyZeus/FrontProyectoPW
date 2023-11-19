import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDTO } from '../models/eventDTO.model';
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  //SE HACE REFERENCIA AL FORMULARIO USANDO VIEWCHILD(COMO PARA LLAMAR AL HIJO)
  @ViewChild('formValid', { static: false }) formEvent: ElementRef | undefined;

  //SE ALMACENAN LOS DATOS
  form: EventDTO = new EventDTO();
  //ID DEL EVENTO
  id: string = "";
  //PARA ALMACENAR EL ARCHIVO SELECCIONADO(IMAGEN)
  selectedFile!: File;

  //CONSTRUCTOR DEL COMPONENTE, INYECTA LOS SERVICIOS NECESARIOS
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //SE OBTIENE EL ID DEL EVENTO DE SEGUN LOS PARAMETROS DE LA RUTA
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? "0";
    })
  }

  //METODO EJECUTADO AL INICIALIZAR EL COMPONENTE
  ngOnInit(): void {
    this.getEvent()
  }
  //METODO PARA OBTENER LOS DETALLES DEL EVENTO
  getEvent() {
    this.adminService.getEvent(this.id).subscribe(resp => {
      this.form = resp;
    })
  }
  //METODO EJECUTADO AL SELECCIONAR UNA IMAGEN
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  //METODO EJECUTADO AL ENVIAR EL FORMULARIO
  submit(event: any) {
    //LA CLASE 'WAS VALIDATED' ES PARA MOSTRAR EL MENSAJE DE VALIDACION DE BOOTSTRAP
    if (this.formEvent) {
      this.formEvent.nativeElement.classList.add('was-validated');
    }
    //VERIFICA LA VALIDEZ DEL FORMULARIO
    if (this.formEvent && !this.formEvent.nativeElement.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    //PARA GUARDAR O ACTUALIZAR EL EVENTO
    if (this.form.id == 0) {
      //SI HAY IMAGEN, LA GUARDA Y LUEGO GUARDA EL EVENTO.
      if(this.selectedFile) {
        //ASIGNA EL NOMBRE DEL ARCHIVO
        this.form.picture = this.selectedFile.name;
        //SUBE LA IMAGEN AL SERVIDOR
        this.adminService.uploadFile(this.selectedFile).subscribe(resp => {
          if (resp.success) {
            //GUARDA EL EVENTO EN LA BASE DE DATOS
            this.adminService.saveEvent(this.form).subscribe(resp => {
              if(resp.success) {
                alert(resp.message)
                this.router.navigateByUrl("/admin/events");
              } else {
                alert(resp.message)
              }
            })
          } else {
            alert(resp.message)
          }
        })
      } else {
        //SE GUARDA EL EVENTO SIN IMAGEN
        this.adminService.saveEvent(this.form).subscribe(resp => {
          if(resp.success) {
            alert(resp.message)
            this.router.navigateByUrl("/admin/events");
          } else {
            alert(resp.message)
          }
        })
      }
    } else {
      //ACTUALIZA LA IMAGEN PARA UN EVENTO EXISTENTE Y LUEGO LO ACTUALIZA EL EVENTO
      if(this.selectedFile) {
        this.form.picture = this.selectedFile.name;
        this.adminService.uploadFile(this.selectedFile).subscribe(resp => {
          if (resp.success) {
            this.adminService.updateEvent(this.form).subscribe(resp => {
              if(resp.success) {
                alert(resp.message)
                this.router.navigateByUrl("/admin/events");
              } else {
                alert(resp.message)
              }
            })
          } else {
            alert(resp.message)
          }
        })
      } else {
        //ACTUALIZA EL EVENTO SIN CAMBIAR LA IMAGEN
        this.adminService.updateEvent(this.form).subscribe(resp => {
          if(resp.success) {
            alert(resp.message)
            this.router.navigateByUrl("/admin/events");
          } else {
            alert(resp.message)
          }
        })
      }
    }
  }

}
