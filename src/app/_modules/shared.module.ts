import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import fr from '@angular/common/locales/fr';
import {fr_FR, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {BlockUiDirective} from '../_directives/block-ui.directive';
import {LoaderInterceptor} from '../_interceptors/loader.interceptor';
import {ErrorInterceptor} from '../_interceptors/error.interceptor';
import {AuthInterceptor} from '../_interceptors/auth.interceptor';
import {DatatableComponent} from '../datatable/datatable.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    BlockUiDirective,
    DatatableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule,
    HttpClientModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: NZ_I18N, useValue: fr_FR}

  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BlockUiDirective,
    NgZorroAntdModule,
    DatatableComponent,
  ]
})

export class SharedModule {
}
