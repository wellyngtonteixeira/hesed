import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Membro } from './../../models/membro/membro.model';
import { MembroListService } from './../../services/membro-list/membro-list.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private membros: MembroListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMembroPage');
  }

  addMembro(membro: Membro){
  	this.membros.addMembro(membro).then(ref => {
  		this.navCtrl.setRoot('MembrosPage', {key: ref.key});
  	});
  }

}
