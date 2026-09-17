/**
 * Maikeise Quotations
 * DEV Integration Tests
 *
 * Executes integration tests against the DEV spreadsheet.
 * NEVER use real commercial data here.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */

/**
 * Tests the complete quotation registration flow.
 *
 * Flow:
 * Input
 *   -> QuotationService
 *   -> Quotation
 *   -> QuotationValidator
 *   -> GoogleSheetsQuotationRepository
 *   -> COTACOES
 */
function testQuotationRegistration() {
    console.log(
        '=== Maikeise Quotations — Integration Test ==='
    );

    const repository =
        new GoogleSheetsQuotationRepository();

    const optionalDataRepository =
        new GoogleSheetsOptionalDataRepository();

    const service =
        new QuotationService(
            repository,
            optionalDataRepository
        );

    const data = {
        rfp: 'RFP-DEMO-001',
        itemCode: '000152',
        reference: 'REF-DEMO-001',
        description: 'Fictitious product for integration testing',
        supplier: 'Maikeise Demo Supplier Ltd.',
        quantity: 10,
        unitValue: 25.50,
        ncm: '84713012',
        deadline: '15 days',
        payment: '30 days',
        delivery: 'São Paulo - SP',
        requestedAt: '2026-09-16',

        optionalData: [
            {
                key: 'CURRENCY',
                value: 'BRL',
            },
            {
                key: 'REGION',
                value: 'Southeast',
            },
            {
                key: 'COST_CENTER',
                value: 'DEMO-1001',
            },
            {
                key: 'OBSERVATION',
                value: 'Fictitious integration test data.',
            },
        ],
    };

    const result = service.register(data);

    console.log(
        `Quotation created: ${result.quotation.id}`
    );

    console.log(
        `Total value: ${result.quotation.getTotalValue()}`
    );

    console.log(
        `Warnings: ${JSON.stringify(result.warnings)}`
    );

    // Read the quotation again from persistence.
    const persistedQuotation =
        repository.findById(result.quotation.id);


    if (!persistedQuotation) {
        throw new Error(
            'Integration test failed: persisted quotation was not found.'
        );
    }

    if (
        persistedQuotation.id !== result.quotation.id
    ) {
        throw new Error(
            'Integration test failed: quotation ID mismatch.'
        );
    }

    if (
        persistedQuotation.getTotalValue() !== 255
    ) {
        throw new Error(
            'Integration test failed: total value mismatch.'
        );
    }


    console.log(
        '✓ Quotation persisted successfully.'
    );

    console.log(
        '✓ Quotation retrieved successfully.'
    );

    const persistedOptionalData =
        optionalDataRepository.findByQuotationId(
            result.quotation.id
        );

    if (persistedOptionalData.length !== 4) {
        throw new Error(
            'Integration test failed: optional data count mismatch.'
        );
    }

    console.log(
        `Optional data persisted: ${persistedOptionalData.length}`
    );

    console.log(
        '✓ Optional data persisted successfully.'
    );

    console.log(
        '✓ Total value is correct.'
    );

    console.log(
        '=== Integration test passed ==='
    );


    return result;
}

function testQuotationSearch() {
    console.log(
        '=== Maikeise Quotations — Search Test ==='
    );

    const quotationRepository =
        new GoogleSheetsQuotationRepository();

    const optionalDataRepository =
        new GoogleSheetsOptionalDataRepository();

    const service =
        new QuotationService(
            quotationRepository,
            optionalDataRepository
        );

    /*
     * Use values that already exist in your
     * DEV spreadsheet.
     *
     * These values should remain fictitious.
     */

    const rfpResults =
        service.search({
            type: 'RFP',
            value: 'RFP-WEB-001',
        });

    console.log(
        `RFP results: ${rfpResults.length}`
    );

    rfpResults.forEach((quotation) => {
        console.log(
            `${quotation.rfp} | ` +
            `${quotation.itemCode} | ` +
            `${quotation.supplier}`
        );
    });


    const itemResults =
        service.search({
            type: 'ITEM_CODE',
            value: '000152',
        });

    console.log(
        `Item code results: ${itemResults.length}`
    );

    itemResults.forEach((quotation) => {
        console.log(
            `${quotation.rfp} | ` +
            `${quotation.itemCode} | ` +
            `${quotation.supplier}`
        );
    });


    console.log(
        '=== Search test completed ==='
    );
}