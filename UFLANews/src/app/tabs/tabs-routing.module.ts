import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'boletim',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/boletim/boletim.module').then(m => m.BoletimPageModule)
          }
        ]
      },
      {
        path: 'boletim-detail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/boletim-detail/boletim-detail.module').then(m => m.BoletimDetailPageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },
      {
        path: 'subscriptions',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsPageModule)
          }
        ]
      },
      {
        path: 'comentarios',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/comments/comments.module').then(m => m.CommentsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/news',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/news',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
