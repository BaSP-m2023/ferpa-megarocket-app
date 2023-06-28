/* eslint-disable no-undef */
const MemberSubscriptions = require('../pageobjects/member.subscriptions');

describe('Go to the Members section', () => {
  beforeAll('Open browser', () => {
    browser.url('http://localhost:3001/members/home/profile');
  });
});

describe('Check nav bar navigation', () => {
  it('Click on all the buttons on the nav bar', async () => {
    await expect(MemberSubscriptions.memberLogo).toBeDisplayed();
    await expect(MemberSubscriptions.memberNav).toBeDisplayed();
    await expect(MemberSubscriptions.memberProfileButton).toBeDisplayed();
    await MemberSubscriptions.memberProfileButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/members/home/profile');
    await expect(MemberSubscriptions.memberClassesButton).toBeDisplayed();
    await MemberSubscriptions.memberClassesButtonClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/members/home/classes');
    await expect(MemberSubscriptions.memberSubscriptionsButton).toBeDisplayed();
    await MemberSubscriptions.memberSubscriptionsClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/subscriptions'
    );
    await expect(MemberSubscriptions.memberActivitiesButton).toBeDisplayed();
    await MemberSubscriptions.memberActivitiesClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/activities'
    );
  });
});
