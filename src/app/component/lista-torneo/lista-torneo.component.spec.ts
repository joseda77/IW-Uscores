import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTorneoComponent } from './lista-torneo.component';

describe('ListaTorneoComponent', () => {
  let component: ListaTorneoComponent;
  let fixture: ComponentFixture<ListaTorneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTorneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
