import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialMapComponent } from './celestial-map.component';

describe('CelestialMapComponent', () => {
  let component: CelestialMapComponent;
  let fixture: ComponentFixture<CelestialMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelestialMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelestialMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
