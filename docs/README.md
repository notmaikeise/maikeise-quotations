# Maikeise Quotations

> **Sistema de Gestão e Pesquisa de Cotações**  
> **Quotation Management & Search System**

`v1.0.0` • `Concluído` • `Entregue` • `Google Apps Script` • `Google Sheets` • `HTML` • `CSS` • `JavaScript`

---

## 🇧🇷 Português

### ✦ Sobre o projeto

O **Maikeise Quotations** é uma solução desenvolvida pela **Maikeise** para tornar o processo de registro, organização e consulta de cotações comerciais mais simples, estruturado e acessível.

O projeto nasceu de uma necessidade real: substituir a busca manual em um acervo histórico de documentos por uma aplicação capaz de centralizar informações relevantes e permitir que elas sejam localizadas rapidamente por meio de uma interface web.

A primeira versão foi construída com foco em três pilares:

> **simplicidade operacional**, **organização técnica** e **possibilidade de evolução**.

Sem infraestrutura desnecessária para o contexto atual, o sistema utiliza tecnologias do ecossistema Google e uma arquitetura em camadas, mantendo interface, aplicação, domínio e persistência com responsabilidades bem definidas.

---

## ✨ Versão atual

### `v1.0.0 — Primeira entrega oficial`

**Status:** ✅ Concluída e entregue  
**Data:** 16 de setembro de 2026

A primeira versão funcional do sistema permite:

- cadastrar cotações comerciais;
- validar dados antes da persistência;
- calcular automaticamente o valor total;
- registrar informações comerciais obrigatórias;
- registrar informações adicionais e opcionais;
- pesquisar por **RFP**;
- pesquisar por **Código do item**;
- retornar múltiplas cotações para uma mesma pesquisa;
- visualizar todos os dados relevantes de uma cotação;
- consultar informações adicionais em **Ver detalhes**;
- manter identificadores técnicos ocultos do usuário final;
- alternar a interface entre **Português** e **Inglês**;
- utilizar a aplicação em diferentes tamanhos de tela;
- persistir os dados através do Google Sheets.

---

## 🧭 Fluxo principal

```text
Cadastro
   ↓
Validação
   ↓
QuotationService
   ↓
Persistência
   ↓
Google Sheets
   ↓
Consulta
   ↓
Lista de resultados
   ↓
Ver detalhes
```

A interface web não acessa diretamente a planilha.

```text
Interface Web
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

---

## 🧩 Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Persistência | Google Sheets |
| Versionamento | Git + GitHub |
| Deploy | Google Apps Script Web App |
| Documentação | Markdown |

A escolha tecnológica foi feita para manter **baixo custo operacional**, implantação simples e manutenção acessível, sem impedir uma futura migração para outra infraestrutura caso o produto cresça.

---

## 📚 Documentação

A documentação acompanha a evolução técnica do projeto e registra tanto decisões quanto entregas.

| Documento | Versão | Status | Descrição |
|---|---:|---|---|
| DDD / Pré-Projeto de Arquitetura | `1.0` | ✅ Baseline | Definição inicial do domínio, arquitetura, regras e roadmap |
| ADR-001 | `1.0` | ✅ Aceito | Escolha de Google Apps Script + Google Sheets |
| Design System | `0.1` | ✅ Ativo | Identidade visual, acessibilidade e padrões de interface |
| Sprint 00 | — | ✅ Concluída | Preparação do projeto, estrutura inicial e ambiente |
| Sprint 01 | — | ✅ Concluída | Domínio, validações, persistência e fluxo de cadastro |
| Sprint 02 | — | ✅ Concluída | Interface web, pesquisa e visualização detalhada |
| Changelog | — | 💡 Recomendado | Histórico das versões públicas do projeto |

---

## 🗂️ Estrutura documental

```text
docs/
│
├── README.md
│
├── adr/
│   └── ADR-001-...
│
├── design/
│   ├── design-system-v0.1-PT-BR.md
│   └── design-system-v0.1-EN.md
│
├── sprints/
│   ├── sprint-00-...
│   ├── sprint-01-...
│   ├── sprint-02-web-registration-and-search-PT-BR.md
│   └── sprint-02-web-registration-and-search-EN.md
│
└── versions/
```

A estrutura pode crescer junto com o sistema, sem apagar o histórico das decisões anteriores.

---

## 🏗️ Princípios de engenharia

### Simplicidade

Usar apenas a infraestrutura necessária para resolver o problema atual.

### Rastreabilidade

Decisões relevantes devem permanecer registradas e compreensíveis ao longo do tempo.

### Manutenibilidade

Interface, aplicação, domínio e infraestrutura devem continuar possuindo responsabilidades claras.

### Integridade dos dados

Dados comerciais devem ser validados antes de serem persistidos.

### Evolução incremental

Novas funcionalidades devem ser adicionadas sem comprometer uma versão já estável.

### Segurança e privacidade

Dados reais de clientes, fornecedores, credenciais, tokens, IDs privados e informações comerciais sensíveis **não devem ser versionados no repositório público**.

---

## 🔭 Próximos passos e sugestões

A `v1.0.0` representa o escopo necessário para a primeira entrega e está funcional. As ideias abaixo ficam registradas como **possíveis evoluções**, não como pendências da versão entregue.

### Gestão de cotações

- [ ] Editar uma cotação já cadastrada
- [ ] Desativar uma cotação sem removê-la definitivamente
- [ ] Exibir histórico de alterações por cotação
- [ ] Criar uma visualização de auditoria mais completa

### Pesquisa

- [ ] Adicionar filtros avançados
- [ ] Permitir busca parcial quando fizer sentido para o negócio
- [ ] Ordenar resultados por data, fornecedor ou valor
- [ ] Implementar paginação para grandes volumes de dados

### Dados e documentos

- [ ] Avaliar importação de registros históricos
- [ ] Avaliar digitalização e OCR para documentos antigos
- [ ] Criar rotinas de exportação e backup
- [ ] Avaliar migração da persistência caso o volume ultrapasse o cenário adequado ao Google Sheets

### Produto

- [ ] Melhorar dashboards e indicadores
- [ ] Criar perfis de acesso caso mais usuários passem a utilizar o sistema
- [ ] Expandir internacionalização
- [ ] Avaliar notificações e integrações com outros sistemas

---

## 🧠 Decisões futuras

Novas decisões relevantes podem ser registradas através de **ADRs — Architecture Decision Records**.

Sugestões:

```text
ADR-002 — Estrutura e evolução dos dados opcionais
ADR-003 — Estratégia de pesquisa e filtros avançados
ADR-004 — Digitalização e OCR
ADR-005 — Estratégia de edição e auditoria
ADR-006 — Migração da camada de persistência
```

Cada ADR deve registrar:

- contexto;
- problema;
- alternativas consideradas;
- decisão;
- consequências;
- impacto técnico;
- versão relacionada.

---

## 🏷️ Versionamento

O projeto utiliza versionamento para preservar a evolução do sistema.

```text
v1.0.0  → Primeira versão funcional entregue
v1.1.0  → Novas funcionalidades compatíveis
v1.x.x  → Melhorias e correções
v2.0.0  → Mudanças relevantes de arquitetura ou domínio
```

Versões já entregues devem permanecer preservadas.

Novas funcionalidades devem seguir o fluxo de desenvolvimento sem alterar silenciosamente a versão utilizada pelo cliente.

---

## 💛 Uma nota pessoal

Este projeto tem um significado especial para mim.

Ver uma necessidade real sair de uma conversa, passar por planejamento, arquitetura, domínio, código, erros, testes, interface e finalmente se transformar em algo **funcionando e sendo utilizado de verdade** foi uma experiência que me deixou muito feliz.

Mais do que concluir um sistema, este projeto representa uma etapa importante da **Maikeise** e também da minha evolução como desenvolvedora.

Tenho muito orgulho da `v1.0.0` e de tudo o que aprendi construindo cada parte dela.

Espero que este seja apenas o primeiro de muitos projetos, clientes, desafios e oportunidades que ainda virão — e que o **Maikeise Quotations** ajude a abrir caminho para futuros cada vez maiores.

> Que esta primeira entrega seja menos um ponto final  
> e mais o começo de tudo o que ainda pode ser construído.

---

## 👩‍💻 Responsabilidade

| | |
|---|---|
| **Organização** | Maikeise |
| **Projeto** | Maikeise Quotations |
| **Responsável técnica** | Anny Maikeise |
| **Primeira entrega** | 16 de setembro de 2026 |
| **Release** | `v1.0.0` |

---

<br>

# 🇺🇸 English

## ✦ About the project

**Maikeise Quotations** is a solution developed by **Maikeise** to make commercial quotation registration, organization, and retrieval simpler, more structured, and easier to use.

The project was born from a real need: replacing manual searches through historical quotation documents with an application capable of centralizing relevant information and making it quickly searchable through a web interface.

The first release was designed around three core principles:

> **operational simplicity**, **technical organization**, and **room for evolution**.

The system avoids unnecessary infrastructure for its current context while preserving a layered architecture with clear responsibilities across the interface, application, domain, and persistence layers.

---

## ✨ Current release

### `v1.0.0 — First official delivery`

**Status:** ✅ Completed and delivered  
**Date:** September 16, 2026

The first functional version provides:

- quotation registration;
- data validation;
- automatic total value calculation;
- required commercial information;
- flexible additional information;
- search by **RFP**;
- search by **Item Code**;
- multiple results for the same search value;
- complete quotation details;
- additional data in the details view;
- hidden technical identifiers;
- **Portuguese / English** interface support;
- responsive interface;
- Google Sheets persistence.

---

## 🧭 Main flow

```text
Registration
    ↓
Validation
    ↓
QuotationService
    ↓
Persistence
    ↓
Google Sheets
    ↓
Search
    ↓
Result list
    ↓
View details
```

The web interface does not communicate with the spreadsheet directly.

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

---

## 🧩 Technology stack

| Layer | Technology |
|---|---|
| Interface | HTML, CSS, JavaScript |
| Backend | Google Apps Script |
| Persistence | Google Sheets |
| Version control | Git + GitHub |
| Deployment | Google Apps Script Web App |
| Documentation | Markdown |

The stack was selected to provide **low operational cost**, simple deployment, and accessible maintenance while keeping the architecture open to future migration if the system grows.

---

## 🔭 Future improvements

The `v1.0.0` release fulfills the initial delivery scope. The following items are ideas for future versions rather than unfinished requirements.

### Quotation management

- [ ] Edit existing quotations
- [ ] Deactivate quotations without permanently deleting them
- [ ] Display quotation change history
- [ ] Expand audit visualization

### Search

- [ ] Advanced filters
- [ ] Partial search where appropriate
- [ ] Result sorting
- [ ] Pagination for larger datasets

### Data and documents

- [ ] Historical data import
- [ ] OCR and document digitization research
- [ ] Export and backup routines
- [ ] Persistence migration if the project outgrows Google Sheets

### Product evolution

- [ ] Dashboards and indicators
- [ ] Access profiles and permissions
- [ ] Expanded internationalization
- [ ] Notifications and external integrations

---

## 🏗️ Engineering principles

**Simplicity**  
Use only the infrastructure required by the current problem.

**Traceability**  
Relevant technical decisions should remain documented.

**Maintainability**  
UI, application, domain, and infrastructure responsibilities should remain separated.

**Data integrity**  
Commercial data must be validated before persistence.

**Incremental evolution**  
New capabilities should not compromise a stable released version.

**Security and privacy**  
Real quotation records, supplier information, credentials, tokens, private IDs, and confidential business data must not be committed to the public repository.

---

## 💛 A personal note

This project means a lot to me.

Seeing a real need evolve from an idea into planning, architecture, domain modeling, code, debugging, testing, interface design, and finally a system that is **working and being used in practice** made me genuinely happy.

More than finishing an application, this project represents an important milestone for **Maikeise** and for my own growth as a developer.

I am proud of this first release and of everything I learned while building it.

I hope this is only the beginning of many more projects, clients, challenges, and opportunities — and that **Maikeise Quotations** helps open the door to an even bigger future.

> May this first delivery be less of an ending  
> and more of the beginning of everything still to come.

---

## 👩‍💻 Ownership

| | |
|---|---|
| **Organization** | Maikeise |
| **Project** | Maikeise Quotations |
| **Technical owner** | Anny Maikeise |
| **First delivery** | September 16, 2026 |
| **Release** | `v1.0.0` |

---

## Repository Notice

This repository contains source code and technical documentation for the project.

Real quotation records, supplier information, credentials, authentication tokens, spreadsheet identifiers, deployment URLs, and other confidential commercial data are intentionally excluded from version control.

---

<div align="center">

### **MAIKEISE**

**Software • Systems • Solutions**

`From a real need to a real solution.`

</div>
