import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ReviewChartbustersComponent } from './review-chartbusters.component';
import { ReviewChartbustersDetailComponent } from './review-chartbusters-detail.component';
import { ReviewChartbustersPopupComponent } from './review-chartbusters-dialog.component';
import { ReviewChartbustersDeletePopupComponent } from './review-chartbusters-delete-dialog.component';

export const reviewRoute: Routes = [
    {
        path: 'review-chartbusters',
        component: ReviewChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reviews'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'review-chartbusters/:id',
        component: ReviewChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reviews'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reviewPopupRoute: Routes = [
    {
        path: 'review-chartbusters-new',
        component: ReviewChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'review-chartbusters/:id/edit',
        component: ReviewChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'review-chartbusters/:id/delete',
        component: ReviewChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Reviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
