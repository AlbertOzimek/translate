import { TranslatePage } from './app.po';

describe('translate App', () => {
  let page: TranslatePage;

  beforeEach(() => {
    page = new TranslatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
