import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewMovie } from './home-new-movie';

describe('HomeNewMovie', () => {
  let component: HomeNewMovie;
  let fixture: ComponentFixture<HomeNewMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNewMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
