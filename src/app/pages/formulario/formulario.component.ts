import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Solicitud {
  nombre: string;
  libro: string;
  fecha: string;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  private readonly anioActual = new Date().getFullYear();

  readonly fechaMaxima = `${this.anioActual}-12-31`;

  solicitud: Solicitud = {
    nombre: '',
    libro: '',
    fecha: ''
  };

  solicitudes: Solicitud[] = [];
  mensajeError = '';
  mensajeExito = '';

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  guardarSolicitud(formulario?: NgForm): void {
    const nuevaSolicitud: Solicitud = {
      nombre: this.solicitud.nombre.trim(),
      libro: this.solicitud.libro.trim(),
      fecha: this.solicitud.fecha
    };
    const errorFecha = this.obtenerErrorFecha(nuevaSolicitud.fecha);

    if (formulario?.invalid || !nuevaSolicitud.nombre || !nuevaSolicitud.libro || !nuevaSolicitud.fecha || errorFecha) {
      formulario?.control.markAllAsTouched();
      this.mensajeError = 'Falta algún dato. Completa nombre, libro y fecha para guardar el pedido.';
      this.mensajeExito = '';

      if (errorFecha) {
        this.mensajeError = errorFecha;
      }

      return;
    }

    this.solicitudes.push(nuevaSolicitud);
    this.actualizarLocalStorage();
    this.limpiarFormulario();
    this.mensajeError = '';
    this.mensajeExito = 'Listo. La solicitud quedó guardada.';
  }

  eliminarSolicitud(indice: number): void {
    this.solicitudes.splice(indice, 1);
    this.actualizarLocalStorage();
    this.mensajeExito = 'Solicitud eliminada del registro.';
    this.mensajeError = '';
  }

  fechaFueraDelAnioActual(): boolean {
    return this.obtenerErrorFecha(this.solicitud.fecha) !== '';
  }

  // Recupera solicitudes guardadas y evita que datos corruptos rompan la vista.
  private cargarSolicitudes(): void {
    const datosGuardados = localStorage.getItem('solicitudes');

    if (!datosGuardados) {
      this.solicitudes = [];
      return;
    }

    try {
      this.solicitudes = JSON.parse(datosGuardados) as Solicitud[];
    } catch {
      this.solicitudes = [];
      localStorage.removeItem('solicitudes');
    }
  }

  private actualizarLocalStorage(): void {
    localStorage.setItem('solicitudes', JSON.stringify(this.solicitudes));
  }

  private limpiarFormulario(): void {
    this.solicitud = {
      nombre: '',
      libro: '',
      fecha: ''
    };
  }

  private obtenerErrorFecha(fecha: string): string {
    if (!fecha) {
      return '';
    }

    if (fecha > this.fechaMaxima) {
      return 'La fecha no puede ser mayor al año actual.';
    }

    return '';
  }
}
