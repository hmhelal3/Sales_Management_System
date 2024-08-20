import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceListComponent } from './item-service-list.component';

describe('ItemServiceListComponent', () => {
  let component: ItemServiceListComponent;
  let fixture: ComponentFixture<ItemServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemServiceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
