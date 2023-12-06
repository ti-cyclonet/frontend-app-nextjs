import {IUser} from '@core/domain/IUser'

export class User implements IUser{
	id: string = '';
	email: string = '';
	phonenumber: string = '';
	firstname: string = '';
	lastname: string = '';
	password: string = '';
	status: string = '';

	constructor();
	constructor(email:string, phonenumber: string, firstname: string, lastname: string, password: string);
	constructor(email:string, phonenumber: string, firstname: string, lastname: string, password: string, status: string);
	constructor(id: string, email:string, phonenumber: string, firstname: string, lastname: string, password: string, status: string);	
	constructor(...params: any[]) {

		//console.log(params.length);
		//console.log(JSON.stringify(params));

		if (params.length === 0) {
			return;
		}

		if (params.length === 5) {
			this.email = params[0];
			this.phonenumber = params[1];
			this.firstname = params[2];
			this.lastname = params[3];
			this.password = params[4];
			this.status = 'ACTIVE';
			return;
		}

		if (params.length === 6) {
			this.email = params[0];
			this.phonenumber = params[1];
			this.firstname = params[2];
			this.lastname = params[3];
			this.password = params[4];
			this.status = params[5] == 'CONFIRMED' ? 'ACTIVE': 'INACTIVE';
			return;
		}

		if (params.length === 7) {
			this.id = params[0];
			this.email = params[1];
			this.phonenumber = params[2];
			this.firstname = params[3];
			this.lastname = params[4];
			this.password = params[5];
			this.status = params[6] == 'CONFIRMED' ? 'ACTIVE': 'INACTIVE';
			return;
		}
	}	

}
