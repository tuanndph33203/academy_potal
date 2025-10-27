import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCollection } from './home-collection';

describe('HomeCollection', () => {
  let component: HomeCollection;
  let fixture: ComponentFixture<HomeCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
