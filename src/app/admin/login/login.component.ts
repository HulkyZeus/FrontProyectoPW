import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { UserDTO } from '../models/userDTO.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //HACE REFERENCIA AL FORMULARIO DE LOGEO CONTENIDO EN EL HTML
  @ViewChild('formValid', { static: false }) formEvent: ElementRef | undefined;
  //MODELO DE USUARIO PARA ALMACENAR LOS DATOS DEL FORMULARIO
  user: UserDTO = new UserDTO()

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  //METODO QUE MANEJA EL PROCESO DE INICIO DE SESION DEL ADMIN
  login(event: any) {
    //'WAS VALIDATED' PARA QUE MUESTRE EL MENSAJE DE VALIDACION
    if (this.formEvent) {
      this.formEvent.nativeElement.classList.add('was-validated');
    }
    //VERIFICA LA VALIDEZ DEL FORMULARIO(QUE TODO ESTE LLENO)
    if (this.formEvent && !this.formEvent.nativeElement.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    //SE REALIZA LA LLAMADA AL SERVICIO DE INICIAR SESION
    this.adminService.login(this.user).subscribe(resp => {
      //MUESTRA UN MENSAJE CON LA RESPUESTA DEL SERVICIO
      alert(resp.message)
      //SI EL INICIO DE SESION ES EXITOSO, SE ESTABLECE LA CONEXION Y REDIRIGE AL USUARIO A LA PAGINA DE EVENTOS
      if (resp.success) {
        this.adminService.setSession(resp.success)
        this.router.navigateByUrl("/admin/dash/events")
      }
    })
  }

}
