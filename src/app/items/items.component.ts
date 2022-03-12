import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../Item';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  @Input() cat!: string;

  constructor(private itemService: ItemService, public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  makeDateFromString(date: string): Date {
    return new Date(date);
  }

  // on delete
  onDelete(id: any): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }

  // on edit
  onEdit(item: Item): void {

    const newItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      date: item.date,
      userId: item.userId
    };

    console.log(newItem);

    this.itemService.editItem(newItem).subscribe(() => {
      console.log(item);
      this.items = this.items.filter(i => i.id !== item.id);
      this.items.push(item);
    });
  }

}
