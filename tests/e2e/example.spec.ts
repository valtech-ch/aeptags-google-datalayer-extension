describe('Sample e2e test', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should have a title.', async () => {
    const title = await page.title();
    await expect(title === 'Reactor Extension Sandbox').toBeTruthy();
  });
});
