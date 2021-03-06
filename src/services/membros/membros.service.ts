import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Membro } from '../../models/membro/membro.model';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as _ from 'lodash'
import {AuthService} from "../auth/auth.service";

@Injectable()
export class MembrosService{

    membro: BehaviorSubject<Membro> = new BehaviorSubject(null);
    private membroListRef = this.db.list<Membro>('membros');
	rolesMembro: Array<string>;

	constructor(private auth: AuthService, private db: AngularFireDatabase){
		this.auth.membro.map(membro =>{
			return this.rolesMembro = _.keys(_.get(membro, 'roles'))
		})
			.subscribe()
	}

	getMembros(inicio: BehaviorSubject<string>): Observable<any> {
		return inicio.switchMap(iniText => {
			const fimText = iniText + '\uf8ff';
			return this.db.list<Membro>('/membros', ref =>
				ref
				.orderByChild('nome')
				.limitToFirst(10)
				.startAt(iniText)
				.endAt(fimText)
				)
			.snapshotChanges()
			.debounceTime(200)
			.distinctUntilChanged()
			.map(changes => {
				return changes.map(c => {
					return {key: c.payload.key, ...c.payload.val()};
				});
			});
		});
	}

	getMembro(key: string){
		const membroPath =  `membros/${key}`;
		const membro = this.db.object(membroPath)
		return membro;
	}

	addMembro(membro: Membro){
		return this.membroListRef.push(membro);
	}

	editMembro(membro: Membro){
		return this.membroListRef.update(membro.key, membro);
	}

	removeMembro(membro: Membro){
		return this.membroListRef.remove(membro.key);
	}

	get canRead(): boolean {
		const permitido = ['servo', 'coord_ministerio', 'coord_geral']
		return this.matchingRole(permitido)
	}

	private matchingRole(rolesPermitidas): boolean {
		return !_.isEmpty(_.intersection(rolesPermitidas, this.rolesMembro))
	}


}