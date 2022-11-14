import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaArtesComponent } from './oferta-artes.component';

describe('OfertaArtesComponent', () => {
  let component: OfertaArtesComponent;
  let fixture: ComponentFixture<OfertaArtesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaArtesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaArtesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
