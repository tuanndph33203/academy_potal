import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCarousel } from './film-carousel';

describe('FilmCarousel', () => {
  let component: FilmCarousel;
  let fixture: ComponentFixture<FilmCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
