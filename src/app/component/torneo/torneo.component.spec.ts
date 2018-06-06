import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoComponent } from './torneo.component';

describe('TorneoComponent', () => {
  let component: TorneoComponent;
  let fixture: ComponentFixture<TorneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
