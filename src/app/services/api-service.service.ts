import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:8081';

  private items = new BehaviorSubject<any[]>([]);
  public itemsObservable = this.items.asObservable();

  constructor(private http: HttpClient) { }

  getItems(){
    this.http.get<any[]>(`${this.apiUrl}/GET`).subscribe(data => {
      this.items.next(data);
    });
    return this.itemsObservable;
  }

  createItem(item: any): Observable<any> {

    // Si el item tiene un id, se actualiza en lugar de crear
    if (item.id != null) {
      return this.updateItem(item);
    }

    return this.http.post(`${this.apiUrl}/POST`, item).pipe(
      tap(() => this.getItems())
    );
  }

  updateItem(item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/PUT`, item).pipe(
      tap(() => this.getItems())
    );
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.apiUrl}/DELETE/${id}`).pipe(
      tap(() => this.getItems())
    );
  }
}