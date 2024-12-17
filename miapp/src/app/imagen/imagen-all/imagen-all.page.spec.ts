import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenAllPage } from './imagen-all.page';

describe('ImagenAllPage', () => {
  let component: ImagenAllPage;
  let fixture: ComponentFixture<ImagenAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
