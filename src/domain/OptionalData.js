/**
 * Maikeise Quotations
 * Optional Data Domain Entity
 *
 * Represents additional information associated
 * with a quotation.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class OptionalData {

  constructor(data) {
    this.id = data.id || null;
    this.quotationId = data.quotationId || null;

    this.key = String(data.key || '').trim();
    this.value = data.value ?? '';

    this.order = Number(data.order || 0);
  }

  /**
   * Validates the optional data entry.
   *
   * @throws {Error}
   * @return {boolean}
   */
  validate() {
    if (!this.key) {
      throw new Error(
        'Optional data key is required.'
      );
    }

    if (
      !Number.isInteger(this.order) ||
      this.order < 0
    ) {
      throw new Error(
        'Optional data order must be a non-negative integer.'
      );
    }

    return true;
  }
}