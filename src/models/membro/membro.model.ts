/*export interface Membro {
	key?: string;
	tipo: string;
	sexo: string;
	nome: string;
	telefone: number;
	email: string;
	dtnasc: string;
	dtingressou: string;
}*/
export interface Roles {
	servo: boolean;
	coord_ministerio?: boolean;
	coord_geral?: boolean;
	admin?: boolean;
}

export class Membro{
	key?: string;
	email: string;
	foto: string;
	sexo: string;
	nome: string;
	telefone: number;
	dtnasc: string;
	dtingressou: string;
	roles: Roles;

	constructor(authData){
		this.key = authData.uid;
		this.email = authData.email;
		this.nome = authData.displayName;
		this.foto = authData.photoURL;
		this.roles = {servo: true}
	}
}