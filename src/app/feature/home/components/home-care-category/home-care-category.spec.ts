import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCareCategory } from './home-care-category';

describe('HomeCareCategory', () => {
  let component: HomeCareCategory;
  let fixture: ComponentFixture<HomeCareCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCareCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCareCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
