import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenAddPage } from './imagen-add.page';

describe('ImagenAddPage', () => {
  let component: ImagenAddPage;
  let fixture: ComponentFixture<ImagenAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
