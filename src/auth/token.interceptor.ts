import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let data: Observable<string> = Observable.fromPromise(
            Promise.resolve('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE0NGY4ZTlmN2I0ZTU2MWNmYWJlZmY2MTk5MzJlYmNmMjJlMzIzY2JkNjRiYWFlNWY4N2U1NTZmYjMyNDE0ZmMxNmMzNzcxZTc4NWM5OGI2In0.eyJhdWQiOiIyIiwianRpIjoiYTQ0ZjhlOWY3YjRlNTYxY2ZhYmVmZjYxOTkzMmViY2YyMmUzMjNjYmQ2NGJhYWU1Zjg3ZTU1NmZiMzI0MTRmYzE2YzM3NzFlNzg1Yzk4YjYiLCJpYXQiOjE1MjUyMDU3MjksIm5iZiI6MTUyNTIwNTcyOSwiZXhwIjoxNTU2NzQxNzI5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.p2Q0JgCVHszqXIw3q9RXw6RwxKeabQuFLGLvOzMZCTuQuginI6cm2ANZ9fSUSY_5d8jL2dbA6V6D32PKiMFJlRZxt-CNygkucOB1fd3frAMKG-prvSfYNrkxh6DLRytxSQdP9v3UmplXdh2QaIFMOLsUZWUFdeMwSTsR4lud4SS4w1qcvVgmV1lkrFqHJJpuK-6SY__RuFlej8zO7nAi9PWcdnVemZQqYmIud3zDEuGveYkxHgMJY-DyB52NQ7x_uuRpqr43nmJeoSNeaoy7Sy4HwAFV2qou2vn3Bah64M_a_MQs4mM7kdAxMDd-kzLbS35548MY7Q4CYHdkQKwjZKNh5wQxlRwxzTZioVkXAjIPKbLe4arL9TKPe0sJvnQTgSilLN0jO0zgAeosndnlHC5kjE0idwGSjhXxPICVfXQBjNpt6RmmYJkI9J02SkjW8yDlg1oWm734kGBe98GkbcjW8h08CgOjgoFrgpKMiokoKbO-kyTUcFZoae0CUcrkBvUviCBzUCIZ7HIuznfqNFX3iHxaS22M9PfD54-oMPyvXUv-Dfeg_Y_Oxl5umlY9KCfNAgH_PBVwJk7OUraG7ydjRQBGGNBcwFG6X0rGcazgV2HTms8tIt1xWpcRcL8EqmFYJlNPui7n8eW_UH5TdwXV39ShjRiPflpAncBZhkY')
        );

        return data.mergeMap((token: string) => {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(request);
        });

    }

}
