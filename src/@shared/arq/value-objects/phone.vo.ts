export class InvalidPhoneError extends Error {
  constructor(phone: string, reason?: string) {
    super(`Telefone inválido: ${phone}${reason ? ' - ' + reason : ''}`);
    this.name = 'InvalidPhoneError';
  }
}

export class PhoneVo {
  private readonly value: string;

  constructor(phone: string) {
    const cleaned = PhoneVo.clean(phone);
    this.validate(cleaned);
    this.value = cleaned;
  }

  public getValue(): string {
    return this.value;
  }

  public getFormatted(): string {
    // Exemplo: +55 (11) 91234-5678
    const ddi = this.value.slice(0, 2);
    const ddd = this.value.slice(2, 4);
    const number = this.value.slice(4);

    const formattedNumber =
      number.length === 9
        ? `${number.slice(0, 5)}-${number.slice(5)}`
        : `${number.slice(0, 4)}-${number.slice(4)}`;

    return `+${ddi} (${ddd}) ${formattedNumber}`;
  }

  public static clean(value: string): string {
    return value.replace(/\D/g, '');
  }

  private validate(cleaned: string): void {
    if (!/^\d{12,13}$/.test(cleaned)) {
      throw new InvalidPhoneError(
        cleaned,
        'O número deve conter entre 12 e 13 dígitos.',
      );
    }

    const ddi = cleaned.slice(0, 2);
    const ddd = cleaned.slice(2, 4);
    const number = cleaned.slice(4);

    if (ddi !== '55') {
      throw new InvalidPhoneError(
        cleaned,
        'DDI inválido. Apenas números brasileiros (DDI 55) são permitidos.',
      );
    }

    if (!/^[1-9][0-9]$/.test(ddd)) {
      throw new InvalidPhoneError(cleaned, `DDD inválido: ${ddd}`);
    }

    if (!/^\d{8,9}$/.test(number)) {
      throw new InvalidPhoneError(cleaned, 'O número deve ter 8 ou 9 dígitos.');
    }

    if (number.length === 9 && number[0] !== '9') {
      throw new InvalidPhoneError(
        cleaned,
        'Números móveis de 9 dígitos devem começar com 9.',
      );
    }
  }
}
