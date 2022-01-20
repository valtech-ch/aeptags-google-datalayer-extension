import importedFunction from '@src/lib/dataElements/gtmDlPropertyKey';

describe('this is a sample test', () => {
  beforeAll(async () => {
    console.log('starting sample test');
  });

  it('should succeed', async () => {
    expect(importedFunction(undefined, undefined)).toBeFalsy();
  });
});
