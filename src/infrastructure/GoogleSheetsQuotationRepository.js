/**
 * Maikeise Quotations
 * Google Sheets Quotation Repository
 *
 * Google Sheets implementation of the quotation
 * persistence contract.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class GoogleSheetsQuotationRepository
    extends QuotationRepository {

    constructor() {
        super();

        this.spreadsheet =
            SpreadsheetApp.getActiveSpreadsheet();

        this.sheet =
            this.spreadsheet.getSheetByName('COTACOES');

        if (!this.sheet) {
            throw new Error(
                'COTACOES sheet was not found. ' +
                'Run setupDatabase() first.'
            );
        }
    }

    /**
     * Persists a new quotation.
     *
     * @param {Quotation} quotation
     * @return {Quotation}
     */
    save(quotation) {
        const lock = LockService.getDocumentLock();

        lock.waitLock(10000);

        try {
            const now = new Date();

            quotation.id =
                quotation.id || Utilities.getUuid();

            quotation.createdAt =
                quotation.createdAt || now;

            quotation.updatedAt = now;
            quotation.version =
                quotation.version || 1;

            const row = [
                quotation.id,
                quotation.rfp,
                quotation.itemCode,
                quotation.reference,
                quotation.description,
                quotation.supplier,
                quotation.quantity,
                quotation.unitValue,
                quotation.getTotalValue(),
                quotation.ncm,
                quotation.deadline,
                quotation.payment,
                quotation.delivery,
                quotation.requestedAt,
                quotation.status,
                quotation.createdAt,
                quotation.updatedAt,
                quotation.version,
            ];

            const nextRow = this.sheet.getLastRow() + 1;

            this.sheet
                .getRange(nextRow, 2)
                .setNumberFormat('@');

            this.sheet
                .getRange(nextRow, 3)
                .setNumberFormat('@');

            this.sheet
                .getRange(nextRow, 10)
                .setNumberFormat('@');

            this.sheet
                .getRange(nextRow, 1, 1, row.length)
                .setValues([row]);

            return quotation;

        } finally {
            lock.releaseLock();
        }
    }

    /**
     * Finds a quotation by its identifier.
     *
     * @param {string} id
     * @return {Quotation|null}
     */
    findById(id) {
        const values = this.sheet.getDataRange().getValues();

        // Skip header row.
        for (let index = 1; index < values.length; index++) {
            const row = values[index];

            if (String(row[0]) === String(id)) {
                return this.mapRowToQuotation_(row);
            }
        }

        return null;
    }


    /**
     * Checks whether a quotation with the same
     * RFP, item code and supplier already exists.
     *
     * @param {Quotation} quotation
     * @return {boolean}
     */
    existsPossibleDuplicate(quotation) {
        const values = this.sheet.getDataRange().getValues();

        const targetRfp =
            this.normalizeText_(quotation.rfp);

        const targetItemCode =
            this.normalizeText_(quotation.itemCode);

        const targetSupplier =
            this.normalizeText_(quotation.supplier);

        // Skip header row.
        for (let index = 1; index < values.length; index++) {
            const row = values[index];

            const rfp = this.normalizeText_(row[1]);
            const itemCode = this.normalizeText_(row[2]);
            const supplier = this.normalizeText_(row[5]);

            if (
                rfp === targetRfp &&
                itemCode === targetItemCode &&
                supplier === targetSupplier
            ) {
                return true;
            }
        }

        return false;
    }


    /**
     * Converts a spreadsheet row into a Quotation.
     *
     * @param {Array} row
     * @return {Quotation}
     */
    mapRowToQuotation_(row) {
        return new Quotation({
            id: row[0],
            rfp: row[1],
            itemCode: row[2],
            reference: row[3],
            description: row[4],
            supplier: row[5],
            quantity: row[6],
            unitValue: row[7],
            ncm: row[9],
            deadline: row[10],
            payment: row[11],
            delivery: row[12],
            requestedAt: row[13],
            status: row[14],
            createdAt: row[15],
            updatedAt: row[16],
            version: row[17],
        });
    }


    /**
     * Normalizes text for comparisons.
     *
     * @param {*} value
     * @return {string}
     */
    normalizeText_(value) {
        return String(value ?? '')
            .trim()
            .toLowerCase();
    }
}