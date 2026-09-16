# Sprint 00 — Foundation

> **Project:** Maikeise Quotations  
> **Organization:** Maikeise  
> **Technical Owner:** Anny Maikeise  
> **Sprint:** 00 — Foundation  
> **Status:** In Progress  
> **Date:** September 16, 2026

---

## 1. Objective

Sprint 00 establishes the technical foundation of **Maikeise Quotations**, preparing the project for secure and reproducible development, version control, documentation and deployment.

This sprint does not introduce end-user business functionality.

Its scope focuses on environment configuration, tool integration, the initial persistence structure and the project's first architectural decisions.

---

## 2. Initial Architecture

The development environment follows this structure:

```text
GitHub
   ↕
Git
   ↕
Local Environment / VS Code
   ↕
clasp
   ↕
Google Apps Script
   ↕
Google Sheets
```

### GitHub

Stores source code, technical documentation and the project's public evolution history.

### Git

Provides local version control and synchronization with GitHub.

### Local Environment

Primary source-code development environment.

### clasp

Synchronizes the local source code with Google Apps Script.

### Google Apps Script

Application runtime and integration layer for Google services.

### Google Sheets

Initial persistence layer of the system.

---

## 3. Development Environment

A dedicated development environment was created:

```text
Maikeise Quotations - DEV
```

Real commercial information must not be used in the publicly developed environment.

Tests and demonstrations should exclusively use fictional or anonymized data.

---

## 4. Initial Database Structure

The following function initializes the persistence structure:

```javascript
setupDatabase()
```

It creates:

```text
COTACOES
DADOS_OPCIONAIS
AUDITORIA
CONFIG
```

### COTACOES

Stores structured quotation records.

### DADOS_OPCIONAIS

Stores complementary information as key/value pairs associated with a quotation.

### AUDITORIA

Stores the history of relevant operations performed on records.

### CONFIG

Stores non-sensitive configuration and schema version information.

---

## 5. Initial Schema

The `COTACOES` structure initially contains:

```text
ID_COTACAO
RFP
CODIGO_ITEM
REFERENCIA
DESCRICAO
FORNECEDOR
QUANTIDADE
VALOR_UNITARIO
VALOR_TOTAL
NCM
PRAZO
PAGAMENTO
ENTREGA
DATA_SOLICITADA
STATUS
CRIADO_EM
ATUALIZADO_EM
VERSAO
```

Technical metadata has been included alongside business fields to provide traceability, state control and record evolution support.

---

## 6. Schema Versioning

The persistence structure has independent versioning.

Current version:

```text
SCHEMA_VERSION = 1.0.0
```

The `CONFIG` sheet also identifies:

```text
APPLICATION = Maikeise Quotations
ENVIRONMENT = DEV
```

Future structural changes must evaluate whether the schema version should be incremented and whether a migration strategy is required.

---

## 7. Idempotency

`setupDatabase()` is designed to be idempotent.

Repeated executions should not recreate structures that already exist.

Example:

```text
First execution:
COTACOES created

Second execution:
COTACOES already exists → no duplicate
```

This makes initialization repeatable with reduced risk of structural duplication.

---

## 8. Repository Security

The repository has been prepared for future publication as a portfolio project.

`.gitignore` prevents local or potentially sensitive resources from being committed, including:

```text
.clasp.json
.env
node_modules/
data/
private/
secrets/
credentials/
exports/
backups/
```

The following file may be safely versioned:

```text
.env.example
```

It contains configuration examples only.

Credentials, tokens, private identifiers and real commercial data must never be committed to the public repository.

---

## 9. Environment Strategy

Development and production environments will remain separated.

```text
DEV
↓
Development code
Fictional data
Testing

PROD
↓
Validated releases
Real data
Controlled access
```

The production environment will be configured in a future stage.

---

## 10. Acceptance Criteria

Sprint 00 tracks the following criteria:

- [x] GitHub repository created
- [x] Local Git configured
- [x] Node.js and npm configured
- [x] clasp installed
- [x] clasp authentication completed
- [x] Google Apps Script API enabled
- [x] `Maikeise Quotations - DEV` environment created
- [x] Apps Script connected to the local environment
- [x] Initial database structure automated
- [x] Initial schema versioning
- [x] `.gitignore` protection configured
- [x] Database creation tested
- [x] Idempotency tested
- [ ] Safe handling of Google's default spreadsheet sheet
- [ ] Final documentation reviewed
- [ ] ADR-001 registered

---

## 11. Deliverables

At the end of Sprint 00, the project should contain:

```text
Setup source code
Apps Script configuration
Initial persistence structure
DEV environment
GitHub ↔ Local ↔ Apps Script integration
Sprint documentation
ADR-001
```

---

## 12. Next Sprint

The next planned stage is:

### Sprint 01 — Quotation Domain

Planned scope:

- Quotation entity;
- domain validation;
- data normalization;
- total value calculation;
- identifier generation;
- quotation repository;
- application service;
- quotation persistence;
- initial business-rule tests.

---

## History

| Version | Date | Description | Owner |
|---|---|---|---|
| 1.0 | 2026-09-16 | Initial Sprint 00 record | Anny Maikeise |

---

**Maikeise**  
*Software • Systems • Solutions*