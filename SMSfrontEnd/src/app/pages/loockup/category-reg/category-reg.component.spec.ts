import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRegComponent } from './category-reg.component';

describe('CategoryRegComponent', () => {
  let component: CategoryRegComponent;
  let fixture: ComponentFixture<CategoryRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
