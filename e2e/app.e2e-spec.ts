import { AppPCClientePage } from './app.po';

describe('app-pccliente App', () => {
  let page: AppPCClientePage;

  beforeEach(() => {
    page = new AppPCClientePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
