import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/Leader';

import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaderes: Leader[];
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
  	this.leaderService.getLeaders().subscribe(leaderes => this.leaderes = leaderes);
  }

}
