module.exports = {
  name: 'currency-angular-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/currency-angular-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen'
};
