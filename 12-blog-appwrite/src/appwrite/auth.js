import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // Function for creating new account
    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // if account created successfully then directly login the user by calling login function.
                return this.login({email, password})
            } else{
                return userAccount
            }
        }
        catch (error){
            throw error
        }
    }

    // Function for login after creating account.
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // Function for checking if user exists or not
    async getCurrentUser(){
        try {
            if(this.account){
                return await this.account.get();
            } else {
                return null
            }
        } catch (error) {
            throw error
        }

    }

    // Function for logout
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error);
        }
    }

}

const authservice = new AuthService()

export default authservice