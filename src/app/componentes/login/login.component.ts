import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from "sweetalert2"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token: any;
  public identidad: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuarioModel = new Usuario("","","","");
  }

  ngOnInit(): void {
  }

  obtenerToken(){
    this._usuarioService.login(this.usuarioModel, "true").subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);

        Swal.fire({
          title: 'Haz ingresado correctamente',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })

      },error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario no identificado',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(<any>error)
      }
    )
  }
  login() {
    this._usuarioService.login(this.usuarioModel, "").subscribe(
      response =>{
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem("identidad", JSON.stringify(this.identidad))
        this.obtenerToken();
        console.log(this.identidad.rol);
        Swal.fire({
          title: 'Ingresaste correctamente',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })

       /* if(this.identidad.rol==="ROL_USUARIO"){

          this._router.navigate(["/principal"]);
          console.log(this.identidad.rol)

        }else if(this.identidad.rol==="ROL_ADMIN"){

          this._router.navigate(["/hoteles"]);
          console.log(this.identidad.rol)
        }
        else if(this.identidad.rol==="ROL_ADMINHOTEL"){

          this._router.navigate(["/todoshoteles"]);
          console.log(this.identidad.rol)
        }
*/ },error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario no identificado',
          showConfirmButton: false,
          timer: 1300
        })
        console.log(<any>error)
      }
    )
  }
  registrar(){
    this._usuarioService.registro(this.usuarioModel).subscribe(
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

