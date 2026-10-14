import { type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';

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
    this.loginButton = page.locator('[class*="login-button"]');
  }

  async enterUsername() {
    dotenv.config();
    await this.usernameTextField.fill(process.env.ADMIN_USERNAME as string);
  }

  async enterPassword() {
    await this.passwordTextField.fill(process.env.ADMIN_PASSWORD as string);
  }
}
