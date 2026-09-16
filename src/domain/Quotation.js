/**
 * Represents a quotation registered in Maikeise Quotations.
 *
 * This entity contains business data only and must not depend
 * directly on Google Sheets or SpreadsheetApp.
 *
 * @author Anny Maikeise
 */
class Quotation {

  constructor(data) {
    this.id = data.id || null;

    this.rfp = data.rfp;
    this.itemCode = data.itemCode;
    this.reference = data.reference || '';
    this.description = data.description;
    this.supplier = data.supplier;

    this.quantity = Number(data.quantity);
    this.unitValue = Number(data.unitValue);

    this.ncm = data.ncm || '';
    this.deadline = data.deadline || '';
    this.payment = data.payment || '';
    this.delivery = data.delivery || '';

    this.requestedAt = data.requestedAt || null;

    this.status = data.status || 'ACTIVE';

    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;

    this.version = data.version || 1;
  }

  /**
   * Calculates the quotation total.
   *
   * @return {number}
   */
  getTotalValue() {
    return this.quantity * this.unitValue;
  }
}