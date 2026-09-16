/**
 * Maikeise Quotations
 * Web Controller
 *
 * Exposes application use cases to the Web layer.
 *
 * This controller must not contain domain rules or direct
 * Google Sheets persistence logic.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */


/**
 * Serves the main Maikeise Quotations web application.
 *
 * @return {GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('web/Index')
    .setTitle('Maikeise Quotations')
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1'
    );
}


/**
 * Registers a quotation received from the Web interface.
 *
 * @param {Object} data
 * @return {Object}
 */
function registerQuotation(data) {
    try {
        const quotationRepository =
            new GoogleSheetsQuotationRepository();

        const optionalDataRepository =
            new GoogleSheetsOptionalDataRepository();

        const service =
            new QuotationService(
                quotationRepository,
                optionalDataRepository
            );

        const result = service.register(data);

        return {
            success: true,

            quotation: {
                id: result.quotation.id,
                totalValue:
                    result.quotation.getTotalValue(),
                status: result.quotation.status,
                version: result.quotation.version,
            },

            warnings: result.warnings || [],
        };

    } catch (error) {
        console.error(
            'Quotation registration failed:',
            error
        );

        return {
            success: false,
            message:
                error.message ||
                'An unexpected error occurred.',
        };
    }
}