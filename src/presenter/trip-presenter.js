import { RenderPosition, render } from '../render.js';

import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointsListView from '../view/points-list-view.js';
import PointItemView from '../view/point-item-view.js';

import PointView from '../view/point-view/point-view.js';
import DateView from '../view/point-view/date-view.js';
import TypeView from '../view/point-view/type-view.js';
import TitleView from '../view/point-view/title-view.js';
import ScheduleView from '../view/point-view/schedule-view.js';
import PriceView from '../view/point-view/price-view.js';
import OffersListTitleView from '../view/point-view/offers-list-title-view.js';
import OffersListView from '../view/point-view/offers-list-view.js';
import OfferView from '../view/point-view/offer-view.js';
import ButtonFavoriteView from '../view/point-view/button-favorite-view.js';
import ButtonRollupView from '../view/point-view/button-rollup-view.js';

export default class TripPresenter {
  pointsListComponent = new PointsListView();
  pointsListItemComponent = new PointItemView();

  constructor({tripInfoContainer, filterContainer, tripPointsContainer, pointsModel}) {
    this.tripInfoContainer = tripInfoContainer;
    this.filterContainer = filterContainer;
    this.tripPointsContainer = tripPointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offerPack = structuredClone(this.pointsModel.getOfferPack());
    this.typePack = structuredClone(this.pointsModel.getTypePack());

    render(new TripInfoView(), this.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.tripPointsContainer);
    render(this.pointsListComponent, this.tripPointsContainer);
    render(this.pointsListItemComponent, this.pointsListComponent.getElement());
    render(new PointEditView(this.typePack, this.destinations, this.offerPack), this.pointsListItemComponent.getElement());

    for (let i = 0; i < this.tripPoints.length; i++) {
      const currentPointItemComponent = this.pointsListComponent.getElement();
      const currentPoint = this.tripPoints[i];
      const currentPointKeyType = currentPoint.type.replace('-', '_').toUpperCase();
      const currentDestination = this.destinations.find((destination) => destination.id === currentPoint.destination);

      const newItemComponent = new PointItemView();
      const newPointComponent = new PointView();
      const offersListComponent = new OffersListView();

      render(newItemComponent, currentPointItemComponent);
      render(newPointComponent, newItemComponent.getElement());
      render(new DateView(currentPoint), newPointComponent.getElement());
      render(new TypeView(currentPoint), newPointComponent.getElement());
      render(new TitleView(currentPoint, currentDestination), newPointComponent.getElement());
      render(new ScheduleView(currentPoint), newPointComponent.getElement());
      render(new PriceView(currentPoint), newPointComponent.getElement());
      render(new OffersListTitleView(), newPointComponent.getElement());
      render(offersListComponent, newPointComponent.getElement());

      currentPoint.offers.forEach((offerId) => {
        const currentOffer = this.offerPack[currentPointKeyType].find((offer) => offer.id === offerId);
        if (currentOffer) {
          render(new OfferView(currentOffer), offersListComponent.getElement());
        }
      });

      render(new ButtonFavoriteView(currentPoint), newPointComponent.getElement());
      render(new ButtonRollupView(), newPointComponent.getElement());

      render(new PointEditView(this.typePack, this.destinations, this.offerPack, currentPoint), currentPointItemComponent);
    }
  }
}
