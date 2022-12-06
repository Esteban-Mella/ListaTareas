import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import Swal from 'sweetalert2'
import { format, parseISO  } from 'date-fns';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  modoVisualizador!: string;
  modoVisualizadorCategorias!: string;

  listaTareas: any = [];
  isModalOpen: any = false;
  

  nombreTarea!: string;

  categories: any = [];
  nombreCategoria!: string;
  valor_cat!: number;
  estado!: string;
  fecha_inicial!: string;

  fechaI!: string;
  fechaT!: string;

  fecha_inicio!:any;
  fecha_termino!:any;
  id_tarea!:number;
  valCat!:string;
  id_cat!: number;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.modoVisualizador="todas";
    this.modoVisualizadorCategorias="todas";
    this.database.createDataBase().then(()=>{
      this.getCategory();
    });
    
  }

  ionViewDidEnter(){
    this.database.createDataBase().then(()=>{
      this.getTask();
      this.getCategory();
    });
    
  }

  selectorFiltro(filtro:string){
    this.modoVisualizador=filtro;
    this.getTask();
  }
  selectorFiltroCategorias(filtro:string){
    this.modoVisualizadorCategorias=filtro;
    this.getTask();
  }



  editarTarea(
    isOpen: boolean,
    id: number,
    nombre: string,
    fecha_inicio: any,
    fecha_termino: any,
    categoria: number,
    estado: string
    ){
    this.getCategory();
    this.id_tarea=id;
    this.isModalOpen=isOpen;
    this.nombreTarea=nombre;
    this.fecha_inicio =  new Date(fecha_inicio);
    this.fecha_termino = new Date(fecha_termino);
    this.valCat=categoria+"";
    this.id_cat=categoria;
    this.estado=estado;

  }
  cambioFecha1(event: any){
    this.fecha_inicial = event.detail.value;

  }

  cambioFecha2(event: any){
    this.fecha_termino = event.detail.value;

  }

  cancelar(){
    this.isModalOpen=false;
  }

  confirmar(){
    //name: string, id: number, dateStart: Date, dateEnd: Date, status: string, id_category: number

    if(this.nombreTarea!='' && this.id_tarea!=null && this.fecha_inicio!=null &&  this.fecha_termino!=null && this.estado!="" && this.valCat!= ""){

      this.database.updateTask(this.nombreTarea, this.id_tarea, this.fecha_inicio,  this.fecha_termino, this.estado, this.id_cat).then((respuesta)=>{
        if(respuesta==="Tarea Actualizada"){
          Swal.mixin({heightAuto: false,
          }).fire('Categoria Actualizada!', '', 'success');
        }else{
          Swal.mixin({heightAuto: false,
          }).fire('Compruebe los datos ingresados!', '', 'warning');
    
        }
      });
      this.getTask();
      this.isModalOpen=false;
    }else{
      Swal.mixin({heightAuto: false,
      }).fire('Compruebe los datos ingresados!', '', 'warning');

    }

  }

  eliminarTarea(id: number,name: string){
    Swal.fire({
      title: 'Esta seguro de eliminar: '+name+' ',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
      heightAuto: false,
     
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.database.deleteTask(id).then((respuesta)=>{
          Swal.mixin({heightAuto: false,
          }).fire('Categoria eliminada!', '', 'success');
          this.getTask();
        });
        
      }
    });
  }
  

  async getTask(){
    
    await this.database.getTask(this.modoVisualizador,this.modoVisualizadorCategorias).then((data) => {
      this.listaTareas = [];
      if(data.rows.length > 0){
        for(var i=0; i < data.rows.length; i++){
          this.listaTareas.push(data.rows.item(i));
        }
      }
    });
    
  }

  async getCategory(){
    
    await this.database.getCategories().then((data) => {
      this.categories = [];
      if(data.rows.length > 0){
        for(var i=0; i < data.rows.length; i++){
          this.categories.push(data.rows.item(i));
        }
      }
    });
    
  }

}
