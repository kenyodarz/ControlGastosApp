// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// PrimeNG
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Servicios
import { TokenStorageService } from 'src/app/services/token-storage.service';
// Modelos
import { RegistroEntrada } from 'src/app/models/RegistroEntrada';
import { Description } from 'src/app/models/description';
import { User } from 'src/app/models/user';
import { Proyecto } from 'src/app/models/Proyecto';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  appName = 'CDM MANTENIMIENTO Y SERVICIOS';
  private roles: string[];
  isLoggedIn = false;
  visibleSidebar = false;
  visibleSidebarEntrada = false;
  username: string;
  menuUsers: MenuItem[];
  menuAdmin: MenuItem[];
  descriptions: Description[];
  selectedDescription: Description;
  registros: RegistroEntrada[];
  registro: RegistroEntrada;
  usuarios: User[];
  selectedUsuario: User;

  currentUser: any;
  showAdminBoard = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  navigateDescription(): void {
    this.router.navigateByUrl('/description');
    this.visibleSidebar = false;
  }
  navigateProyecto(): void {
    this.router.navigateByUrl('/proyecto');
    this.visibleSidebar = false;
  }
  navigateRegistrosEntrada(): void {
    this.router.navigateByUrl('/registrosEntrada');
    this.visibleSidebar = false;
  }
  navigateRegistrosSalida(): void {
    this.router.navigateByUrl('/registrosSalida');
    this.visibleSidebar = false;
  }
  navigateSaldo(): void {
    this.router.navigateByUrl('/saldo');
    this.visibleSidebar = false;
  }
  navigateInforme(): void {
    this.router.navigateByUrl('/informe');
    this.visibleSidebar = false;
  }
  navigateGastos(): void {
    this.router.navigateByUrl('/gastos');
    this.visibleSidebar = false;
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.menuUsers = [
      {
        label: 'Usuario',
        items: [
          {
            label: 'Cargar Gastos',
            icon: 'pi pi-fw pi-plus',
            command: () => this.navigateRegistrosSalida(),
          },
          {
            label: 'Generacion de Informe',
            icon: 'pi pi-fw pi-file-o',
            command: () => this.navigateInforme(),
          },
        ],
      },
    ];
    this.menuAdmin = [
      {
        label: 'Administrador',
        items: [
          {
            label: 'Agregar Tipo de Descripcion',
            icon: 'pi pi-fw pi-tags',
            command: () => this.navigateDescription(),
          },
          {
            label: 'Proyectos',
            icon: 'pi pi-fw pi-tablet',
            command: () => this.navigateProyecto(),
          },
          {
            label: 'Desembolsos',
            icon: 'pi pi-fw pi-money-bill',
            command: () => this.navigateRegistrosEntrada(),
          },
          {
            label: 'Operaciones con gastos',
            icon: 'pi pi-fw pi-chart-line',
            command: () => this.navigateGastos(),
          },
          // {
          //   label: 'Operaciones con saldos',
          //   icon: 'pi pi-fw pi-briefcase',
          //   command: () => this.navigateSaldo(),
          // },
        ],
      },
    ];
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.name;
    }
  }

  logout() {
    this.confirmationService.confirm({
      message: '¿Esta Seguro que desea cerrar sesion?',
      header: 'Cerrar Sesion',
      accept: () => {
        this.tokenStorageService.signOut();
        this.irAlInicio();
        window.location.reload();
      },
      reject: () => {
        this.irAlInicio();
      },
    });
  }
  irAlInicio() {
    window.location.replace('#/home');
  }
}
