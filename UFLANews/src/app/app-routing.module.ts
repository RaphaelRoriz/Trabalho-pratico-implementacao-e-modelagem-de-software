import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'boletim', loadChildren: './pages/boletim/boletim.module#BoletimPageModule' },
  { path: 'details/:id', canActivate: [AuthGuard], loadChildren: './pages/boletim-detail/boletim-detail.module#BoletimDetailPageModule' },
  //{ path: 'news-detail/:id', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'perfil',canActivate: [AuthGuard], loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'comentarios',canActivate: [AuthGuard], loadChildren: './pages/comments/comments.module#CommentsPageModule' },
  { path: 'subscriptions',canActivate: [AuthGuard], loadChildren: './pages/subscriptions/subscriptions.module#SubscriptionsPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
