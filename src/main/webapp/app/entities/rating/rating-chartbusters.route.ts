import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RatingChartbustersComponent } from './rating-chartbusters.component';
import { RatingChartbustersDetailComponent } from './rating-chartbusters-detail.component';
import { RatingChartbustersPopupComponent } from './rating-chartbusters-dialog.component';
import { RatingChartbustersDeletePopupComponent } from './rating-chartbusters-delete-dialog.component';

export const ratingRoute: Routes = [
    {
        path: 'rating-chartbusters',
        component: RatingChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ratings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rating-chartbusters/:id',
        component: RatingChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ratings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratingPopupRoute: Routes = [
    {
        path: 'rating-chartbusters-new',
        component: RatingChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ratings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-chartbusters/:id/edit',
        component: RatingChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ratings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-chartbusters/:id/delete',
        component: RatingChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Ratings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
