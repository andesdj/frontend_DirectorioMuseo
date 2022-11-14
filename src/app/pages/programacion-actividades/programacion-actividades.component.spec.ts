import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionActividadesComponent } from './programacion-actividades.component';

describe('ProgramacionActividadesComponent', () => {
  let component: ProgramacionActividadesComponent;
  let fixture: ComponentFixture<ProgramacionActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
