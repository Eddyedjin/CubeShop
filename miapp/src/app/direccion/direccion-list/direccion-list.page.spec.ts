import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionListPage } from './direccion-list.page';

describe('DireccionListPage', () => {
  let component: DireccionListPage;
  let fixture: ComponentFixture<DireccionListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
