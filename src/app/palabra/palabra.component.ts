import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.css']
})
export class PalabraComponent{

  arrayPalabras: string[] = ['MONALISA','EGIPTO','PARIS','INDIA','HULK','VENOM','SPIDERMAN'];  
  palabraRandom = '';
  palabraOculta = '';
  textUsuario:string = '';  
  contErrores = 0;
  intentos = 8;
 
  constructor() {
    this.seleccionarPalabraRandom();
  } 

  ngOnInit(): void {   
  }

  seleccionarPalabraRandom(){
    this.palabraRandom = this.arrayPalabras[Math.floor(Math.random()*this.arrayPalabras.length)];
    console.log(this.palabraRandom);
    for (let i = 0; i < this.palabraRandom.length; i++) {
      this.palabraOculta = this.palabraOculta + '_ ';     
    }
    
  }                   

  buscarLetra(){
    let letra = this.textUsuario;
    let palabraAcertada = "";

    if(letra != ''){
      for (let i = 0; i < this.palabraRandom.length; i++) {
        if (letra.toUpperCase() == this.palabraRandom[i]) {
          palabraAcertada = palabraAcertada + letra + ' ';
          console.log(palabraAcertada);
        }else{
          palabraAcertada = palabraAcertada + this.palabraOculta[i*2] + ' ';
          console.log(palabraAcertada);
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
      }else{
        console.log('perdiste')
      }

      //¿Ganó el juego?
      if (this.palabraOculta.indexOf('_') == -1) {
        console.log('Felicitaciones, ganaste');
      }
    }else{
      alert('Ingrese una letra');
    }    
  }
  
  jugarDeNuevo(){
    this.intentos = 8;
    this.contErrores = 0;

    this.seleccionarPalabraRandom();
  }
}
