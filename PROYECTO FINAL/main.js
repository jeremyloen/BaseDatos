const firebaseConfig = {
    apiKey: "AIzaSyC6x5-4C3oP06O8u7NeOSqRCpZVEBgdE_E",
    authDomain: "registroweb-2d179.firebaseapp.com",
    projectId: "registroweb-2d179",
    storageBucket: "registroweb-2d179.appspot.com",
    messagingSenderId: "823147279823",
    appId: "1:823147279823:web:1fbb88e5187e0326768eba"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


//llamando elementos de html o del DOM
let btnregistrar = document.getElementById('btnregistrar');
let btningresar = document.getElementById('btningresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btngoogle = document.getElementById('btngoogle');
let btnPublicar = document.getElementById('btnPublicar');
//Funcion Registrar
btnRegistrar.addEventListener('click', ()=>{ 
    let email= document.getElementById('txtEmail').value;
    let password= document.getElementById('txtPassword').value;
 cargarJSON();
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Creo Correctamente")
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    formulario2.classList.replace('mostrar','ocultar');
     var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

})

//Funcion Iniciar Sesion
btnIngresar.addEventListener('click', ()=> { 
  let email= document.getElementById('txtEmail').value;
  let password= document.getElementById('txtPassword').value;
  console.log("tu emael es"+email+"y tu password es "+password+"")
  cargarJSON();
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("Inicio Sesion Correctamente")
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    formulario2.classList.replace('mostrar','ocultar');
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})

//Funcion Cerrar Sesion
btnCerrarSesion.addEventListener('click', ()=>{
firebase.auth().signOut().then(() => {
  // Sign-out successful.
  console.log("Cerraste correctamente")
  contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    formulario2.classList.replace('ocultar','mostrar');
}).catch((error) => { 
  // An error happened.
});
})

//EStado del usuario

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    cargarJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
  } else {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
  }
});

//fucion login con google
btngoogle.addEventListener('click', ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log("Inicio sesion con google")
    cargarJSON();
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error de Login con Google")
  });
})

function cargarJSON(){
  fetch('data.json')
  .then(function(res){
    return res.json();
})
.then((data)=>{
console.log(data); 
let html='';
data.forEach((productos) => {
  html+=`
  <div class="producto">
 <p>  ${productos.Marca}</p>
 <img src="${productos.img}"  class="imgproductos"><br>
 <strong> ${productos.precioUSD}</strong> <br>
 <strong> ${productos.precioSOLES}</strong> 
 </div>
  `;
});
document.getElementById('resultado').innerHTML = html;
})
}


//funcion agregar datos
btnPublicar.addEventListener('click',() => {

  db.collection("comentarios").add({
    titulo: txttitulo=document.getElementById('txttitulo').value,
    descripcion: txtdescripcion = document.getElementById('txtdescripcion').value ,
})
.then((docRef) => {
    console.log("Se guardo tu comentario correctamente: ", docRef.id);
    Imprimircomentarios();
})
.catch((error) => {
    console.error("Error al enviar tu comentario: ", error);
})
})

//funcion leer datos    
function Imprimircomentarios(){
  db.collection("comentarios").get().then((querySnapshot) => {
    let html='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().titulo}`);
        console.log(`${doc.data().descripcion}`);
        var listarDatos = `<br>
        <div style="border: 2px solid black ; background-color: green;" >
        <li class="listarDatos" style:"padding: 25px;">  
        <h5 class="listarDatosH5"> ${doc.data().titulo} </h5>
        <p> ${doc.data().descripcion}</p>
        </li>
        </div>
        `;
        html += listarDatos; 
    }); document.getElementById('verDatosEnPantallaTexto').innerHTML = html;
});
}

