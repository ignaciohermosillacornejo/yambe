import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule),
    // loadChildren: './modules/home/home.module#HomePageModule',
    // loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule),
    // loadChildren: 'src/app/modules/home/home.module#HomePageModule',
    // loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomePageModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
