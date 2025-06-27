export class InvalidCnpjError extends Error {
  constructor(cnpj: string) {
    super(`CNPJ inválido: ${cnpj}`);
    this.name = 'InvalidCnpjError';
  }
}

export class CnpjVo {
  private readonly value: string;

  constructor(cnpj: string) {
    const normalized = CnpjVo.clean(cnpj);
    if (!CnpjVo.isValid(normalized)) {
      throw new InvalidCnpjError(cnpj);
    }
    this.value = normalized;
  }

  public getValue(): string {
    return this.value;
  }

  public getFormatted(): string {
    return `${this.value.slice(0, 2)}.${this.value.slice(
      2,
      5,
    )}.${this.value.slice(5, 8)}/${this.value.slice(8, 12)}-${this.value.slice(
      12,
      14,
    )}`;
  }

  public static clean(cnpj: string): string {
    return cnpj.replace(/[^\d]/g, '');
  }

  public static isValid(cnpj: string): boolean {
    const cleaned = this.clean(cnpj);

    if (!/^\d{14}$/.test(cleaned)) return false;

    // Rejeita CNPJs com todos os dígitos iguais
    if (/^(\d)\1{13}$/.test(cleaned)) return false;

    const digits = cleaned.split('').map(Number);
    const [digit1, digit2] = this.calculateVerifiers(digits);

    return digits[12] === digit1 && digits[13] === digit2;
  }

  private static calculateVerifiers(digits: number[]): [number, number] {
    const calc = (base: number[]) => {
      const weights =
        base.length === 12
          ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
          : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      const sum = base.reduce((acc, digit, i) => acc + digit * weights[i], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calc(digits.slice(0, 12));
    const digit2 = calc([...digits.slice(0, 12), digit1]);

    return [digit1, digit2];
  }
}
