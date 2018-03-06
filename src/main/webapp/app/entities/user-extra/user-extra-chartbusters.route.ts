import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserExtraChartbustersComponent } from './user-extra-chartbusters.component';
import { UserExtraChartbustersDetailComponent } from './user-extra-chartbusters-detail.component';
import { UserExtraChartbustersPopupComponent } from './user-extra-chartbusters-dialog.component';
import { UserExtraChartbustersDeletePopupComponent } from './user-extra-chartbusters-delete-dialog.component';

export const userExtraRoute: Routes = [
    {
        path: 'user-extra-chartbusters',
        component: UserExtraChartbustersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-extra-chartbusters/:id',
        component: UserExtraChartbustersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtraPopupRoute: Routes = [
    {
        path: 'user-extra-chartbusters-new',
        component: UserExtraChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra-chartbusters/:id/edit',
        component: UserExtraChartbustersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra-chartbusters/:id/delete',
        component: UserExtraChartbustersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
