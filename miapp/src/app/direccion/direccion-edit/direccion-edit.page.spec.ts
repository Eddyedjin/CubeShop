import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionEditPage } from './direccion-edit.page';

describe('DireccionEditPage', () => {
  let component: DireccionEditPage;
  let fixture: ComponentFixture<DireccionEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

