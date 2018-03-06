/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserExtraChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/user-extra/user-extra-chartbusters-detail.component';
import { UserExtraChartbustersService } from '../../../../../../main/webapp/app/entities/user-extra/user-extra-chartbusters.service';
import { UserExtraChartbusters } from '../../../../../../main/webapp/app/entities/user-extra/user-extra-chartbusters.model';

describe('Component Tests', () => {

    describe('UserExtraChartbusters Management Detail Component', () => {
        let comp: UserExtraChartbustersDetailComponent;
        let fixture: ComponentFixture<UserExtraChartbustersDetailComponent>;
        let service: UserExtraChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [UserExtraChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserExtraChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserExtraChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtraChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtraChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserExtraChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userExtra).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
