import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './service/movie.service';
import { Pipe } from 'stream';
import { filter, from, mergeMap, Observable, tap, toArray,reduce, map, distinct, switchMap ,of, merge, pluck, first, startWith, forkJoin, combineLatest, delay, concat, concatMap, exhaustMap} from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-operators-advance';
  data1!:any;
  data2!:any;
  data3!:any;
  data4!:any;
  data5!:any;
  data6!:any;
  data7!:any;
  data8!:any;
  
  constructor(private MvieSrvc: MovieService){}

  ngOnInit(): void {
    this.MvieSrvc.getMovies().subscribe((data)=>{
      this.data1 = data;
    })
    console.log("getMovies",this.data1)

    // Get Movies by Genre and Sort by Rating:
    this.MvieSrvc.getMoviesByGenreSortByRating().subscribe((data)=>{
      this.data2 = data;
    })
    console.log("getMoviesByGenreSortByRating",this.data2)

    //Extract Cast Members and Find Specific Actor :
    // Retrieve the list of cast members from all movies and find if "Leonardo DiCaprio" has acted in any
    this.MvieSrvc.RetrieveListOfCastMembers().subscribe((data)=>{
      this.data3 = data;
    })
    console.log("RetrieveListOfCastMembers",this.data3)

    // Retrieve the list of cast members from all movies and find if "Leonardo DiCaprio" has acted in any
    this.MvieSrvc.CalculateAverageRAtingOfMoviesCristopherNolan().subscribe((data)=>{
      this.data4 = data;
    })
    console.log("CalculateAverageRAtingOfMoviesCristopherNolan",this.data4)
    
    // Retrieve the list of cast members from all movies and find if "Leonardo DiCaprio" has acted in any
    this.MvieSrvc.getMoviesOfDeluxeAndStandardPrice().subscribe((data)=>{
      this.data5 = data;
    })
    console.log("getMoviesOfDeluxeAndStandardPrice",this.data5)    

  // Get movies that were released after 2005, belong to the "Action" genre, 
  // and have a deluxe price less than $20. Return only the name, release date, 
  // and ratings.
  this.MvieSrvc.getMoviesAfterYearActionAndDeluxePrice().subscribe((data)=>{
      this.data6 = data;
    })
    console.log("getMoviesAfterYearActionAndDeluxePrice",this.data6)  
    
  // Extract all unique genres from the movies dataset.
  
  this.MvieSrvc.extractUniqueGenres().subscribe((data)=>{
    this.data7 = data;
  })
  console.log("extractUniqueGenres",this.data7)  
 
  this.MvieSrvc.extractUniqueGenres1().subscribe((data)=>{
    this.data8 = data;
  })
  console.log("extractUniqueGenres1",this.data8)  

  // using of emitting the data sequentilly either array string number.
  let data$ = of([1,2,3],'A', 'B')
  data$.subscribe(data => console.log(data)) // [ ... ] , A , B

  // using from take one argument and emit data as a single unit.
  from([1,2,3]).subscribe(data => console.log(data))

  // in both of and from the end result would be the observable so you can use the pipe as output of them.

  // using map
// Convert the data into an observable stream
const dataStream$ = {
  movies: [
    {
      "id": 1,
      "name": "Inception",
      "title": "Dream Within a Dream",
      "author": "Christopher Nolan",
      "ratings": 8.8,
      "price": { "standard": 14.99, "deluxe": 19.99 },
      "releaseDate": "2010-07-16",
      "genres": ["Action", "Sci-Fi", "Thriller"],
      "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
    },
    {
      "id": 2,
      "name": "The Matrix",
      "title": "Reality vs Illusion",
      "author": "Lana Wachowski, Lilly Wachowski",
      "ratings": 8.7,
      "price": { "standard": 9.99, "deluxe": 14.99 },
      "releaseDate": "1999-03-31",
      "genres": ["Action", "Sci-Fi"],
      "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    }
  ],
  reviews: [
    { "id": 1, "movieId": 1, "reviewer": "John Doe", "content": "Mind-bending and thrilling!" },
    { "id": 2, "movieId": 1, "reviewer": "Jane Smith", "content": "A visual masterpiece." },
    { "id": 3, "movieId": 2, "reviewer": "Alice Johnson", "content": "A revolutionary sci-fi experience." }
  ]
}
  // convert data into stream -make nested stream of observable using of form - chaining pipe
  of(dataStream$).pipe(
    map(item => of(item.movies).pipe( // as it consist of array of moives thorw that array { movies:[{...},{...}]}
      map(item => from(item).pipe( // from take each object out of that array
        filter(item => item.ratings > 8), // filter the stream based on condition
        pluck('author'), // get the specified nested key from data
      )),
    ))
  ).subscribe(
    data => data.subscribe(
      data => data.subscribe(
        data => console.log(data)
      )
    )
  )

    // same tream to be modified diffrently - means it doesnt effect the original stream
    of(dataStream$).pipe(
      map(item => of(item.movies).pipe( // as it consisit of array of moives thorw that array
        map(item => from(item).pipe( // from take each object out of that array
          map(item => item),
          tap(console.log),
          reduce((acc, val) => acc + val.ratings , 0)
        )),
      ))
    ).subscribe(
      data => data.subscribe(
        data => data.subscribe(
          data => console.log(data)
        )
      )
    )

/* ************************************* */ 

    // mergemap
    // mergemap creates a new observable so 0 1 2 3 4 are the observables that are emitted.
    // previous observables are not destroyed or ignored rather it creates the new observable keeping the [previous one alive and then merge into single stream.
    from([0,1,2,3,4]).pipe(
      mergeMap(x => of(x).pipe(delay(1000))) // this line create new observable
    ).subscribe( data =>
      console.log('MergeMap ', data)
    )


    // concatmap
    // in concat map the new observable is not completed ,until the previous one observable is fullfilled.
    // that is why there is a delay in it.
    // from([0,1,2,3,4]).pipe(
    //   concatMap(x =>of(x).pipe(delay(1000))) 
    // ).subscribe( data =>
    //   console.log('ConcatMap', data)
    // )


    // switchMap
    // cancel the previous observable created and emit the latest that come that why we get 4 only.
    from([0,1,2,3,4]).pipe(
      switchMap(x =>of(x).pipe(delay(1000))) 
    ).subscribe( data =>
      console.log('SwitchMap', data)
    )


    // // ExahustMap
    // // cancel the all next observable just stick to first one.
    from([0,1,2,3,4]).pipe(
      exhaustMap(x =>of(x).pipe(delay(1000))),
    ).subscribe( data =>
      console.log('ExhaustMap', data)
    )

    /* ******************************************** */
    // stream of movies - filter ratings > 8 and of christopher nolan
    let mvoieStream$ = of(dataStream$).pipe(
    map(item => item.movies)

    )
    // .subscribe(
    //   data => console.log(data)
    // )

    // stream of reviews - filter movie with id = 1
    let reviewStream$ = of(dataStream$).pipe(
      map(item => item.reviews)
    )
    // .subscribe(
    //   data => console.log(data)
    // )

    // wait for all observables to complete and then get their last emitted value.
    forkJoin([mvoieStream$, reviewStream$]).subscribe(([movies, reviews]) => { 
      console.log('Filtered Movies:', movies);
      console.log('Filtered Reviews:', reviews);
    });
  
  }

  
}
