import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private config: ConfigService
    ) {}

    public clearStoreData(): void {
        console.log('AuthService::clearStoreData');
    }

    public reloadStoreData(): Promise<void> {
        console.log('AuthService::reloadStoreData');
        return Promise.resolve();
    }

    public checkAccessToken(response: any)
    {
        if (response.hasOwnProperty('access_token')) {
            return this.storage.set('accessToken', response['access_token'])
                .then(this.reloadStoreData.bind(this));
        }

        return this.storage.remove('accessToken');
    }

    public login(email: string, password: string): Promise<any> {
        return this.http.post(
            this.config.apiRoot + '/api/login',
            {
                'email': email,
                'password': password
            }
        ).toPromise().then(this.checkAccessToken.bind(this));
    }

    public register(name: string, email: string, password: string, password_confirmation: string): Promise<any> {
        return this.http.post(
            this.config.apiRoot + '/api/register',
            {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': password_confirmation
            }
        ).toPromise().then(this.checkAccessToken.bind(this));
    }

    public logout(): Promise<any> {
        return this.http.post(
            this.config.apiRoot + '/api/logout',
            {}
        ).toPromise().then(this.clientLogout.bind(this));
    }

    public clientLogout() {
        this.storage.set('accessToken', null);
        this.clearStoreData();
        return true;
    }

    public refresh():  Promise<any> {
        return this.http.post(
            this.config.apiRoot + '/api/login/refresh',
            {}
        ).toPromise().then(this.checkAccessToken.bind(this));
    }

    public isAuthenticated(): Promise<boolean | void> {
        console.log('AuthService::isAuthenticated');
        return this.storage.get('accessToken').then((token: string) => {
            if (null === token) {
                return Promise.resolve().then(() => {
                    this.clearStoreData();
                    return false;
                });
            }

            return this.reloadStoreData()
            .catch(response => {
                this.storage.set('accessToken', null);
                return false;
            });
        });
    }
}
