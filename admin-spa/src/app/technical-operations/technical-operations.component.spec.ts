import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalOperationsComponent } from './technical-operations.component';

describe('TechnicalOperationsComponent', () => {
  let component: TechnicalOperationsComponent;
  let fixture: ComponentFixture<TechnicalOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
