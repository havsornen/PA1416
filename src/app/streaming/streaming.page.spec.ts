import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingPage } from './streaming.page';

describe('StreamingPage', () => {
  let component: StreamingPage;
  let fixture: ComponentFixture<StreamingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
