/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChartbustersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ObjectiveChartbustersDetailComponent } from '../../../../../../main/webapp/app/entities/objective/objective-chartbusters-detail.component';
import { ObjectiveChartbustersService } from '../../../../../../main/webapp/app/entities/objective/objective-chartbusters.service';
import { ObjectiveChartbusters } from '../../../../../../main/webapp/app/entities/objective/objective-chartbusters.model';

describe('Component Tests', () => {

    describe('ObjectiveChartbusters Management Detail Component', () => {
        let comp: ObjectiveChartbustersDetailComponent;
        let fixture: ComponentFixture<ObjectiveChartbustersDetailComponent>;
        let service: ObjectiveChartbustersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChartbustersTestModule],
                declarations: [ObjectiveChartbustersDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ObjectiveChartbustersService,
                    JhiEventManager
                ]
            }).overrideTemplate(ObjectiveChartbustersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ObjectiveChartbustersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ObjectiveChartbustersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ObjectiveChartbusters(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.objective).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
