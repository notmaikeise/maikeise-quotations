/**
 * Maikeise Quotations
 * Quotation Application Service
 *
 * Coordinates quotation use cases between the domain
 * and persistence layers.
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */
class QuotationService {

  /**
   * @param {QuotationRepository} repository
   */
  constructor(repository) {
    if (!repository) {
      throw new Error(
        'QuotationRepository is required.'
      );
    }

    this.repository = repository;
  }

  /**
   * Registers a new quotation.
   *
   * @param {Object} data
   * @return {Object}
   */
  register(data) {
    const quotation = new Quotation(data);

    // Domain validation
    QuotationValidator.validate(quotation);

    // Possible duplicates generate a warning,
    // but do not block registration.
    const possibleDuplicate =
      this.repository.existsPossibleDuplicate(quotation);

    // Persistence
    const savedQuotation =
      this.repository.save(quotation);

    return {
      quotation: savedQuotation,
      warnings: possibleDuplicate
        ? [
            'A possible duplicate quotation was found.',
          ]
        : [],
    };
  }
}