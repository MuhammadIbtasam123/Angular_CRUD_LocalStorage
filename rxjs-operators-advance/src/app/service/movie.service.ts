import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, from, mergeMap, Observable, tap, toArray,reduce, map, distinct, switchMap ,of, merge, pluck, first} from 'rxjs';
import { IMovie } from '../interface/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public API_URL = "http://localhost:3000/";
  public GET_MOVIES='movies';

  constructor(private http:HttpClient) { }

  getMovies(): Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`)
  }

  // Get Movies by Genre and Sort by Rating:
  getMoviesByGenreSortByRating(): Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap((movie) => movie),
      filter(movie => movie.genres?.includes("Sci-Fi")), // convert the filtered objects into array to apply sort method.
      toArray(), // needed a complete array to sort values
      map(movie => movie.sort((a,b)=> {return b.ratings-a.ratings})),
    )
  }

	

  // Extract Cast Members and Find Specific Actor
  // Retrieve the list of cast members from all movies and find if "Leonardo DiCaprio" has acted in any
  RetrieveListOfCastMembers(): Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap((movie) => movie),
      filter(movie => movie.cast.includes("Leonardo DiCaprio")), // convert the filtered objects into array to apply sort method.
      toArray(),
    )
  }

  // Calculate Average Rating of Movies by Christopher Nolan
  CalculateAverageRAtingOfMoviesCristopherNolan(): Observable<number>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => (movie)),
      filter(movie => movie.author === "Christopher Nolan"),
      map(movie => movie.ratings),
      toArray(),
      map( item => item.reduce((acc:any , item:any) => {return (acc + item)} , 0 ) / item.length )
    )
  }

  // Find movies where the deluxe price is below $20 and standard price is below $15.
  getMoviesOfDeluxeAndStandardPrice(): Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => (movie)),
      filter(movie => movie.price.deluxe < 20 && movie.price.standard < 15 ),
      toArray()
    )
  }

  // Get movies that were released after 2005, belong to the "Action" genre, 
  // and have a deluxe price less than $20. Return only the name, release date, 
  // and ratings.

  getMoviesAfterYearActionAndDeluxePrice(): Observable<{name:string, releaseDate:String, ratings:number}[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => (movie)),
      filter(movie => new Date(movie.releaseDate).getFullYear() > 2005 
      && movie.genres.includes('Action')
      && movie.price.deluxe < 20),
      map(movie => 
      {
        return {
          name: movie.name,
          releaseDate: movie.releaseDate,
          ratings: movie.ratings,
        }
      }
      ),
	  toArray()
    )
  }

  // Extract all unique genres from the movies dataset.
  extractUniqueGenres():Observable<string[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => (movie)),
	  mergeMap((item) => item.genres),
	  distinct(),
	  toArray()
    )
  }

  extractUniqueGenres1():Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe( // { movies, reviews}
		// map((movieItem:IMovie[]) => movieItem.map(i => i.author)), // here map loop over and emit the array of movies and reviews
		map((movieItem:IMovie[]) => movieItem)
	)
  }

}

