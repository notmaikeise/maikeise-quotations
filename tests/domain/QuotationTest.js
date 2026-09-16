/**
 * Maikeise Quotations
 * Quotation Domain Tests
 *
 * Simple test suite for validating the Quotation domain
 * independently from the persistence layer.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */

function runQuotationTests() {
  const tests = [
    testValidQuotation_,
    testTotalValueCalculation_,
    testZeroQuantity_,
    testNegativeUnitValue_,
    testInvalidNcm_,
    testMissingRequiredField_,
    testInvalidRequestedDate_,
  ];

  let passed = 0;
  let failed = 0;

  console.log('=== Maikeise Quotations — Domain Tests ===');

  tests.forEach(test => {
    try {
      test();

      passed++;

      console.log(`✓ ${test.name}`);
    } catch (error) {
      failed++;

      console.error(
        `✗ ${test.name}: ${error.message}`
      );
    }
  });

  console.log('----------------------------------------');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${tests.length}`);

  if (failed > 0) {
    throw new Error(
      `${failed} domain test(s) failed.`
    );
  }

  console.log('All domain tests passed.');
}


function testValidQuotation_() {
  const quotation = createValidQuotation_();

  const result = QuotationValidator.validate(
    quotation
  );

  assertTrue_(
    result,
    'A valid quotation should pass validation.'
  );
}


function testTotalValueCalculation_() {
  const quotation = createValidQuotation_({
    quantity: 10,
    unitValue: 25.50,
  });

  assertEquals_(
    255,
    quotation.getTotalValue(),
    'Total value should equal quantity × unit value.'
  );
}


function testZeroQuantity_() {
  const quotation = createValidQuotation_({
    quantity: 0,
  });

  assertThrows_(
    () => QuotationValidator.validate(quotation),
    'Quantity must be a number greater than zero.'
  );
}


function testNegativeUnitValue_() {
  const quotation = createValidQuotation_({
    unitValue: -10,
  });

  assertThrows_(
    () => QuotationValidator.validate(quotation),
    'Unit value must be a non-negative number.'
  );
}


function testInvalidNcm_() {
  const quotation = createValidQuotation_({
    ncm: '123',
  });

  assertThrows_(
    () => QuotationValidator.validate(quotation),
    'NCM must contain exactly 8 digits.'
  );
}


function testMissingRequiredField_() {
  const quotation = createValidQuotation_({
    supplier: '',
  });

  assertThrows_(
    () => QuotationValidator.validate(quotation),
    'Supplier is required.'
  );
}


function testInvalidRequestedDate_() {
  const quotation = createValidQuotation_({
    requestedAt: 'invalid-date',
  });

  assertThrows_(
    () => QuotationValidator.validate(quotation),
    'Requested date must be valid.'
  );
}


/**
 * Creates a valid quotation that can be modified
 * by individual tests.
 *
 * @param {Object} overrides
 * @return {Quotation}
 */
function createValidQuotation_(overrides = {}) {
  const data = {
    rfp: 'RFP-2026-001',
    itemCode: '000152',
    reference: 'REF-AX52',
    description: 'Demo product',
    supplier: 'Example Supplier Ltd.',
    quantity: 10,
    unitValue: 25.50,
    ncm: '84713012',
    deadline: '15 days',
    payment: '30 days',
    delivery: 'São Paulo - SP',
    requestedAt: '2026-09-16',
    ...overrides,
  };

  return new Quotation(data);
}


function assertTrue_(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}


function assertEquals_(expected, actual, message) {
  if (expected !== actual) {
    throw new Error(
      `${message} Expected: ${expected}. Actual: ${actual}.`
    );
  }
}


function assertThrows_(callback, expectedMessage) {
  try {
    callback();
  } catch (error) {
    if (
      expectedMessage &&
      !error.message.includes(expectedMessage)
    ) {
      throw new Error(
        `Expected error containing "${expectedMessage}", ` +
        `but received "${error.message}".`
      );
    }

    return;
  }

  throw new Error(
    `Expected an error containing "${expectedMessage}", ` +
    'but no error was thrown.'
  );
}