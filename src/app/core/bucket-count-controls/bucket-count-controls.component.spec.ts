import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketCountControlsComponent } from './bucket-count-controls.component';

describe('CartCountControlsComponent', () => {
  let component: BucketCountControlsComponent;
  let fixture: ComponentFixture<BucketCountControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BucketCountControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketCountControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
