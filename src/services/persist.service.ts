import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ConfigService} from './config.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersistService {

    private pending: any = {};

    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) {}

    getData(type: string): Promise<any> {
        console.log('Loading ' + type + '...');
        return this.http.get(
            this.config.apiRoot + '/api/' + type
        ).toPromise().then((response: Array<any>) => { return response; });
    }

    setData(type: string, data: any): Promise<any> {
        if (undefined !== this.pending[type]) {
            clearInterval(this.pending[type]);
        }
        return new Promise((resolve: any, reject: any) => {
            this.pending[type] = setTimeout(() => {
                console.log('Saving ' + type + '...');
                this.http.post(
                    this.config.apiRoot + '/api/' + type,
                    data
                )
                .toPromise()
                .then((response: any) => { resolve(response); })
                .catch((error: any) => { reject(error); });
            }, 1000);
        });
    }
}
