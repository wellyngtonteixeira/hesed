import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MembroListService } from './../../services/membro-list/membro-list.service';
import { Membro } from './../../models/membro/membro.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
export class MembrosPage {

	membrosList$: Observable<Membro[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private membros: MembroListService) {
  	this.membrosList$ = this.membros.getMembroList()
  	.snapshotChanges()
  	.map(
  		changes => {
  			return changes.map(c =>({
  				key: c.payload.key, ...c.payload.val()
  			}));
  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembrosPage');
  }

}
