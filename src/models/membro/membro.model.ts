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
	sexo: string;
	nome: string;
	telefone: number;
	dtnasc: string;
	dtingressou: string;
	roles: Roles;

	constructor(authData){
		this.email = authData.email;
		this.roles = { servo: false};
	}
}