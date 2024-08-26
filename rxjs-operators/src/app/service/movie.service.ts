import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count, merge, Observable, pluck, reduce } from 'rxjs';
import { filter ,tap, from, map, mergeMap, toArray,first, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  privateURL = 'http://localhost:3000/movies'

  constructor( private http: HttpClient) { }

  // see what data we recive from hitting api
  showData() : Observable <any>{
    return this.http.get<any>(`${this.privateURL}`)
  }

  // Fetch all movies released between "2000-01-01" and "2010-12-31".
  fetchingMoviesBetweenDates(): Observable <any> {
    const startDate = new Date('2000-01-01');
    const endDate = new Date('2010-12-31');
  
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      map(movies => movies.filter(movie => {
        const releaseDate = new Date(movie?.releaseDate);
        return releaseDate >= startDate && releaseDate <= endDate;
      }))
      // tap(console.log)
    );
  }
  // returning the movies by name
  GetMoviesByName(movieName:string): Observable <any> {
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      map(MovieObject => MovieObject.filter(item => item?.name.includes(movieName)))
    );
  }
  // Get all movies where the price is below $15 and map them to only include their names and release dates.
  MoviesBelowPriceAndReturnNamesAndDates(): Observable <any> {
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movie => (movie)), // map will not return observable here -  useing from to convert inot observable stream
      filter(movie => movie.price < 15), // Filter movies with price < 15
      map(filteredMovie => ({ name: filteredMovie.name, releaseDate: filteredMovie.releaseDate })),
      toArray(), 
      // tap(console.log)
    );
  }

  // Get the titles of all movies directed by "Christopher Nolan".    
  GetTheTitlesOfAllMoviesByCristopherNolan(): Observable <any> {
      return this.http.get<any[]>(`${this.privateURL}`).pipe(
        mergeMap(movieObject => (movieObject)),
        filter(item => item.author === 'Christopher Nolan'),
        pluck('title'),
        toArray()
      );
    }

  // Calculate the total price of all movies.
  TotlPriceOfAllMovies(): Observable <any> {
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movies => (movies)), // Convert the array of movies into a stream of individual movie objects
      reduce((acc, movie) => acc + movie.price, 0), // Accumulate the total price
    );
  }

  // Log the names of movies that have a rating above 8.5 and return the count.
  RatingAboveCertainValue():Observable<any>{
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movie => (movie)),
      filter(movie => movie.ratings > 8.7),
      // count(),// this will send the count of emmison from observable
      toArray(),
      map((mvi)=>{
        return {
          name: mvi.map(m => m.name),
          count: mvi.length 
        }
      })
    )
  }

  // Get the first movie that has a rating above 9.
  FirstMovieOfRating9():Observable<any>{
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movie => (movie)),
      filter(movie => movie.ratings > 8.7),
      // take(1),
      first(),
      toArray(),
    )
  }

  // Get movies that were released after 2005, cost less than $20, and have a rating above 8.7
  ReleasedMovieAfterYearCostRatinig(): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movies => (movies)), // Convert the array of movies into a stream of individual movie objects
      filter(movie => new Date(movie?.releaseDate).getFullYear() > 2005 && movie?.price < 20 && movie?.ratings > 8.5),
      toArray()
    );
  }

  // Find all movies containing the word "Dark" in their name and return their name, release date, and price.

  MovieWithWordDark(value: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.privateURL}`).pipe(
      mergeMap(movies => (movies)), // Convert the array of movies into a stream of individual movie objects
      filter(movie => movie.name.includes(value)), // Filter movies where the title contains the given value
      map(movie => ({
        name: movie?.name,
        releaseDate: movie?.releaseDate,
        price: movie?.price
      })), 
      toArray(),
    );
  }
  
}  
