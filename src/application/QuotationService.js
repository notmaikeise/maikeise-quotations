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
    constructor(
        quotationRepository,
        optionalDataRepository = null
    ) {
        if (!quotationRepository) {
            throw new Error(
                'QuotationRepository is required.'
            );
        }

        this.repository =
            quotationRepository;

        this.optionalDataRepository =
            optionalDataRepository;
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

        const optionalData =
            this.createOptionalData_(
                data.optionalData || [],
                savedQuotation.id
            );

        if (
            this.optionalDataRepository &&
            optionalData.length > 0
        ) {
            this.optionalDataRepository.saveAll(
                optionalData
            );
        }

        return {
            quotation: savedQuotation,
            optionalData,
            warnings: possibleDuplicate
                ? [
                    'A possible duplicate quotation was found.',
                ]
                : [],
        };
    }

    /**
     * Creates optional data entities associated
     * with a quotation.
     *
     * @param {Object[]} data
     * @param {string} quotationId
     * @return {OptionalData[]}
     */
    createOptionalData_(data, quotationId) {
        if (!Array.isArray(data)) {
            throw new Error(
                'Optional data must be an array.'
            );
        }

        return data.map((entry, index) => {
            const optionalData =
                new OptionalData({
                    quotationId,
                    key: entry.key,
                    value: entry.value,
                    order:
                        entry.order !== undefined
                            ? entry.order
                            : index,
                });

            optionalData.validate();

            return optionalData;
        });
    }
}