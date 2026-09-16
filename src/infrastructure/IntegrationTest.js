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

  const service =
    new QuotationService(repository);

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

  console.log(
    '✓ Total value is correct.'
  );

  console.log(
    '=== Integration test passed ==='
  );

  return result;
}