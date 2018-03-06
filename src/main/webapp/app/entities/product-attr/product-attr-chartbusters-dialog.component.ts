import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { Product_AttrChartbustersPopupService } from './product-attr-chartbusters-popup.service';
import { Product_AttrChartbustersService } from './product-attr-chartbusters.service';
import { ProductChartbusters, ProductChartbustersService } from '../product';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-attr-chartbusters-dialog',
    templateUrl: './product-attr-chartbusters-dialog.component.html'
})
export class Product_AttrChartbustersDialogComponent implements OnInit {

    product_Attr: Product_AttrChartbusters;
    isSaving: boolean;

    products: ProductChartbusters[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private product_AttrService: Product_AttrChartbustersService,
        private productService: ProductChartbustersService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: ResponseWrapper) => { this.products = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product_Attr.id !== undefined) {
            this.subscribeToSaveResponse(
                this.product_AttrService.update(this.product_Attr));
        } else {
            this.subscribeToSaveResponse(
                this.product_AttrService.create(this.product_Attr));
        }
    }

    private subscribeToSaveResponse(result: Observable<Product_AttrChartbusters>) {
        result.subscribe((res: Product_AttrChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Product_AttrChartbusters) {
        this.eventManager.broadcast({ name: 'product_AttrListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductChartbusters) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-attr-chartbusters-popup',
    template: ''
})
export class Product_AttrChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private product_AttrPopupService: Product_AttrChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.product_AttrPopupService
                    .open(Product_AttrChartbustersDialogComponent as Component, params['id']);
            } else {
                this.product_AttrPopupService
                    .open(Product_AttrChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
