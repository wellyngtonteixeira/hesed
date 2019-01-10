import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Membro } from './../../models/membro/membro.model';
import { MembrosService } from '../../services/membros/membros.service';

/**
 * Generated class for the AddMembroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-membro',
  templateUrl: 'add-membro.html',
})
export class AddMembroPage {

	membro = {} as Membro;

  constructor(public nav: NavController, public navParams: NavParams, private membros: MembrosService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMembroPage');
  }

  addMembro(membro: Membro){
  	this.membros.addMembro(membro).then(ref => {
  		this.nav.setRoot('MembrosPage', {key: ref.key});
  	});
  }

}
