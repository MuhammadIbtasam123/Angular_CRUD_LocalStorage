import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './service/movie.service';


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
  }

  
}
