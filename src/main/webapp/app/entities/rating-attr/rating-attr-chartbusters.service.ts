import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Rating_AttrChartbusters } from './rating-attr-chartbusters.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Rating_AttrChartbustersService {

    private resourceUrl = SERVER_API_URL + 'api/rating-attrs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/rating-attrs';

    constructor(private http: Http) { }

    create(rating_Attr: Rating_AttrChartbusters): Observable<Rating_AttrChartbusters> {
        const copy = this.convert(rating_Attr);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(rating_Attr: Rating_AttrChartbusters): Observable<Rating_AttrChartbusters> {
        const copy = this.convert(rating_Attr);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Rating_AttrChartbusters> {
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

    private convert(rating_Attr: Rating_AttrChartbusters): Rating_AttrChartbusters {
        const copy: Rating_AttrChartbusters = Object.assign({}, rating_Attr);
        return copy;
    }
}
