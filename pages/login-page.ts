import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly pageHeaderText: Locator;
  readonly usernameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeaderText = page.getByRole('heading', { name: 'Login' });
    // have to use this style as this doesn't change if the sites language changes
    this.usernameTextField = page.locator('input[name="username"]');
    this.passwordTextField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async enterUsername() {
    await this.usernameTextField.fill('Admin');
  }

  async enterPassword() {
    await this.passwordTextField.fill('admin123');
  }
}
