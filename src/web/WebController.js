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

function searchQuotations(criteria) {
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

        const results =
            service.search(criteria);

        return {
            success: true,
            results: results.map(
                serializeQuotationForSearch_
            ),
        };

    } catch (error) {
        console.error(
            'Quotation search failed:',
            error
        );

        return {
            success: false,
            message:
                error.message ||
                'An unexpected error occurred.',
            results: [],
        };
    }
}

function serializeQuotationForSearch_(
    quotation
) {
    return {
        /*
         * Technical identifier.
         * Required internally for details/editing,
         * but should not be shown to the user.
         */
        id: quotation.id,

        rfp: quotation.rfp,
        itemCode: quotation.itemCode,
        reference: quotation.reference,
        description: quotation.description,
        supplier: quotation.supplier,

        quantity: quotation.quantity,
        unitValue: quotation.unitValue,
        totalValue:
            quotation.getTotalValue(),

        ncm: quotation.ncm,
        deadline: quotation.deadline,
        payment: quotation.payment,
        delivery: quotation.delivery,

        requestedAt:
            serializeDate_(
                quotation.requestedAt
            ),

        status: quotation.status,
    };
}

function serializeDate_(value) {
    if (!value) {
        return '';
    }

    if (value instanceof Date) {
        return Utilities.formatDate(
            value,
            Session.getScriptTimeZone(),
            'yyyy-MM-dd'
        );
    }

    return String(value);
}

function getQuotationDetails(id) {
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

        const result =
            service.getDetails(id);

        return {
            success: true,

            quotation: {
                rfp:
                    result.quotation.rfp,

                itemCode:
                    result.quotation.itemCode,

                reference:
                    result.quotation.reference,

                description:
                    result.quotation.description,

                supplier:
                    result.quotation.supplier,

                quantity:
                    result.quotation.quantity,

                unitValue:
                    result.quotation.unitValue,

                totalValue:
                    result.quotation.getTotalValue(),

                ncm:
                    result.quotation.ncm,

                deadline:
                    result.quotation.deadline,

                payment:
                    result.quotation.payment,

                delivery:
                    result.quotation.delivery,

                requestedAt:
                    serializeDate_(
                        result.quotation.requestedAt
                    ),

                status:
                    result.quotation.status,
            },

            optionalData:
                result.optionalData.map(
                    (entry) => ({
                        key: entry.key,
                        value: entry.value,
                        order: entry.order,
                    })
                ),
        };

    } catch (error) {
        console.error(
            'Quotation details failed:',
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