/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ReviewChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/review/review-chartbusters-detail.component';
import { ReviewChartbustersService } from '../../../../../../main/webapp/app/entities/review/review-chartbusters.service';
import { ReviewChartbusters } from '../../../../../../main/webapp/app/entities/review/review-chartbusters.model';

describe('Component Tests', () => {

    describe('ReviewChartbusters Management Detail Component', () => {
        let comp: ReviewChartbustersDetailComponent;
        let fixture: ComponentFixture<ReviewChartbustersDetailComponent>;
        let service: ReviewChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [ReviewChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ReviewChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(ReviewChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReviewChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReviewChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ReviewChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.review).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
