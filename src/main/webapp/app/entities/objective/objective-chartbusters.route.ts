import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ObjectiveChartbustersComponent } from './objective-chartbusters.component';
import { ObjectiveChartbustersDetailComponent } from './objective-chartbusters-detail.component';
import { ObjectiveChartbustersPopupComponent } from './objective-chartbusters-dialog.component';
import { ObjectiveChartbustersDeletePopupComponent } from './objective-chartbusters-delete-dialog.component';

export const objectiveRoute: Routes = [
    {
        path: 'objective-chartbusters',
        component: ObjectiveChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Objectives'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'objective-chartbusters/:id',
        component: ObjectiveChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Objectives'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const objectivePopupRoute: Routes = [
    {
        path: 'objective-chartbusters-new',
        component: ObjectiveChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Objectives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective-chartbusters/:id/edit',
        component: ObjectiveChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Objectives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'objective-chartbusters/:id/delete',
        component: ObjectiveChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Objectives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
