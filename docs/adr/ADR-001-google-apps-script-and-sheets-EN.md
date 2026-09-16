# ADR-001 — Google Apps Script and Google Sheets as the Initial Stack

> **Project:** Maikeise Quotations  
> **Organization:** Maikeise  
> **Technical Owner:** Anny Maikeise  
> **Status:** Accepted  
> **Date:** September 16, 2026  
> **Version:** 1.0

---

## 1. Context

**Maikeise Quotations** was conceived to digitize and centralize a historical archive of commercial quotations that previously relied primarily on documents and manual searches.

The first version of the system primarily requires:

- structured quotation registration;
- historical record search;
- storage of complementary information;
- change traceability;
- low operational cost;
- simple deployment;
- maintainability suitable for an independently developed project.

At this stage, the expected scale does not justify dedicated backend infrastructure, a relational database, or paid cloud services.

---

## 2. Problem

A technology stack is required that supports the first version of the system with:

1. low or no initial infrastructure cost;
2. low operational complexity;
3. structured persistence;
4. a web interface;
5. automation capabilities;
6. access control through the Google ecosystem;
7. maintainability;
8. a clear path for future evolution.

The solution must also allow the source code to remain separate from commercial data and eventually be published as a portfolio project.

---

## 3. Decision

The initial version of **Maikeise Quotations** will use:

```text
Frontend
HTML + CSS + JavaScript

Application / Domain
Google Apps Script

Persistence
Google Sheets

Local Development
Visual Studio Code

Apps Script Synchronization
clasp

Version Control
Git

Source Repository
GitHub
```

The logical architecture will be:

```text
Browser
   │
   ▼
HTML / CSS / JavaScript
   │
   │ google.script.run
   ▼
Application Services
   │
   ▼
Domain
   │
   ▼
Repositories
   │
   ▼
SpreadsheetApp
   │
   ▼
Google Sheets
```

Google Sheets will be treated as a persistence mechanism rather than the primary system interface.

Data access should occur through the application whenever possible.

---

## 4. Rationale

### 4.1 Low operational cost

Google Apps Script and Google Sheets allow the initial version to be implemented without provisioning servers, a dedicated database or additional infrastructure.

This is appropriate for the current stage of the product.

### 4.2 Native integration

Apps Script integrates directly with Google Sheets and other Google services.

This reduces the infrastructure required for the initial release.

### 4.3 Simplified deployment

The application can be deployed as an Apps Script Web App.

The initial solution does not require administration of:

- web servers;
- operating systems;
- containers;
- reverse proxies;
- dedicated databases;
- custom network infrastructure.

### 4.4 Development speed

The stack allows development to focus on business rules and user experience before introducing more complex infrastructure.

### 4.5 Suitability for initial scale

The expected initial data volume and concurrency are considered compatible with Google Sheets.

This assumption must be reviewed as usage grows.

### 4.6 Portfolio and version control

`clasp` allows Apps Script source code to be maintained locally.

This enables:

```text
Google Apps Script
        ↕
      clasp
        ↕
Local Environment
        ↕
       Git
        ↕
     GitHub
```

Source code and documentation can therefore be published without exposing the real spreadsheet or commercial records.

---

## 5. Alternatives Considered

### 5.1 Custom Backend + SQL Database

Example:

```text
Frontend
   ↓
REST API
   ↓
Node.js / Java / .NET
   ↓
PostgreSQL
```

#### Advantages

- greater scalability;
- robust relational modeling;
- advanced querying;
- greater application control;
- better support for high concurrency.

#### Disadvantages in the current context

- increased complexity;
- hosting requirements;
- additional security configuration;
- infrastructure maintenance;
- potentially higher operational cost;
- longer initial development cycle.

#### Decision

Not adopted for V1.

It remains a future option if system growth justifies migration.

---

### 5.2 Firebase

#### Advantages

- managed infrastructure;
- strong web application integration;
- integrated authentication and related services;
- growth potential.

#### Disadvantages in the current context

- introduces services that are not currently required;
- increases initial architectural complexity;
- does not provide enough benefit over Sheets for the current scope.

#### Decision

Not adopted for V1.

---

### 5.3 Google Sheets as the Entire Application

Another option would be to use the spreadsheet itself as the primary user interface.

#### Advantages

- extremely simple implementation;
- almost no additional application layer.

#### Disadvantages

- limited user experience;
- higher risk of incorrect manual changes;
- weaker enforcement of business rules;
- poor separation of responsibilities;
- reduced architectural quality;
- harder evolution toward a complete application.

#### Decision

Not adopted.

Google Sheets will serve as persistence while users interact through the application.

---

## 6. Positive Consequences

The decision provides:

- low initial cost;
- reduced infrastructure requirements;
- rapid development;
- native Google Sheets integration;
- simplified deployment;
- suitability for prototypes and MVP development;
- GitHub-compatible source versioning;
- separation between public source code and private data;
- an incremental evolution path.

---

## 7. Negative Consequences

The solution also introduces limitations:

- dependency on the Google ecosystem;
- Apps Script quotas and limits;
- execution-time constraints;
- limited complex querying capabilities;
- no native relational integrity;
- reduced performance at large scale;
- challenges under high concurrency;
- need for additional application-level integrity controls.

These limitations are considered acceptable for the initial product stage.

---

## 8. Mitigation Strategies

### Persistence

- batch read/write operations;
- avoid cell-by-cell access;
- repositories to encapsulate spreadsheet access;
- application-generated entity IDs;
- record versioning.

### Concurrency

- `LockService`;
- record version control;
- validation before updates.

### Integrity

- domain validation;
- server-side validation;
- application-controlled derived values;
- auditing of relevant operations;
- prefer deactivation over physical deletion.

### Security

- least-privilege access;
- DEV/PROD separation;
- real data excluded from GitHub;
- credentials excluded from source code;
- controlled spreadsheet access;
- `.gitignore` protection for local and sensitive resources.

### Performance

- pagination;
- batch reads;
- return only required data;
- monitor database growth.

---

## 9. Portability

The architecture must reduce direct coupling between business rules and Google Sheets.

The domain should not directly depend on:

```javascript
SpreadsheetApp
```

Spreadsheet access must be encapsulated through repositories.

Example:

```text
QuotationService
      │
      ▼
QuotationRepository
      │
      ▼
GoogleSheetsQuotationRepository
      │
      ▼
SpreadsheetApp
```

In the future:

```text
GoogleSheetsQuotationRepository
```

could be replaced by:

```text
PostgreSQLQuotationRepository
```

without requiring a complete rewrite of the business domain.

---

## 10. Architectural Review Triggers

This decision must be reviewed if one or more of the following occur:

- significant growth in quotation volume;
- noticeable search performance degradation;
- high concurrency requirements;
- multiple simultaneous writers;
- complex relationship requirements;
- advanced analytical queries;
- extensive external integrations;
- stricter availability requirements;
- security requirements incompatible with the current architecture;
- Apps Script quotas affecting operations;
- large-scale batch processing requirements;
- expansion to multiple organizations or customers.

A trigger does not automatically require migration.

It requires a new architectural evaluation.

---

## 11. Future Migration Strategy

If a different persistence technology becomes necessary, migration should preserve the domain and application layers whenever possible.

Expected architecture:

```text
BEFORE

Domain
  ↓
Repository
  ↓
Google Sheets


AFTER

Domain
  ↓
Repository
  ↓
Database / API
```

Repository contracts should minimize migration impact.

Any future migration must receive its own ADR.

---

## 12. Security and Public Source Code

The project is designed for future publication as a portfolio project.

The following may be public:

```text
Source code
Documentation
Architecture
Schemas
Initialization scripts
Fictional data
Tests
ADRs
Version history
```

The following must remain private:

```text
Real quotations
Confidential commercial information
Credentials
Tokens
Secrets
Unnecessary private IDs
Backups
Production exports
Private supplier information
```

Publishing the source code does not imply publishing the production database.

---

## 13. Outcome

The decision is:

> **Adopt Google Apps Script and Google Sheets as the primary stack for the initial version of Maikeise Quotations while maintaining sufficient architectural separation to allow future infrastructure replacement without rewriting the application domain.**

---

## 14. Status

```text
ACCEPTED
```

This ADR becomes effective with the initial project version.

If superseded in the future, its status should become:

```text
SUPERSEDED BY ADR-XXX
```

The original document must remain in the project history.

---

## History

| Version | Date | Change | Owner |
|---|---|---|---|
| 1.0 | 2026-09-16 | Initial architectural decision | Anny Maikeise |

---

**Maikeise**  
*Software • Systems • Solutions*