import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/Leader';

import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaderes: Leader[];
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
  	this.leaderes= this.leaderService.getLeaders();
  }

}
