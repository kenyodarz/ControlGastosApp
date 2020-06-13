import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng.module';

// Servicos
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';

// Componentes
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DescriptionComponent } from './components/description/description.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { HomeComponent } from './components/home/home.component';
import { InformeComponent } from './components/informe/informe.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistrosSalidaComponent } from './components/registros-salida/registros-salida.component';
import { RegistrosEntradaComponent } from './components/registros-entrada/registros-entrada.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DescriptionComponent,
    GastosComponent,
    HomeComponent,
    InformeComponent,
    LoginComponent,
    NavigationComponent,
    ProfileComponent,
    ProyectoComponent,
    RegisterComponent,
    RegistrosSalidaComponent,
    RegistrosEntradaComponent,
    ReporteComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, ConfirmationService, authInterceptorProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
