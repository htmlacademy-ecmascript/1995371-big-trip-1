import { createRandomPoint } from '../mock/point.js';
import { POINTS_QUANTITY } from '../const.js';

export default class PointsModel {
  points = Array.from({length: POINTS_QUANTITY}, createRandomPoint);

  getPoints() {
    return this.points;
  }
}
