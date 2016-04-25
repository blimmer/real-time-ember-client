import Ember from 'ember';
import ProtocolConstants from 'real-time-ember/utils/protocol-constants';

const {
  computed,
  inject: { service }
} = Ember;

const {
  EVENTS,
} = ProtocolConstants;

export default Ember.Component.extend({
  classNames: ['gif-tv-component'],
  rtEmberSocket: service(),

  sharedGif: computed('gifs.@each.shared', function() {
    return this.get('gifs').findBy('shared', true);
  }),

  shareGif(gif) {
    this.get('rtEmberSocket').sendEvent(EVENTS.SHARE_GIF, gif.get('id'));
  },
});
