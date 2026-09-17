<div align="center">

# Maikeise Quotations

### Quotation Management & Search System

**A simple, structured and maintainable quotation management solution built for a real business need.**

`v1.0.0` · `Completed` · `Delivered`

---

**Google Apps Script** · **Google Sheets** · **HTML** · **CSS** · **JavaScript**

</div>

---

## About

**Maikeise Quotations** is a web application developed by **Maikeise** to register, organize and retrieve commercial quotation records.

The project was created from a real client need: replacing manual searches across historical quotation documents with a structured system that makes commercial information easier to register and find.

The first official version was delivered on **September 16, 2026**.

> From a real need to a real solution.

---

## Features

### Quotation registration

- Structured quotation form
- Required-field validation
- Automatic total value calculation
- NCM validation
- Delivery lead time in days
- Payment term in days
- Additional quotation information

### Search

Search quotations by:

- **RFP**
- **Item Code**

The search supports multiple matching results.

### Quotation details

The detail view displays the relevant business information for a quotation, including:

- Identification
- Supplier
- Description
- Quantity
- Unit value
- Total value
- NCM
- Delivery lead time
- Payment term
- Delivery information
- Requested date
- Status
- Additional information

Technical identifiers remain hidden from the end-user interface.

### Interface

- Portuguese and English support
- Responsive layout
- Accessible focus states
- Reduced-motion support
- Loading, success, empty and error states
- Corporate interface designed for comfortable day-to-day use

---

## Architecture

The application follows a layered structure:

```text
Web Interface
    ↓
WebController
    ↓
Application
    ↓
Domain
    ↓
Repository
    ↓
Google Sheets
```

The browser does not access the spreadsheet directly.

### Main project structure

```text
maikeise-quotations/
│
├── docs/
│   ├── adr/
│   ├── design/
│   ├── sprints/
│   └── README.md
│
├── src/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── web/
│
├── tests/
│   └── domain/
│
├── .env.example
├── .gitignore
├── CHANGELOG.md
└── README.md
```

---

## Technology stack

| Area | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Persistence | Google Sheets |
| Version control | Git + GitHub |
| Deployment | Google Apps Script Web App |
| Documentation | Markdown |

The stack was intentionally selected to keep operational costs low and deployment simple while preserving a clean architecture that can evolve if the project grows.

---

## Documentation

Detailed technical documentation is available in [`docs/`](docs/).

Main documentation includes:

- Domain and architecture baseline
- Architecture Decision Records
- Design System
- Sprint documentation
- Business and validation rules
- Technical decisions
- Future evolution notes

For the complete documentation overview, see:

**[`docs/README.md`](docs/README.md)**

---

## Release

### `v1.0.0`

First official client delivery.

The release includes the complete initial scope:

- Quotation registration
- Additional information
- Search by RFP
- Search by Item Code
- Multiple search results
- Complete detail view
- PT-BR / EN interface
- Responsive web application
- Google Sheets persistence

See [`CHANGELOG.md`](CHANGELOG.md) for release details.

---

## Roadmap

The following items are considered possible future improvements and are **not pending requirements of v1.0.0**.

- [ ] Edit existing quotations
- [ ] Deactivate quotations
- [ ] Visual audit history
- [ ] Advanced search filters
- [ ] Partial search
- [ ] Result sorting
- [ ] Pagination
- [ ] Historical quotation import
- [ ] OCR and document digitization
- [ ] Export and backup routines
- [ ] User roles and permissions
- [ ] Persistence migration if the application outgrows Google Sheets

---

## Security and privacy

This repository is designed to contain **source code and technical documentation only**.

The following must not be committed:

- Real quotation records
- Real supplier information
- Credentials
- Authentication tokens
- Spreadsheet IDs
- Apps Script IDs
- Private deployment URLs
- Sensitive commercial information

Development and documentation examples should use fictitious data.

---

## Versioning

The project follows semantic versioning:

```text
v1.0.0 → First official release
v1.0.x → Fixes
v1.x.0 → Backward-compatible features
v2.0.0 → Significant architecture or product changes
```

Released versions should remain preserved through Git tags.

---

## A personal note

This project means a lot to me.

It started with a real problem and slowly became requirements, architecture, domain modeling, code, debugging, tests, interface design and, finally, a system that works in practice.

Seeing the first version completed and the client happy with the result is something I am genuinely proud of.

**Maikeise Quotations** is more than the end of one project. I hope it becomes the beginning of many others — new clients, new challenges, better solutions and an increasingly strong future for **Maikeise**.

> May this first delivery be less of an ending  
> and more of the beginning of everything still to come.

---

## Project information

| | |
|---|---|
| **Organization** | Maikeise |
| **Project** | Maikeise Quotations |
| **Technical owner** | Anny Maikeise |
| **First release** | September 16, 2026 |
| **Current release** | `v1.0.0` |
| **Status** | Completed / Delivered |

---

<div align="center">

### MAIKEISE

**Software · Systems · Solutions**

</div>
