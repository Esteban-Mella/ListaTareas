import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonList, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import {DatabaseService} from '../services/database.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-config-categorias',
  templateUrl: './config-categorias.page.html',
  styleUrls: ['./config-categorias.page.scss'],
})



export class ConfigCategoriasPage implements OnInit {
  isModalOpen = false;
  categories: any = [];
  identificador: any;
  nombreCategoria!: string;
  nuevaCat!: string;

  

  @ViewChild(IonModal) modal!: IonModal ;
    name: string | undefined;
    id!: number;
    
  
  constructor(private database: DatabaseService) { } 
  
  ngOnInit() {
    this.database.createDataBase().then(()=>{
      this.getCategory();
    });
    
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
      
      this.modal.dismiss(this.name, 'confirm');
    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') 
    {
      if(ev.detail.data!=null){
        this.database.addCategory(`${ev.detail.data}`).then((data) => {
          Swal.mixin({
            heightAuto: false,
          }).fire(data);
        
        });
      }
      else{
        Swal.mixin({heightAuto: false,
        }).fire('Ingrese una categoria', '', 'error');
        
      }
      this.name=undefined;
      this.getCategory();
    }
  }

  editarModal(isOpen: boolean, identificador: number, nombreCat: string) {
    this.nuevaCat=nombreCat;
    this.isModalOpen = isOpen;
    this.id=identificador;
    this.nombreCategoria= nombreCat;

  }

  cancelar(){
    this.id=0;
    this.name="";
    this.isModalOpen=false;
  }
  confirmar(){
    
    if(this.nuevaCat!='' && this.nuevaCat!=null ){
      this.database.updateCategory(this.nuevaCat, this.id).then((respuesta)=>{

        Swal.mixin({heightAuto: false,
        }).fire('Categoria Editada!', '', 'success');
      });

      this.getCategory();
      this.nuevaCat="";
      this.isModalOpen=false;
    }else{
      Swal.mixin({heightAuto: false,
      }).fire('Ingrese una categoria!');

    }
    
    
  }

  eliminarCat(id: number,name: string){

    Swal.fire({
      title: 'Esta seguro de eliminar: '+name+' ',
      text: 'Se eliminaran las tareas asociadas!',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
      heightAuto: false,
     
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.database.deleteCategory(id).then((respuesta)=>{
          Swal.mixin({heightAuto: false,
          }).fire('Categoria eliminada!', '', 'success');
   
          this.getCategory();
          
        });
        
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


