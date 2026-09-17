# Sprint 02 — Web Registration, Search and Quotation Details

**Project:** Maikeise Quotations  
**Status:** Completed  
**Target version:** v1.0.0  
**Completion date:** 2026-09-16

---

## 1. Objective

Deliver a functional web interface for quotation registration and search, connected to the existing Google Apps Script backend and Google Sheets persistence layer.

The sprint focused on turning the previously implemented domain and infrastructure into an application that could be used by the client while preserving the separation between interface, application, domain and persistence layers.

---

## 2. Delivered scope

### Quotation registration

A complete web interface was implemented for quotation registration with the following required fields:

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

The total value is displayed in the interface, but it is recalculated by the backend so that the business rule remains under application responsibility.

### Additional information

Optional data remains stored using a flexible key-value structure and is presented in the interface through fixed groups:

- Owner
- Region
- Center
- Currency
- Taxes
- Notes

Optional fields are not mandatory, and only filled values are persisted.

### Quotation search

Search was implemented with two switchable modes:

- RFP
- Item code

The search uses exact matching after basic input normalization.

The interface provides one shared search field and a segmented selector to switch the active search criterion.

Because RFP and Item Code are not treated as unique identifiers, the backend always returns a list of results.

### Detail view

Each search result provides a **View details** action.

When a quotation is opened, the system uses the internal technical identifier to retrieve:

- Main quotation data
- Commercial information
- Values
- Additional information

The technical identifier is not displayed to the user.

---

## 3. Architecture

The application flow remains organized in layers:

```text
Web Interface
    ↓
WebController
    ↓
QuotationService
    ↓
QuotationRepository
    ↓
GoogleSheetsQuotationRepository
    ↓
Google Sheets
```

For additional information:

```text
QuotationService
    ↓
OptionalDataRepository
    ↓
GoogleSheetsOptionalDataRepository
    ↓
DADOS_OPCIONAIS
```

The interface does not access Google Sheets directly.

---

## 4. Domain and application changes

The `QuotationRepository` contract was expanded to support quotation search.

The application layer now provides operations for:

- Quotation registration
- Search by criterion
- Quotation detail retrieval

The search operation accepts only supported criteria.

Example input:

```javascript
{
  type: 'RFP',
  value: 'RFP-2026-001'
}
```

or:

```javascript
{
  type: 'ITEM_CODE',
  value: '000987'
}
```

---

## 5. Persistence

The Google Sheets implementation performs searches on the `COTACOES` sheet using batch reads.

RFP and Item Code continue to be handled as text so values with leading zeros are preserved.

The detail view combines data from:

- `COTACOES`
- `DADOS_OPCIONAIS`

Technical relationship data remains internal to the application.

---

## 6. User interface and experience

The interface was built with HTML, CSS and JavaScript inside Google Apps Script.

Main characteristics:

- Corporate and responsive layout
- Visual identity based on the Maikeise palette
- Horizontal navigation
- Registration organized in panels
- Search mode switching between RFP and Item Code
- Results table
- Details modal
- Loading, success, empty-state and error feedback
- Portuguese and English support
- Visible labels
- Focus states
- `prefers-reduced-motion` support
- Responsive behavior for smaller screens

Main palette:

```text
#203740
#F2A81D
#F2F2F2
```

---

## 7. Interface rules

The interface validates data before submission and displays messages near the corresponding fields.

Implemented rules include:

- Quantity must be greater than zero
- Unit value cannot be negative
- NCM must contain eight digits
- Requested date must be valid
- Delivery lead time accepts only a number of days
- Payment term accepts only a number of days
- Required fields cannot be submitted empty

Lead time and payment term are presented to the user using **days** as the unit.

Frontend validation complements, but does not replace, backend validation.

---

## 8. DTOs and interface security

Domain objects are not returned directly to the browser.

`WebController` converts results into simple objects suitable for the interface.

The internal quotation identifier may be used internally for operations such as opening the detail view, but it is not displayed in the UI.

Technical metadata such as persistence identifiers and version numbers remain hidden from the end user.

---

## 9. Tests performed

The sprint validated:

- Quotation registration
- Required-data persistence
- Additional-data persistence
- Total value calculation
- RFP search
- Item Code search
- Multiple-result scenarios
- Empty-result scenario
- Detail view
- Quotations with optional data
- Quotations without optional data
- Preservation of codes with leading zeros
- Complete web flow in the DEV environment

An integration test was used to validate search directly through `QuotationService`.

---

## 10. Privacy and version control

The repository must not contain:

- Real client data
- Real supplier data
- Spreadsheet IDs
- Script IDs
- Private deployment URLs
- Tokens or credentials
- Sensitive commercial information

Test and documentation data must remain fictitious.

Sensitive local files remain protected through `.gitignore`.

---

## 11. Scope decisions

The following features were evaluated but intentionally excluded from the v1.0.0 delivery:

- Quotation editing
- Quotation deactivation
- Visual audit history
- Advanced search filters
- Partial search
- Result pagination

These items are recorded as future improvements.

---

## 12. Completion criteria

The sprint is considered completed because:

- Registration is functional
- Search is functional
- The client can locate quotations by RFP or Item Code
- Multiple results are supported
- Relevant business data can be viewed
- Optional data is displayed in the details view
- Technical identifiers remain hidden
- The interface is responsive and usable
- The complete flow works in the delivery environment

---

## 13. Result

With this sprint completed, Maikeise Quotations has its first end-to-end functional version:

```text
Registration
    ↓
Validation
    ↓
Persistence
    ↓
Search
    ↓
Result list
    ↓
Detailed view
```

This version represents the functional scope of **v1.0.0** delivered to the client.

Future changes are treated as product evolution rather than requirements of the initial delivery.
