import Ember from 'ember';
import ENV from 'real-time-ember/config/environment';
import ProtocolConstants from 'real-time-ember/utils/protocol-constants';

const { inject: { service }, Logger: { error, warn } } = Ember;
const { PROTOCOL_VERSION, FRAME_TYPES } = ProtocolConstants;

export default Ember.Service.extend({
  websockets:    service(),
  store:         service(),

  socket: null,
  init() {
    this._super(...arguments);

    const socket = this.get('websockets').socketFor(ENV.websockets.host, [PROTOCOL_VERSION]);

    socket.on('open', this.open, this);
    socket.on('close', this.reconnect, this);
    socket.on('message', this.handleMessage, this);

    this.set('socket', socket);
  },

  // Socket Lifecycle
  online: false,
  open() {
    this.set('online', true);
  },

  reconnect(closeEvent) {
    this.get('store').unloadAll();
    this.set('online', false);

    if (closeEvent.code === 1003) {
      // 1003: unsupported data
      error("please don't be a jerk.");
      return;
    }

    Ember.run.later(this, () => {
      this.get('socket').reconnect();
    }, 5000);
  },

  // Message Handling
  handleMessage(msg) {
    const { frameType, payload } = JSON.parse(msg.data);

    if (frameType === FRAME_TYPES.DATA) {
      this.handleData(payload);
    } else {
      warn(`Encountered unknown frame type: ${frameType}`);
    }
  },

  handleData(payload) {
    this.get('store').pushPayload(payload);
  },

  // Sending Messages
  sendEvent(eventType, eventInfo) {
    this.get('socket').send(JSON.stringify({
      frameType: FRAME_TYPES.EVENT,
      payload: {
        eventType,
        eventInfo,
      },
    }));
  }
});
