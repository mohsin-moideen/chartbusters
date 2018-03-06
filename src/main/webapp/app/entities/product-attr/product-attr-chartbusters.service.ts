import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Product_AttrChartbustersService {

    private resourceUrl = SERVER_API_URL + 'api/product-attrs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/product-attrs';

    constructor(private http: Http) { }

    create(product_Attr: Product_AttrChartbusters): Observable<Product_AttrChartbusters> {
        const copy = this.convert(product_Attr);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(product_Attr: Product_AttrChartbusters): Observable<Product_AttrChartbusters> {
        const copy = this.convert(product_Attr);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Product_AttrChartbusters> {
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

    private convert(product_Attr: Product_AttrChartbusters): Product_AttrChartbusters {
        const copy: Product_AttrChartbusters = Object.assign({}, product_Attr);
        return copy;
    }
}
