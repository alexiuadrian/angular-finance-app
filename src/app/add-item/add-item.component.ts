import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../Item';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @Output() onAddItem: EventEmitter<Item> = new EventEmitter<Item>();

  name: string;
  category: string;
  description: string;
  price: number;
  date: string;
  userId: string;

  showAddItem: boolean;
  subscription: Subscription;

  categoriesArray: string[] = ['Alimente', 'Electronice', 'Acasa', 'Distractie', 'Sport', 'Animale', 'Diverse'];

  constructor(private uiService: UiService, public afAuth: AngularFireAuth) { 

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
      }
    });

    this.name = '';
    this.category = '';
    this.description = '';
    this.price = 0;
    this.date = '';
    this.userId = '';
    this.showAddItem = false;
    this.subscription = this.uiService.onToggleAddItem().subscribe(data => {
      this.showAddItem = data.showAddItem;
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.name) {
      alert('Name is required');
      return;
    }
    else if(!this.category) {
      alert('Category is required');
      return;
    }
    else if(!this.description) {
      alert('Description is required');
      return;
    }
    else if(!this.price) {
      alert('Price is required');
      return;
    }
    else if(!this.date) {
      alert('Date is required');
      return;
    }
    
    const newItem = {
      name: this.name,
      category: this.category,
      description: this.description,
      price: this.price,
      date: this.date,
      userId: this.userId
    };

    // emit new item to parent component
    this.onAddItem.emit(newItem);

    // clear the form
    this.name = '';
    this.category = '';
    this.description = '';
    this.price = 0;
    this.date = '';

  }

  onClose() {
    this.uiService.toggleAddItem();
  }

}
