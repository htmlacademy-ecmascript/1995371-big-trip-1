import { RenderPosition, render } from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointsListView from '../view/points-list-view.js';
import PointItemEmptyView from '../view/point-item-empty-view.js';
import PointItemView from '../view/point-item-view.js';

export default class TripPresenter {
  pointsListComponent = new PointsListView();
  pointsListItemComponent = new PointItemEmptyView();

  constructor({tripInfoContainer, filterContainer, tripPointsContainer}) {
    this.tripInfoContainer = tripInfoContainer;
    this.filterContainer = filterContainer;
    this.tripPointsContainer = tripPointsContainer;
  }

  init() {
    render(new TripInfoView(), this.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripPointsContainer);
    render(this.pointsListComponent, this.tripPointsContainer);
    render(this.pointsListItemComponent, this.pointsListComponent.getElement());
    render(new PointEditView(), this.pointsListItemComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointItemView(), this.pointsListComponent.getElement());
    }
  }
}
