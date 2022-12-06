import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'tareas',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then( m => m.TareasPageModule)
  },
  {
    path: 'nueva-tarea',
    loadChildren: () => import('./nueva-tarea/nueva-tarea.module').then( m => m.NuevaTareaPageModule)
  },
  {
    path: 'config-categorias',
    loadChildren: () => import('./config-categorias/config-categorias.module').then( m => m.ConfigCategoriasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
