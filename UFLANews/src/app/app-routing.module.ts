<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'details/:id', canActivate: [AuthGuard], loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  //{ path: 'news-detail', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
=======
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'comments', loadChildren: './pages/comments/comments.module#CommentsPageModule' },
  { path: 'news-detail', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },  { path: 'subscriptions', loadChildren: './pages/subscriptions/subscriptions.module#SubscriptionsPageModule' },
  { path: 'search-publisher', loadChildren: './pages/search-publisher/search-publisher.module#SearchPublisherPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
>>>>>>> cad065d098e194a0d555e93ac7d3157922681c28
