/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RatingChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/rating/rating-chartbusters-detail.component';
import { RatingChartbustersService } from '../../../../../../main/webapp/app/entities/rating/rating-chartbusters.service';
import { RatingChartbusters } from '../../../../../../main/webapp/app/entities/rating/rating-chartbusters.model';

describe('Component Tests', () => {

    describe('RatingChartbusters Management Detail Component', () => {
        let comp: RatingChartbustersDetailComponent;
        let fixture: ComponentFixture<RatingChartbustersDetailComponent>;
        let service: RatingChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [RatingChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RatingChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(RatingChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RatingChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RatingChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RatingChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rating).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
