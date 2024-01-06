import { Injectable } from '@angular/core';
import { BarsColors, PasswordStrength } from './constants';

@Injectable({ providedIn: 'root' })
export class PasswordStrengthService {
  checkPasswordStrength(password: string) {
    if (password) {
      if (password.length < 8) {
        return PasswordStrength.InsufficientLength;
      }

      const hasLetters = /[a-zA-Z]/.test(password);
      const hasDigits = /[0-9]/.test(password);
      const hasSymbols = /[^a-z0-9\s]/.test(password);

      if (hasLetters && hasDigits && hasSymbols) {
        return PasswordStrength.Strong;
      }

      if (
        (hasLetters && hasDigits) ||
        (hasLetters && hasSymbols) ||
        (hasDigits && hasSymbols)
      ) {
        return PasswordStrength.Medium;
      }

      if (hasLetters || hasDigits || hasSymbols) {
        return PasswordStrength.Easy;
      }
    }

    return null;
  }

  getBarsColorsConfig(passwordStrength: string | null) {
    switch (passwordStrength) {
      case PasswordStrength.InsufficientLength:
        return {
          bar0: BarsColors.Red,
          bar1: BarsColors.Red,
          bar2: BarsColors.Red,
        };
      case PasswordStrength.Easy:
        return {
          bar0: BarsColors.Red,
          bar1: BarsColors.Gray,
          bar2: BarsColors.Gray,
        };
      case PasswordStrength.Medium:
        return {
          bar0: BarsColors.Yellow,
          bar1: BarsColors.Yellow,
          bar2: BarsColors.Gray,
        };
      case PasswordStrength.Strong:
        return {
          bar0: BarsColors.Green,
          bar1: BarsColors.Green,
          bar2: BarsColors.Green,
        };
      default:
        return {
          bar0: BarsColors.Gray,
          bar1: BarsColors.Gray,
          bar2: BarsColors.Gray,
        };
    }
  }
}
