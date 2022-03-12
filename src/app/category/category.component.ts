import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../Item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  items: Item[] = [];
  @Input() category!: string;
  faPlus = faPlus;

  showAddItem: boolean;
  subscription: Subscription;

  constructor(private itemService: ItemService, private uiService: UiService, private route:ActivatedRoute, private router:Router) {
      this.category = route.snapshot.data['category'];
      this.showAddItem = false;
      this.subscription = this.uiService.onToggleAddItem().subscribe(data => {
          this.showAddItem = data.showAddItem;
      });
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  onClick() {
    this.uiService.toggleAddItem();
  }

  // on add
  onAdd(item: Item): void {
    this.itemService.addItem(item).subscribe(item => {
      this.items.push(item);
    });
  }

}
