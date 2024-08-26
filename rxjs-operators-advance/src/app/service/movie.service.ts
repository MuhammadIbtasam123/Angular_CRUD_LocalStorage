import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, from, mergeMap, Observable, tap, toArray,reduce, map, distinct } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public API_URL = "http://localhost:3000/";
  public GET_MOVIES='movies';

  constructor(private http:HttpClient) { }

  getMovies(): Observable<any[]>{
    return this.http.get<any>(`${this.API_URL}${this.GET_MOVIES}`)
  }

  // Get Movies by Genre and Sort by Rating:
  getMoviesByGenreSortByRating(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap((movie) => movie),
      filter(movie => movie.genres.includes("Sci-Fi")), // convert the filtered objects into array to apply sort method.
      toArray(),
      mergeMap(movie => movie.sort((a:number,b:number)=> {return b-a})),
      toArray()
    )
  }

  // Extract Cast Members and Find Specific Actor
  // Retrieve the list of cast members from all movies and find if "Leonardo DiCaprio" has acted in any
  RetrieveListOfCastMembers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap((movie) => movie),
      filter(movie => movie.cast.includes("Leonardo DiCaprio")), // convert the filtered objects into array to apply sort method.
      toArray(),
    )
  }

  // Calculate Average Rating of Movies by Christopher Nolan
  CalculateAverageRAtingOfMoviesCristopherNolan(): Observable<any>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => from(movie)),
      filter(movie => movie.author === "Christopher Nolan"),
      map(movie => movie.ratings),
      toArray(),
      map( item => item.reduce((acc:any , item:any) => {return (acc + item)} , 0 ) / item.length )
    )
  }

  // Find movies where the deluxe price is below $20 and standard price is below $15.
  getMoviesOfDeluxeAndStandardPrice(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => from(movie)),
      filter(movie => movie.price.deluxe < 20 && movie.price.standard < 15 ),
      toArray()
    )
  }

  // Get movies that were released after 2005, belong to the "Action" genre, 
  // and have a deluxe price less than $20. Return only the name, release date, 
  // and ratings.

  getMoviesAfterYearActionAndDeluxePrice(): Observable<any>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => from(movie)),
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
  extractUniqueGenres():Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}${this.GET_MOVIES}`).pipe(
      mergeMap(movie => from(movie)),
      mergeMap(movie => movie.genres),
      distinct(),
      toArray(),
    )
  }
}
