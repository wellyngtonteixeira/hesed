import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Membro } from './../../models/membro/membro.model';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class MembroListService{
	
	private membroListRef = this.db.list<Membro>('membros');
	rolesMembro: Array<string>;

	constructor(private db: AngularFireDatabase){}

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