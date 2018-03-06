import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtraChartbusters } from './user-extra-chartbusters.model';
import { UserExtraChartbustersPopupService } from './user-extra-chartbusters-popup.service';
import { UserExtraChartbustersService } from './user-extra-chartbusters.service';

@Component({
    selector: 'jhi-user-extra-chartbusters-delete-dialog',
    templateUrl: './user-extra-chartbusters-delete-dialog.component.html'
})
export class UserExtraChartbustersDeleteDialogComponent {

    userExtra: UserExtraChartbusters;

    constructor(
        private userExtraService: UserExtraChartbustersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userExtraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userExtraListModification',
                content: 'Deleted an userExtra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-extra-chartbusters-delete-popup',
    template: ''
})
export class UserExtraChartbustersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtraPopupService: UserExtraChartbustersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userExtraPopupService
                .open(UserExtraChartbustersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
