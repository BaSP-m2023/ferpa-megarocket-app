/* eslint-disable no-undef */
const ActivitiesPage = require('../../test/pageobjects/admin.activities');
describe('Happy path Admin entity.', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/profile');
  });
  it('Verify correct display of Admin profile page.', async () => {
    await expect(ActivitiesPage.header).toBeDisplayed();
    await expect(ActivitiesPage.logo).toBeDisplayed();
    await expect(ActivitiesPage.navbar).toBeDisplayed();

    await expect(ActivitiesPage.navProfile).toBeDisplayed();
    await expect(ActivitiesPage.navReports).toBeDisplayed();
    await expect(ActivitiesPage.navActivities).toBeDisplayed();
    await expect(ActivitiesPage.navClasses).toBeDisplayed();
    await expect(ActivitiesPage.navMembers).toBeDisplayed();
    await expect(ActivitiesPage.navSubs).toBeDisplayed();
    await expect(ActivitiesPage.navTrainers).toBeDisplayed();
    await browser.pause(1000);
    await ActivitiesPage.footer.scrollIntoView();
    await expect(ActivitiesPage.footer).toBeDisplayed();
  });

  it('Verify open and close the form.', async () => {
    await ActivitiesPage.editAdminBtnClick();
    await browser.pause(2000);
    await expect(ActivitiesPage.formAdmin).toBeDisplayed();
    await ActivitiesPage.cancelBtnClick();
  });

  it('Verify edit profile form.', async () => {
    await browser.pause(2000);
    await ActivitiesPage.editAdminBtnClick();
    await browser.pause(2000);
    await expect(ActivitiesPage.formAdmin).toBeDisplayed();

    await browser.pause(1000);
    await ActivitiesPage.formAdminFirstChild.waitForDisplayed();
    await expect(ActivitiesPage.formFirstLabel).toHaveTextContaining('First Name');
    await ActivitiesPage.formAdminFirstChild.setValue('Mili');

    await browser.pause(1000);
    await ActivitiesPage.formAdminSecondChild.waitForDisplayed();
    await expect(ActivitiesPage.formSecondLabel).toHaveTextContaining('Last Name');
    await ActivitiesPage.formAdminSecondChild.setValue('Cerro');

    await browser.pause(1000);
    await ActivitiesPage.formAdminThirdChild.waitForDisplayed();
    await expect(ActivitiesPage.formThirdLabel).toHaveTextContaining('DNI');
    await ActivitiesPage.formAdminThirdChild.setValue('42400400');

    await browser.pause(1000);
    await ActivitiesPage.formAdminFourthChild.waitForDisplayed();
    await expect(ActivitiesPage.formFourthLabel).toHaveTextContaining('Phone');
    await ActivitiesPage.formAdminFourthChild.setValue('3416167612');

    await browser.pause(1000);
    await ActivitiesPage.formAdminFifthChild.waitForDisplayed();
    await expect(ActivitiesPage.formFifthLabel).toHaveTextContaining('Email');
    await ActivitiesPage.formAdminFifthChild.setValue('c@m.com');

    await browser.pause(1000);
    await ActivitiesPage.formAdminSixthChild.waitForDisplayed();
    await expect(ActivitiesPage.formSixthLabel).toHaveTextContaining('City');
    await ActivitiesPage.formAdminSixthChild.setValue('Rosario');

    await browser.pause(1000);
    await ActivitiesPage.formAdminSeventhChild.waitForDisplayed();
    await expect(ActivitiesPage.formSeventhLabel).toHaveTextContaining('Password');
    await ActivitiesPage.formAdminSeventhChild.setValue('Mili1234&');

    await browser.pause(1000);
    await ActivitiesPage.editBtnClick();
    await browser.pause(2000);
    await ActivitiesPage.successModal.waitForDisplayed();
  });

  it('Verify correct flow and display of the navigation bar.', async () => {
    await browser.pause(3000);
    await expect(ActivitiesPage.navbar).toBeDisplayed();
    await expect(ActivitiesPage.navProfile).toBeDisplayed();

    await expect(ActivitiesPage.navReports).toBeDisplayed();
    await ActivitiesPage.navReports.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admins/home/reports');
    await browser.pause(1000);
  });

  it('Verify correct CRUD of activities.', async () => {
    await expect(ActivitiesPage.navActivities).toBeDisplayed();
    await ActivitiesPage.navActivities.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(
      'https://ferpa-megarocket-app.vercel.app/admins/home/activities'
    );
    await expect(ActivitiesPage.addBtn).toBeDisplayed();
    await ActivitiesPage.editActivitiesBtn();

    await expect(ActivitiesPage.formActivities).toBeDisplayed();
    await browser.pause(1000);
    //await ActivitiesPage.addFormActivitiesFirst.waitForDisplayed();
    // await expect(ActivitiesPage.formActivitieFirstLabel).toHaveTextContaining('Name');
    // await ActivitiesPage.addFormActivitiesFirst.setValue('Contemporaneo');

    //await ActivitiesPage.addFormActivitiesSecond.waitForDisplayed();
    // await expect(ActivitiesPage.formActivitieSecondLabel).toHaveTextContaining('Description');
    // await ActivitiesPage.addFormActivitiesSecond.setValue(
    //   'The Contemporary Age is the name by which the historical period'
    // );

    await ActivitiesPage.addFormActivitiesThird.waitForDisplayed();
    await expect(ActivitiesPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
    await ActivitiesPage.addFormActivitiesThird.click();

    await ActivitiesPage.addAndEditBtnClick();
    await ActivitiesPage.successModal.waitForDisplayed();
  });

  // it('Verify edit activity from the form.', async () => {
  //   await expect(ActivitiesPage.formActivities).toBeDisplayed();
  //   await browser.pause(1000);
  //   await expect(ActivitiesPage.formActivitieFirstLabel).toHaveTextContaining('Name');
  //   await expect(ActivitiesPage.formActivitieSecondLabel).toHaveTextContaining('Description');
  //   await expect(ActivitiesPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
  //   await ActivitiesPage.addAndEditBtnClick();
  //   await ActivitiesPage.successModal.waitForDisplayed();
  // });

  // it('Verify delete activity from the form.', async () => {
  //   await expect(ActivitiesPage.formActivities).toBeDisplayed();
  //   await browser.pause(1000);
  //   await expect(ActivitiesPage.formActivitieFirstLabel).toHaveTextContaining('Name');
  //   await expect(ActivitiesPage.formActivitieSecondLabel).toHaveTextContaining('Description');
  //   await expect(ActivitiesPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
  //   await ActivitiesPage.deleteActivitiesBtnClick();
  //   await ActivitiesPage.successModal.waitForDisplayed();
  // });
});
