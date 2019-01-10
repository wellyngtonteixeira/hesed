import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Membro } from './../../models/membro/membro.model';
import { MembrosService } from '../../services/membros/membros.service';
import { ToastService } from '../../services/toast/toast.service';

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

  constructor(public nav: NavController, public navParams: NavParams, private membros: MembrosService,
    private toast: ToastService) {
  }

  ionViewWillLoad() {
    this.membro = this.navParams.get('membro');
  }

  salvarMembro(membro: Membro){
  		this.membros.editMembro(membro)
  		.then(() => {
  			this.toast.show(`${membro.nome} Editado!`);
        this.nav.setRoot('MembrosPage');
  		});
  }

  removeMembro(membro: Membro){
    this.membros.removeMembro(membro)
      .then(() => {
        this.toast.show(`${membro.nome} excluído!`);
        this.nav.setRoot('MembrosPage');
      })
  }

}
