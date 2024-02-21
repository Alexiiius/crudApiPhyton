export class Persona {

    id?: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
  
    constructor(nombre: string, apellido: string, telefono: string, email: string, id?: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.id = id;
    }
    
}
