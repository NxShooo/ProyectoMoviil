import { Component, OnInit } from '@angular/core';
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';
import { Usuario } from 'src/app/model/usuario';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.page.html',
  styleUrls: ['./crud-usuarios.page.scss'],
})
export class CrudUsuariosPage implements OnInit {

  Usuario:Usuario={ nombre_completo:'',correo:'',contrasena:'',nombre_usuario:'',Asistencia:false}
  lista_usuarios:Usuario[]=[]
  nuevo_usuario:Usuario={id:'',nombre_completo:'',correo:'',contrasena:'',nombre_usuario:'',Asistencia:false}
  sw:boolean=true

  constructor( private cp:CrudusuariosService , private tc :ToastController) { }

  ngOnInit() {
   this.listar()
  }
  async mensaje(texto:string){
    const Toast=await this.tc.create({
      message:texto,
      duration:1000,
      position:'bottom'
    })
    await Toast.present()
  }


  cancelar(){
    this.sw=false
  }
  actualizar(){
    this.cp.modificar_usuarios(this.nuevo_usuario).then(()=>{
      alert("modificar")
      this.sw=false;
    }).catch((err)=>{
      console.log(err)
    })
  }

  eliminar_user(id:any){
    console.log(id)
    this.cp.eliminar_usuarios(id).then(()=>{
      alert("eliminar")
    }).catch((err)=>{
      console.log(err);
    })
  }
  listar(){
    this.cp.listar().subscribe(data=>{
      this.lista_usuarios=data
    })
  }
  grabar(){
      this.cp.grabar(this.Usuario).then(()=>{

      }).catch((err)=>{
       console.log(err);
      })
  } 
  modificar(usuario:Usuario){
    this.nuevo_usuario=usuario
    this.sw=true
    
  }

}
