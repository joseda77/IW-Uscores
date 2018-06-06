import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoFavoritoComponent } from './torneo-favorito.component';

describe('TorneoFavoritoComponent', () => {
  let component: TorneoFavoritoComponent;
  let fixture: ComponentFixture<TorneoFavoritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoFavoritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
