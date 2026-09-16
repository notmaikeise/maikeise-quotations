/**
 * Maikeise Quotations
 * Google Sheets Optional Data Repository
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class GoogleSheetsOptionalDataRepository
  extends OptionalDataRepository {

  constructor() {
    super();

    this.spreadsheet =
      SpreadsheetApp.getActiveSpreadsheet();

    this.sheet =
      this.spreadsheet.getSheetByName(
        'DADOS_OPCIONAIS'
      );

    if (!this.sheet) {
      throw new Error(
        'DADOS_OPCIONAIS sheet was not found. ' +
        'Run setupDatabase() first.'
      );
    }
  }


  /**
   * Persists multiple optional data entries
   * using a single batch write.
   *
   * @param {OptionalData[]} entries
   * @return {OptionalData[]}
   */
  saveAll(entries) {
    if (!entries || entries.length === 0) {
      return [];
    }

    const rows = entries.map(entry => {
      entry.validate();

      entry.id =
        entry.id || Utilities.getUuid();

      return [
        entry.id,
        entry.quotationId,
        entry.key,
        entry.value,
        entry.order,
      ];
    });

    const firstRow =
      this.sheet.getLastRow() + 1;

    this.sheet
      .getRange(
        firstRow,
        1,
        rows.length,
        rows[0].length
      )
      .setValues(rows);

    return entries;
  }


  /**
   * Retrieves all optional data associated
   * with a quotation.
   *
   * @param {string} quotationId
   * @return {OptionalData[]}
   */
  findByQuotationId(quotationId) {
    const values =
      this.sheet.getDataRange().getValues();

    const entries = [];

    for (
      let index = 1;
      index < values.length;
      index++
    ) {
      const row = values[index];

      if (
        String(row[1]) !== String(quotationId)
      ) {
        continue;
      }

      entries.push(
        new OptionalData({
          id: row[0],
          quotationId: row[1],
          key: row[2],
          value: row[3],
          order: row[4],
        })
      );
    }

    return entries.sort(
      (a, b) => a.order - b.order
    );
  }
}