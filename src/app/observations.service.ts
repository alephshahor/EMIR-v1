import { Injectable } from '@angular/core';
import { Observation } from './Observation.interface'

@Injectable({
  providedIn: 'root'
})
export class ObservationsService {

  constructor() { }

  /* This should be an HTTP request to the server */
  getObservations(): Observation[]{
    return [
      {
        id: "SexA_000",
        xCoordinate: 0,
        yCoordinate: 0,
        weight: 100,
        priority: 1,
        jMag: 99.99,
        kMag: 99.99,
        comment: "Centre of field"
      },
      {
        id: "SexA_001",
        xCoordinate: 20,
        yCoordinate: 20,
        weight: 100,
        priority: 1,
        jMag: 15.12,
        kMag: 16.88,
        comment: "Good RSG candidate"
      },
       {
        id: "SexA_002",
        xCoordinate: 6,
        yCoordinate: 6,
        weight: 100,
        priority: 1,
        jMag: 15.12,
        kMag: 16.88,
        comment: "Likely foreground"
      },
      {
        id: "SexA_003",
        xCoordinate: 2,
        yCoordinate: 5,
        weight: 100,
        priority: 1,
        jMag: 15.12,
        kMag: 16.88,
        comment: "Likely Something"
      },
      {
        id: "SexA_005",
        xCoordinate: 6,
        yCoordinate: 7,
        weight: 100,
        priority: 2,
        jMag: 20.12,
        kMag: 16.88,
        comment: "Likely Not Unlikely"
      },
      {
        id: "SexA_022",
        xCoordinate: 10,
        yCoordinate: 33,
        weight: 12,
        priority: 3,
        jMag: 21.12,
        kMag: 16.88,
        comment: "Is that mars?"
      } 
    ]
  }
}
