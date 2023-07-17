/* eslint-disable no-undef */
import AddSubscription from '../pageobjects/subscription.post';
import LoginPage from '../pageobjects/login.page.js';

describe('Login Process', () => {
  beforeAll(async () => {
    await browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });
  it('Verify Login', async () => {
    await AddSubscription().toBeDisplayed();
    await LoginPage.loginValues('admin@gmail.com', 'Admin123');
  });
});

describe('Create a Subscription', () => {
  it('should create a subscription successfully', async () => {
    await AddSubscription.subsBtnClick();
    await AddSubscription.addSubsClick();
    await AddSubscription.addMemberClick();
    await AddSubscription.firstSelectClick();
    await AddSubscription.lastMemberClick();
    await AddSubscription.addClassClick();
    await AddSubscription.secondSelectClick();
    await AddSubscription.lastClassClick();
    await AddSubscription.addBtnClick();
    // await AddSubscription.dateClick('20/7/2023');
  });
});
