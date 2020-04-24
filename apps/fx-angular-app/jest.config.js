module.exports = {
  name: 'fx-angular-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fx-angular-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen'
};
