import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Palabra } from 'src/models/palabra';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.css']
})
export class PalabraComponent{

  palabras: Palabra[] = [
    {
      pista: 'Personaje de Marvel',
      nombre: 'Hulk'
    },
    {
      pista: 'Pais de Africa',
      nombre: 'Egipto'
    },
    {
      pista: 'Personaje de Marvel',
      nombre: 'Spiderman'
    },
    {
      pista: 'Ciudad mas poblada de Francia',
      nombre: 'Paris'
    },
    {
      pista: 'Personaje de Marvel',
      nombre: 'Venom'
    },
    {
      pista: 'Pais de Asia',
      nombre: 'India'
    }
  ];

  palabraRandom: string = '';
  palabraRandom_pista: string = '';
  palabraOculta: string = '';
  textUsuario: string = '';  
  contErrores: number = 0;
  intentos: number = 8;
  mensaje: string = '';

  constructor() {
    this.seleccionarPalabraRandom();
  } 

  ngOnInit(): void {   
  }

  seleccionarPalabraRandom(){
    let numRandom = Math.floor(Math.random()*this.palabras.length);
    this.palabraRandom = this.palabras[numRandom].nombre;
    this.palabraRandom_pista = this.palabras[numRandom].pista;
    
    for (let i = 0; i < this.palabraRandom.length; i++) {
      this.palabraOculta = this.palabraOculta + '_ ';     
    }
    
  }                   

  buscarLetra(){
    let letra = this.textUsuario;
    let palabraAcertada = "";

    if(letra != ''){
      for (let i = 0; i < this.palabraRandom.length; i++) {
        if (letra.toUpperCase() == this.palabraRandom[i].toUpperCase()) {
          palabraAcertada = palabraAcertada + letra + ' ';
        }else{
          palabraAcertada = palabraAcertada + this.palabraOculta[i*2] + ' ';
        }          
      } 
      
      this.palabraOculta = palabraAcertada.toUpperCase();
      this.textUsuario = '';

      //Contar el numero de errores e intentos
      if (this.contErrores < 8) {
        if(this.palabraOculta == palabraAcertada){
          this.contErrores++;
          this.intentos--;
        }
      }

      //Enviar mensaje cuando pierde el juego
      if(this.contErrores == 8){
        this.mensaje = 'Perdiste';
      }

      //¿Ganó el juego?
      if (this.palabraOculta.indexOf('_') == -1) {
        this.mensaje = 'Felicitaciones, ganaste';
      }
    }else{
      alert('Ingrese una letra');
    }    
  }
  
  jugarDeNuevo(){
    this.intentos = 8;
    this.contErrores = 0;
    this.mensaje = '';
    this.palabraOculta = '';
    this.textUsuario = '';
    this.seleccionarPalabraRandom();
  }
}
