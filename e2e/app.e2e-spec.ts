import { EPACPage } from './app.po';

describe('epac App', () => {
  let page: EPACPage;

  beforeEach(() => {
    page = new EPACPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
