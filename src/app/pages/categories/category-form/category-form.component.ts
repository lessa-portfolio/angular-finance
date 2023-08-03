import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from './../shared/category.service';
import { Category } from '../shared/categories.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  // @ts-ignore
  currentAction: string;
  // @ts-ignore
  categoryForm: FormGroup;
  // @ts-ignore
  pageTitle: string;
  // @ts-ignore
  serverErrorMessages: string[] = null;

  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.builCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // Private Methods
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit'
    }
  }

  private builCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        // @ts-ignore
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe({
        next: (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        error: error => console.error(error)
      })
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Create new category'
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editting category: ' + categoryName;
    }
  }
}
