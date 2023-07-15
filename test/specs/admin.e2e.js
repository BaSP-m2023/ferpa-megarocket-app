/* eslint-disable no-undef */
//const HomePage = require('../pageobjects/home.page');
const ShearedComponents = require('../pageobjects/sheared.components');
const LoginPage = require('../pageobjects/login.Page');
//const AdminPage = require('../pageobjects/admin.page');
//const ClassesPage = require('../pageobjects/classes.page');
//const MemberPage = require('../pageobjects/member.page');

describe('Happy path Admin entity.', () => {
  beforeAll(() => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });

  // it('Verify correct display of home page.', async () => {
  //   await expect(HomePage.landing).toBeDisplayed();
  //   await expect(ShearedComponents.header).toBeDisplayed();
  //   await expect(ShearedComponents.logo).toBeDisplayed();
  //   await expect(ShearedComponents.footer).toBeDisplayed();
  //   await expect(ShearedComponents.asideBar).toBeDisplayed();
  //   await expect(ShearedComponents.homeBtn).toBeDisplayed();
  //   await expect(ShearedComponents.loginBtn).toBeDisplayed();
  //   await expect(ShearedComponents.signupBtn).toBeDisplayed();
  //   await expect(ShearedComponents.contact).toBeDisplayed();
  //   await expect(ShearedComponents.contactText).toHaveTextContaining('Contact');
  //   await expect(ShearedComponents.contactFirstChild).toHaveTextContaining(
  //     'megarocketSA@gmail.com'
  //   );
  //   await expect(ShearedComponents.contactSecondChild).toHaveTextContaining('(000)0000-000');
  //   await expect(ShearedComponents.contactThirdChild).toHaveTextContaining(
  //     'Somewhere -Zeballos 1410'
  //   );
  // });

  it('Verify correct login of the admin.', async () => {
    await expect(ShearedComponents.asideBar).toBeDisplayed();

    await ShearedComponents.continueClick();
    await browser.pause(2000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/home/login');

    await expect(LoginPage.loginForm).toBeDisplayed();
    await expect(LoginPage.loginFormChild).toHaveTextContaining('LOGIN');
    await expect(LoginPage.continueBtn).toBeDisplayed();
    await browser.pause(2000);

    await expect(LoginPage.loginFormFirstChild).toBeDisplayed();
    await LoginPage.loginFormFirstChild.setValue('admin@gmail.com');
    await browser.pause(2000);

    await LoginPage.loginFormSecondChild.waitForDisplayed();
    await LoginPage.loginFormSecondChild.setValue('Admin123');
    await browser.pause(2000);
    await LoginPage.continueBtnClick();
    await browser.pause(2000);
  });

  // it('Verify correct display of Admin profile page.', async () => {
  //   await expect(ShearedComponents.header).toBeDisplayed();
  //   await expect(ShearedComponents.logo).toBeDisplayed();
  //   await expect(ShearedComponents.navbar).toBeDisplayed();

  //   await expect(ShearedComponents.navProfile).toBeDisplayed();
  //   await expect(ShearedComponents.navReports).toBeDisplayed();
  //   await expect(ShearedComponents.navActivities).toBeDisplayed();
  //   await expect(ShearedComponents.navClasses).toBeDisplayed();
  //   await expect(ShearedComponents.navMembers).toBeDisplayed();
  //   await expect(ShearedComponents.navSubs).toBeDisplayed();
  //   await expect(ShearedComponents.navTrainers).toBeDisplayed();
  // });

  // it('Verify open and close the form.', async () => {
  //   await AdminPage.editAdminBtnClick();
  //   await browser.pause(2000);
  //   await expect(AdminPage.formAdmin).toBeDisplayed();
  //   await AdminPage.cancelBtnClick();
  // });

  // it('Verify edit profile form.', async () => {
  //   await browser.pause(2000);
  //   await AdminPage.editAdminBtnClick();
  //   await browser.pause(2000);
  //   await expect(AdminPage.formAdmin).toBeDisplayed();

  //   await browser.pause(1000);
  //   await AdminPage.formAdminFirstChild.waitForDisplayed();
  //   await expect(AdminPage.formFirstLabel).toHaveTextContaining('First Name');
  //   await AdminPage.formAdminFirstChild.setValue('Mili');

  //   await browser.pause(1000);
  //   await AdminPage.formAdminSecondChild.waitForDisplayed();
  //   await expect(AdminPage.formSecondLabel).toHaveTextContaining('Last Name');
  //   await AdminPage.formAdminSecondChild.setValue('Prueba');

  //   await browser.pause(1000);
  //   await AdminPage.formAdminThirdChild.waitForDisplayed();
  //   await expect(AdminPage.formThirdLabel).toHaveTextContaining('DNI');
  //   await AdminPage.formAdminThirdChild.setValue('40400400');

  //   await browser.pause(1000);
  //   await AdminPage.formAdminFourthChild.waitForDisplayed();
  //   await expect(AdminPage.formFourthLabel).toHaveTextContaining('Phone');
  //   await AdminPage.formAdminFourthChild.setValue('3416167612');

  //   await browser.pause(1000);
  //   await AdminPage.formAdminFifthChild.waitForDisplayed();
  //   await expect(AdminPage.formFifthLabel).toHaveTextContaining('Email');
  //   await AdminPage.formAdminFifthChild.setValue('admin@gmail.com');

  //   await browser.pause(1000);
  //   await AdminPage.formAdminSixthChild.waitForDisplayed();
  //   await expect(AdminPage.formSixthLabel).toHaveTextContaining('City');
  //   await AdminPage.formAdminSixthChild.setValue('Rosario');

  //   await browser.pause(1000);
  //   await AdminPage.editBtnClick();
  //   await browser.pause(2000);
  //   await AdminPage.successModal.waitForDisplayed();
  // });

  // it('Verify correct change the password.', async () => {
  //   await AdminPage.changePassBtnClick();
  //   await expect(AdminPage.changePassForm).toBeDisplayed();
  //   await expect(AdminPage.changePassText).toHaveTextContaining('PASSWORD CHANGE');
  //   await browser.pause(1000);
  //   await AdminPage.changePassFirst.waitForDisplayed();
  //   await expect(AdminPage.changePassFirstLabel).toHaveTextContaining('Current password');
  //   await AdminPage.changePassFirst.setValue('Admin123');

  //   await browser.pause(1000);
  //   await AdminPage.changePassSecond.waitForDisplayed();
  //   await expect(AdminPage.changePassSecondLabel).toHaveTextContaining('New password');
  //   await AdminPage.changePassSecond.setValue('Admin123');

  //   await browser.pause(1000);
  //   await AdminPage.addBtn.click();
  //   await browser.pause(2000);
  // });

  // it('Verify correct flow and display of the navigation bar.', async () => {
  //   await browser.pause(3000);
  //   await expect(ShearedComponents.navbar).toBeDisplayed();
  //   await expect(ShearedComponents.navProfile).toBeDisplayed();

  //   await expect(ShearedComponents.navReports).toBeDisplayed();
  //   await ShearedComponents.navReports.click();
  //   await browser.pause(1000);
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/reports');
  //   await browser.pause(1000);
  // });

  //-----------------------------------add and edit does not work 4 now---------------------------------

  // it('Verify correct CRUD of activities.', async () => {
  // await expect(ShearedComponents.navActivities).toBeDisplayed();
  // await ShearedComponents.navActivities.click();
  // await browser.pause(1000);
  // await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/activities');
  // await expect(AdminPage.addBtn).toBeDisplayed();
  // await AdminPage.editActivitiesBtn();

  // await expect(AdminPage.formActivities).toBeDisplayed();
  // await browser.pause(1000);
  // await AdminPage.addFormActivitiesFirst.waitForDisplayed();

  // await expect(AdminPage.formActivitieFirstLabel).toHaveTextContaining('Name');
  // await browser.pause(1000);
  // await AdminPage.addFormActivitiesFirst.setValue('Boxing');

  // await AdminPage.addFormActivitiesSecond.waitForDisplayed();
  // await expect(AdminPage.formActivitieSecondLabel).toHaveTextContaining('Description');
  // await AdminPage.addFormActivitiesSecond.setValue(
  //   'Boxing is a combat sport and a martial art in which two people, usually wearing protective gloves and other protective equipment.'
  // );

  // await AdminPage.addFormActivitiesThird.waitForDisplayed();
  // await expect(AdminPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
  // await AdminPage.addFormActivitiesThird.click();

  // await AdminPage.addAndEditBtnClick();
  // await AdminPage.successModal.waitForDisplayed();
  //});

  // it('Verify edit activity from the form.', async () => {
  //   await expect(AdminPage.formActivities).toBeDisplayed();
  //   await browser.pause(1000);
  //   await AdminPage.pencilEditBtn.click();

  //   await browser.pause(1000);
  //   await AdminPage.addFormActivitiesFirst.waitForDisplayed();
  //   await expect(AdminPage.formActivitieFirstLabel).toHaveTextContaining('Name');
  //   await browser.pause(1000);
  //   await AdminPage.addFormActivitiesFirst.setValue('Boxing');

  //   await AdminPage.addFormActivitiesSecond.waitForDisplayed();
  //   await AdminPage.addFormActivitiesSecond.setValue(
  //     'Its an activity where you get punched in the face.'
  //   );

  //   await AdminPage.addFormActivitiesThird.waitForDisplayed();
  //   await expect(AdminPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
  //   await AdminPage.addFormActivitiesThird.click();

  //   await AdminPage.addAndEditBtnClick();
  //   await AdminPage.successModal.waitForDisplayed();
  // });

  // it('Verify delete activity from the form.', async () => {
  //   await AdminPage.deleteActivitiesBtnClick();
  //   await AdminPage.confirmModal.waitForDisplayed();
  //   await AdminPage.cancelBtn.click();

  //   await AdminPage.deleteActivitiesBtnClick();
  //   await AdminPage.confirmModal.waitForDisplayed();
  //   await AdminPage.deleteBtn.click();
  // });

  //-------------------------------------------does not work-----------------------------------------------------

  // it('Verify correct CRUD of classes.', async () => {
  //   await expect(ShearedComponents.navClasses).toBeDisplayed();
  //   await ShearedComponents.navClasses.click();
  //   await browser.pause(1000);
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/classes');
  //   await expect(AdminPage.addBtn).toBeDisplayed();
  //   await AdminPage.editActivitiesBtn();

  //edit
  //add
  //delete
  //});

  it('Verify correct CRUD of member.', async () => {
    await expect(ShearedComponents.navMembers).toBeDisplayed();
    await ShearedComponents.navMembers.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/members');
    // await expect(MemberPage.addBtn).toBeDisplayed();
    // await MemberPage.addBtn.click();

    //edit
    //add
    //delete
  });

  it('Verify correct CRUD of subscription.', async () => {
    await expect(ShearedComponents.navSubs).toBeDisplayed();
    await ShearedComponents.navSubs.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/subscriptions');
    // await expect(SubsPage.addBtn).toBeDisplayed();
    // await SubsPage.editActivitiesBtn();

    // await expect(SubsPage.subsForm).toBeDisplayed();
    // await browser.pause(1000);

    // await expect(SubsPage.firstLabel).toHaveTextContaining('Member');
    // await browser.pause(1000);
    // await SubsPage.firstSelect.selectByVisibleText('Ferpa, Ferpa');

    // await expect(SubsPage.firstLabel).toHaveTextContaining('Class');
    // await browser.pause(1000);
    // await SubsPage.firstSelect.selectByVisibleText('Boxing, Wednesday, 14:00hrs');
    // await browser.pause(1000);

    // await SubsPage.addBtn.click();

    // await expect(SubsPage.deleteBtn).toBeDisplayed();
    // await SubsPage.deleteBtn.click();
    // await AdminPage.successModal.waitForDisplayed();
  });
});
