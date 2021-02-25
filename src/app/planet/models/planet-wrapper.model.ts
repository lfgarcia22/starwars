import { PlanetModel } from './planet.model';

export interface PlanetWrapperModel {
  count?: number;
  next?: string;
  previous?: string;
  results?: PlanetModel[];
}
