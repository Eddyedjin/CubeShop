import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionAllPage } from './direccion-all.page';

describe('DireccionAllPage', () => {
  let component: DireccionAllPage;
  let fixture: ComponentFixture<DireccionAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

