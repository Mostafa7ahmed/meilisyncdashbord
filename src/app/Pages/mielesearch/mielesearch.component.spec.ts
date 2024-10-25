import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MielesearchComponent } from './mielesearch.component';

describe('MielesearchComponent', () => {
  let component: MielesearchComponent;
  let fixture: ComponentFixture<MielesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MielesearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MielesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
