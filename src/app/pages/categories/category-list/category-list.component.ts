import { CategoryService } from './../shared/category.service';
import { Component } from '@angular/core';
import { Category } from '../shared/categories.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories,
      error: error => console.error(error)
    });
  }

  deleteCategory(category: Category) {
    // @ts-ignore
    this.categoryService.delete(category.id).subscribe({
      next: () => this.categories = this.categories.filter(el => el !== category),
      error: error => console.error(error)
    });
  }
}
