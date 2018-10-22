import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class WebRequestJsonService
{
    //#region Fields

    private httpService: HttpClient;

    //#endregion

    //#region Contructors

    public constructor(httpService: HttpClient)
    {
        this.httpService = httpService;
    }

    //#endregion

    //#region Method RequestJSON

    public RequestJSON<T>(address: string): Promise<T>
    {
        return this.httpService.get<T>(address).toPromise();
    }

    //#endregion
}