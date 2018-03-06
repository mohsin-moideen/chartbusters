import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { Rating_AttrChartbustersComponent } from './rating-attr-chartbusters.component';
import { Rating_AttrChartbustersDetailComponent } from './rating-attr-chartbusters-detail.component';
import { Rating_AttrChartbustersPopupComponent } from './rating-attr-chartbusters-dialog.component';
import { Rating_AttrChartbustersDeletePopupComponent } from './rating-attr-chartbusters-delete-dialog.component';

export const rating_AttrRoute: Routes = [
    {
        path: 'rating-attr-chartbusters',
        component: Rating_AttrChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rating_Attrs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rating-attr-chartbusters/:id',
        component: Rating_AttrChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rating_Attrs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rating_AttrPopupRoute: Routes = [
    {
        path: 'rating-attr-chartbusters-new',
        component: Rating_AttrChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rating_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-attr-chartbusters/:id/edit',
        component: Rating_AttrChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rating_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rating-attr-chartbusters/:id/delete',
        component: Rating_AttrChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rating_Attrs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
