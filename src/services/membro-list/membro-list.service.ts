import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Membro } from './../../models/membro/membro.model';

@Injectable()
export class MembroListService{
	
	private membroListRef = this.db.list<Membro>('membro-list');

	constructor(private db: AngularFireDatabase){}

	getMembroList(){
		return this.membroListRef;
	}

	addMembro(membro: Membro){
		return this.membroListRef.push(membro);
	}


}