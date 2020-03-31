import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { CreateAccountComponent } from './authentication/create-account/create-account.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import {SharedModule} from './_modules/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClaimComponent } from './claim/claim.component';
import {SettingsComponent} from './layout/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SignInComponent,
    CreateAccountComponent,
    AdminProfileComponent,
    NotFoundComponent,
    SettingsComponent,
    ClaimComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpClientModule,
    SharedModule
  ],
  exports: [HeaderComponent, NavbarComponent, FooterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
