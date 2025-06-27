export class InvalidCpfError extends Error {
  constructor(cpf: string) {
    super(`CPF inválido: ${cpf}`);
    this.name = 'InvalidCpfError';
  }
}

export class CpfVo {
  private readonly value: string;

  constructor(cpf: string) {
    const normalized = CpfVo.clean(cpf);
    if (!CpfVo.isValid(normalized)) {
      throw new InvalidCpfError(cpf);
    }
    this.value = normalized;
  }

  public getValue(): string {
    return this.value;
  }

  public getFormatted(): string {
    return `${this.value.slice(0, 3)}.${this.value.slice(
      3,
      6,
    )}.${this.value.slice(6, 9)}-${this.value.slice(9, 11)}`;
  }

  // Remove pontos e traços
  public static clean(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
  }

  // Validação principal
  public static isValid(cpf: string): boolean {
    const cleaned = this.clean(cpf);

    if (!/^\d{11}$/.test(cleaned)) return false;

    // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    const digits = cleaned.split('').map(Number);
    const [digit1, digit2] = this.calculateVerifiers(digits);

    return digits[9] === digit1 && digits[10] === digit2;
  }

  private static calculateVerifiers(digits: number[]): [number, number] {
    const calc = (length: number) => {
      const sum = digits.slice(0, length).reduce((acc, digit, index) => {
        return acc + digit * (length + 1 - index);
      }, 0);

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const digit1 = calc(9);
    const digit2 = calc(10);

    return [digit1, digit2];
  }
}
