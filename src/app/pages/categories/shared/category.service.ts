import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './categories.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';

const categories: Category[] = [
  { id: 1, name: 'Moradia', description: 'Pagamento de Contas da Casa' },
  { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
  { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc.' },
  { id: 4, name: 'Salário', description: 'Recebimento de salário' },
  { id: 5, name: 'Freelancer', description: 'Trabaho como Freelancer' },
];

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = 'your-url-here';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Category[]> {
    return of(categories).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
    // return this.http.get<Category[]>(this.apiPath).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategories)
    // );
  }

  public getById(id: number): Observable<Category> {
    const category = categories.find(cat => cat.id === id);
    return of(category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
    // return this.http.get<Category[]>(this.apiPath + '/' + id).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategory)
    // );
  }

  public create(category: Category): Observable<Category> {
    category.id = categories.length + 1;

    categories.push(category);

    return of(category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );;

    // return this.http.post(this.apiPath, category).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategory)
    // );
  }

  public update(category: Category): Observable<Category> {
    const index = categories.findIndex(cat => cat.id === category.id);

    if (index !== -1) {
      categories[index] = category;

      return of(category).pipe(
        catchError(this.handleError),
        map(() => category)
      );
    } else {
      return of(category).pipe(
        catchError(this.handleError),
        map(() => category)
      );
    }

    // return this.http.put(this.apiPath + '/' + category.id, category).pipe(
    //   catchError(this.handleError),
    //   map(() => category)
    // );
  }

  public delete(id: number): Observable<any> {
    const index = categories.findIndex(cat => cat.id === id);

    if (index !== -1) {
      categories.splice(index, 1);
      return of(categories);
    } else {
      return of(categories);
    }
    // return this.http.delete(this.apiPath + '/' + id).pipe(
    //   catchError(this.handleError),
    //   map(() => null)
    // );
  }

  // Private Methods
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];

    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    console.error(error);
    return throwError(error);
  }
}
