import { SimpleLoginPage } from './app.po';

describe('simple-login App', () => {
  let page: SimpleLoginPage;

  beforeEach(() => {
    page = new SimpleLoginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
