let cont_var = 0;

class Entorno {
  constructor(padre) {
    this.tabla = new Map();
    this.padre = padre;
    cont_var ++;
  }

  agregar(id, simbolo) {
    this.tabla.set(id, simbolo);
                        // Insertar al heap y generar C3D 
                        let referenciaHeap = -1;
                          if (this.padre) {
                          //Verificar si el valor es numerico o cadena
                          if (traductorC3D.esNumero(simbolo)) {
                            referenciaHeap = traductorC3D.traducirNumero(parseFloat(simbolo));
                        } else {
                            referenciaHeap = traductorC3D.traducirCadena(simbolo);
                        }
                        if(id != null){ //JSON.stringify(simbolo)
                          tablaSimbolosVariables.agregarSimbolo(new Simbolo(id, " ", "entorno "+cont_var, " ", " ", simbolo, referenciaHeap));  
                        }else{
                          id = " ";
                          tablaSimbolosVariables.agregarSimbolo(new Simbolo(id, " ", "entorno "+cont_var, " ", " ",  simbolo, referenciaHeap));  
                        }
                        
                      }else{

                          //Verificar si el valor es numerico o cadena
                          if (traductorC3D.esNumero(simbolo)) {
                            referenciaHeap = traductorC3D.traducirNumero(parseFloat(simbolo));
                        } else {
                            referenciaHeap = traductorC3D.traducirCadena(simbolo);
                        }
                        if(id != null){ //JSON.stringify(simbolo)
                          tablaSimbolosVariables.agregarSimbolo(new Simbolo(id, " ", "global", " ", " ", simbolo, referenciaHeap));  
                        }else{
                          id = " ";
                          tablaSimbolosVariables.agregarSimbolo(new Simbolo(id, " ", "global", " ", " ",  simbolo, referenciaHeap));  
                        }    
  }
}

  eliminar(id) {
    this.tabla.delete(id);
  }

  existe(id) {
    for (let e = this; e != null; e = e.padre) {
      let simbolo = e.tabla.get(id);
      if (simbolo) {
        return true;
      }
      return false;
    }
  }
  getFuncion(id) {
    for (let e = this; e != null; e = e.padre) {
      
      let simbolo = e.tabla.get(id);
      if (simbolo) {
        return simbolo;
      }
      
    }
    return false;
  }

  existeEnActual(id) {
    let simbolo = this.tabla.get(id);
    if (simbolo) {
      return true;
    }
    return false;
  }

  getSimbolo(id) {
    return this.tabla.get(id);
  }

  reemplazar(id, nuevoValor) {
    for (let e = this; e != null; e = e.anterior) {
      const value = e.tabla.get(id);
      if (value !== undefined) {
        e.tabla.set(id,nuevoValor);
      }
    }
  }
}
