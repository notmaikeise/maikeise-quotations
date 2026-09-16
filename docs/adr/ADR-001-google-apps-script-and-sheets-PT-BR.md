# ADR-001 — Google Apps Script e Google Sheets como stack inicial

> **Projeto:** Maikeise Quotations  
> **Organização:** Maikeise  
> **Responsável técnico:** Anny Maikeise  
> **Status:** Aceito  
> **Data:** 16 de setembro de 2026  
> **Versão:** 1.0

---

## 1. Contexto

O **Maikeise Quotations** foi concebido para digitalizar e centralizar um acervo histórico de cotações comerciais que anteriormente dependia majoritariamente de documentos e consultas manuais.

A primeira versão do sistema necessita oferecer principalmente:

- cadastro estruturado de cotações;
- pesquisa de registros históricos;
- armazenamento de informações complementares;
- rastreabilidade de alterações;
- baixo custo operacional;
- implantação simples;
- manutenção compatível com um projeto autônomo.

O sistema será inicialmente utilizado em uma escala limitada e não possui, nesta etapa, requisitos que justifiquem uma infraestrutura dedicada de backend, banco de dados relacional ou serviços em nuvem pagos.

---

## 2. Problema

É necessário definir uma stack tecnológica que permita desenvolver e disponibilizar a primeira versão do sistema com:

1. baixo ou nenhum custo inicial de infraestrutura;
2. baixa complexidade operacional;
3. persistência estruturada;
4. interface web;
5. possibilidade de automação;
6. controle de acesso através do ecossistema Google;
7. facilidade de manutenção;
8. possibilidade de evolução futura.

A solução também deve permitir que o código-fonte seja mantido separadamente dos dados comerciais e publicado futuramente como projeto de portfólio.

---

## 3. Decisão

A versão inicial do **Maikeise Quotations** utilizará:

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

A arquitetura lógica será:

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

O Google Sheets será tratado como mecanismo de persistência e não como interface principal de operação do sistema.

O acesso aos dados deverá ocorrer através da aplicação sempre que possível.

---

## 4. Justificativa

### 4.1 Baixo custo operacional

Google Apps Script e Google Sheets permitem implementar a primeira versão sem provisionar servidores, banco de dados dedicado ou infraestrutura adicional.

Isso é adequado ao estágio inicial do produto.

### 4.2 Integração nativa

Apps Script possui integração direta com Google Sheets e outros serviços do ecossistema Google.

Isso reduz a quantidade de infraestrutura necessária para a primeira versão.

### 4.3 Implantação simplificada

A aplicação poderá ser disponibilizada como Web App através do próprio Apps Script.

Não será necessário administrar inicialmente:

- servidor web;
- sistema operacional;
- containers;
- reverse proxy;
- banco de dados dedicado;
- infraestrutura de rede própria.

### 4.4 Velocidade de desenvolvimento

A stack permite priorizar as regras de negócio e a experiência do usuário antes de introduzir componentes de infraestrutura mais complexos.

### 4.5 Adequação ao volume inicial

O volume e a concorrência esperados inicialmente são considerados compatíveis com uma solução baseada em Google Sheets.

Essa decisão deverá ser reavaliada conforme o sistema acumular dados e usuários.

### 4.6 Portfólio e versionamento

O uso do `clasp` permite manter o código Apps Script localmente.

Isso possibilita:

```text
Google Apps Script
        ↕
      clasp
        ↕
Ambiente local
        ↕
       Git
        ↕
     GitHub
```

O código-fonte e a documentação podem ser publicados sem disponibilizar a planilha ou os dados comerciais reais.

---

## 5. Alternativas consideradas

### 5.1 Backend próprio + banco SQL

Exemplo:

```text
Frontend
   ↓
REST API
   ↓
Node.js / Java / .NET
   ↓
PostgreSQL
```

#### Vantagens

- maior escalabilidade;
- modelagem relacional robusta;
- consultas avançadas;
- maior controle sobre a aplicação;
- melhor suporte a alta concorrência.

#### Desvantagens no contexto atual

- maior complexidade;
- necessidade de hospedagem;
- configuração adicional de segurança;
- manutenção de infraestrutura;
- custo operacional potencialmente maior;
- desenvolvimento inicial mais demorado.

#### Decisão

Não adotado na V1.

Pode se tornar uma opção futura caso o crescimento do sistema justifique a migração.

---

### 5.2 Firebase

#### Vantagens

- infraestrutura gerenciada;
- boa integração com aplicações web;
- autenticação e outros serviços integrados;
- possibilidade de crescimento.

#### Desvantagens no contexto atual

- introduz serviços adicionais que ainda não são necessários;
- aumenta a complexidade da arquitetura inicial;
- não oferece vantagem suficiente sobre Sheets para o escopo atual.

#### Decisão

Não adotado na V1.

---

### 5.3 Aplicação somente em Google Sheets

Outra possibilidade seria utilizar a própria planilha como interface principal.

#### Vantagens

- implementação extremamente simples;
- praticamente nenhuma camada adicional.

#### Desvantagens

- experiência de usuário limitada;
- maior risco de alterações manuais incorretas;
- regras de negócio mais difíceis de controlar;
- menor separação de responsabilidades;
- menor qualidade arquitetural;
- dificuldade de evolução para uma aplicação completa.

#### Decisão

Não adotado.

Google Sheets será utilizado como persistência, enquanto a interação do usuário ocorrerá através da aplicação.

---

## 6. Consequências positivas

A decisão proporciona:

- baixo custo inicial;
- menor quantidade de infraestrutura;
- desenvolvimento rápido;
- integração nativa com Google Sheets;
- implantação simplificada;
- facilidade para criação de protótipos e MVP;
- possibilidade de versionar o código no GitHub;
- separação entre código público e dados privados;
- caminho de evolução incremental.

---

## 7. Consequências negativas

A solução também introduz limitações:

- dependência do ecossistema Google;
- cotas e limites do Apps Script;
- limitações de tempo de execução;
- menor capacidade para consultas complexas;
- ausência de integridade relacional nativa;
- menor desempenho em grandes volumes;
- maior dificuldade com alta concorrência;
- necessidade de implementar controles adicionais de integridade.

Essas limitações são consideradas aceitáveis para o estágio inicial do produto.

---

## 8. Estratégias de mitigação

Para reduzir os riscos da arquitetura escolhida, serão adotadas as seguintes práticas:

### Persistência

- operações de leitura e escrita em lote;
- evitar acesso célula por célula;
- repositories para encapsular acesso às planilhas;
- IDs próprios para entidades;
- versionamento de registros.

### Concorrência

- utilização de `LockService`;
- controle de versão dos registros;
- validação antes da atualização.

### Integridade

- validação no domínio;
- validação server-side;
- cálculo de campos derivados pela aplicação;
- auditoria de operações relevantes;
- preferência por inativação em vez de exclusão física.

### Segurança

- princípio do menor privilégio;
- separação entre DEV e PROD;
- dados reais fora do GitHub;
- credenciais fora do código-fonte;
- acesso controlado à planilha;
- `.gitignore` para recursos locais e sensíveis.

### Performance

- paginação;
- leitura em lote;
- retorno apenas dos dados necessários;
- monitoramento do crescimento da base.

---

## 9. Portabilidade

A arquitetura deve reduzir o acoplamento direto entre as regras de negócio e Google Sheets.

O domínio não deverá depender diretamente de:

```javascript
SpreadsheetApp
```

O acesso deverá ser encapsulado por repositories.

Exemplo:

```text
CotacaoService
      │
      ▼
CotacaoRepository
      │
      ▼
GoogleSheetsCotacaoRepository
      │
      ▼
SpreadsheetApp
```

Essa separação permitirá que, futuramente:

```text
GoogleSheetsCotacaoRepository
```

seja substituído por algo como:

```text
PostgreSQLCotacaoRepository
```

sem exigir uma reescrita completa das regras de negócio.

---

## 10. Gatilhos para revisão arquitetural

Esta decisão deverá ser revisada caso sejam identificadas uma ou mais das seguintes situações:

- crescimento significativo da quantidade de cotações;
- degradação perceptível do tempo de pesquisa;
- necessidade de alta concorrência;
- múltiplos usuários realizando gravações simultâneas;
- necessidade de relacionamentos complexos;
- necessidade de consultas analíticas avançadas;
- integrações extensivas com sistemas externos;
- requisitos de disponibilidade mais rigorosos;
- requisitos de segurança incompatíveis com a arquitetura atual;
- limites ou cotas do Apps Script afetando a operação;
- necessidade de processamento em massa;
- crescimento do sistema para múltiplas organizações ou clientes.

A ocorrência de um gatilho não implica migração automática.

Ela determina a necessidade de uma nova avaliação arquitetural.

---

## 11. Estratégia de migração futura

Caso uma nova tecnologia de persistência seja necessária, a migração deverá priorizar a preservação das camadas de domínio e aplicação.

Arquitetura esperada:

```text
ANTES

Domain
  ↓
Repository
  ↓
Google Sheets


DEPOIS

Domain
  ↓
Repository
  ↓
Database / API
```

A interface definida pelos repositories deverá minimizar o impacto da substituição.

A eventual migração deverá possuir ADR própria.

---

## 12. Segurança e publicação do código

O projeto foi planejado para futura publicação como portfólio.

Podem ser publicados:

```text
Código-fonte
Documentação
Arquitetura
Schemas
Scripts de inicialização
Dados fictícios
Testes
ADRs
Histórico de versões
```

Não podem ser publicados:

```text
Cotações reais
Dados comerciais confidenciais
Credenciais
Tokens
Secrets
IDs privados desnecessários
Backups
Exports de produção
Informações privadas de fornecedores
```

A publicação do código não implica publicação da base de dados.

---

## 13. Resultado

A decisão é:

> **Adotar Google Apps Script e Google Sheets como stack principal da versão inicial do Maikeise Quotations, mantendo separação arquitetural suficiente para permitir futura substituição da infraestrutura sem reescrever o domínio da aplicação.**

---

## 14. Status

```text
ACEITO
```

Esta ADR entra em vigor a partir da versão inicial do projeto.

Caso seja substituída futuramente, seu status deverá ser atualizado para:

```text
SUPERADO POR ADR-XXX
```

O documento original deverá permanecer no histórico.

---

## Histórico

| Versão | Data | Alteração | Responsável |
|---|---|---|---|
| 1.0 | 16/09/2026 | Decisão arquitetural inicial | Anny Maikeise |

---

**Maikeise**  
*Software • Systems • Solutions*