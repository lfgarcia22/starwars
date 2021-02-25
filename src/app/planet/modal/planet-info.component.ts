import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/commons/app.utils';
import { PlanetModel } from '../models/planet.model';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planet?: PlanetModel;

  constructor(
    protected service: PlanetService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.service.getPlanetInfo().subscribe(planet => this.planet = planet);
  }

  goToFilm = (filmUrl: string) => {
    const path = filmUrl
      .replace(`${AppUtils.BASE_PATH}`, '')
      .split('/')
      .filter(str => str !== '');
    this.router.navigate([...path]);
  }

  closeModal = () =>
    this.service.loadPlanetInfo()

}
