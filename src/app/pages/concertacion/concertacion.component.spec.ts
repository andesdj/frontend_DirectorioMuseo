import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertacionComponent } from './concertacion.component';

describe('ConcertacionComponent', () => {
  let component: ConcertacionComponent;
  let fixture: ComponentFixture<ConcertacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
