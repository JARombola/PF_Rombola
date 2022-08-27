import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsersComponent } from './listado-users.component';

describe('ListadoUsersComponent', () => {
  let component: ListadoUsersComponent;
  let fixture: ComponentFixture<ListadoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
