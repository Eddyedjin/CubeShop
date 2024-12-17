import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenDetailPage } from './imagen-detail.page';

describe('ImagenDetailPage', () => {
  let component: ImagenDetailPage;
  let fixture: ComponentFixture<ImagenDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
