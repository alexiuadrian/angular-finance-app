import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddItem: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddItem() {
    this.showAddItem = !this.showAddItem;
    this.subject.next({ showAddItem: this.showAddItem });
  }

  onToggleAddItem(): Observable<any> {
    return this.subject.asObservable();
  }
}
