import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5000/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // delete item
  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(this.apiUrl + '/' + id);
  }

  // edit item
  editItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.apiUrl + '/' + item.id, item);
  }

  // add item
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

}
