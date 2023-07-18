/* eslint-disable no-undef */
// const HomePage = require('../pageobjects/home.page');
const ShearedComponents = require('../pageobjects/sheared.components');
const LoginPage = require('../pageobjects/login.Page');
// const AdminPage = require('../pageobjects/admin.page');
// const ClassesPage = require('../pageobjects/classes.page');
const MemberPage = require('../pageobjects/member.page');
// const SubsPage = require('../pageobjects/subs.page');
// const TrainerPage = require('../pageobjects/trainer.page');

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

  // it('Verify correct ADD of activities.', async () => {
  //   await expect(ShearedComponents.navActivities).toBeDisplayed();
  //   await ShearedComponents.navActivities.click();
  //   await browser.pause(1000);
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/activities');
  //   await expect(AdminPage.addBtn).toBeDisplayed();
  //   await AdminPage.editActivitiesBtn();

  //   await expect(AdminPage.formActivities).toBeDisplayed();
  //   await browser.pause(1000);
  //   await AdminPage.addFormActivitiesFirst.waitForDisplayed();

  //   await expect(AdminPage.formActivitieFirstLabel).toHaveTextContaining('Name');
  //   await browser.pause(1000);
  //   await AdminPage.addFormActivitiesFirst.setValue('Boxing');

  //   await AdminPage.addFormActivitiesSecond.waitForDisplayed();
  //   await expect(AdminPage.formActivitieSecondLabel).toHaveTextContaining('Description');
  //   await AdminPage.addFormActivitiesSecond.setValue(
  //     'Boxing is a combat sport and a martial art in which two people, usually wearing protective gloves and other protective equipment.'
  //   );

  //   await AdminPage.addFormActivitiesThird.waitForDisplayed();
  //   await expect(AdminPage.formActivitieThirdLabel).toHaveTextContaining('Is Active?');
  //   await AdminPage.addFormActivitiesThird.click();

  //   await AdminPage.addAndEditBtnClick();
  //   //await AdminPage.successModal.waitForDisplayed();
  // });

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
  //   //await AdminPage.successModal.waitForDisplayed();
  // });

  // it('Verify delete activity from the form.', async () => {
  //   await AdminPage.deleteActivitiesBtnClick();
  //   await AdminPage.confirmModal.waitForDisplayed();
  //   await AdminPage.cancelBtn.click();

  //   await AdminPage.deleteActivitiesBtnClick();
  //   await AdminPage.confirmModal.waitForDisplayed();
  //   await AdminPage.cancelBtn.click();
  // });

  //-------------------------------------------does not work-----------------------------------------------------

  it('Verify correct CRUD of classes.', async () => {
    await expect(ShearedComponents.navClasses).toBeDisplayed();
    await ShearedComponents.navClasses.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/classes');
    //await expect(ClassesPage.addBtn).toBeDisplayed();
    // await AdminPage.editActivitiesBtn();
    //add problemas con la estructura del html
    // await expect(ClassesPage.formClasses).toBeDisplayed();
    // await AdminPage.cancelBtnClick();

    //edit   problemas con la estructura del html
    // await expect(ClassesPage.formClasses).toBeDisplayed();
    // await AdminPage.addAndEditBtnClick();

    //delete
    // await expect(ClassesPage.formClasses).toBeDisplayed();
    // await AdminPage.deleteActivitiesBtnClick();
    // await AdminPage.successModal.waitForDisplayed();
  });

  it('Verify correct CRUD of member.', async () => {
    await expect(ShearedComponents.navMembers).toBeDisplayed();
    await ShearedComponents.navMembers.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/members');
    await expect(MemberPage.addBtn).toBeDisplayed();
    await MemberPage.addBtn.click();
  });

  it('Verify correct ADD of member.', async () => {
    await expect(MemberPage.memberForm).toBeDisplayed();
    await expect(MemberPage.memberFormText).toHaveTextContaining('ADD MEMBER');

    await browser.pause(1000);
    await MemberPage.memberFirstChild.waitForDisplayed();
    await expect(MemberPage.memberFirstChildLabel).toHaveTextContaining('First Name');
    await MemberPage.memberFirstChild.setValue('Milagros');

    await browser.pause(1000);
    await MemberPage.memberSecondChild.waitForDisplayed();
    await expect(MemberPage.memberSecondChildLabel).toHaveTextContaining('Last Name');
    await MemberPage.memberSecondChild.setValue('Prueba');

    await browser.pause(1000);
    await MemberPage.memberThirdChild.waitForDisplayed();
    await expect(MemberPage.memberThirdChildLabel).toHaveTextContaining('DNI');
    await MemberPage.memberThirdChild.setValue('20202200');

    await browser.pause(1000);
    await MemberPage.memberFourthChild.waitForDisplayed();
    await expect(MemberPage.memberFourthChildLabel).toHaveTextContaining('Phone');
    await MemberPage.memberFourthChild.setValue('3416167611');

    await browser.pause(1000);
    await MemberPage.memberFifthhChild.waitForDisplayed();
    await expect(MemberPage.memberFifthChildLabel).toHaveTextContaining('Email');
    await MemberPage.memberFifthhChild.setValue('mili@prueba.com');

    await browser.pause(1000);
    await MemberPage.memberSixthhChild.waitForDisplayed();
    await expect(MemberPage.memberSixthChildLabel).toHaveTextContaining('City');
    await MemberPage.memberSixthhChild.setValue('Rosario');

    await browser.pause(1000);
    await MemberPage.memberSeventhChild.waitForDisplayed();
    await expect(MemberPage.memberSeventhChildLabel).toHaveTextContaining('Birthday');
    await MemberPage.memberSeventhChild.setValue('31-01-2000');

    await browser.pause(1000);
    await MemberPage.memberEighthhChild.waitForDisplayed();
    await expect(MemberPage.memberEighthChildLabel).toHaveTextContaining('Zip Code');
    await MemberPage.memberEighthhChild.setValue('2000');

    await browser.pause(1000);
    await MemberPage.memberNinethChild.waitForDisplayed();
    await expect(MemberPage.memberNinethChildLabel).toHaveTextContaining('Membership');
    await MemberPage.memberNinethChild.selectByVisibleText('Only Classes');

    await browser.pause(1000);
    await expect(MemberPage.memberTenthChildLabel).toBeVisible();
    await expect(MemberPage.memberTenthChildLabel).toHaveTextContaining('Active / Inactive');
    await MemberPage.memberTenthChild.focus();
    await MemberPage.memberTenthChild.press('Space');
    await browser.pause(1000);

    await MemberPage.confirmBtn.click();
    //await AdminPage.successModal.waitForDisplayed();
    await browser.pause(1000);
    //falta el edit y el delete
  });

  // it('Verify correct CRUD of subscription.', async () => {
  //   await expect(ShearedComponents.navSubs).toBeDisplayed();
  //   await ShearedComponents.navSubs.click();
  //   await browser.pause(1000);
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/subscriptions');
  //   await expect(SubsPage.addBtn).toBeDisplayed();
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
  // });

  // it('Verify correct CRUD of trainer.', async () => {
  //   await expect(ShearedComponents.navTrainers).toBeDisplayed();
  //   await ShearedComponents.navTrainers.click();
  //   await browser.pause(1000);
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/trainers');
  //   await expect(TrainerPage.addBtn).toBeDisplayed();
  //   await TrainerPage.addBtn.click();

  //   await expect(TrainerPage.trainerForm).toBeDisplayed();
  //   await browser.pause(1000);

  // await expect(TrainerPage.firstLabel).toHaveTextContaining('Member');
  // await browser.pause(1000);
  // await TrainerPage.firstSelect.selectByVisibleText('Ferpa, Ferpa');

  // await expect(TrainerPage.firstLabel).toHaveTextContaining('Class');
  // await browser.pause(1000);
  // await TrainerPage.firstSelect.selectByVisibleText('Boxing, Wednesday, 14:00hrs');
  // await browser.pause(1000);

  // await TrainerPage.cancelBtn.click();

  // await expect(TrainerPage.editBtn).toBeDisplayed();
  // await TrainerPage.editBtn.click();
  // await expect(TrainerPage.trainerForm).toBeDisplayed();
  // await browser.pause(2000);
  // await expect(TrainerPage.cancelBtn).toBeDisplayed();
  // await TrainerPage.cancelBtn.click();

  // await expect(TrainerPage.deleteBtn).toBeDisplayed();
  // await browser.pause(3000);
  // await TrainerPage.deleteBtn.click();
  // await AdminPage.deleteModal.waitForDisplayed();
  // await TrainerPage.cancelBtn.click();
  // await AdminPage.successModal.waitForDisplayed();

  //   await expect(TrainerPage.logoutBtn).toBeDisplayed();
  //   await TrainerPage.logoutBtn.click();
  //   await browser.pause(3000);
  //   await expect(HomePage.landing).toBeDisplayed();
  //   await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/home');
  // });
});
