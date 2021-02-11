//Se quitan los caracteres especiales
/*String.prototype.transformaCaracteresEspeciales = function(){
  return unescape(escape(this).replace(/%0A/g, "<br/>").replace(/%3C/g, "&lt;").replace(/%3E/g, "&gt;"));
}
*/
var estados=['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
var tiempo_inic = 0;

// Borra lo que hay en los contenedores

document.getElementById('contenidos').innerHTML = "";
document.getElementById('estados').innerHTML = "";
// Creo el XHR y realizo la solicitud al servidor
if(window.XMLHttpRequest) {
  solicitud = new XMLHttpRequest();
}else {
  solicitud= new ActiveXObject("Microsoft.XMLHTTP");
}
// Preparar función de respuesta
solicitud.onreadystatechange = muestra_contenido();
// Realizar petición
tiempo_inic = new Date();
var recurso = document.getElementById('recurso').value;
solicitud.open('GET', recurso+'?nocache='+Math.random(), true);
solicitud.send(null);

  
function muestra_contenido() {
  var tiempo_fin = new Date();
  var dif_tiempo = tiempo_fin-tiempo_inic;
  var estados = document.getElementById('estados');
  estados.innerHTML += "[" + dif_tiempo + " mseg.] " + estados[solicitud.readyState] + "<br/>";
  if(solicitud.readyState == 4) {
    if(peticion.status == 200) {
      var contenidos = document.getElementById('contenidos');
      contenidos.innerHTML = solicitud.responseText;//.transformaCaracteresEspeciales();
    }
    muestra_cabeceras();
    muestra_estado();
  }
}
  
function muestra_cabeceras() {
  var cabeceras = document.getElementById('cabeceras');
  cabeceras.innerHTML = solicitud.getAllResponseHeaders();//.transformaCaracteresEspeciales();
}
  
function muestra_estado() {
  var codigo = document.getElementById('codigo');
  codigo.innerHTML = solicitud.status + "<br/>" + solicitud.statusText;
}