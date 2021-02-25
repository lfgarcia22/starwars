import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from './film.service';
import { FilmModel } from './models/film.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  film: FilmModel = {};

  constructor(
    protected service: FilmService,
    protected route: ActivatedRoute,
    protected location: Location
  ) { }

  ngOnInit(): void {
    const container = document.getElementById('main_container');
    container?.classList.add('film-crawl');

    this.service.getFilmInfo().subscribe(film => this.film = film);
    this.route.params.subscribe(param => {
      this.service.readFilm(param.id).subscribe();

      setTimeout(() => {
        this.location.back();
      }, 60000);
    });
  }

}
