import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Membro } from './../../models/membro/membro.model';
import { MembroListService } from './../../services/membro-list/membro-list.service';

/**
 * Generated class for the EditMembroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-membro',
  templateUrl: 'edit-membro.html',
})
export class EditMembroPage {

	membro: Membro;

  constructor(public navCtrl: NavController, public navParams: NavParams, private membros: MembroListService) {
  }

  ionViewWillLoad() {
    this.membro = this.navParams.get('membro');
  }

  salvarMembro(membro: Membro){
  		this.membros.editMembro(membro)
  		.then(() => {
  			this.navCtrl.setRoot('MembrosPage');
  		});
  }

}
