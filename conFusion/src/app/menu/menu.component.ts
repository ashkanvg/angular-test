import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';


@Component({
  	selector: 'app-menu',
  	templateUrl: './menu.component.html',
  	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	
	/*dishes = DISHES;*//*not any more*//*dishes: Dish[] = DISHES*/
	dishes: Dish[];
	selectedDish: Dish; /*init variablbes*/


  	constructor(private dishService: DishService) { 

  	}

  	ngOnInit(): void {/*whenever this component is avaialable this function will run!*/
  		this.dishes = this.dishService.getDishes();
  	}
  	onSelect(dish: Dish){
  		this.selectedDish = dish;
  	}
}
