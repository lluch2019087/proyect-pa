import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public modeloUsuario: Usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router) {

    this.modeloUsuario = new Usuario("","","","");
   }

  ngOnInit(): void {
  }
  registrar(){
    this._usuarioService.registro(this.modeloUsuario).subscribe(
      response=> {
        console.log(response)
        Swal.fire({
          title: 'Usuario creado correctamente',
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
        this._router.navigate(["/login"]);
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          title: 'Este usuario ya existe',
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
      }
    )
  }


}
