/* eslint-disable no-undef */
const ActivitiesPage = require('../../test/pageobjects/admin.activities');
describe('Happy path Member entity.', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://ferpa-megarocket-app.vercel.app/admins/home/profile');
  });
});
