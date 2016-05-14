/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {
      activateOnDeploy: true
    },
    // include other plugin configuration that applies to all deploy targets here

    's3': {
      accessKeyId: 'AKIAIBIK2EZANCBAM26Q',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucket: 'real-time-ember',
      region: 'us-west-2',
    },

    's3-index': {
      accessKeyId: 'AKIAIBIK2EZANCBAM26Q',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucket: 'real-time-ember',
      region: 'us-west-2',
      allowOverwrite: true,
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
