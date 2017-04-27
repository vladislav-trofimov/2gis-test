import { MeanAppTestPage } from './app.po';

describe('mean-app-test App', () => {
  let page: MeanAppTestPage;

  beforeEach(() => {
    page = new MeanAppTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
