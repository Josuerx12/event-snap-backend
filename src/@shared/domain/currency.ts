export class Currency {
  /**
   * Converte um valor em reais (com decimais) para centavos (número inteiro).
   * Ex: 12.34 → 1234
   */
  static toCents(value: number | string): number {
    const parsed =
      typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    return Math.round(parsed * 100);
  }

  /**
   * Converte um valor em centavos (número inteiro) para reais com duas casas decimais.
   * Ex: 1234 → 12.34
   */
  static toReais(cents: number): number {
    return parseFloat((cents / 100).toFixed(2));
  }

  /**
   * Formata um valor em centavos como string no formato monetário brasileiro.
   * Ex: 1234 → "R$ 12,34"
   */
  static formatFromCents(cents: number): string {
    const reais = this.toReais(cents);
    return reais.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  /**
   * Formata um valor em reais diretamente como string no formato brasileiro.
   * Ex: 12.34 → "R$ 12,34"
   */
  static formatFromReais(value: number | string): string {
    const parsed =
      typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    return parsed.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
