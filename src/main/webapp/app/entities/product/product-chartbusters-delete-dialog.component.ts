import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductChartbusters } from './product-chartbusters.model';
import { ProductChartbustersPopupService } from './product-chartbusters-popup.service';
import { ProductChartbustersService } from './product-chartbusters.service';

@Component({
    selector: 'jhi-product-chartbusters-delete-dialog',
    templateUrl: './product-chartbusters-delete-dialog.component.html'
})
export class ProductChartbustersDeleteDialogComponent {

    product: ProductChartbusters;

    constructor(
        private productService: ProductChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-chartbusters-delete-popup',
    template: ''
})
export class ProductChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
