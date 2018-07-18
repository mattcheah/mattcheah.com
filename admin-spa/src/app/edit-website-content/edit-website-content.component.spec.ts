import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebsiteContentComponent } from './edit-website-content.component';

describe('EditWebsiteContentComponent', () => {
  let component: EditWebsiteContentComponent;
  let fixture: ComponentFixture<EditWebsiteContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWebsiteContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebsiteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
