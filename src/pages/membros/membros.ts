import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MembrosService} from '../../services/membros/membros.service';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
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

    console.log(this.auth.autenticado)

  }

  ngOnInit(){
    this.membros.getMembros(this.inicio)
    .subscribe(membros => this.membrosLista = membros);
  }

  search($event) {
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
      if(this.auth.membro.value == null){
          console.log("Fez logout")
      }
  }


  ionViewCanEnter(): boolean {
      if(this.auth.autenticado){
          return true
      }else{
          return false
      }
  }

}
