# Sprint 00 — Foundation

> **Projeto:** Maikeise Quotations  
> **Organização:** Maikeise  
> **Responsável técnico:** Anny Maikeise  
> **Sprint:** 00 — Foundation  
> **Status:** Em andamento  
> **Data:** 16 de setembro de 2026

---

## 1. Objetivo

A Sprint 00 tem como objetivo estabelecer a fundação técnica do **Maikeise Quotations**, preparando o projeto para desenvolvimento, versionamento, documentação e implantação de forma segura e reproduzível.

Esta sprint não contempla funcionalidades de negócio voltadas ao usuário final.

Seu foco está na configuração do ambiente, integração entre ferramentas, estrutura inicial de persistência e definição das primeiras decisões arquiteturais.

---

## 2. Arquitetura inicial

O ambiente de desenvolvimento foi estruturado da seguinte forma:

```text
GitHub
   ↕
Git
   ↕
Ambiente local / VS Code
   ↕
clasp
   ↕
Google Apps Script
   ↕
Google Sheets
```

Cada componente possui uma responsabilidade específica.

### GitHub

Responsável pelo armazenamento do código-fonte, documentação técnica e histórico público de evolução do projeto.

### Git

Responsável pelo controle de versão local e sincronização com o GitHub.

### Ambiente local

Ambiente principal de desenvolvimento do código-fonte.

### clasp

Ferramenta utilizada para sincronizar o código local com o Google Apps Script.

### Google Apps Script

Ambiente de execução da aplicação e integração com os serviços Google.

### Google Sheets

Camada inicial de persistência de dados do sistema.

---

## 3. Ambiente de desenvolvimento

Foi criado um ambiente dedicado exclusivamente ao desenvolvimento:

```text
Maikeise Quotations - DEV
```

Dados comerciais reais não devem ser utilizados neste ambiente durante o desenvolvimento público do projeto.

Testes e demonstrações devem utilizar exclusivamente dados fictícios ou anonimizados.

---

## 4. Estrutura inicial do banco

A função:

```javascript
setupDatabase()
```

é responsável pela inicialização automática da estrutura de persistência.

A execução cria as seguintes planilhas:

```text
COTACOES
DADOS_OPCIONAIS
AUDITORIA
CONFIG
```

### COTACOES

Armazena os dados estruturados das cotações.

### DADOS_OPCIONAIS

Armazena informações complementares através de pares chave/valor associados a uma cotação.

### AUDITORIA

Destinada ao histórico de operações relevantes realizadas sobre os registros.

### CONFIG

Armazena configurações não sensíveis e informações sobre a versão do schema.

---

## 5. Schema inicial

A tabela `COTACOES` possui inicialmente:

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

Além dos campos de negócio, foram adicionados metadados técnicos para rastreabilidade, controle de estado e evolução dos registros.

---

## 6. Versionamento do schema

A estrutura do banco possui versionamento independente.

Versão atual:

```text
SCHEMA_VERSION = 1.0.0
```

A aba `CONFIG` também identifica:

```text
APPLICATION = Maikeise Quotations
ENVIRONMENT = DEV
```

Mudanças estruturais futuras deverão avaliar a necessidade de incremento da versão do schema e, quando necessário, estratégia de migração.

---

## 7. Idempotência

A função `setupDatabase()` foi projetada para ser idempotente.

Isso significa que sua execução repetida não deve recriar estruturas já existentes.

Exemplo:

```text
Primeira execução:
COTACOES criada

Segunda execução:
COTACOES já existe → nenhuma duplicação
```

Esse comportamento permite que a inicialização seja executada novamente com menor risco de duplicação estrutural.

---

## 8. Segurança do repositório

O projeto foi preparado considerando sua futura publicação como portfólio.

O `.gitignore` impede o versionamento de arquivos e diretórios locais ou potencialmente sensíveis, incluindo:

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

O arquivo:

```text
.env.example
```

pode ser versionado e serve apenas como referência de configuração.

Nenhuma credencial, token, identificador privado ou dado comercial real deve ser enviado ao repositório público.

---

## 9. Estratégia de ambientes

O projeto adotará separação entre desenvolvimento e produção.

```text
DEV
↓
Código em desenvolvimento
Dados fictícios
Testes

PROD
↓
Versões validadas
Dados reais
Acesso controlado
```

O ambiente de produção será configurado em uma etapa futura.

---

## 10. Critérios de aceite

A Sprint 00 considera os seguintes critérios:

- [x] Repositório GitHub criado
- [x] Git configurado localmente
- [x] Node.js e npm configurados
- [x] clasp instalado
- [x] Autenticação do clasp concluída
- [x] Google Apps Script API habilitada
- [x] Ambiente `Maikeise Quotations - DEV` criado
- [x] Apps Script conectado ao ambiente local
- [x] Estrutura inicial do banco automatizada
- [x] Versionamento inicial do schema
- [x] Proteções do `.gitignore`
- [x] Teste de criação da estrutura
- [x] Teste de idempotência
- [ ] Tratamento seguro da planilha padrão criada pelo Google
- [ ] Documentação final revisada
- [ ] ADR-001 registrado

---

## 11. Entregáveis

Ao término da Sprint 00, deverão existir:

```text
Código de setup
Configuração do Apps Script
Estrutura inicial de persistência
Ambiente DEV
Integração GitHub ↔ Local ↔ Apps Script
Documentação da Sprint
ADR-001
```

---

## 12. Próxima sprint

A próxima etapa planejada é:

### Sprint 01 — Quotation Domain

Responsável pela implementação inicial do domínio de cotações.

Escopo previsto:

- entidade Cotação;
- validações de domínio;
- normalização dos dados;
- cálculo do valor total;
- geração de identificadores;
- repository de cotações;
- serviço de aplicação;
- persistência de uma cotação;
- testes iniciais das regras de negócio.

---

## Histórico

| Versão | Data | Descrição | Responsável |
|---|---|---|---|
| 1.0 | 16/09/2026 | Registro inicial da Sprint 00 | Anny Maikeise |

---

**Maikeise**  
*Software • Systems • Solutions*