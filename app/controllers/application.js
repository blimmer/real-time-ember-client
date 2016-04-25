import Ember from 'ember';

const { computed, inject: { service } } = Ember;

export default Ember.Controller.extend({
  socket:   service('rt-ember-socket'),
  isOnline: computed.reads('socket.online'),
});
