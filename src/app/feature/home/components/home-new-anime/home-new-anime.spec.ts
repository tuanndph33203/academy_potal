import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewAnime } from './home-new-anime';

describe('HomeNewAnime', () => {
  let component: HomeNewAnime;
  let fixture: ComponentFixture<HomeNewAnime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewAnime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNewAnime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
