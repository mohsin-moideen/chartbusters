import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtraChartbusters } from './user-extra-chartbusters.model';
import { UserExtraChartbustersService } from './user-extra-chartbusters.service';

@Component({
    selector: 'jhi-user-extra-chartbusters-detail',
    templateUrl: './user-extra-chartbusters-detail.component.html'
})
export class UserExtraChartbustersDetailComponent implements OnInit, OnDestroy {

    userExtra: UserExtraChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userExtraService: UserExtraChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserExtras();
    }

    load(id) {
        this.userExtraService.find(id).subscribe((userExtra) => {
            this.userExtra = userExtra;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserExtras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userExtraListModification',
            (response) => this.load(this.userExtra.id)
        );
    }
}
