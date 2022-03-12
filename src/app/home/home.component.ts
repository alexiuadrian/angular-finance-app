import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ItemService } from '../services/item.service';
import { Item } from '../Item';

import Chart from 'chart.js/auto';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalSpent: number = 0;
  items: Item[] = [];
  chart: any = [];
  wasNotShown: boolean = true;
  calculateTotalWasNotCalled: boolean = true;
  calculateTotalSpentPerCategoryWasNotCalled: boolean = true;
  totalSpentPerCategory: number[] = [0, 0, 0, 0, 0, 0, 0];

  constructor(private itemService: ItemService, public afAuth: AngularFireAuth) { 
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.calculateTotalSpent();
      this.calculateTotalSpentPerCategory();
      this.displayChart();
    });
  }

  // Chart.js
  displayChart(): void {
    // Only call this function once
    if (this.wasNotShown) {
      this.wasNotShown = false;
    } else {
      return;
    }

    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    if(!ctx) {
      return;
    }

    // Pie Chart
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Alimente',
          'Electronice',
          'Casa',
          'Distractie',
          'Sport',
          'Animale',
          'Altele'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: this.totalSpentPerCategory,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(34, 99, 132)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Distribuție totală a cheltuielilor pe categorii'
          }
        }
      }
    });

    // this.calculateTotalSpentPerCategory();
  }

  // Calculate total spent per category
  calculateTotalSpentPerCategory(): void {

    // Call this function only once
    if (this.calculateTotalSpentPerCategoryWasNotCalled) {
      this.calculateTotalSpentPerCategoryWasNotCalled = false;
    } else {
      return;
    }

    const labels = [
      "Alimente",
      "Electronice",
      "Casa",
      "Distractie",
      "Sport",
      "Animale",
      "Altele"
    ]

    this.items.forEach(item => {
      // Go through each item and through each label and add in the total spent per category
      for (let i = 0; i < labels.length; i++) {
        if (item.category === labels[i]) {
          this.totalSpentPerCategory[i] += +item.price;
        }
      }
    });

  }
  
  calculateTotalSpent(): number {
    // Call this function only once
    if (this.calculateTotalWasNotCalled) {
      this.calculateTotalWasNotCalled = false;
    } else {
      return this.totalSpent;
    }

    let total: number = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += +this.items[i].price; // + converts string to number
    }
    this.totalSpent = total;

    return total;
  }

}
