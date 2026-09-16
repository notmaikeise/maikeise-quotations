/**
 * Maikeise Quotations
 * Optional Data Repository Contract
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class OptionalDataRepository {

  /**
   * Persists multiple optional data entries.
   *
   * @param {OptionalData[]} entries
   * @return {OptionalData[]}
   */
  saveAll(entries) {
    throw new Error(
      'OptionalDataRepository.saveAll() must be implemented.'
    );
  }

  /**
   * Finds optional data associated with a quotation.
   *
   * @param {string} quotationId
   * @return {OptionalData[]}
   */
  findByQuotationId(quotationId) {
    throw new Error(
      'OptionalDataRepository.findByQuotationId() ' +
      'must be implemented.'
    );
  }
}