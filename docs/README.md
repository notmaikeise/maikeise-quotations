# Maikeise's Ware — Documentation

> **Sistema de Gestão e Pesquisa de Cotações**  
> **Quotation Management & Search System**

Documentação técnica oficial do projeto desenvolvido pela **Maikeise's Ware**.

Este diretório centraliza a documentação de arquitetura, domínio, decisões técnicas, modelo de dados e evolução do Sistema de Gestão e Pesquisa de Cotações.

---

## 🇧🇷 Português

### Sobre o projeto

O **Sistema de Gestão e Pesquisa de Cotações** é uma solução desenvolvida pela **Maikeise's Ware** para digitalizar, organizar e facilitar a consulta de cotações comerciais.

O projeto foi concebido inicialmente para substituir a consulta manual de um acervo histórico de documentos, permitindo que informações relevantes sejam cadastradas de maneira estruturada e posteriormente localizadas através de uma interface de pesquisa.

A primeira versão utiliza exclusivamente tecnologias do ecossistema Google:

- Google Apps Script
- Google Sheets
- HTML
- CSS
- JavaScript

A arquitetura foi planejada para manter baixo custo operacional, simplicidade de implantação e possibilidade de evolução futura.

---

### Documentação

| Documento | Versão | Status | Descrição |
|---|---:|---|---|
| DDD / Pré-Projeto de Arquitetura | `1.0` | Baseline | Definição inicial do domínio, arquitetura, regras de negócio e roadmap |
| Modelo de Dados | — | Planejado | Estrutura e relacionamento dos dados |
| ADRs | — | Em evolução | Registro das decisões arquiteturais |
| Changelog | — | Planejado | Histórico das alterações do projeto |

---

### Estrutura documental

```text
docs/
│
├── README.md
│
├── Maikeises_Ware_DDD_PreProjeto_Sistema_Cotacoes_v1.0.pdf
│
├── architecture/
│
├── adr/
│
└── versions/
```

A estrutura poderá crescer conforme novas decisões e versões do sistema forem desenvolvidas.

---

### Versionamento

A documentação utiliza versionamento para preservar o histórico de evolução do projeto.

Exemplos:

```text
v1.0  → Arquitetura inicial / Baseline
v1.1  → Pequenas evoluções
v1.2  → Novos recursos compatíveis
v2.0  → Mudanças significativas de arquitetura ou domínio
```

Documentos antigos não devem ser substituídos quando representarem uma versão formal já aprovada.

Novas versões deverão ser adicionadas ao histórico documental.

---

### Architecture Decision Records

Decisões arquiteturais importantes serão registradas através de **ADRs — Architecture Decision Records**.

Exemplos:

```text
ADR-001 — Google Apps Script + Google Sheets
ADR-002 — Estrutura de dados opcionais
ADR-003 — Estratégia de pesquisa
ADR-004 — Digitalização e OCR
```

Cada ADR deverá registrar:

- contexto;
- problema;
- alternativas consideradas;
- decisão;
- consequências;
- impacto técnico;
- data e versão relacionada.

---

### Princípios do projeto

O desenvolvimento deverá priorizar:

**Simplicidade**  
Evitar infraestrutura desnecessária para o volume e contexto atual.

**Rastreabilidade**  
Decisões importantes devem permanecer documentadas.

**Manutenibilidade**  
Interface, domínio, aplicação e persistência devem possuir responsabilidades bem definidas.

**Integridade dos dados**  
Informações comerciais devem ser validadas antes da persistência.

**Evolução incremental**  
Novos recursos devem ser incorporados sem comprometer a estabilidade da solução existente.

**Segurança**  
Credenciais, informações confidenciais e dados comerciais reais não devem ser versionados no repositório.

---

### Responsabilidade

**Organização:** Maikeise's Ware  
**Projeto:** Sistema de Gestão e Pesquisa de Cotações  
**Baseline inicial:** 16 de setembro de 2026  
**Versão da documentação:** `1.0`

---

<br>

## 🇺🇸 English

### About the project

The **Quotation Management & Search System** is a solution developed by **Maikeise's Ware** to digitize, organize, and simplify access to commercial quotation records.

The project was initially designed to replace manual searches across a historical collection of documents by providing structured data registration and a searchable interface.

The first version is based exclusively on technologies from the Google ecosystem:

- Google Apps Script
- Google Sheets
- HTML
- CSS
- JavaScript

The architecture prioritizes low operational cost, straightforward deployment, maintainability, and future scalability.

---

### Documentation

| Document | Version | Status | Description |
|---|---:|---|---|
| DDD / Architecture Pre-Project | `1.0` | Baseline | Initial domain, architecture, business rules and roadmap |
| Data Model | — | Planned | Data structure and relationships |
| ADRs | — | Evolving | Architecture Decision Records |
| Changelog | — | Planned | Project change history |

---

### Documentation structure

```text
docs/
│
├── README.md
│
├── Maikeises_Ware_DDD_PreProjeto_Sistema_Cotacoes_v1.0.pdf
│
├── architecture/
│
├── adr/
│
└── versions/
```

This structure may evolve as new architectural decisions and system versions are introduced.

---

### Versioning

Documentation is versioned to preserve the project's technical history.

Examples:

```text
v1.0  → Initial Architecture / Baseline
v1.1  → Minor improvements
v1.2  → Compatible feature additions
v2.0  → Significant architecture or domain changes
```

Approved historical documents should not be overwritten.

New versions should be added to the documentation history.

---

### Architecture Decision Records

Important architectural decisions will be documented using **ADRs — Architecture Decision Records**.

Examples:

```text
ADR-001 — Google Apps Script + Google Sheets
ADR-002 — Optional Data Structure
ADR-003 — Search Strategy
ADR-004 — Document Digitalization and OCR
```

Each ADR should document:

- context;
- problem;
- considered alternatives;
- decision;
- consequences;
- technical impact;
- related date and version.

---

### Engineering principles

Development should prioritize:

**Simplicity**  
Avoid unnecessary infrastructure for the current project requirements.

**Traceability**  
Important technical decisions should remain documented.

**Maintainability**  
UI, domain, application and persistence responsibilities should remain separated.

**Data integrity**  
Commercial information must be validated before persistence.

**Incremental evolution**  
New capabilities should be introduced without compromising existing functionality.

**Security**  
Credentials, confidential information and real commercial data must never be committed to the repository.

---

### Ownership

**Organization:** Maikeise's Ware  
**Project:** Quotation Management & Search System  
**Initial baseline:** September 16, 2026  
**Documentation version:** `1.0`

---

## Repository Notice

This repository contains the source code and technical documentation for the project.

Real quotation records, supplier information, credentials, authentication tokens and other confidential commercial data are intentionally excluded from version control.

---

<p align="center">
  <strong>Maikeise's Ware</strong><br>
  Software • Systems • Solutions
</p>
