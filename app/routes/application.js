import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);

    if (!window.WebSocket) {
      window.location = 'http://caniuse.com/#feat=websockets';
    }
  }
});
