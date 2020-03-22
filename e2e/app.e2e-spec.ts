import { PdFreeAngularcliPage } from './app.po';

describe('corona-delivery App', () => {
  let page: PdFreeAngularcliPage;

  beforeEach(() => {
    page = new PdFreeAngularcliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
