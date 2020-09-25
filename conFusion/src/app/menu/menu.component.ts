import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';

import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  	selector: 'app-menu',
  	templateUrl: './menu.component.html',
  	styleUrls: ['./menu.component.scss'],
    host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
	
	/*dishes = DISHES;*//*not any more*//*dishes: Dish[] = DISHES*/
  	dishes: Dish[];
    errMess: string;



  	constructor(private dishService: DishService,
    @Inject('baseURL') private baseURL) { 

  	}

  	ngOnInit(): void {/*whenever this component is avaialable this function will run!*/
  		//before promises:
  		//this.dishes = this.dishService.getDishes();
  		//after promises:
  		//this.dishService.getDishes().then(dishes => this.dishes = dishes);
 this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  	}
}
