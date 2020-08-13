import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesComponent } from './favorite-movies.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class Movie {
  title: string
}

const favoriteMoviesToUse: Movie[] = [
  {title: 'Interstellar' } as Movie,
  {title: 'The big Lebowski' } as Movie,
  {title: 'Fences' } as Movie
]

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const titleElements = fixture.debugElement.queryAll(By.css('h1'));
    expect(titleElements.length).toBe(1);
    expect(titleElements[0].nativeElement.innerHTML).toBe('Favorite movies');
  });

  describe('Render', () => {
    it('should show all the favorite movies', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
      expect(movieElements.length).toBe(favoriteMoviesToUse.length);
    });

    it('should show the movie titles', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
      movieElements.forEach((movieElement: DebugElement, index) => {
        expect(movieElement.nativeElement.innerHTML).toContain(favoriteMoviesToUse[index].title);
      });
    });
  });
});
