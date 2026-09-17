# Changelog

All notable changes to **Maikeise Quotations** will be documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-09-16

### Added

- Initial production-ready release of **Maikeise Quotations**.
- Structured quotation registration flow.
- Required commercial fields:
  - RFP
  - Item code
  - Reference
  - Description
  - Supplier
  - Quantity
  - Unit value
  - NCM
  - Delivery lead time
  - Payment term
  - Delivery
  - Requested date
- Automatic quotation total calculation.
- Flexible additional information support:
  - Owner
  - Region
  - Center
  - Currency
  - Taxes
  - Notes
- Search by **RFP**.
- Search by **Item Code**.
- Support for multiple search results.
- Complete quotation detail view.
- Retrieval of optional data together with quotation details.
- Portuguese and English interface support.
- Responsive web interface.
- Loading, validation, success, empty-state and error feedback.
- Google Apps Script web application layer.
- Google Sheets persistence.
- Domain and application service layers.
- Repository abstractions for quotation and optional data persistence.
- Integration tests for registration and search flows.
- Initial design system and technical documentation.
- Architecture Decision Record for the initial Google Apps Script + Google Sheets architecture.

### Changed

- Delivery lead time is entered as a numeric value in days.
- Payment term is entered as a numeric value in days.
- Optional information was reorganized into fixed, always-visible interface sections while preserving flexible key-value persistence.
- Search was simplified to the business-required criteria: RFP or Item Code.
- Search results were redesigned to return a list instead of assuming a unique result.
- Quotation details were moved to a dedicated modal view.
- Technical identifiers were kept internal and removed from end-user presentation.

### Security

- Real quotation data, supplier data, credentials, tokens, Script IDs, Spreadsheet IDs, private deployment URLs and sensitive commercial information are excluded from version control.
- Technical identifiers remain hidden from the user-facing interface.

### Documentation

- Sprint documentation created in PT-BR and EN.
- Design system documented in PT-BR and EN.
- Architecture decisions documented through ADRs.
- Project documentation overview updated for the `v1.0.0` release.

### Known limitations

The following items are intentionally outside the scope of `v1.0.0` and may be considered for future releases:

- Editing existing quotations.
- Deactivating quotations.
- Visual audit history.
- Advanced search filters.
- Partial search.
- Result sorting and pagination.
- Historical data import.
- OCR/document digitization.
- Export and backup routines.
- User roles and permissions.
- Persistence migration if the project outgrows Google Sheets.

---

## Future releases

Future changes should be documented under a new version section using Semantic Versioning:

```text
MAJOR.MINOR.PATCH

1.0.1 → fixes only
1.1.0 → backward-compatible new features
2.0.0 → significant or incompatible architectural/product changes
```
