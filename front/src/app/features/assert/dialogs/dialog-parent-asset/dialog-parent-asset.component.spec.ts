/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogParentAssetComponent } from './dialog-parent-asset.component';

describe('DialogParentAssetComponent', () => {
  let component: DialogParentAssetComponent;
  let fixture: ComponentFixture<DialogParentAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogParentAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogParentAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
