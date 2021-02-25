import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetWrapperModel } from './models/planet-wrapper.model';
import { PlanetModel } from './models/planet.model';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  headers: { label: string, sort: string }[] = [];
  planets: PlanetWrapperModel = {};
  current = 1;
  sortProperty = '';
  showModal = false;

  constructor(
    protected service: PlanetService,
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit(): void {
    const container = document.getElementById('main_container');
    container?.classList.remove('film-crawl');
    this.headers = [
      { label: 'Name', sort: '' },
      { label: 'Terrain', sort: '' },
      { label: 'Climate', sort: '' },
      { label: 'Diameter', sort: '' },
      { label: 'Population', sort: '' }
    ];
    this.service.getPlanets().subscribe(planets => this.planets = planets);
    this.service.getPlanetInfo().subscribe(planet => this.showModal = planet && planet.name != null);
    this.route.queryParams.subscribe(params => {
      const { page } = params;
      this.service.loadPlanetInfo();
      if (!page) {
        this.router.navigate(['planets'], { queryParams: { page: 1 } });
      } else {
        this.service.readPlanets(page).subscribe(
          () => {
            this.current = +page;
            this.resetSorting();
          },
          () => this.current = 0);
      }
    });
  }

  resetSorting = () => {
    this.headers.forEach(header => {
      header.sort = '';
    });
  }

  setSorting = (idx: number) => {
    const selected = this.headers[idx];
    if (selected.sort === '') {
      this.resetSorting();
      selected.sort = 'asc';
    } else if (selected.sort === 'asc') {
      selected.sort = 'desc';
    } else {
      selected.sort = 'asc';
    }
    this.service.sortInformation(selected.label.toLowerCase(), selected.sort);
  }

  openModal = (planet: PlanetModel) =>
    this.service.loadPlanetInfo(planet)

}
