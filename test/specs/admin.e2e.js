/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page');
const ShearedComponents = require('../pageobjects/sheared.components');
const LoginPage = require('../pageobjects/login.Page');
const AdminPage = require('../pageobjects/admin.page');
const ClassesPage = require('../pageobjects/classes.page');
const MemberPage = require('../pageobjects/member.page');
const SubsPage = require('../pageobjects/subs.page');
const TrainerPage = require('../pageobjects/trainer.page');

describe('Happy path Admin entity.', () => {
  beforeAll(() => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });

  it('Verify correct display of home page.', async () => {
    await expect(HomePage.landing).toBeDisplayed();
    await expect(ShearedComponents.header).toBeDisplayed();
    await expect(ShearedComponents.logo).toBeDisplayed();
    await expect(ShearedComponents.footer).toBeDisplayed();
    await browser.pause(1000);

    await expect(ShearedComponents.sandwich).toBeDisplayed();
    await ShearedComponents.sandwich.click();
    await browser.pause(1000);
    await expect(ShearedComponents.asideBar).toBeDisplayed();
    await expect(ShearedComponents.homeBtn).toBeDisplayed();
    await expect(ShearedComponents.loginBtn).toBeDisplayed();
    await expect(ShearedComponents.signupBtn).toBeDisplayed();
    await expect(ShearedComponents.contact).toBeDisplayed();
    await expect(ShearedComponents.contactText).toHaveTextContaining('Contact');
  });

  it('Verify correct login of the admin.', async () => {
    await ShearedComponents.loginClick();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/home/login');

    await expect(LoginPage.loginForm).toBeDisplayed();
    await expect(LoginPage.loginFormChild).toHaveTextContaining('LOGIN');
    await expect(LoginPage.continueBtn).toBeDisplayed();

    await expect(LoginPage.loginFormFirstChild).toBeDisplayed();
    await browser.pause(1000);
    await LoginPage.loginFormFirstChild.setValue('admin@gmail.com');

    await LoginPage.loginFormSecondChild.waitForDisplayed();
    await browser.pause(1000);
    await LoginPage.loginFormSecondChild.setValue('Admin123');

    await browser.pause(1000);
    await LoginPage.continueBtnClick();
  });

  it('Verify correct display of Admin profile page.', async () => {
    await expect(ShearedComponents.header).toBeDisplayed();
    await expect(ShearedComponents.logo).toBeDisplayed();
    await expect(ShearedComponents.navbar).toBeDisplayed();

    await expect(ShearedComponents.navProfile).toBeDisplayed();
    await expect(ShearedComponents.navReports).toBeDisplayed();
    await expect(ShearedComponents.navActivities).toBeDisplayed();
    await expect(ShearedComponents.navClasses).toBeDisplayed();
    await expect(ShearedComponents.navMembers).toBeDisplayed();
    await expect(ShearedComponents.navSubs).toBeDisplayed();
    await expect(ShearedComponents.navTrainers).toBeDisplayed();
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/profile');
    await browser.pause(2000);
  });

  it('Verify edit profile form.', async () => {
    await AdminPage.editAdminBtnClick();
    await browser.pause(2000);
    await expect(AdminPage.formAdmin).toBeDisplayed();
    await browser.pause(1000);
    await AdminPage.formAdminFirstChild.waitForDisplayed();
    await expect(AdminPage.formFirstLabel).toHaveTextContaining('First Name');
    await AdminPage.formAdminFirstChild.setValue('Mili');
    await browser.pause(1000);
    await AdminPage.formAdminSecondChild.waitForDisplayed();
    await expect(AdminPage.formSecondLabel).toHaveTextContaining('Last Name');
    await AdminPage.formAdminSecondChild.setValue('Prueba');
    await browser.pause(1000);
    await AdminPage.formAdminThirdChild.waitForDisplayed();
    await expect(AdminPage.formThirdLabel).toHaveTextContaining('DNI');
    await AdminPage.formAdminThirdChild.setValue('42400300');
    await browser.pause(1000);
    await AdminPage.formAdminFourthChild.waitForDisplayed();
    await expect(AdminPage.formFourthLabel).toHaveTextContaining('Phone');
    await AdminPage.formAdminFourthChild.setValue('3417120567');
    await browser.pause(1000);
    await AdminPage.formAdminFifthChild.waitForDisplayed();
    await expect(AdminPage.formFifthLabel).toHaveTextContaining('Email');
    await AdminPage.formAdminFifthChild.setValue('admin@gmail.com');
    await browser.pause(1000);
    await AdminPage.formAdminSixthChild.waitForDisplayed();
    await expect(AdminPage.formSixthLabel).toHaveTextContaining('City');
    await AdminPage.formAdminSixthChild.setValue('Rosario');
    await browser.pause(1000);
    await AdminPage.editBtnClick();
    await browser.pause(2000);
    await ShearedComponents.successModal.waitForDisplayed();
  });

  it('Verify correct change the password.', async () => {
    await browser.pause(2000);
    await AdminPage.changePassBtnClick();
    await expect(AdminPage.changePassForm).toBeDisplayed();
    await expect(AdminPage.changePassText).toHaveTextContaining('CHANGE PASSWORD');
    await browser.pause(1000);
    await AdminPage.changePassFirst.waitForDisplayed();
    await expect(AdminPage.changePassFirstLabel).toHaveTextContaining('Current password');
    await AdminPage.changePassFirst.setValue('Admin123');
    await browser.pause(1000);
    await AdminPage.changePassSecond.waitForDisplayed();
    await expect(AdminPage.changePassSecondLabel).toHaveTextContaining('New password');
    await AdminPage.changePassSecond.setValue('Admin123');
    await browser.pause(1000);
    await AdminPage.addBtn.click();
    await browser.pause(2000);
  });

  it('Verify correct flow and display of the navigation bar.', async () => {
    await expect(ShearedComponents.navbar).toBeDisplayed();
    await expect(ShearedComponents.navReports).toBeDisplayed();
    await ShearedComponents.navReports.click();
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/reports');
    await browser.pause(2000);
  });

  it('Verify correct ADD of activities.', async () => {
    await expect(ShearedComponents.navActivities).toBeDisplayed();
    await browser.pause(1000);

    await ShearedComponents.navActivities.click();
    await browser.pause(1000);

    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/activities');
    await expect(AdminPage.addBtn).toBeDisplayed();
    await AdminPage.editActivitiesBtn();

    await browser.pause(1000);
    await expect(AdminPage.formActivities).toBeDisplayed();
    await AdminPage.addFormActivitiesFirst.waitForDisplayed();

    await browser.pause(1000);
    await expect(AdminPage.formActivitieFirstLabel).toHaveTextContaining('Name');
    await AdminPage.addFormActivitiesFirst.setValue('Crossfit');

    await browser.pause(1000);
    await AdminPage.addFormActivitiesSecond.waitForDisplayed();
    await AdminPage.addFormActivitiesSecond.setValue(
      'It is a training method based on constantly varied exercises and weights, with functional movements executed at high intensity.'
    );

    await browser.pause(1000);
    const checkbox = await AdminPage.addFormActivitiesThird;
    await browser.execute((el) => el.click(), checkbox);
    await browser.pause(1000);

    await AdminPage.addBtn.click();
    await ShearedComponents.successModal.waitForDisplayed();
    await browser.pause(2000);
  });

  it('Verify edit activity from the form.', async () => {
    await expect(AdminPage.pencilEditBtn).toBeDisplayed();
    await browser.pause(2000);
    await AdminPage.pencilEditBtn.click();
    await browser.pause(1000);

    await browser.pause(1000);
    await AdminPage.addFormActivitiesFirst.waitForDisplayed();
    await expect(AdminPage.formActivitieFirstLabel).toHaveTextContaining('Name');
    await AdminPage.addFormActivitiesFirst.setValue('prueba');

    await browser.pause(1000);
    await AdminPage.addFormActivitiesSecond.waitForDisplayed();
    await AdminPage.addFormActivitiesSecond.setValue(
      'Its an activity where you get punched in the face.'
    );

    await browser.pause(1000);
    await AdminPage.formActivitieThirdLabel.waitForDisplayed();
    await expect(AdminPage.formActivitieThirdLabel).toHaveTextContaining('Inactive / Active');

    const checkbox = await AdminPage.addFormActivitiesThird;
    await browser.execute((el) => el.click(), checkbox);

    await browser.pause(1000);
    await AdminPage.addBtn.click();
    await ShearedComponents.successModal.waitForDisplayed();
  });

  it('Verify delete activity from the form.', async () => {
    await AdminPage.deleteActivitiesBtnClick();
    await browser.pause(1000);
    await AdminPage.deleteBtn.click();
    await browser.pause(2000);
  });

  it('Verify correct CRUD: add of classes.', async () => {
    await expect(ShearedComponents.navClasses).toBeDisplayed();
    await browser.pause(1000);
    await ShearedComponents.navClasses.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/classes');
    await expect(ClassesPage.addBtn).toBeDisplayed();
    await browser.pause(2000);
    await ClassesPage.addBtn.click();

    await expect(ClassesPage.formClasses).toBeDisplayed();
    await browser.pause(1000);

    await browser.pause(1000);
    await ClassesPage.addformClassesFirst.waitForDisplayed();
    await expect(ClassesPage.formClassesFirstLabel).toHaveTextContaining('Day');
    await ClassesPage.addformClassesFirst.selectByVisibleText('Friday');
    await browser.pause(1000);

    await ClassesPage.addformClassesSecond.waitForDisplayed();
    await expect(ClassesPage.formClassesSecondLabel).toHaveTextContaining('Hour');
    await ClassesPage.addformClassesSecond.selectByVisibleText('16hs');
    await browser.pause(1000);

    await ClassesPage.addformClassesThird.waitForDisplayed();
    await expect(ClassesPage.formClassesThirdLabel).toHaveTextContaining('Trainer');
    await ClassesPage.addformClassesThird.selectByVisibleText('Mathias');
    await browser.pause(1000);

    await ClassesPage.addformClassesFourth.waitForDisplayed();
    await expect(ClassesPage.formClassesFourthLabel).toHaveTextContaining('Activity');
    await ClassesPage.addformClassesFourth.selectByVisibleText('Functional training');
    await browser.pause(1000);

    await ClassesPage.addEditBtn.click();
    await browser.pause(2000);
    await ShearedComponents.successModal.waitForDisplayed();
  });

  it('Verify correct CRUD: edit of classes.', async () => {
    await browser.pause(1000);
    await AdminPage.pencilEditBtn.click();
    await browser.pause(1000);
    await expect(ClassesPage.formClasses).toBeDisplayed();

    await browser.pause(1000);
    await ClassesPage.addformClassesFirst.waitForDisplayed();
    await expect(ClassesPage.formClassesFirstLabel).toHaveTextContaining('Day');
    await ClassesPage.addformClassesFirst.selectByVisibleText('Monday');
    await browser.pause(1000);

    await browser.pause(1000);
    await ClassesPage.addformClassesSecond.waitForDisplayed();
    await expect(ClassesPage.formClassesSecondLabel).toHaveTextContaining('Hour');
    await ClassesPage.addformClassesSecond.selectByVisibleText('18hs');
    await browser.pause(1000);

    await browser.pause(1000);
    await ClassesPage.addformClassesThird.waitForDisplayed();
    await expect(ClassesPage.formClassesThirdLabel).toHaveTextContaining('Trainer');
    await ClassesPage.addformClassesThird.selectByVisibleText('Delfina');
    await browser.pause(1000);

    await browser.pause(1000);
    await ClassesPage.addformClassesFourth.waitForDisplayed();
    await expect(ClassesPage.formClassesFourthLabel).toHaveTextContaining('Activity');
    await ClassesPage.addformClassesFourth.selectByVisibleText('Crossfit');
    await browser.pause(1000);

    await browser.pause(1000);
    await ClassesPage.addEditBtn.click();
    await ShearedComponents.successModal.waitForDisplayed();
  });

  it('Verify correct CRUD: delete of classes.', async () => {
    await AdminPage.deleteActivitiesBtnClick();
    await browser.pause(1000);
    await AdminPage.deleteBtn.click();
    await browser.pause(1000);
  });

  it('Verify correct CRUD: edit of member.', async () => {
    await expect(ShearedComponents.navMembers).toBeDisplayed();
    await browser.pause(1000);
    await ShearedComponents.navMembers.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/members');

    await MemberPage.editBtn.click();
    await browser.pause(1000);

    await expect(MemberPage.memberEditForm).toBeDisplayed();

    await browser.pause(1000);
    await MemberPage.addFirstChild.waitForDisplayed();
    await expect(MemberPage.addFirstChildLabel).toHaveTextContaining('First Name');
    await MemberPage.addFirstChild.setValue('Dany');

    await browser.pause(1000);
    await MemberPage.addSecondChild.waitForDisplayed();
    await expect(MemberPage.addSecondChildLabel).toHaveTextContaining('Membership');
    await MemberPage.addSecondChild.selectByVisibleText('Only Classes');

    await browser.pause(1000);
    const confirmBtn = await MemberPage.confirmBtn;
    await confirmBtn.scrollIntoView();
    await MemberPage.confirmBtnClick();
    await browser.pause(1000);
    await ShearedComponents.successModal.waitForDisplayed();
    await browser.pause(1000);
  });

  it('Verify correct CRUD: delete of member.', async () => {
    await browser.pause(3000);
    await AdminPage.deleteActivitiesBtnClick();
    await browser.pause(1000);
    await AdminPage.cancelBtn.click();
    await browser.pause(1000);
  });

  it('Verify correct CRUD: add of subscription.', async () => {
    await expect(ShearedComponents.navSubs).toBeDisplayed();
    await browser.pause(1000);
    await ShearedComponents.navSubs.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/subscriptions');
    await expect(SubsPage.addBtn).toBeDisplayed();
    await browser.pause(1000);
    await AdminPage.editActivitiesBtn();

    await browser.pause(1000);
    await expect(SubsPage.subsForm).toBeDisplayed();
    await browser.pause(1000);

    await browser.pause(1000);
    await expect(SubsPage.firstLabel).toHaveTextContaining('Member');
    await browser.pause(1000);
    await SubsPage.firstSelect.selectByVisibleText('Silva, Roberto');

    await browser.pause(1000);
    await expect(SubsPage.secondLabel).toHaveTextContaining('Class');
    await browser.pause(1000);
    await SubsPage.secondSelect.selectByVisibleText('Crossfit, Monday, 16:00 hrs');

    await browser.pause(1000);
    await SubsPage.addBtn.click();
    await browser.pause(2000);
  });

  it('Verify correct CRUD: delete of subscription.', async () => {
    await expect(SubsPage.deleteBtn).toBeDisplayed();
    await browser.pause(2000);

    await SubsPage.deleteBtn.click();
    await browser.pause(2000);
    await SubsPage.deleteBtn.click();
  });

  it('Verify correct CRUD: add of trainer.', async () => {
    await expect(ShearedComponents.navTrainers).toBeDisplayed();
    await ShearedComponents.navTrainers.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/admin/trainers');
    await expect(TrainerPage.addBtn).toBeDisplayed();
    await browser.pause(1000);
    await TrainerPage.addBtn.click();

    await expect(TrainerPage.trainerForm).toBeDisplayed();
    await browser.pause(1000);

    await browser.pause(1000);
    await TrainerPage.firstChild.waitForDisplayed();
    await expect(TrainerPage.firstChildLabel).toHaveTextContaining('Name');
    await TrainerPage.firstChild.setValue('Prueba');

    await browser.pause(1000);
    await TrainerPage.secondChild.waitForDisplayed();
    await expect(TrainerPage.secondChildLabel).toHaveTextContaining('LastName');
    await TrainerPage.secondChild.setValue('Prueba');

    await browser.pause(1000);
    await TrainerPage.thirdChild.waitForDisplayed();
    await expect(TrainerPage.thirdChildLabel).toHaveTextContaining('DNI');
    await TrainerPage.thirdChild.setValue('40400400');

    await browser.pause(1000);
    await TrainerPage.fourthChild.waitForDisplayed();
    await expect(TrainerPage.fourthChildLabel).toHaveTextContaining('Phone');
    await TrainerPage.fourthChild.setValue('3416167612');

    await browser.pause(1000);
    await TrainerPage.fifthChild.waitForDisplayed();
    await expect(TrainerPage.fifthChildLabel).toHaveTextContaining('Email');
    await TrainerPage.fifthChild.setValue('prueba@gmail.com');

    await browser.pause(1000);
    await TrainerPage.sixthChild.waitForDisplayed();
    await expect(TrainerPage.sixthChildLabel).toHaveTextContaining('City');
    await TrainerPage.sixthChild.setValue('Rosario');

    await browser.pause(1000);
    await TrainerPage.seventhChild.waitForDisplayed();
    await expect(TrainerPage.seventhChildLabel).toHaveTextContaining('Salary');
    await TrainerPage.seventhChild.setValue('10000');

    await browser.pause(1000);
    await TrainerPage.eighthChild.waitForDisplayed();
    await expect(TrainerPage.eighthChildLabel).toHaveTextContaining('Password');
    await TrainerPage.eighthChild.setValue('Prueba123');

    await browser.pause(1000);
    await TrainerPage.lastChild.waitForDisplayed();
    await TrainerPage.lastChild.click();
    await TrainerPage.lastChild.click();

    await TrainerPage.cancelBtn.click();
  });

  it('Verify correct CRUD: edit of trainer.', async () => {
    await expect(TrainerPage.editBtn).toBeDisplayed();
    await browser.pause(2000);
    await TrainerPage.editBtn.click();
    await browser.pause(1000);
    await expect(TrainerPage.trainerForm).toBeDisplayed();
    await browser.pause(2000);

    await browser.pause(1000);
    await TrainerPage.sixthChild.waitForDisplayed();
    await expect(TrainerPage.sixthChildLabel).toHaveTextContaining('City');
    await TrainerPage.sixthChild.setValue('Funes');

    await browser.pause(1000);
    await TrainerPage.seventhChild.waitForDisplayed();
    await expect(TrainerPage.seventhChildLabel).toHaveTextContaining('Salary');
    await TrainerPage.seventhChild.setValue('20000');
    await browser.pause(1000);

    const addEditBtn = await TrainerPage.addEditBtn;
    await addEditBtn.scrollIntoView();
    await TrainerPage.addEditBtn.click();
    await browser.pause(1000);
  });

  it('Verify correct CRUD: delete of trainer.', async () => {
    await browser.pause(3000);
    await TrainerPage.deleteBtn.click();
    await TrainerPage.confirmBtn.click();
    await browser.pause(3000);
  });

  it('Verify correct logout.', async () => {
    await expect(ShearedComponents.logoutBtn).toBeDisplayed();
    await ShearedComponents.logoutBtn.click();
    await browser.pause(3000);

    await expect(ShearedComponents.modalLogout).toBeDisplayed();
    await browser.pause(1000);
    await TrainerPage.confirmBtn.click();
    await browser.pause(1000);

    await expect(HomePage.landing).toBeDisplayed();
    await browser.pause(1000);
    await expect(browser).toHaveUrl('https://ferpa-megarocket-app.vercel.app/home');
  });
});
