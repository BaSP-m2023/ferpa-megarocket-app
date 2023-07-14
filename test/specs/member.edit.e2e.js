/* eslint-disable no-undef */
const MemberPage = require('../../test/pageobjects/member.edit.page');
describe('Happy path Member entity.', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://ferpa-megarocket-app.vercel.app/members/home/profile');
  });
  it('Verify correct display of members profile page.', async () => {
    await expect(MemberPage.header).toBeDisplayed();
    await expect(MemberPage.logo).toBeDisplayed();
    await expect(MemberPage.navbar).toBeDisplayed();
    await expect(MemberPage.navProfile).toBeDisplayed();
    await expect(MemberPage.navClasses).toBeDisplayed();
    await expect(MemberPage.navMySubscription).toBeDisplayed();
    await expect(MemberPage.navActivities).toBeDisplayed();
    await browser.pause(1000);
    await MemberPage.footer.scrollIntoView();
    await expect(MemberPage.footer).toBeDisplayed();
  });

  it('Verify open and close the form.', async () => {
    await MemberPage.editMemberBtnClick();
    await browser.pause(2000);
    await expect(MemberPage.formMember).toBeDisplayed();
    await MemberPage.cancelBtnClick();
  });

  it('Verify edit profile form.', async () => {
    await browser.pause(2000);
    await MemberPage.editMemberBtnClick();
    await browser.pause(2000);
    await expect(MemberPage.formMember).toBeDisplayed();

    await browser.pause(1000);
    await MemberPage.formMemberFirstChild.waitForDisplayed();
    await expect(MemberPage.formFirstLabel).toHaveTextContaining('First Name');
    await MemberPage.formMemberFirstChild.setValue('Mili');

    await browser.pause(1000);
    await MemberPage.formMemberSecondChild.waitForDisplayed();
    await expect(MemberPage.formSecondLabel).toHaveTextContaining('Last Name');
    await MemberPage.formMemberSecondChild.setValue('Cerro');

    await browser.pause(1000);
    await MemberPage.formMemberThirdChild.waitForDisplayed();
    await expect(MemberPage.formThirdLabel).toHaveTextContaining('DNI');
    await MemberPage.formMemberThirdChild.setValue('42400400');

    await browser.pause(1000);
    await MemberPage.formMemberFourthChild.waitForDisplayed();
    await expect(MemberPage.formFourthLabel).toHaveTextContaining('Phone');
    await MemberPage.formMemberFourthChild.setValue('3416167612');

    await browser.pause(1000);
    await MemberPage.formMemberFifthChild.waitForDisplayed();
    await expect(MemberPage.formFifthLabel).toHaveTextContaining('Email');
    await MemberPage.formMemberFifthChild.setValue('c@m.com');

    await browser.pause(1000);
    await MemberPage.formMemberSixthChild.waitForDisplayed();
    await expect(MemberPage.formSixthLabel).toHaveTextContaining('City');
    await MemberPage.formMemberSixthChild.setValue('Rosario');

    await browser.pause(1000);
    await MemberPage.formMemberSeventhChild.waitForDisplayed();
    await expect(MemberPage.formSeventhLabel).toHaveTextContaining('Birthday');
    await MemberPage.formMemberSeventhChild.setValue('31/01/2000');

    await browser.pause(1000);
    await MemberPage.formMemberEighthChild.waitForDisplayed();
    await expect(MemberPage.formEighthLabel).toHaveTextContaining('Zip Code');
    await MemberPage.formMemberEighthChild.setValue('2000');

    await browser.pause(1000);
    await MemberPage.formMemberNinethChild.waitForDisplayed();
    await expect(MemberPage.formNinethLabel).toHaveTextContaining('Membership');

    await browser.pause(1000);
    await MemberPage.editBtnClick();
    await browser.pause(2000);
    await MemberPage.successModal.waitForDisplayed();
  });

  it('Verify correct flow and display of the navigation bar.', async () => {
    await browser.pause(3000);
    await expect(MemberPage.navbar).toBeDisplayed();
    await expect(MemberPage.navProfile).toBeDisplayed();

    await expect(MemberPage.navClasses).toBeDisplayed();
    await MemberPage.navClasses.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/members/home/classes');
    await browser.pause(1000);

    await expect(MemberPage.navMySubscription).toBeDisplayed();
    await MemberPage.navMySubscription.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/subscriptions'
    );
    await browser.pause(1000);

    await expect(MemberPage.navActivities).toBeDisplayed();
    await MemberPage.navActivities.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/members/home/activities'
    );
    await browser.pause(1000);
  });
});
