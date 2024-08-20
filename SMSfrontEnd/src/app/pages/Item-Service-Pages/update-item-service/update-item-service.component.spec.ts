import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemServiceComponent } from './update-item-service.component';

describe('UpdateItemServiceComponent', () => {
  let component: UpdateItemServiceComponent;
  let fixture: ComponentFixture<UpdateItemServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
