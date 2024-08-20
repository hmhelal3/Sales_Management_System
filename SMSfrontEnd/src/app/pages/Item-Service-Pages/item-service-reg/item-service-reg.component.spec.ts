import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceRegComponent } from './item-service-reg.component';

describe('ItemServiceRegComponent', () => {
  let component: ItemServiceRegComponent;
  let fixture: ComponentFixture<ItemServiceRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemServiceRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemServiceRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
