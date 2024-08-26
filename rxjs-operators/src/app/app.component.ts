import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './service/movie.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data!:any;
  data1!:any;
  data2!:any;
  data3!:any;
  data4!:any;
  data5!:any;
  data6!:any;
  data7!:any;
  data8!:any;
  data9!:any;
  data10!:any;

  movieName: string = 'Inception';
  movieName1: string = "Dark";

  movieSRVC:MovieService= inject(MovieService);

  ngOnInit(): void {

    // see what data we recive from hitting api
    this.movieSRVC.showData().subscribe((data)=>{
      this.data = data;
    })
    console.log('showData',this.data)

    // Fetch all movies released between "2000-01-01" and "2010-12-31".
    this.movieSRVC.fetchingMoviesBetweenDates().subscribe((data)=>{
      this.data1 = data;
    })
    console.log('fetchingMoviesBetweenDates',this.data1)

 // returning the movies by name    
    this.movieSRVC.GetMoviesByName(this.movieName).subscribe((data)=>{
      this.data2 = data;
    })
    console.log('GetMoviesByName',this.data2)

    // Get all movies where the price is below $15 and map them to only include their names and release dates.
    this.movieSRVC.MoviesBelowPriceAndReturnNamesAndDates().subscribe((data)=>{
      this.data3 = data;
    })
    console.log('MoviesBelowPriceAndReturnNamesAndDates',this.data3)

    // Get all movies where the price is below $15 and map them to only include their names and release dates.
    this.movieSRVC.GetTheTitlesOfAllMoviesByCristopherNolan().subscribe((data)=>{
      this.data4 = data;
    })
    console.log('GetTheTitlesOfAllMoviesByCristopherNolan',this.data4)

   // Calculate the total price of all movies.
    this.movieSRVC.TotlPriceOfAllMovies().subscribe((data)=>{
      this.data5 = data;
    })
    console.log('TotlPriceOfAllMovies',this.data5)    

    // Log the names of movies that have a rating above 8.5 and return the count.
    this.movieSRVC.RatingAboveCertainValue().subscribe((data)=>{
      this.data6 = data;
    })
    console.log('RatingAboveCertainValue',this.data6)    

    // Get the first movie that has a rating above 9.
    this.movieSRVC.FirstMovieOfRating9().subscribe((data)=>{
      this.data7 = data;
    })
    console.log('RatingAboveCertainValue',this.data7)    

  // Get movies that were released after 2005, cost less than $20, and have a rating above 8.7
    this.movieSRVC.ReleasedMovieAfterYearCostRatinig().subscribe((data)=>{
      this.data8 = data;
    })
    console.log('ReleasedMovieAfterYearCostRatinig',this.data8) 
    
    // Get movies that were released after 2005, cost less than $20, and have a rating above 8.7
    this.movieSRVC.MovieWithWordDark(this.movieName1).subscribe((data)=>{
      this.data9 = data;
    })
    console.log('MovieWithWordDark',this.data9)       
  }


}
