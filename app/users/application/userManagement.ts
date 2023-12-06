import { IUser } from '@core/domain/IUser'
import { UserRepository } from "@users/domain/userRepository";

export class UserManagement {

    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<{ success: boolean; users: IUser[] | null }> {
        try {
            const responseUser = await this.userRepository.getAll();
            return { success: true, users: responseUser };
        } catch (e: any) {
            return { success: false, users: null };
        }
    }

    async geUserByEmail(email: string): Promise<{ success: boolean; user: IUser | null }> {
        try {
            const responseUser = await this.userRepository.getById(email);
            return { success: true, user: responseUser };
        } catch (e: any) {
            return { success: false, user: null };
        }
    }

    async registerUser(user: IUser): Promise<{ success: boolean; user: IUser | null }> {
        try {
            const responseUser = await this.userRepository.add(user);
            return { success: true, user: responseUser };
        } catch (e: any) {
            return { success: false, user: null };
        }
    }

    async updateUser(email: string, user: IUser): Promise<{ success: boolean; user: IUser | null }> {
        try {
            const responseUser = await this.userRepository.update(user);
            return { success: true, user: responseUser };
        } catch (e: any) {
            return { success: false, user: null };
        }
    }

    async inactivateUser(email: string): Promise<{ success: boolean; user: IUser | null }> {
        try {
            let responseUser = await this.userRepository.getById(email);
            if (responseUser) {
                responseUser.status = 'INACTIVE';
                responseUser = await this.userRepository.update(responseUser);
                return { success: true, user: responseUser };
            } else {
                return { success: false, user: null };
            }
        } catch (e: any) {
            return { success: false, user: null };
        }
    }

    async deleteUser(email: string): Promise<{ success: boolean; user: IUser | null }> {
        try {
            await this.userRepository.delete(email);
            return { success: true, user: null };
        } catch (e: any) {
            return { success: false, user: null };
        }
    }

    async getAllRoles(): Promise<{ success: boolean; roles: string[]|null }> {
        try {
            let responseUser = await this.userRepository.getAllRoles();
            return { success: true, roles: responseUser };
        } catch (e: any) {
            return { success: false, roles: null };
        }
    }

}