/**
 * Maikeise Quotations
 * Quotation Domain Validator
 *
 * Contains validation rules for the Quotation aggregate.
 *
 * This component belongs to the domain layer and therefore
 * must not depend on Google Sheets, SpreadsheetApp or UI code.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class QuotationValidator {

  /**
   * Validates a quotation.
   *
   * @param {Quotation} quotation
   * @throws {Error} When one or more business rules are violated.
   */
  static validate(quotation) {
    const errors = [];

    this.validateRequiredFields_(quotation, errors);
    this.validateQuantity_(quotation, errors);
    this.validateUnitValue_(quotation, errors);
    this.validateNcm_(quotation, errors);
    this.validateRequestedDate_(quotation, errors);

    if (errors.length > 0) {
      throw new Error(
        `Invalid quotation:\n${errors.join('\n')}`
      );
    }

    return true;
  }


  /**
   * Validates required business fields.
   *
   * @param {Quotation} quotation
   * @param {string[]} errors
   */
  static validateRequiredFields_(quotation, errors) {
    const requiredFields = [
      ['RFP', quotation.rfp],
      ['Item code', quotation.itemCode],
      ['Reference', quotation.reference],
      ['Description', quotation.description],
      ['Supplier', quotation.supplier],
      ['NCM', quotation.ncm],
      ['Deadline', quotation.deadline],
      ['Payment', quotation.payment],
      ['Delivery', quotation.delivery],
      ['Requested date', quotation.requestedAt],
    ];

    requiredFields.forEach(([fieldName, value]) => {
      if (this.isEmpty_(value)) {
        errors.push(`${fieldName} is required.`);
      }
    });
  }


  /**
   * Quantity must be a finite number greater than zero.
   *
   * @param {Quotation} quotation
   * @param {string[]} errors
   */
  static validateQuantity_(quotation, errors) {
    if (
      !Number.isFinite(quotation.quantity) ||
      quotation.quantity <= 0
    ) {
      errors.push(
        'Quantity must be a number greater than zero.'
      );
    }
  }


  /**
   * Unit value must be a finite, non-negative number.
   *
   * @param {Quotation} quotation
   * @param {string[]} errors
   */
  static validateUnitValue_(quotation, errors) {
    if (
      !Number.isFinite(quotation.unitValue) ||
      quotation.unitValue < 0
    ) {
      errors.push(
        'Unit value must be a non-negative number.'
      );
    }
  }


  /**
   * Performs the initial NCM validation.
   *
   * Formatting characters are ignored.
   * The normalized value must contain exactly eight digits.
   *
   * @param {Quotation} quotation
   * @param {string[]} errors
   */
  static validateNcm_(quotation, errors) {
    if (this.isEmpty_(quotation.ncm)) {
      return;
    }

    const normalizedNcm = String(quotation.ncm)
      .replace(/\D/g, '');

    if (!/^\d{8}$/.test(normalizedNcm)) {
      errors.push(
        'NCM must contain exactly 8 digits.'
      );
    }
  }


  /**
   * Validates the requested date.
   *
   * @param {Quotation} quotation
   * @param {string[]} errors
   */
  static validateRequestedDate_(quotation, errors) {
    if (this.isEmpty_(quotation.requestedAt)) {
      return;
    }

    const date = new Date(quotation.requestedAt);

    if (Number.isNaN(date.getTime())) {
      errors.push(
        'Requested date must be valid.'
      );
    }
  }


  /**
   * Determines whether a value should be considered empty.
   *
   * @param {*} value
   * @return {boolean}
   */
  static isEmpty_(value) {
    return (
      value === null ||
      value === undefined ||
      (
        typeof value === 'string' &&
        value.trim() === ''
      )
    );
  }
}