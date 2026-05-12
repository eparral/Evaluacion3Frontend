import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  guardarSolicitud(): void {
    const nuevaSolicitud: Solicitud = {
      nombre: this.solicitud.nombre.trim(),
      libro: this.solicitud.libro.trim(),
      fecha: this.solicitud.fecha
    };

    if (!nuevaSolicitud.nombre || !nuevaSolicitud.libro || !nuevaSolicitud.fecha) {
      this.mensajeError = 'Falta algún dato. Completa nombre, libro y fecha para guardar el pedido.';
      this.mensajeExito = '';
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

}
