import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { RatingChartbusters } from './rating-chartbusters.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RatingChartbustersService {

    private resourceUrl = SERVER_API_URL + 'api/ratings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/ratings';

    constructor(private http: Http) { }

    create(rating: RatingChartbusters): Observable<RatingChartbusters> {
        const copy = this.convert(rating);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(rating: RatingChartbusters): Observable<RatingChartbusters> {
        const copy = this.convert(rating);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<RatingChartbusters> {
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

    private convert(rating: RatingChartbusters): RatingChartbusters {
        const copy: RatingChartbusters = Object.assign({}, rating);
        return copy;
    }
}
