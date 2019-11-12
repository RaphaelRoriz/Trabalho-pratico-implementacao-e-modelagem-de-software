import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
<<<<<<< HEAD
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' }
=======
  { path: 'news', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'news-detail', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' }
>>>>>>> 064db5d2116d9e9ccc638b0106a52355954e32eb
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
