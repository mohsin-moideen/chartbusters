import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryChartbusters } from './category-chartbusters.model';
import { CategoryChartbustersPopupService } from './category-chartbusters-popup.service';
import { CategoryChartbustersService } from './category-chartbusters.service';

@Component({
    selector: 'jhi-category-chartbusters-delete-dialog',
    templateUrl: './category-chartbusters-delete-dialog.component.html'
})
export class CategoryChartbustersDeleteDialogComponent {

    category: CategoryChartbusters;

    constructor(
        private categoryService: CategoryChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-chartbusters-delete-popup',
    template: ''
})
export class CategoryChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryPopupService
                .open(CategoryChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
