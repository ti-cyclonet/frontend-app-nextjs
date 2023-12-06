export interface IUser {
	id?: string;
	email: string;
	phonenumber?: string;
	firstname?: string;
	lastname?: string;
	password?: string;
	status?: string;
	roles?: string[]
};

export const emptyUser: IUser = {
	email: "",
	phonenumber: "",
	firstname: "",
	lastname: "",
	password: "",
	status: "",
};