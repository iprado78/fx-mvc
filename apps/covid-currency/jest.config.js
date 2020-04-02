module.exports = {
  name: 'covid-currency',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/covid-currency',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
