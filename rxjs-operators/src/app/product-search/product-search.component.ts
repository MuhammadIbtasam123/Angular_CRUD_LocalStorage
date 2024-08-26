import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  searchControl = new FormControl();
  filteredProducts: any[] = [];


  // ngOnInit(): void {
  //   this.getAllProducts();
  // }

  // getAllProducts(){
  //   this.searchControl.valueChanges.pipe(
  //     startWith(''),
  //     debounceTime(900),
  //     distinctUntilChanged(),
  //     switchMap((item) => this.productService.searchProducts(item)),
  //     tap(products => console.log('Search Results:', products)),
  //     map(products => products.filter(product => product.stock > 0)),
  //     tap(products => console.log('Filtered Results:', products))
  //   ).subscribe(products => {
  //     this.filteredProducts = products;
  //   });
  // }

}
