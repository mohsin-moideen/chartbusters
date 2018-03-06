import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ObjectiveChartbusters } from './objective-chartbusters.model';
import { ObjectiveChartbustersService } from './objective-chartbusters.service';

@Component({
    selector: 'jhi-objective-chartbusters-detail',
    templateUrl: './objective-chartbusters-detail.component.html'
})
export class ObjectiveChartbustersDetailComponent implements OnInit, OnDestroy {

    objective: ObjectiveChartbusters;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private objectiveService: ObjectiveChartbustersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInObjectives();
    }

    load(id) {
        this.objectiveService.find(id).subscribe((objective) => {
            this.objective = objective;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInObjectives() {
        this.eventSubscriber = this.eventManager.subscribe(
            'objectiveListModification',
            (response) => this.load(this.objective.id)
        );
    }
}
