import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotFilm } from './hot-film';

describe('HotFilm', () => {
  let component: HotFilm;
  let fixture: ComponentFixture<HotFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotFilm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
