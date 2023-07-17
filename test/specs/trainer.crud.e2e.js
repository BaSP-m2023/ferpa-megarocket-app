/* eslint-disable no-undef */
import LoginPage from '../pageobjects/login.page';
import TrainerCrud from '../pageobjects/trainer.crud';

describe('CRUD Trainer', () => {
  beforeAll(async () => {
    await browser.url('https://ferpa-megarocket-app.vercel.app/home');
  });
  describe('Login Process', () => {
    it('Verify Login', async () => {
      await TrainerCrud().toBeDisplayed();
      await LoginPage.loginValues('admin@gmail.com', 'Admin123');
    });
  });

  describe('Create a Trainer', () => {
    it('Should create a trainer successfully', async () => {
      await TrainerCrud.trainerBtn.click();
      await TrainerCrud.addBtn.click();
      await TrainerCrud.firstName.setValue('Eliezer');
      await TrainerCrud.lastName.setValue('Alberth');
      await TrainerCrud.dni.setValue('12345678');
      await TrainerCrud.phone.setValue('3411234567');
      await TrainerCrud.email.setValue('eliezer@alberth.com');
      await TrainerCrud.city.setValue('Rosario');
      await TrainerCrud.salary.setValue('150000');
      await TrainerCrud.password.setValue('Eliezer123!');
      await TrainerCrud.activities.click();
      await TrainerCrud.selectActivity.click();
    });
  });

  describe('Edit a Trainer', () => {
    it('Should edit a trainer successfully', async () => {
      await TrainerCrud.toBeDisplayed();
      await TrainerCrud.editBtn.click();
      await TrainerCrud.lastName.setValue('Alberto)');
      await TrainerCrud.confirmEdit.click();
    });
  });

  describe('Delete a Trainer', () => {
    it('Should delete a trainer successfully', async () => {
      await TrainerCrud.toBeDisplayed();
      await TrainerCrud.deleteBtn.click();
      await TrainerCrud.confirmDelete.click();
    });
  });
});
