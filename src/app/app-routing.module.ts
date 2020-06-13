import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { DescriptionComponent } from './components/description/description.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistrosEntradaComponent } from './components/registros-entrada/registros-entrada.component';
import { RegistrosSalidaComponent } from './components/registros-salida/registros-salida.component';
import { InformeComponent } from './components/informe/informe.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { GastosComponent } from './components/gastos/gastos.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UsuarioComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'proyecto', component: ProyectoComponent },
  { path: 'registrosEntrada', component: RegistrosEntradaComponent },
  { path: 'registrosSalida', component: RegistrosSalidaComponent },
  {path: 'informe' , component: InformeComponent },
  {path: 'reporte' , component: ReporteComponent },
  {path: 'gastos' , component: GastosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
