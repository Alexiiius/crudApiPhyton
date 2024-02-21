import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { CompartirDatosServiceService } from '../services/compartir-datos-service.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-listar-component',
  templateUrl: './listar-component.component.html',
  styleUrls: ['./listar-component.component.css']
})
export class ListarComponentComponent {

  public personas: any = [];

  constructor(private apiService: ApiServiceService, private compartirServicio: CompartirDatosServiceService) {
    this.listarPersonas();
  }

  // Invocado al hacer GET
  listarPersonas() {
    this.apiService.getItems().subscribe((response: any) => {
      console.log(response);
      if (response && response.data) {
        this.personas = response.data.map((item: any) => new Persona(item.nombre, item.apellido, item.telefono, item.email, item.id));
      } else {
        console.error('La respuesta de la API no incluye una propiedad data:', response);
      }
    });
  }

  //Invocado al hacer DELETE
  borrarPersona(id: number) {
    this.apiService.deleteItem(id).subscribe((response: any) => {
      console.log(response);
      this.personas = [];
      // this.listarPersonas(); // No es necesario, ya que el servicio ya se encarga de emitir de nuevo la lista y esto genera consultas innecesarias
    });
  }

  //Invocado al hacer DELETE
  editarPersona(persona: Persona){
    this.compartirServicio.changePersona(persona.id ?? 0, persona.nombre, persona.apellido, persona.telefono, persona.email);
  }

}
