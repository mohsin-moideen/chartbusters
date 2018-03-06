import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Product_AttrChartbusters } from './product-attr-chartbusters.model';
import { Product_AttrChartbustersPopupService } from './product-attr-chartbusters-popup.service';
import { Product_AttrChartbustersService } from './product-attr-chartbusters.service';

@Component({
    selector: 'jhi-product-attr-chartbusters-delete-dialog',
    templateUrl: './product-attr-chartbusters-delete-dialog.component.html'
})
export class Product_AttrChartbustersDeleteDialogComponent {

    product_Attr: Product_AttrChartbusters;

    constructor(
        private product_AttrService: Product_AttrChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.product_AttrService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'product_AttrListModification',
                content: 'Deleted an product_Attr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-attr-chartbusters-delete-popup',
    template: ''
})
export class Product_AttrChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private product_AttrPopupService: Product_AttrChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.product_AttrPopupService
                .open(Product_AttrChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
