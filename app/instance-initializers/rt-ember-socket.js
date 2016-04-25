export function initialize(appInstance) {
  appInstance.lookup('service:rt-ember-socket');
}

export default {
  name: 'rt-ember-socket',
  initialize
};
