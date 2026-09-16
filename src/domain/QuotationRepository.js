/**
 * Maikeise Quotations
 * Quotation Repository Contract
 *
 * Defines the persistence operations required by the
 * quotation domain without depending on a specific database.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class QuotationRepository {

  /**
   * Persists a quotation.
   *
   * @param {Quotation} quotation
   * @return {Quotation}
   */
  save(quotation) {
    throw new Error(
      'QuotationRepository.save() must be implemented.'
    );
  }

  /**
   * Finds a quotation by its identifier.
   *
   * @param {string} id
   * @return {Quotation|null}
   */
  findById(id) {
    throw new Error(
      'QuotationRepository.findById() must be implemented.'
    );
  }

  /**
   * Checks for a possible duplicate quotation.
   *
   * A quotation is considered a possible duplicate when
   * RFP, item code and supplier match an existing record.
   *
   * @param {Quotation} quotation
   * @return {boolean}
   */
  existsPossibleDuplicate(quotation) {
    throw new Error(
      'QuotationRepository.existsPossibleDuplicate() ' +
      'must be implemented.'
    );
  }
}