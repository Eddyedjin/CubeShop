import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenEditPage } from './imagen-edit.page';

describe('ImagenEditPage', () => {
  let component: ImagenEditPage;
  let fixture: ComponentFixture<ImagenEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
