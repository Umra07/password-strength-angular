import { Component, Input, OnChanges } from '@angular/core';
import { BarsColors, PasswordStrength } from '../../helpers/constants';
import { PasswordStrengthService } from '../../helpers/passwordStrength.service';
import { BarsConfig } from './types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [NgIf],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.scss',
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password!: string;

  barsConfig!: BarsConfig;
  passwordStrength: PasswordStrength | null = null;
  message!: string;

  constructor(private passwordStrengthService: PasswordStrengthService) {}

  ngOnInit() {
    this.barsConfig = {
      bar0: BarsColors.Gray,
      bar1: BarsColors.Gray,
      bar2: BarsColors.Gray,
    };
  }

  ngOnChanges(): void {
    const passwordStrengthResult =
      this.passwordStrengthService.checkPasswordStrength(this.password);

    this.passwordStrength = passwordStrengthResult;

    switch (this.passwordStrength) {
      case PasswordStrength.InsufficientLength:
        this.message = 'At least 8 characters';
        break;
      case PasswordStrength.Strong:
        this.message = 'Cool! You have a really good password!!!';
        break;
      default:
        this.message =
          'For your safety, your password must contain at least one letter, digit and symbol';
        break;
    }

    this.barsConfig = this.passwordStrengthService.getBarsColorsConfig(
      this.passwordStrength
    );
  }
}
