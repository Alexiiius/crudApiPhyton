import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosServiceService {

  private personaSource = new BehaviorSubject<Persona | null>(null);
  currentPersona = this.personaSource.asObservable();

  constructor() { }

  changePersona(id: number, nombre: string, apellido: string, telefono: string, email: string) {
    this.personaSource.next({id, nombre, apellido, telefono, email});
  }
}
