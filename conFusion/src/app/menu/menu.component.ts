import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DISHES } from '../shared/dishes';


@Component({
  	selector: 'app-menu',
  	templateUrl: './menu.component.html',
  	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	
	dishes = DISHES;/*dishes: Dish[] = DISHES*/
	selectedDish: Dish; /*init variablbes*/


  	constructor() { }

  	ngOnInit(): void {
  	}
  	onSelect(dish: Dish){
  		this.selectedDish = dish;
  	}
}
