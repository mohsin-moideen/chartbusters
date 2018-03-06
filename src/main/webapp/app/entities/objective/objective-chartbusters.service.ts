import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ObjectiveChartbusters } from './objective-chartbusters.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ObjectiveChartbustersService {

    private resourceUrl = SERVER_API_URL + 'api/objectives';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/objectives';

    constructor(private http: Http) { }

    create(objective: ObjectiveChartbusters): Observable<ObjectiveChartbusters> {
        const copy = this.convert(objective);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(objective: ObjectiveChartbusters): Observable<ObjectiveChartbusters> {
        const copy = this.convert(objective);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ObjectiveChartbusters> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(objective: ObjectiveChartbusters): ObjectiveChartbusters {
        const copy: ObjectiveChartbusters = Object.assign({}, objective);
        return copy;
    }
}
