"use strict";


// Función para realizar una solicitud AJAX
function sendRequest(url, method, data, callback) {

    var xhr = new XMLHttpRequest();
    try 
    {
        xhr.onreadystatechange = function () {
                // && this.status < 400
                if (this.readyState == 4 ) {
                    window.location.href = '../Proyecto/calendar_month.html';
               }
   
        };
        xhr.open(method, url, true);
    
        if (method === 'POST') {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
    }
    catch (error)
    {
        alert('contact the administrator');
    }
}

// Función para manejar el evento de envío del formulario de registro
function handleSignupForm(event) {
    event.preventDefault();

    var formData =  new FormData(event.target);
    var queryString = new URLSearchParams(formData).toString();

    sendRequest('http://localhost:3000/registro/signup', 'POST', queryString, function (error, response) {
        if(response.status !== undefined)
        {
            if(error) { console.error('Error al registrar: ', error.message) }
            else { 
                console.log('Registro exitoso: ', response); 
                window.location.href = '../Proyecto/login.html';
            }

        }
        
    });
}

// Función para manejar el evento de envío del formulario de inicio de sesión
function handleLoginForm(event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var queryString = new URLSearchParams(formData).toString();

    sendRequest('http://localhost:3000/registro/login', 'POST', queryString, function (error, response) {
        if(error) {
            console.error('Error al iniciar sesión: ', error.message);
        }else {
            console.log('Inicio de sesión exitoso: ', response);
            window.location.href = '/calendar_month.html';
        }
    });
}

// Función para manejar el evento de envío del formulario de agregar evento
function handleEventForm(event) {
    event.preventDefault();

    var formData =  new FormData(event.target);
    var queryString = new URLSearchParams(formData).toString();

    sendRequest('http://localhost:3000/registro/saveEvent', 'POST', queryString, function (error, response) {
        if(response.status !== undefined)
        {
            if(error) { console.error('Error al registrar: ', error.message) }
            else { 
                console.log('Registro exitoso: ', response); 
                window.location.href = '../Proyecto/calendar_month.html';
            }

        }
        
    });
}

// Asignar las funciones a los eventos de los formularios
var login= document.getElementById('loginForm');
if(login){
    document.getElementById('loginForm').addEventListener('submit', handleLoginForm); 

}
var signup=document.getElementById('signupForm');
if (signup)
{
    document.getElementById('signupForm').addEventListener('submit', handleSignupForm); 
}

var eventForm=document.getElementById('event-form');
if(eventForm)
{
    document.getElementById('event-form').addEventListener('submit', handleEventForm); 

}

