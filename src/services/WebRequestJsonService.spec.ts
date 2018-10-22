import { WebRequestJsonService } from './WebRequestJsonService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('WebRequestJsonService', () => {
    let httpClientSpy;
    let call;
    beforeEach(() => {
        function sequenceSubscriber(observer) {
            observer.next([1, 2, 3]);
            observer.complete();
            return { unsubscribe() { } };
        }

        const resultHttp = new Observable(sequenceSubscriber);
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        httpClientSpy.get.and.callFake(function (arg) {
            if ('http://test' === arg) {
                return resultHttp;
            }
        });

        const web = new WebRequestJsonService(httpClientSpy as any as HttpClient);
        call = web.RequestJSON('http://test');
    });

    it('should return anything', () => {
        call.then((result) => {
            expect(result).not.toBeNull();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    it('should return correctly', () => {
        call.then((result) => {
            expect(result).toEqual([1, 2, 3]);
        });
    });

    it('should call GET on HTTP Server', () => {
        expect(httpClientSpy.get.calls.count())
            .toBe(1, 'spy method was called once');
    });
});

