import { Component, OnInit , Input ,ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Comment } from '../shared/comment';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
	dish: Dish;
	dishIds: string[];
	prev: string;
	next: string;
	errMess: string;

	/*for validation*/
	feedbackForm: FormGroup;
	feedback: Feedback;
	contactType = ContactType;
  	comment: Comment;
  dishcopy: Dish;

	formErrors = {
		author: '',
		comment: '',
		rating: 5 ,

	};

	validationMessages = {
	    'author': {
	      'required':      'Name is required.',
	      'minlength':     'Name must be at least 2 characters long.',
	    },
	    'comment': {
	      'required':      'Comment is required.'
	    },
	};

	@ViewChild('cform') feedbackFormDirective;
	constructor(private dishservice:DishService,
	  	private route: ActivatedRoute,
		private location: Location,
		private fb:FormBuilder,
		@Inject('baseURL') private baseURL) { }
  /*ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => this.dish = dish);
  }*/
	ngOnInit() {
		  this.createForm();
		//dar asle b ja in k copy kne to y moteqayer jadid b esm dishIds, miad subscribe mikone tosh
	    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
	    //in code paeen dre mge harmoqe id avaz shd khod josh getDishIds ro dobre ejra kn
	    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
	    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },errmess => this.errMess = <any>errmess);
	}
	setPrevNext(dishId: string) {
	    const index = this.dishIds.indexOf(dishId);
	    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
	    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
	}
	goBack(): void {
    	this.location.back();
  	}

  	createForm() { //construct form
	    this.feedbackForm = this.fb.group({
	      rating: 5,
	      comment: ['', [Validators.required] ],
	      author: ['', [Validators.required, Validators.minLength(2)] ],
	      date: [this.myDate()]
	    });


	    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    	this.onValueChanged(); // (re)set validation messages now
}
		onSubmit() {
			this.feedback = this.feedbackForm.value;
		    console.log(this.feedback);
			this.dishcopy.comments.push(this.feedbackForm.value);
			this.dishservice.putDish(this.dishcopy)
		      .subscribe(dish => {
		        this.dish = dish; this.dishcopy = dish;
		      },
		      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
			this.feedbackForm.reset({
			      rating: 5,
			      comment: '',
			      author: '',
			      date: '',
			    });  
			this.feedbackFormDirective.resetForm(); //ensure back and reset to first of the form

		}

    	onValueChanged(data?: any) {
	    if (!this.feedbackForm) { return; }
	    const form = this.feedbackForm;
	    for (const field in this.formErrors) {
	      if (this.formErrors.hasOwnProperty(field)) {
	        // clear previous error message (if any)
	        this.formErrors[field] = '';
	        const control = form.get(field);
	        if (control && control.dirty && !control.valid) {
	          const messages = this.validationMessages[field];
	          for (const key in control.errors) {
	            if (control.errors.hasOwnProperty(key)) {
	              this.formErrors[field] += messages[key] + ' ';
	            }
	          }
	        }
	      }
	    }
	  }

	  myDate()
	  {
	    var d= new Date();
	    var n= d.toISOString();
	    return n;
	  } 
}