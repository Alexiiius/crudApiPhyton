import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { CompartirDatosServiceService } from '../services/compartir-datos-service.service';
import { Persona } from '../models/persona';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {

  // Se crea un modelo de formulario para las personas con validadores. El id puede ser null o vacio.
  public formularioPersona = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private apiService: ApiServiceService, private compartirServicio: CompartirDatosServiceService) { 
    this.compartirServicio.currentPersona.subscribe(persona => {
      if (persona) {
        this.rellenarFormularioPersona(persona.id ?? 0, persona.nombre, persona.apellido, persona.telefono, persona.email);
      }
    });
  }

  //Invocado al hacer PUT
  rellenarFormularioPersona(id: number, nombre: string, apellido: string, telefono: string, email: string) {
    console.log("Cargado en formulario:" + "id: " + id + " nombre: " + nombre + " apellido: " + apellido + " telefono: " + telefono + " email: " + email);
    this.formularioPersona.setValue({id: id, nombre: nombre, apellido: apellido, telefono: telefono, email: email});
  }

  //Enviar el formulario al servicio para hacer POST
  crearPersona() {
    if(this.formularioPersona.invalid){
      return alert('No se ha rellenado correctamente el formulario!');
    }
    let persona = new Persona(
      this.formularioPersona.value.nombre || '', 
      this.formularioPersona.value.apellido || '', 
      this.formularioPersona.value.telefono || '', 
      this.formularioPersona.value.email || '',
      this.formularioPersona.value.id || null
    );
    this.apiService.createItem(persona).subscribe((data: any) => {
      console.log(data);
    });
    this.formularioPersona.reset();
  }

}
