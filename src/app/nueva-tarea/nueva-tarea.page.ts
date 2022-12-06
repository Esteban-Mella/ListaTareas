import { Component, OnInit } from '@angular/core';
import { format, parseISO  } from 'date-fns';
import {DatabaseService} from '../services/database.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.page.html',
  styleUrls: ['./nueva-tarea.page.scss'],
})
export class NuevaTareaPage implements OnInit {
  
  categories: any = [];
  nombreCategoria!: string;
  valor_cat!: number;
  fechaI!: string;
  fechaT!: string;


  constructor(private database: DatabaseService) {} 
  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.database.createDataBase().then(()=>{
      this.getCategory();
    });
  }

  private dateValue_inicio: any;
  private dateValue_termino: any;
  

  get fecha_inicio(): any {
    return this.dateValue_inicio;
  }
  set fecha_inicio(value: any) {
 
    this.dateValue_inicio = value;
  }
  get fecha_termino(): any {
    return this.dateValue_termino;
  }
  set fecha_termino(value: any) {
    this.dateValue_termino = value;
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
  valores(valor_cat: number){
    this.valor_cat=valor_cat;
  }
  fechaIn(val: any){
    this.fechaI=val;
  }
  fechaTe(val: any){
    this.fechaT=val;
  }


  nuevaTarea(){
    //task_name, date_start, date_end, status, id_category
    if(this.nombreCategoria!='' && this.fecha_inicio!='' && this.fecha_termino!='' && this.valor_cat!=0){

      this.database.addTask(this.nombreCategoria,this.fecha_inicio,this.fecha_termino,"pendiente",this.valor_cat).then((data) => {
        if(data==="Tarea Creada"){
          Swal.mixin({heightAuto: false,
          }).fire('Categoria creada!', '', 'success');
          
        }else{
          Swal.mixin({heightAuto: false,
          }).fire('Error, verifique los datos!', '', 'warning');
        }
      });
    }else{
      Swal.mixin({heightAuto: false,
      }).fire('Error, verifique los datos!', '', 'warning');
    }
    

    this.nombreCategoria="";
    this.valor_cat=0;
    this.fecha_inicio="";
    this.fecha_termino="";
  }

}
