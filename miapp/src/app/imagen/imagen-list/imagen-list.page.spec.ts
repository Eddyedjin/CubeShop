import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenListPage } from './imagen-list.page';

describe('ImagenListPage', () => {
  let component: ImagenListPage;
  let fixture: ComponentFixture<ImagenListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
