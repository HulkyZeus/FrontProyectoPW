import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  //PORQUE EL COMPONENTE NO TIENE CONTENIDO VISIBLE
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //SE ELIMINA LA SESION O SE CIERRA
    this.adminService.deleteSession();
    //REDIRIGE AL USUARIO A LA PAGINA DE LOGUEO
    this.router.navigateByUrl("/admin")
  }

}
