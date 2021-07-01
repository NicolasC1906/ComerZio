import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Paginas/home/home.component';
import { ErrorComponent } from './Paginas/404/error/error.component';
import { InfoProductoComponent } from './Paginas/info-producto/info-producto/info-producto.component';
import { LoginComponent } from './Paginas/usuario/login/login.component';
import { RegistroComponent } from './Paginas/usuario/registro/registro.component';
import { FeriasComponent } from './Paginas/Ferias/ferias/ferias.component';
import { CategoriaPComponent } from './Paginas/categoria-p/categoria-p.component';
import { PerfilComponent } from './Paginas/usuario/perfil/perfil.component';
import { CheckoutComponent } from './Paginas/checkout/checkout.component';
import { ComingSoonComponent } from './Paginas/coming-soon/coming-soon.component';
import { DashboardComponent } from './Paginas/usuario/dashboard/dashboard.component';
import { ListaComprasComponent } from './Paginas/ListaCompras/lista-compras/lista-compras.component';
import { CheckOutListaComponent } from './Paginas/ListaCompras/lista-compras/check-out-lista/check-out-lista.component';
import { PoliticasComponent } from './Paginas/politicas/politicas.component';
import { TerminosComponent } from './Paginas/terminos/terminos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfertasComponent } from './Paginas/ofertas/ofertas.component';
import { TiendasComponent } from './Paginas/tiendas/tiendas.component';
import { TendenciasComponent } from './Paginas/tendencias/tendencias.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Info/:id', component: InfoProductoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'ferias', component: FeriasComponent},
  {path: 'categoriasP/:id', component: CategoriaPComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'comingsoon', component: ComingSoonComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'lista', component: ListaComprasComponent},
  {path: 'Politicas', component: PoliticasComponent},
  {path: 'Terminos', component: TerminosComponent},
  {path: 'checkoutLista', component: CheckOutListaComponent},
  {path: 'Ofertas', component: OfertasComponent},
  {path: 'Tiendas', component: TiendasComponent},
  {path: 'Tendencias', component: TendenciasComponent},
  {path: '**', pathMatch:"full", component: ErrorComponent},// encima de este siempre



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
