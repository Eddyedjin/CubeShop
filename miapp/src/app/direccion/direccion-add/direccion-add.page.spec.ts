import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionAddPage } from './direccion-add.page';

describe('DireccionAddPage', () => {
  let component: DireccionAddPage;
  let fixture: ComponentFixture<DireccionAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
