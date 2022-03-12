import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../Item';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  items: Item[] = [];
  @Input() cat!: string;
  faPlus = faPlus;

  showAddItem: boolean;
  subscription: Subscription;

  constructor(private itemService: ItemService, private uiService: UiService, private route:ActivatedRoute, private router:Router) {
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


}
