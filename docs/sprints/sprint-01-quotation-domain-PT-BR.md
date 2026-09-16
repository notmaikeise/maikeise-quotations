# Sprint 01 — Domínio de Cotações

> **Projeto:** Maikeise Quotations  
> **Organização:** Maikeise  
> **Responsável técnico:** Anny Maikeise  
> **Sprint:** 01 — Quotation Domain  
> **Status:** Concluída  
> **Data:** 16 de setembro de 2026  
> **Versão:** 1.0

---

## 1. Objetivo

A Sprint 01 teve como objetivo implementar o primeiro fluxo funcional de backend do **Maikeise Quotations**, estabelecendo o domínio de cotações, suas principais regras de negócio e a persistência inicial utilizando Google Sheets.

A implementação também buscou manter as regras de negócio desacopladas da infraestrutura, seguindo a decisão arquitetural estabelecida na **ADR-001**.

Ao final desta sprint, o sistema deve ser capaz de receber dados de uma cotação, validá-los, calcular valores derivados, identificar possíveis duplicidades e persistir a cotação e seus dados complementares no ambiente DEV.

---

## 2. Escopo implementado

Durante a Sprint 01 foram implementados:

- entidade de domínio `Quotation`;
- validação de cotações;
- cálculo automático do valor total;
- contrato `QuotationRepository`;
- implementação de persistência utilizando Google Sheets;
- serviço de aplicação `QuotationService`;
- geração automática de identificadores UUID;
- timestamps de criação e atualização;
- versionamento inicial dos registros;
- status inicial das cotações;
- detecção de possíveis duplicidades;
- recuperação de cotações por identificador;
- entidade `OptionalData`;
- contrato `OptionalDataRepository`;
- persistência de dados opcionais;
- leitura de dados opcionais associados a uma cotação;
- persistência em lote;
- testes de integração no ambiente DEV.

---

## 3. Estrutura implementada

A estrutura principal desta sprint é:

```text
src/
├── application/
│   └── QuotationService.js
│
├── domain/
│   ├── OptionalData.js
│   ├── OptionalDataRepository.js
│   ├── Quotation.js
│   ├── QuotationRepository.js
│   └── QuotationValidator.js
│
├── infrastructure/
│   ├── GoogleSheetsOptionalDataRepository.js
│   ├── GoogleSheetsQuotationRepository.js
│   ├── IntegrationTest.js
│   └── Setup.js
│
└── appsscript.json
```

A organização separa regras de negócio, casos de uso e detalhes de infraestrutura.

---

## 4. Modelo de domínio

A entidade `Quotation` representa uma cotação dentro do sistema.

Ela contém os dados comerciais necessários e comportamentos pertencentes ao domínio, sem possuir dependência direta de Google Sheets ou `SpreadsheetApp`.

Entre suas responsabilidades está o cálculo do valor total:

```text
VALOR_TOTAL = QUANTIDADE × VALOR_UNITARIO
```

O valor total é considerado um dado derivado pelo sistema.

Dessa forma, o usuário não é responsável por informar manualmente um total que possa ser inconsistente com a quantidade e o valor unitário.

---

## 5. Regras de negócio

O domínio aplica inicialmente as seguintes regras:

- quantidade deve ser maior que zero;
- valor unitário não pode ser negativo;
- valor total deve ser calculado pelo sistema;
- NCM deve conter exatamente oito dígitos;
- data solicitada deve representar uma data válida;
- campos obrigatórios não podem estar vazios;
- cada cotação recebe um identificador único;
- novas cotações recebem status `ACTIVE`;
- novos registros iniciam na versão `1`;
- datas de criação e atualização são geradas pela aplicação.

---

## 6. Campos principais

A estrutura principal de uma cotação contempla:

```text
RFP
Código do item
Referência
Descrição
Fornecedor
Quantidade
Valor unitário
Valor total
NCM
Prazo
Pagamento
Entrega
Data solicitada
```

Além desses campos de negócio, o sistema mantém metadados técnicos:

```text
ID_COTACAO
STATUS
CRIADO_EM
ATUALIZADO_EM
VERSAO
```

RFP, código do item e NCM são tratados de forma que sua representação textual possa ser preservada, inclusive quando houver zeros à esquerda.

---

## 7. Validação

A validação das regras de negócio é responsabilidade de:

```text
QuotationValidator
```

O validator pertence à camada de domínio e não depende da interface ou do mecanismo de persistência.

Fluxo:

```text
Dados recebidos
      ↓
Quotation
      ↓
QuotationValidator
      ↓
Cotação válida?
   ↙       ↘
 NÃO       SIM
  ↓         ↓
Erro     Continua
```

Isso impede que regras fundamentais dependam exclusivamente da validação realizada no navegador.

---

## 8. Detecção de possíveis duplicidades

O sistema realiza uma verificação inicial de possíveis registros duplicados.

A combinação utilizada atualmente é:

```text
RFP
+
Código do item
+
Fornecedor
```

A identificação de uma possível duplicidade não impede o cadastro.

O sistema retorna um aviso, permitindo que a camada de apresentação informe o usuário.

Exemplo:

```text
Possível duplicidade encontrada
        ↓
      Aviso
        ↓
Cadastro continua permitido
```

Essa abordagem evita bloqueios indevidos quando duas cotações legítimas compartilham informações semelhantes.

---

## 9. Repository Pattern

O acesso aos dados foi abstraído através de contratos de repository.

Exemplo:

```text
QuotationRepository
        ↓
GoogleSheetsQuotationRepository
        ↓
SpreadsheetApp
        ↓
Google Sheets
```

O domínio conhece o contrato necessário para persistência, mas não precisa conhecer a tecnologia utilizada para implementá-lo.

Isso reduz o acoplamento com Google Sheets.

---

## 10. Portabilidade

A separação permite que uma implementação como:

```text
GoogleSheetsQuotationRepository
```

possa futuramente ser substituída por:

```text
PostgreSQLQuotationRepository
```

ou outra tecnologia, mantendo a maior parte das regras de negócio e dos serviços de aplicação.

Essa estratégia segue o princípio de portabilidade definido na ADR-001.

---

## 11. QuotationService

O `QuotationService` coordena o caso de uso de cadastro.

O fluxo atual é:

```text
Entrada
   ↓
QuotationService
   ↓
Criação da Quotation
   ↓
Validação
   ↓
Verificação de duplicidade
   ↓
Persistência da cotação
   ↓
Persistência dos dados opcionais
   ↓
Resultado
```

Dessa forma, a camada de apresentação não precisa conhecer os detalhes internos da persistência.

---

## 12. Persistência

As cotações são persistidas inicialmente na aba:

```text
COTACOES
```

Durante a criação, o sistema gera ou controla:

```text
UUID
STATUS
CRIADO_EM
ATUALIZADO_EM
VERSAO
VALOR_TOTAL
```

A escrita da cotação utiliza `LockService` para reduzir problemas relacionados a gravações concorrentes.

As operações de persistência procuram utilizar gravações em lote sempre que possível.

---

## 13. Dados opcionais

Nem todas as informações presentes em uma cotação precisam fazer parte permanentemente do schema principal.

Para permitir flexibilidade, foi implementada a estrutura:

```text
DADOS_OPCIONAIS
```

Com:

```text
ID_DADO
ID_COTACAO
CHAVE
VALOR
ORDEM
```

Exemplo:

```text
Cotação
│
├── RFP
├── Fornecedor
├── Quantidade
├── NCM
│
└── Dados opcionais
    ├── CURRENCY = BRL
    ├── REGION = Southeast
    ├── COST_CENTER = DEMO-1001
    └── OBSERVATION = ...
```

Isso permite incorporar novos atributos sem modificar constantemente a estrutura principal de `COTACOES`.

---

## 14. Persistência em lote

Os dados opcionais são gravados utilizando uma operação em lote.

Em vez de realizar:

```text
Campo 1 → escrita
Campo 2 → escrita
Campo 3 → escrita
Campo 4 → escrita
```

a aplicação prepara os registros e utiliza uma única operação de escrita:

```text
Campos 1..N
     ↓
setValues()
```

Essa abordagem reduz operações desnecessárias sobre Google Sheets.

---

## 15. Testes de integração

O fluxo completo foi validado no ambiente:

```text
Maikeise Quotations - DEV
```

utilizando exclusivamente dados fictícios.

O teste executado validou:

- [x] criação da entidade `Quotation`;
- [x] validação das regras de domínio;
- [x] geração automática de UUID;
- [x] cálculo do valor total;
- [x] persistência em `COTACOES`;
- [x] recuperação da cotação pelo ID;
- [x] consistência do valor total recuperado;
- [x] detecção de possível duplicidade;
- [x] persistência de dados opcionais;
- [x] relacionamento através de `ID_COTACAO`;
- [x] leitura dos dados opcionais;
- [x] escrita em lote.

O teste de integração concluiu com sucesso.

---

## 16. Segurança dos testes

Dados comerciais reais não devem ser utilizados em testes versionados publicamente.

Os testes do projeto devem utilizar:

```text
Dados fictícios
Dados gerados especificamente para testes
Dados devidamente anonimizados
```

Não devem ser enviados ao repositório:

```text
Cotações reais
Dados privados de fornecedores
Credenciais
Tokens
Secrets
Backups
Exports de produção
```

---

## 17. Limitações conhecidas

A persistência atual utiliza Google Sheets, que não oferece transações ACID equivalentes às encontradas em bancos de dados relacionais.

Atualmente pode ocorrer uma situação como:

```text
Cotação
   ↓
COTACOES
   ↓
SALVO ✓

Dados opcionais
   ↓
DADOS_OPCIONAIS
   ↓
ERRO ✗
```

Nesse cenário, pode existir persistência parcial.

A implementação de mecanismos adicionais de:

- rollback;
- recuperação de falhas;
- atomicidade;
- auditoria completa;
- estratégias avançadas de concorrência;

foi deliberadamente adiada para uma etapa posterior.

Essa limitação é conhecida e deverá ser considerada na evolução arquitetural do projeto.

---

## 18. Critérios de aceite

A Sprint 01 considera os seguintes critérios concluídos:

- [x] modelo de domínio de cotação implementado;
- [x] validação de domínio implementada;
- [x] cálculo automático do valor total;
- [x] repository de cotações definido;
- [x] implementação Google Sheets criada;
- [x] serviço de aplicação criado;
- [x] geração de identificadores;
- [x] metadados técnicos implementados;
- [x] detecção de possível duplicidade;
- [x] recuperação por ID;
- [x] modelo de dados opcionais;
- [x] repository de dados opcionais;
- [x] persistência de dados opcionais;
- [x] teste de integração executado com sucesso;
- [x] arquitetura validada no ambiente DEV.

---

## 19. Resultado

A Sprint 01 entrega o primeiro caso de uso funcional de backend do **Maikeise Quotations**:

```text
REGISTRAR COTAÇÃO

Dados recebidos
      ↓
Criar domínio
      ↓
Validar
      ↓
Calcular total
      ↓
Verificar duplicidade
      ↓
Gerar metadados
      ↓
Persistir cotação
      ↓
Persistir dados opcionais
      ↓
Retornar resultado
```

O backend está preparado para ser posteriormente consumido pela camada Web.

---

## 20. Próxima etapa

A próxima etapa do projeto deverá iniciar a exposição dos casos de uso para a camada Web e a construção da primeira interface do sistema.

Entre os próximos objetivos estão:

- integração Web ↔ Apps Script;
- formulário de cadastro;
- apresentação das validações;
- aviso de possível duplicidade;
- campos opcionais dinâmicos;
- feedback de sucesso e erro;
- início da experiência visual do produto.

Melhorias relacionadas a atomicidade, rollback e auditoria poderão ser incorporadas posteriormente sem bloquear a evolução inicial da aplicação.

---

## Histórico

| Versão | Data | Descrição | Responsável |
|---|---|---|---|
| 1.0 | 16/09/2026 | Conclusão da Sprint 01 — Quotation Domain | Anny Maikeise |

---

**Maikeise**  
*Software • Systems • Solutions*