let tabs_ = Array.from(document.querySelectorAll(".tab"));
let panels = Array.from(document.querySelectorAll(".panel"));
let editors = [];

// EDITOR INICIAL

editors.push(document.getElementById("editor"));

// ELIMINAR LA CLASE ACTIVE
function removeActive() {
  tabs_.map((tab) => tab.classList.remove("active"));
  panels.map((panel) => panel.classList.remove("active"));
}

// EVENTO PARA DETECTAR LA PESTAÑA SELECCIONADA
document.getElementById("tabs").addEventListener("click", (event) => {
  if (event.target.classList.contains("tab")) {
    let i = tabs_.indexOf(event.target);
    removeActive();
    tabs_[i].classList.add("active");
    panels[i].classList.add("active");
  }
});

// FUNCION PARA CREAR UN ARCHIVO NUEVO DENTRO DEL EDITOR
function nuevoArchivo(nombreTab = "new.XPath", contenido = "") {
  removeActive();

  let li = document.createElement("li");
  li.className = "tab active";
  li.innerHTML = nombreTab;

  let div = document.createElement("div");
  div.className = "panel active";

  let txtArea = document.createElement("textarea");
  txtArea.className = "editor";
  txtArea.value = contenido;

  div.appendChild(txtArea);

  tabs_.push(li);
  panels.push(div);
  document.getElementById("tabs").appendChild(li);
  document.getElementById("panels").appendChild(div);
}

// EVENTO QUE CREA EL NUEVO DOCUMENTO EN BLANCO
document.getElementById("nuevoDoc").addEventListener("click", () => {
  nuevoArchivo();
});

// EVENTO QUE CIERRA LAS PESTAÑAS
document.getElementById("cerrarDoc").addEventListener("click", () => {
  let i = tabs_.findIndex((tab) => tab.classList.contains("active"));
  let tab = tabs_[i];
  let panel = panels[i];

  tab.parentNode.removeChild(tab);
  panel.parentNode.removeChild(panel);

  tabs_.splice(i, 1);
  panels.splice(i, 1);

  if (tabs_.length > 0) {
    tabs_[0].classList.add("active");
    panels[0].classList.add("active");
  }
});

// EVENTO QUE GUARDA EL DOCUMENTO QUE SE TIENE EN EL EDITOR
document.getElementById("guardarDoc").addEventListener("click", () => {
  let i = tabs_.findIndex((tab) => tab.classList.contains("active"));
  let ed = editors[i];

  let blob = new Blob([ed.getValue()], { type: "text/plain" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = tabs_[i].textContent;
  a.click();
});

// EVENTO QUE ABRE UN DOCUMENTO DEL EQUIPO
document.getElementById("abrirDoc").addEventListener("click", () => {
  let archivo = document.getElementById("fileInput").click();
});

// FUNCION PARA ABRIR EL ARCHIVO SELECCIONADO DEL EQUIPO
function abrirArchivo(archivos) {
  let archivo = archivos.files[0];
  let lector = new FileReader();
  lector.onload = (e) => {
    let contents = e.target.result;
    nuevoArchivo(archivo.name, contents);
  };
  lector.readAsText(archivo);
  archivo.clear;

  document.getElementById("fileInput").value = "";
}

// BOTONES PARA ANALIZAR
//Analizar
let botonCargar = document.getElementById("btnCargar");
let botonCargar2 = document.getElementById("btnCargar2");
let editorXPATH = (document.getElementById("editor").value = "/*");
let editorXML = document.getElementById("consolaJS");
let indiceAux=0;
let tipoAnalizadorXML = "";
let tablaSimbolos = [];
let listaTokens=[];
let parserXML;
let globalencod;
let codificador = document.getElementById("codencod");

//botones de xquery por la izquierda
let btnCargarxquery = document.getElementById("btnCargarxquery");
let parserXQUERY;
let editorXQUERY = document.getElementById("consolaXQUERY");

//variables para boton a la derecha de xquery
let btnCargarxqueryder = document.getElementById("btnCargarxqueryder");
let parserXQUERYder;

let textoEntrada = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
   <book category="COOKING">
      <title>Empire Burlesque</title>
      <author>Bob Dylan</author>
      <country>USA</country>
      <company>Columbia</company>
      <price>10.90</price>
      <year>1985</year>
   </book>
   <book category="CHILDREN">
      <title>Hide your heart</title>
      <author>Bonnie Tyler</author>
      <country>UK</country>
      <company>CBS Records</company>
      <price>9.90</price>
      <year>1988</year>
   </book>
   <book category="WEB">
      <title>Greatest Hits</title>
      <author>Dolly Parton</author>
      <country>USA</country>
      <company>RCA</company>
      <price>9.90</price>
      <year>1982</year>
   </book>
   <book category="STORY">
      <title>Still got the blues</title>
      <author>Gary Moore</author>
      <country>UK</country>
      <company>Virgin records</company>
      <price>10.20</price>
      <year>1990</year>
   </book>
   <book category="SITES">
      <!-- Este titulo tiene un & -->
      <title>Eros &amp; Eros</title>
      <author>Eros Ramazzotti</author>
      <country>EU</country>
      <company>BMG</company>
      <price>9.90</price>
      <year>1997</year>
   </book>
   <book category="PINES">
      <!-- Este titulo estará entre comillas dobles  -->
      <title> &quot; Esto tiene que salir bien &quot;</title>
      <author>Bee Gees</author>
      <country>UK</country>
      <company>Polydor</company>
      <price>10.90</price>
      <year>1998</year>
   </book>
   <book category="SPAGET">
      <!-- Este titulo estará entre comilla simples -->
      <title>&apos; Esto tiene que salir muy bien tambien &apos;</title>
      <author>Dr.Hook</author>
      <country>UK</country>
      <company>CBS</company>
      <price>8.10</price>
      <year>1973</year>
   </book>
   <book category="COMIC">
      <title>Maggie May</title>
      <author>Rod Stewart</author>
      <country>UK</country>
      <company>Pickwick</company>
      <price>8.50</price>
      <year>1990</year>
   </book>
   <book category="FANTASY">
      <title>Romanza</title>
      <author>Andrea Bocelli</author>
      <country>EU</country>
      <company>Polydor</company>
      <price calificacion="hola">10.80</price>
      <year>1996</year>
   </book>
   <book category="DIAGRAM">
      <title>When a man loves a woman</title>
      <author>Percy Sledge</author>
      <country>USA</country>
      <company>Atlantic</company>
      <price>8.70</price>
      <year>1987</year>
   </book>
   <book category="CELL">
      <title>Black angel</title>
      <author>Savage Rose</author>
      <country>EU</country>
      <company>Mega</company>
      <price>10.90</price>
      <year>1995</year>
   </book>
   <book category="DBZ">
      <title>1999 Grammy Nominees</title>
      <author>Many</author>
      <country>USA</country>
      <company>Grammy</company>
      <price>10.20</price>
      <year>1999</year>
   </book>
   <book category="AMONG US">
      <title>For the good times</title>
      <author>Kenny Rogers</author>
      <country>UK</country>
      <company>Mucik Master</company>
      <price>8.70</price>
      <year>1995</year>
   </book>
   <book category="WIGETTA">
      <title>Big Willie style</title>
      <author>Will Smith</author>
      <country>USA</country>
      <company>Columbia</company>
      <price>9.90</price>
      <year>1997</year>
   </book>
   <book category="GUERRA">
      <title>Tupelo Honey</title>
      <author>Van Morrison</author>
      <country>UK</country>
      <company>Polydor</company>
      <price>8.20</price>
      <year>1971</year>
   </book>
   <book category="ALIANZA">
      <title>Soulsville</title>
      <author>Jorn Hoel</author>
      <country>Norway</country>
      <company>WEA</company>
      <price>7.90</price>
      <year>1996</year>
   </book>
   <book category="TOPOS">
      <title>The very best of</title>
      <author>Cat Stevens</author>
      <country>UK</country>
      <company>Island</company>
      <price>8.90</price>
      <year>1990</year>
   </book>
   <book category="CARRILES">
      <title>Stop</title>
      <author>Sam Brown</author>
      <country>UK</country>
      <company>A and M</company>
      <price>8.90</price>
      <year>1988</year>
   </book>
   <book category="UKRANIA">
      <title>Bridge of Spies</title>
      <author>T&apos;Pau</author>
      <country>UK</country>
      <company>Siren</company>
      <price>7.90</price>
      <year>1987</year>
   </book>
   <book category="DANZA">
      <title>Private Dancer</title>
      <author>Tina Turner</author>
      <country>UK</country>
      <company>Capitol</company>
      <price>8.90</price>
      <year>1983</year>
   </book>
   <book category="ENGLISH">
      <title>Midt om natten</title>
      <author>Kim Larsen</author>
      <country>EU</country>
      <company>Medley</company>
      <price>7.80</price>
      <year>1983</year>
   </book>
   <book category="ITALY">
      <title>Pavarotti Gala Concert</title>
      <author>Luciano Pavarotti</author>
      <country>UK</country>
      <company>DECCA</company>
      <price>9.90</price>
      <year>1991</year>
   </book>
   <book category="ROCK">
      <title>The dock of the bay</title>
      <author>Otis Redding</author>
      <country>USA</country>
      <company>Stax Records</company>
      <price>7.90</price>
      <year>1968</year>
   </book>
   <book category="IMAGENES">
      <title>Picture book</title>
      <author>Simply Red</author>
      <country>EU</country>
      <company>Elektra</company>
      <price>7.20</price>
      <year>1985</year>
   </book>
   <book category="LONDON">
      <title>Red</title>
      <author>The Communards</author>
      <country>UK</country>
      <company>London</company>
      <price>7.80</price>
      <year>1987</year>
   </book>
   <book category="MEDICINE">
      <title>Unchain my heart</title>
      <author>Joe Cocker</author>
      <country>USA</country>
      <company>EMI</company>
      <price>8.20</price>
      <year>1987</year>
   </book>
</bookstore>
`

let XQuery = `for $x in doc("books.xml")/bookstore/book
return if ($x/year>1990)
then <moderno>{substring($x/year,5)}</moderno>
else <antiguo>{substring($x/year,2)}</antiguo>

`
//for $x in /bookstore/book
//where $x/price>30
//return $x/title

let Encabezado3D = `/*------HEADER------*/
#include <stdio.h>
#include <math.h>

double heap[30101999];
double stack[30101999];
double P;
double H;
double t0,t1,t2,t3,t4,t5,t6,t7,t8,t9;
/*------MAIN------*/
void main() {
  P = 0; H = 0;

  
  t0 = H;
  t1 = t0;
  H = H + 1;
  heap[(int) t1] = 65;
  
  t2 = H;
  t3 = t2;
  H = H + 4;
  heap[(int) t3] = 65;
  t3 = t3 + 1;
  heap[(int) t3] = 104;
  t3 = t3 + 1;
  heap[(int) t3] = 106;
  t3 = t3 + 1;
  heap[(int) t3] = 107;
  t3 = t3 + 1;
  heap[(int) t3] = -1;
  
  t4 = H;
  t5 = t4;
  H = H + 1;
  heap[(int) t5] = 12.4;
  
  t6 = H;
  t7 = t6;
  H = H + 6;
  heap[(int) t7] = 67;
  t7 = t7 + 1;
  heap[(int) t7] = 97;
  t7 = t7 + 1;
  heap[(int) t7] = 100;
  t7 = t7 + 1;
  heap[(int) t7] = 101;
  t7 = t7 + 1;
  heap[(int) t7] = 110;
  t7 = t7 + 1;
  heap[(int) t7] = 97;
  t7 = t7 + 1;
  heap[(int) t7] = -1;
  
  t8 = H;
  t9 = t8;
  H = H + 1;
  heap[(int) t9] = 30;
  

  printf("Hello World");

}



`

editorXQUERY.value=XQuery;
editorXML.value = textoEntrada;
consola3D.value=Encabezado3D;


// Analizar la entrada XML al hacer CLICK al boton
botonCargar.addEventListener("click", () => {
    console.log("Analizando XML DES ...")
    tipoAnalizadorXML = "Descendente";

    // Analizador XML por la izquierda
    parserXML = xmlDerecha.parse(editorXML.value);

    console.log("EL ANALIZADOR REGRESA");
    console.log(parserXML);
    console.log("tipo de encoding: " + parserXML.tipoencoding);    

    codificador.innerHTML = parserXML.tipoencoding;
    globalencod =parserXML.tipoencoding;
    console.error("Aqui");
    console.log(consulta_xml.parse("<price>5.95</price>"));
})

botonCargar2.addEventListener("click", () => {
  console.log("Analizando XML ASC ...")
  tipoAnalizadorXML = "Ascendente";

  // Analizador XML por la izquierda
  parserXML = analizador_izq.parse(editorXML.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXML);
  console.log("tipo de encoding: " + parserXML.tipoencoding);    

  codificador.innerHTML = parserXML.tipoencoding;
  globalencod =parserXML.tipoencoding;


})


document.getElementById("ast").addEventListener("click", () => {
    let AST_xPath=analizadorizq_xpath.parse(document.getElementById("editor").value);
  
    // Se activa el modal
    activarModal();

    // Generar el arbol con Treant JS
    graficarArbol(AST_xPath);
  
})

document.getElementById("btnReporteXPATHcst").addEventListener("click", () => {
  let AST_xPath2=analizador_xpath.parse(document.getElementById("editor").value);

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(AST_xPath2);

})

// ======================================
// MODAL XML
// ======================================
let btnReporteXML = document.getElementById('btnReporteXML');
let btnReporteXMLCST= document.getElementById('btnReporteXMLcst');
let btnReporteGram = document.getElementById('btnReporteXGRAM');
let btnReporteXMLErrores = document.getElementById('btnReporteXMLErrores');

let tablaTitulo = document.getElementById('EpicModalLabel');
let tablaTituloCST = document.getElementById('EpicModalLabelAST');
let tabla = document.getElementById('tablaSimbolos');
let contenidoModal2 = document.getElementById('modal2Content');

let tablaCabeceras = document.getElementById('tablaCabeceras');

// REPORTE TABLA DE SIMBOLOS
btnReporteXML.addEventListener("click", () => {
  tablaTitulo.innerHTML = 'Reporte Tabla Simbolos XML ' + tipoAnalizadorXML;
  tabla.innerHTML = "";

  // Tabla de Simbolos
  tablaSimbolos = new TablaSimbolos(parserXML.json);
  tablaSimbolos = tablaSimbolos.generarTabla();

  // Agregar las cabeceras
  tablaCabeceras.innerHTML = `
  <th scope="col">Nombre</th>
  <th scope="col">Tipo</th>
  <th scope="col">Ambito</th>
  <th scope="col">Fila</th>
  <th scope="col">Columna</th>
  <th scope="col">Valor</th>
  `;


  // Agregar contenido a la tabla
  tablaSimbolos.forEach(simbolo => {
    tabla.innerHTML += `
      <tr>
        <td>${simbolo.nombre}</td>
        <td>${simbolo.tipo}</td>
        <td>${simbolo.ambito}</td>
        <td>${simbolo.fila}</td>
        <td>${simbolo.columna}</td>
        <td>${simbolo.valor}</td>
      </tr>
    `;
  });
});

// REPORTE DEL CST
btnReporteXMLCST.addEventListener("click", () => {

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(parserXML.json.nodo);

  
});

// REPORTE DE LA GRAMATICA
btnReporteGram.addEventListener('click', () => {
  tablaTituloCST.innerHTML = 'Reporte Gramatical XML ' + tipoAnalizadorXML;

  contenidoModal2.innerHTML = `<textarea style="width: 38%; height: 700px; resize: none;">${parserXML.gramatical}</textarea>
  <textarea style="width: 60%; height: 700px; resize: none;">${parserXML.gramaticapp}</textarea>
  `;
});

//REPORTE DE ERRORES
btnReporteXMLErrores.addEventListener("click", () => {
  tablaTitulo.innerHTML = 'Reporte Errores XML ' + tipoAnalizadorXML;
  tabla.innerHTML = "";

  // Lista de errores
  listaErrores = parserXML.listaErrores;

  console.log("ESTA ES LA LISTA DE ERRORES");
  console.log(listaErrores);

  // Agregar las cabeceras
  tablaCabeceras.innerHTML = `
  <th scope="col">Analizador</th>
  <th scope="col">Tipo</th>
  <th scope="col">Descripcion</th>
  <th scope="col">Linea</th>
  <th scope="col">Columna</th>
  `;

  // Agregar contenido a la tabla
  listaErrores.forEach(error => {
    tabla.innerHTML += `
      <tr>
        <td>${error.analizador}</td>
        <td>${error.tipo}</td>
        <td>${error.descripcion}</td>
        <td>${error.linea}</td>
        <td>${error.columna}</td>
      </tr>
    `;
  });
});



/**
 * ******************************************************
 * XPATH
 * ******************************************************
 */

document.getElementById("btn_EjecutarDer").onclick = this.analizar_xpath;
document.getElementById("btn_EjecutarIzq").onclick = this.analizar_xpath_izq;

function analizar_xpath_izq(){
  listaTokens = [];
  listaErrores = [];

  parserXML = xmlDerecha.parse(editorXML.value);

  console.log("Analizando XPATH...");
  let AST_xPathizq=analizadorizq_xpath.parse(document.getElementById("editor").value);//Decendente
  
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente

  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;

  //generarAST(AST_xPathizq);
  console.log("Interpretando");
  interpretar(AST_xPath,parserXML.json);
}


function analizar_xpath() {
  listaTokens = [];
  listaErrores = [];
  //console.log("Analizando XML ...");
  //let AST_xml=xmlDerecha.parse(editorXML.value);//Decendente
  

  console.log("Analizando XPATH...");
  parserXML = xmlDerecha.parse(editorXML.value);
  console.log("Analizando XPATH por la derecha");

  
  let AST_xPath=analizador_xpath_AST.parse(document.getElementById("editor").value);//Decendente
  console.log(AST_xPath);

  //GENERANDO ARBOL AST
  contenidoModal2.innerHTML = `
  <div style="background: #eee; width: 100%; max-width: 100%; max-height: 700px; overflow: hidden;">
    <div id="graph" style="width: 100%;"></div>
  </div>
  `;
  
  //generarAST(AST_xPath);
  

  //generarAST(AST_xPath);
  console.log("Interpretando");
  interpretar(AST_xPath,parserXML.json);
  //interpretar(AST_xPath,AST_xml);
  //imprimiConsola("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;");
 // imprimiConsola(parseCadena.parse("&lt;  &amp es un caracter especial  y aqui &quot;  un txt &quot; y un apostrofe &apos; &gt;"));
  
}
/**
 * ******************************************************
 * CONSOLA 3D
 * ******************************************************
 */

    

btn3d.addEventListener("click", () => {

  console.log("Codigo en 3D");
  //consola3D.value=Encabezado3D;
  let AST_xquery=grammar.parse(document.getElementById("consola3D").value);//Decendente
  console.log(AST_xquery);
  // Se activa el modal
  
  activarModal();

  // Generar el arbol con Treant JS
 
  graficarArbol(AST_xquery);

})

/**
 * ******************************************************
 * XQUERY
 * ******************************************************
 */
 btnCargarxquery.addEventListener("click", () => {
  console.log("Analizando XQUERY ")
  tipoAnalizadorXML = "ASCENDENTE";

  // Analizador XQUERY por la izquierda
  parserXQUERY = analizador_xqueryizq.parse(editorXQUERY.value);

  console.log("EL ANALIZADOR REGRESA");
  parserXML = xmlDerecha.parse(editorXML.value);
  globalencod =parserXML.tipoencoding;
  ejecutarXQuery(parserXQUERY,parserXML.json);


})

btnCargarxqueryder.addEventListener("click", () => {
  console.log("Analizando XQUERY ")
  tipoAnalizadorXML = "DESCENDENTE";

  // Analizador XQUERY por la DERECHA
  parserXQUERYder = analizador_xqueryder.parse(editorXQUERY.value);

  console.log("EL ANALIZADOR REGRESA");
  console.log(parserXQUERYder);


})
document.getElementById("btnReporteXQUERYcst").addEventListener("click", () => {
  let AST_xQuery=analizador_xquery_ast.parse(editorXQUERY.value);

  // Se activa el modal
  activarModal();

  // Generar el arbol con Treant JS
  graficarArbol(AST_xQuery);

})


    // Original
    function encode_utf8(s) {
      return unescape(encodeURIComponent(s));
    }

    function decode_utf8(s) {
      return decodeURIComponent(escape(s));
    }

    function codificarascci(t) {
      var caracteres = [];
      valor = t;
      for (var i = 0; i < valor.length; i++) {
        caracteres[i] = valor.charAt(i).charCodeAt(0);
      }
      return caracteres.toString().replaceAll(",",' ');
    }

function imprimiConsola(txt){
  console.log("imprimir en consola");
  console.log(globalencod);  
  //console.log(encode_utf8(txt)+"\n");
  // asi se imprime la salida
  //  document.getElementById("consolaPython").value=txt+"\n";
    if(globalencod.includes('ISO-8859-1')){
      console.log("entre en iso");
      document.getElementById("consolaPython").value=encode_utf8(txt)+"\n";
    }
//IMPLEMENTACION DEL CODIGO ASCII
/*    else if(globalencod.includes('ASCII')){
      console.log("entre en ASCII");
      document.getElementById("consolaPython").value = codificarascci(txt)+"\n";
    }
*/
    else{
      console.log("entre en utf");
      document.getElementById("consolaPython").value=txt+"\n";
    }
  }
document.getElementById("msgError").style.display="none";



