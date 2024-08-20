import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceDetailsComponent } from './item-service-details.component';

describe('ItemServiceDetailsComponent', () => {
  let component: ItemServiceDetailsComponent;
  let fixture: ComponentFixture<ItemServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemServiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
