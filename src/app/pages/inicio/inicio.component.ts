import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  usuario = '';
  contrasena = '';
  mensajeError = '';

  constructor(private router: Router) {}

  // Valida credenciales simples y guarda el estado de sesión del lector.
  iniciarSesion(): void {
    if (this.usuario.trim() === 'lector' && this.contrasena === '1234') {
      localStorage.setItem('logueado', 'true');
      this.mensajeError = '';
      this.router.navigate(['/solicitudes']);
      return;
    }

    localStorage.removeItem('logueado');
    this.mensajeError = 'No pudimos iniciar sesión. Revisa el usuario y la contraseña.';
  }
}
