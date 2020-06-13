//Angular
import { Component, OnInit } from '@angular/core';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
// Servicios
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RegistroService } from 'src/app/services/registro.service';
import { RegistroSalidaService } from 'src/app/services/registro-salida.service';
import { InformeService } from 'src/app/services/informe.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
// Modelos
import { User } from 'src/app/models/User';
import { RegistroEntrada } from 'src/app/models/RegistroEntrada';
import { RegistroSalida } from 'src/app/models/RegistroSalida';
import { Informe } from 'src/app/models/Informe';
import { Proyecto } from 'src/app/models/Proyecto';
// Utilidades
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  informes: Informe[] = [];
  informe: Informe = {
    anulado: null,
    fecha: null,
    credito: null,
    debito: null,
    idInforme: null,
    total: null,
    users: null,
    proyecto: null,
  };
  selectedInforme: Informe;
  gastos: RegistroSalida[];
  desembolsos: RegistroEntrada[];
  proyectos: Proyecto[];
  cols: any[];
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard: boolean = false;

  constructor(
    private rEntrada: RegistroService,
    private rSalida: RegistroSalidaService,
    private informeService: InformeService,
    private token: TokenStorageService
  ) {}

  generarPDF() {
    let documento = document.getElementById('id');
    let opciones = {
      margin: [0.5, 0, 0.5, 0],
      filename: 'GVSC-' + this.selectedInforme.idInforme + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'cm',
        format: 'letter',
        orientation: 'portrait',
      },
    };

    // New Promise-based usage:
    html2pdf().from(documento).set(opciones).save();
    // Old monolithic-style usage:
    // html2pdf(documento, opciones);
  }

  obtenerDesembolsos() {
    this.rEntrada.getAll().subscribe((result: any) => {
      let desembolsos: RegistroEntrada[] = [];
      for (let index = 0; index < result.length; index++) {
        let e = result[index] as RegistroEntrada;
        if (e.informe !== null) {
          if (this.informe.idInforme === e.informe.idInforme) {
            desembolsos.push(e);
          }
        }
      }
      this.desembolsos = desembolsos.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 0;
      });
    });
    // this.sumTotal();
  }
  obtenerGastos() {
    this.rSalida.getAll().subscribe((result: any) => {
      let gastos: RegistroSalida[] = [];
      for (let index = 0; index < result.length; index++) {
        let e = result[index] as RegistroSalida;
        if (e.informe !== null) {
          if (this.informe.idInforme === e.informe.idInforme) {
            gastos.push(e);
          }
        }
      }
      this.gastos = gastos.sort(function (a, b) {
        if (a.fecha > b.fecha) {
          return 1;
        }
        if (a.fecha < b.fecha) {
          return -1;
        }
        return 0;
      });
    });
  }
  obtenerInformes() {
    this.informeService.getAll().subscribe((result: any) => {
      let informes: Informe[] = [];
      for (let index = 0; index < result.length; index++) {
        let e = result[index] as Informe;
        if (this.showAdminBoard) {
          informes.push(e);
        } else if (e.users.username == this.currentUser.username) {
          informes.push(e);
        }
      }
      this.informes = informes.sort((a, b) => {
        if (a.idInforme > b.idInforme) return 1;
        if (a.idInforme < b.idInforme) return -1;
        return 0;
      });
    });
  }

  onInformeChange() {
    this.informe = this.selectedInforme;
    this.obtenerDesembolsos();
    this.obtenerGastos();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.currentUser = user;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // console.log(this.showAdminBoard);
      // this.username = user.username;
    }
    this.obtenerInformes();
    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'observaciones', header: 'Factura Nro.' },
      { field: 'description', subfield: 'nombre', header: 'Descripcion' },
      { field: 'cantidad', header: 'Valor' },
    ];
  }
}
