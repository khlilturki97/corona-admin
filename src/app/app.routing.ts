import {Routes} from '@angular/router';
import {SignInComponent} from './authentication/sign-in/sign-in.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './_helper/auth.gard';
import {ClaimComponent} from './claim/claim.component';


export const AppRoutes: Routes = [
  {
    path: 'claims',
    component: ClaimComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'order/passed', pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
