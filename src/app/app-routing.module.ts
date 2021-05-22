import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'game',
    children: [
      {
        path: '',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./pages/join-create-game/join-create-game.module').then(m => m.JoinCreateGamePageModule),
        pathMatch: 'full',
      },
      {
        path: 'new',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./pages/new-game/game.module').then(m => m.GamePageModule),
        pathMatch: 'full',
      },
      {
        path: ':id',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./pages/game/game.module').then(m => m.GamePageModule),
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
