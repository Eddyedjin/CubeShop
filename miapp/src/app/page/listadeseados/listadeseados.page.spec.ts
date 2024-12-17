import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadeseadosPage } from './listadeseados.page';

describe('ListadeseadosPage', () => {
  let component: ListadeseadosPage;
  let fixture: ComponentFixture<ListadeseadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadeseadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
