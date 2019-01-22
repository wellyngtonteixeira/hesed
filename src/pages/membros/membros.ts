import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MembrosService} from '../../services/membros/membros.service';
import { Membro } from './../../models/membro/membro.model';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Push, PushObject, PushOptions} from "@ionic-native/push";
import { AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth/auth.service";

/**
 * Generated class for the MembrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membros',
  templateUrl: 'membros.html',
})
export class MembrosPage implements OnInit{

  membrosLista;
  inicio: BehaviorSubject<string|null> = new BehaviorSubject("");
  fim: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  ultTeclPress: number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private membros: MembrosService,
              public auth: AuthService) {

  }

  ngOnInit(){
    this.membros.getMembros(this.inicio)
    .subscribe(membros => this.membrosLista = membros);
  }
/*
  getAllMembros(){
    this.membrosRef.query.on('value', membrosLista => {
        let membros = [];
        membrosLista.forEach( membro => {
          membros.push(membro.val());
          return false;
        });
        this.membrosLista = membros;
        this.allMembrosLista = membros;
    });
    this.membrosLista = this.allMembrosLista;
  }

  inicializaMembrosLista(){
    //this.getAllMembros();
    this.membrosLista = this.allMembrosLista;
  }

  getMembros(ev: any){
    this.inicializaMembrosLista();
    const val = ev.target.value;

    if(val && val.trim() != ''){
      this.membrosLista = this.membrosLista.filter((m) => {
        return (m.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
      });
    }
  }*/

  search($event) {
      //this.ngOnInit();
      let q = $event.target.value;
      
      if(q && q.trim() != ''){
        this.membrosLista = this.membrosLista.filter((membro) => {
          return (membro.nome.toLowerCase().indexOf(q.toLowerCase()) > -1);
        });
      }else{
        this.ngOnInit();
      }
    
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad MembrosPage');
    /*this.membrosRef = this.membros.getMembroList();
    this.membrosRef.query.on('value', membrosLista => {
        let membros = [];
        membrosLista.forEach( membro => {
          membros.push(membro.val());
          return false;
        });
        this.membrosLista = membros;
        this.allMembrosLista = membros;
    });*/
  }

}
