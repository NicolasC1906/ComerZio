import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './modulos/menu/menu.component';
import { FooterComponent } from './modulos/footer/footer.component';
import { PopUpComponent } from './modulos/pop-up/pop-up.component';
import { HomeComponent } from './Paginas/home/home.component';
import { PromosComponent } from './Paginas/home/promos/promos.component';
import { CategoriasComponent } from './Paginas/home/categorias/categorias.component';
import { ErrorComponent } from './Paginas/404/error/error.component';
import { BannersComponent } from './Paginas/home/banners/banners.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './Paginas/home/Productos/productos/productos.component';
import { InfoProductoComponent } from './Paginas/info-producto/info-producto/info-producto.component';
import { RegistroComponent } from './Paginas/usuario/registro/registro.component';
import { LoginComponent } from './Paginas/usuario/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeriasComponent } from './Paginas/Ferias/ferias/ferias.component';
import { CategoriaPComponent } from './paginas/categoria-p/categoria-p.component';
import { PerfilComponent } from './Paginas/usuario/perfil/perfil.component';
import { CheckoutComponent } from './Paginas/checkout/checkout.component';
import { ComingSoonComponent } from './Paginas/coming-soon/coming-soon.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Paginas/usuario/dashboard/dashboard.component';
import { ListaComprasComponent } from './Paginas/ListaCompras/lista-compras/lista-compras.component';
import { CheckOutListaComponent } from './Paginas/ListaCompras/lista-compras/check-out-lista/check-out-lista.component';
import { BuscadorPipe } from './pipes/buscador.pipe';
import { PoliticasComponent } from './Paginas/politicas/politicas.component';
import { TerminosComponent } from './Paginas/terminos/terminos.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { StoriesService } from './stories.service';
import { OfertasComponent } from './Paginas/ofertas/ofertas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TiendasComponent } from './Paginas/tiendas/tiendas.component';
import { BuscadorTiendasPipe } from './pipes/buscador-tiendas.pipe';
import { TendenciasComponent } from './Paginas/tendencias/tendencias.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    PopUpComponent,
    HomeComponent,
    PromosComponent,
    CategoriasComponent,
    ErrorComponent,
    BannersComponent,
    ProductosComponent,
    InfoProductoComponent,
    RegistroComponent,
    LoginComponent,
    FeriasComponent,
    CategoriaPComponent,
    PerfilComponent,
    CheckoutComponent,
    ComingSoonComponent,
    DashboardComponent,
    ListaComprasComponent,
    CheckOutListaComponent,
    BuscadorPipe,
    PoliticasComponent,
    TerminosComponent,
    OfertasComponent,
    TiendasComponent,
    BuscadorTiendasPipe,
    TendenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCmcNjMlyY-Wj-fHACTjqKb4-JlssQiMIU',
      authDomain: 'lamejorferia-32065.firebaseapp.com',
      databaseURL: 'https://lamejorferia-32065.firebaseio.com',
      projectId: 'lamejorferia-32065',
      storageBucket:'lamejorferia-32065.appspot.com',
      messagingSenderId: '864645989304'
    }),
    AngularFireDatabaseModule,
    SocialLoginModule,
  ],
  providers: [
    StoriesService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '864645989304-8kbns9jgtcmig3egoiqps8roqrprqo3l.apps.googleusercontent.com'
            )
          },
          
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('238007411462227')
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
