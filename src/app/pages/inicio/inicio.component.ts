import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  readonly usuarioMinLength = 3;
  readonly usuarioMaxLength = 30;
  readonly usuarioPattern = '^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñÜü])[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$';

  private readonly usuarioRegex = /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÑñÜü])[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/;

  usuario = '';
  contrasena = '';
  mensajeError = '';

  constructor(private router: Router) {}

  // Valida credenciales simples y guarda el estado de sesión del lector.
  iniciarSesion(formulario?: NgForm): void {
    const errorUsuario = this.obtenerErrorUsuario();

    if (formulario?.invalid || errorUsuario) {
      formulario?.control.markAllAsTouched();
      localStorage.removeItem('logueado');
      this.mensajeError = errorUsuario || 'Completa usuario y contraseña para iniciar sesión.';
      return;
    }

    if (this.usuario.trim() === 'lector' && this.contrasena === '1234') {
      localStorage.setItem('logueado', 'true');
      this.mensajeError = '';
      this.router.navigate(['/solicitudes']);
      return;
    }

    localStorage.removeItem('logueado');
    this.mensajeError = 'No pudimos iniciar sesión. Revisa el usuario y la contraseña.';
  }

  private obtenerErrorUsuario(): string {
    const usuarioLimpio = this.usuario.trim();

    if (!usuarioLimpio) {
      return 'Ingresa un usuario.';
    }

    if (!this.usuarioRegex.test(usuarioLimpio)) {
      return 'El usuario solo puede contener letras.';
    }

    if (usuarioLimpio.length < this.usuarioMinLength) {
      return 'El usuario debe tener al menos 3 caracteres.';
    }

    if (usuarioLimpio.length > this.usuarioMaxLength) {
      return 'El usuario no puede superar los 30 caracteres.';
    }

    return '';
  }
}
