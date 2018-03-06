import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductChartbusters } from './product-chartbusters.model';
import { ProductChartbustersPopupService } from './product-chartbusters-popup.service';
import { ProductChartbustersService } from './product-chartbusters.service';
import { RatingChartbusters, RatingChartbustersService } from '../rating';
import { CategoryChartbusters, CategoryChartbustersService } from '../category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-chartbusters-dialog',
    templateUrl: './product-chartbusters-dialog.component.html'
})
export class ProductChartbustersDialogComponent implements OnInit {

    product: ProductChartbusters;
    isSaving: boolean;

    products: RatingChartbusters[];

    categories: CategoryChartbusters[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private productService: ProductChartbustersService,
        private ratingService: RatingChartbustersService,
        private categoryService: CategoryChartbustersService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ratingService
            .query({filter: 'product-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.product.product || !this.product.product.id) {
                    this.products = res.json;
                } else {
                    this.ratingService
                        .find(this.product.product.id)
                        .subscribe((subRes: RatingChartbusters) => {
                            this.products = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductChartbusters>) {
        result.subscribe((res: ProductChartbusters) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductChartbusters) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackRatingById(index: number, item: RatingChartbusters) {
        return item.id;
    }

    trackCategoryById(index: number, item: CategoryChartbusters) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-chartbusters-popup',
    template: ''
})
export class ProductChartbustersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductChartbustersDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductChartbustersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
