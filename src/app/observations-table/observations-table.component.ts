import { Component, OnInit } from '@angular/core';
import { Observation } from '../observation.interface';
import { ObservationsService } from '../observations.service';

@Component({
  selector: 'app-observations-table',
  templateUrl: './observations-table.component.html',
  styleUrls: ['./observations-table.component.css']
})
export class ObservationsTableComponent implements OnInit {

  observations: Observation[];

  constructor(private observationsService: ObservationsService) { }

  ngOnInit(): void {
      this.observations = this.observationsService.getObservations();
  }

}
