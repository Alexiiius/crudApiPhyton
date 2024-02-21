import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComponentComponent } from './listar-component.component';

describe('ListarComponentComponent', () => {
  let component: ListarComponentComponent;
  let fixture: ComponentFixture<ListarComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarComponentComponent]
    });
    fixture = TestBed.createComponent(ListarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
