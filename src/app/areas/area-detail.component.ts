import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { slideInDownAnimation } from '../animations';

import { Hero, AreaService }  from './area.service';
//import { AppGeneric } from '../../providers/app.generic';
@Component({
  templateUrl: './area-detail.html',
  animations: [ slideInDownAnimation ]
})
export class AreaDetailComponent implements OnInit {

  item: any;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AreaService//,
    //public appGeneric: AppGeneric
  ) {}

  ngOnInit() {
  }

}
