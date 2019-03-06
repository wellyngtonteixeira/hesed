import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {BehaviorSubject, Observable} from "rxjs";
import {Membro} from "../../models/membro/membro.model";

@Injectable()
export class AuthService{
    membro: BehaviorSubject<Membro> = new BehaviorSubject(null);
    autenticado: boolean = false;

    constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth)
    {
        this.afAuth.authState.subscribe(u => {
            if(u){
                if(this.verificaSeEhMembro(u)){
                    this.autenticado = true;
                    this.membro.next(new Membro(u));
                    localStorage.setItem('user', JSON.stringify(new Membro(u)));
                    JSON.parse(localStorage.getItem('user'));
                } else {
                    this.logout();
                }
            } else {
                this.autenticado = false;
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    verificaSeEhMembro(user: firebase.User): boolean
    {
        try{
            if(!this.buscaMembro(this.replaceAll(user.email)).isEmpty()){
                return true;
            } else if(!this.buscaMembro(user.uid).isEmpty()){
                return true;
            } else {
                return false;
            }
        }
        catch (e) {
            console.error("ERRO AO VERIFICAR MEMBRO: "+e.toLocaleString());
        }
    }

    buscaMembro(id: string): Observable<any>
    {
        try{
            return this.db.object("membros/"+id).valueChanges()
        }catch (e) {
            console.error("ERRO AO BUSCAR MEMBRO: "+e.toLocaleString())
            return null
        }
    }

    replaceAll(palavra: string)
    {
        let cont = 0;
        while(cont <= palavra.length){
            palavra = palavra.replace(".", "%2E");
            cont++;
        }
        return palavra;
    }

    GoogleAuth()
    {
        return this.login(new firebase.auth.GoogleAuthProvider());
    }

    async login(provider){
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.membro.next(new Membro(result.user));
            }).catch((error) => {
                console.error(error.toLocaleString())
            })
    }

    async logout()
    {
        return this.afAuth.auth.signOut().then(() => {
            this.membro = new BehaviorSubject(null);
            localStorage.removeItem('user');
        });
    }
}
