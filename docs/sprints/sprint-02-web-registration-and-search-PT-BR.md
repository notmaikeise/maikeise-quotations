# Sprint 02 — Cadastro Web, Consulta e Detalhes de Cotações

**Projeto:** Maikeise Quotations  
**Status:** Concluída  
**Versão-alvo:** v1.0.0  
**Data de conclusão:** 16/09/2026

---

## 1. Objetivo

Entregar uma interface web funcional para o cadastro e a consulta de cotações, conectada ao backend existente em Google Apps Script e à persistência em Google Sheets.

A sprint teve como foco transformar o domínio e a infraestrutura desenvolvidos anteriormente em uma aplicação utilizável pelo cliente, mantendo separação entre interface, aplicação, domínio e persistência.

---

## 2. Escopo entregue

### Cadastro de cotações

Foi implementada uma interface web completa para cadastro de cotações com os seguintes campos obrigatórios:

- RFP
- Código do item
- Referência
- Descrição
- Fornecedor
- Quantidade
- Valor unitário
- NCM
- Prazo de entrega
- Prazo de pagamento
- Entrega
- Data solicitada

O valor total é exibido na interface, mas continua sendo calculado novamente no backend para manter a regra de negócio sob responsabilidade da aplicação.

### Informações adicionais

Os dados opcionais foram mantidos em estrutura flexível de chave e valor e apresentados na interface em grupos fixos:

- Responsável
- Região
- Centro
- Moeda
- Impostos
- Observações

Os campos opcionais não são obrigatórios e somente os valores preenchidos são persistidos.

### Consulta de cotações

A consulta foi implementada com dois modos alternáveis:

- RFP
- Código do item

A busca utiliza correspondência exata, após normalização básica do valor informado.

A interface utiliza um único campo de pesquisa e permite alternar o critério por meio de um seletor segmentado.

Como RFP e Código do item não são tratados como identificadores únicos, o backend sempre retorna uma lista de resultados.

### Visualização de detalhes

Cada resultado possui a ação **Ver detalhes**.

Ao abrir uma cotação, o sistema utiliza o identificador técnico interno para recuperar:

- Dados principais da cotação
- Informações comerciais
- Valores
- Informações adicionais

O identificador técnico não é exibido ao usuário.

---

## 3. Arquitetura utilizada

O fluxo da aplicação permanece organizado em camadas:

```text
Interface Web
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

Para informações adicionais:

```text
QuotationService
    ↓
OptionalDataRepository
    ↓
GoogleSheetsOptionalDataRepository
    ↓
DADOS_OPCIONAIS
```

A interface não acessa diretamente o Google Sheets.

---

## 4. Alterações no domínio e aplicação

O contrato `QuotationRepository` foi expandido para permitir consulta de cotações.

A camada de aplicação passou a disponibilizar operações de:

- Registro de cotação
- Consulta por critério
- Recuperação dos detalhes de uma cotação

A busca aceita somente critérios suportados pela aplicação.

Exemplo de entrada:

```javascript
{
  type: 'RFP',
  value: 'RFP-2026-001'
}
```

ou:

```javascript
{
  type: 'ITEM_CODE',
  value: '000987'
}
```

---

## 5. Persistência

A implementação em Google Sheets realiza a busca na planilha `COTACOES` utilizando leitura em lote.

Os campos RFP e Código do item continuam sendo tratados como texto para preservar valores com zeros à esquerda.

A visualização detalhada combina informações de:

- `COTACOES`
- `DADOS_OPCIONAIS`

Os dados técnicos necessários para relacionamento permanecem internos à aplicação.

---

## 6. Interface e experiência do usuário

A interface foi construída com HTML, CSS e JavaScript dentro do Google Apps Script.

Principais características:

- Layout corporativo e responsivo
- Identidade visual baseada na paleta da Maikeise
- Navegação horizontal
- Cadastro organizado em painéis
- Consulta com alternância entre RFP e Código do item
- Tabela de resultados
- Modal de detalhes
- Feedback de carregamento, sucesso, ausência de resultados e erro
- Suporte a português e inglês
- Uso de labels visíveis
- Estados de foco
- Suporte a `prefers-reduced-motion`
- Comportamento responsivo para telas menores

Paleta principal:

```text
#203740
#F2A81D
#F2F2F2
```

---

## 7. Regras implementadas na interface

A interface aplica validações antes do envio e apresenta mensagens próximas aos campos.

Entre as regras:

- Quantidade deve ser maior que zero
- Valor unitário não pode ser negativo
- NCM deve conter oito dígitos
- Data solicitada deve ser válida
- Prazo de entrega aceita somente número de dias
- Prazo de pagamento aceita somente número de dias
- Campos obrigatórios não podem ser enviados vazios

Os prazos são apresentados ao usuário com a unidade **dias**.

As validações do frontend complementam, mas não substituem, as validações do backend.

---

## 8. DTOs e segurança da interface

Objetos de domínio não são enviados diretamente ao navegador.

O `WebController` converte os resultados em objetos simples apropriados para a interface.

O identificador interno da cotação pode ser utilizado durante operações internas, como abertura dos detalhes, mas não é exibido na interface.

Metadados técnicos, como versão e identificadores internos de persistência, permanecem ocultos do usuário final.

---

## 9. Testes realizados

Durante a sprint foram validados:

- Cadastro de cotação
- Persistência de dados obrigatórios
- Persistência de informações adicionais
- Cálculo do valor total
- Pesquisa por RFP
- Pesquisa por Código do item
- Retorno de múltiplas cotações
- Cenário sem resultados
- Abertura de detalhes
- Cotação com dados opcionais
- Cotação sem dados opcionais
- Preservação de códigos com zeros à esquerda
- Fluxo da aplicação web no ambiente DEV

Foi utilizado um teste de integração para validar a consulta diretamente pelo `QuotationService`.

---

## 10. Privacidade e versionamento

O repositório não deve conter:

- Dados reais de clientes
- Dados reais de fornecedores
- IDs de planilhas
- Script IDs
- URLs privadas de deployment
- Tokens ou credenciais
- Dados comerciais sensíveis

Os dados utilizados em testes e documentação devem permanecer fictícios.

Arquivos locais sensíveis continuam protegidos pelo `.gitignore`.

---

## 11. Decisões de escopo

As seguintes funcionalidades foram avaliadas, mas ficaram fora da entrega v1.0.0:

- Edição de cotação
- Desativação de cotação
- Histórico visual de auditoria
- Filtros avançados de consulta
- Busca parcial
- Paginação de resultados

Esses itens ficam registrados como melhorias futuras.

---

## 12. Critérios de conclusão

A sprint é considerada concluída porque:

- O cadastro está funcional
- A consulta está funcional
- O cliente pode localizar cotações por RFP ou Código do item
- Múltiplos resultados são suportados
- Todos os dados relevantes podem ser visualizados
- Dados opcionais são exibidos nos detalhes
- Identificadores técnicos permanecem ocultos
- A interface está responsiva e utilizável
- O fluxo completo funciona no ambiente de entrega

---

## 13. Resultado

Com a conclusão desta sprint, o Maikeise Quotations possui uma primeira versão funcional de ponta a ponta:

```text
Cadastro
    ↓
Validação
    ↓
Persistência
    ↓
Consulta
    ↓
Lista de resultados
    ↓
Visualização detalhada
```

Esta versão representa o escopo funcional da **v1.0.0** entregue ao cliente.

As próximas alterações passam a ser tratadas como evolução do produto e não como requisito da entrega inicial.
