import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PagoService } from '../../services/pago.service'; importar cuando este conectado con FIrebase

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  paymentForm!: FormGroup;


  // constructor(private formBuilder: FormBuilder, private pagoService: PagoService) {} para Firebase
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      metodoPago: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
  }

  onMetodoPagoChange() {
    this.paymentForm.get('numeroTarjeta')?.reset();
    this.paymentForm.get('fechaExpiracion')?.reset();
    this.paymentForm.get('cvv')?.reset();
  }

  confirmarPago() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;

      // para guardar los datos en Firebase (descomentar cuando estés listo)
      /*
      this.pagoService.guardarPago(paymentData).then(() => {
        console.log('Pago guardado exitosamente');
        alert('Pago confirmado. Datos enviados a Firebase.');
      }).catch(error => {
        console.error('Error guardando el pago: ', error);
        alert('Error al confirmar el pago.');
      });
      */

      // Para probar sin Firebase
      console.log(paymentData);
      alert('Pago confirmado.');
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }
}
