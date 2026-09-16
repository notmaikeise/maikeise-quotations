# Maikeise Quotations — Design System v0.1

**Organização:** Maikeise  
**Produto:** Maikeise Quotations  
**Versão:** 0.1  
**Data:** 16 de setembro de 2026  
**Status:** Em desenvolvimento

## 1. Objetivo

Este documento define a direção visual e os princípios iniciais de
experiência do usuário do Maikeise Quotations.

A interface busca combinar características de sistemas corporativos
com uma apresentação minimalista e premium, priorizando clareza,
legibilidade e facilidade de uso.

## 2. Princípios de design

O sistema será desenvolvido seguindo os seguintes princípios:

- Clareza antes de densidade de informação.
- Ações importantes devem ser facilmente identificáveis.
- Informações relacionadas devem ser agrupadas visualmente.
- A interface não deve depender exclusivamente de cores para
  comunicar estados.
- Elementos interativos devem possuir áreas de clique confortáveis.
- A navegação deve permanecer simples e previsível.
- Animações devem auxiliar a compreensão da interface, sem distrair.
- Dados técnicos devem ser visualmente distinguíveis dos demais textos.

## 3. Público e acessibilidade

A interface deve ser confortável também para usuários idosos ou
com menor familiaridade com sistemas administrativos.

Por esse motivo, o projeto prioriza:

- Tipografia legível.
- Tamanhos de fonte confortáveis.
- Campos de formulário maiores.
- Contraste adequado.
- Estados de foco visíveis.
- Navegação por teclado.
- Mensagens acompanhadas por texto, sem depender apenas de cores.
- Suporte a `prefers-reduced-motion`.
- Organização espacial consistente.

## 4. Direção visual

A identidade visual combina características:

- Corporativas;
- Minimalistas;
- Premium/editoriais.

Sistemas empresariais como SAP são utilizados como referência de
organização e legibilidade, sem reproduzir diretamente sua identidade
visual.

## 5. Paleta inicial

| Token | Cor | Uso |
|---|---|---|
| Primary | `#203740` | Navegação, títulos e elementos principais |
| Accent | `#F2A81D` | Destaques, seleção e ações importantes |
| Background | `#F2F2F2` | Fundo principal da aplicação |

Cores adicionais de superfície, texto, bordas, sucesso, aviso e erro
serão definidas como tokens derivados durante a implementação.

O Accent deve ser utilizado de forma controlada, evitando seu uso
como cor dominante da interface.

## 6. Tipografia

A interface utilizará uma fonte sans-serif de alta legibilidade para
conteúdo e navegação.

Informações técnicas poderão utilizar tipografia monoespaçada,
incluindo:

- RFP;
- código do item;
- NCM;
- identificadores internos.

A escolha final das famílias tipográficas será registrada após os
testes de implementação.

## 7. Estrutura da aplicação

A aplicação utilizará navegação horizontal.

A estrutura principal será composta por:

- Identidade Maikeise;
- Consulta;
- Nova cotação;
- Seletor de idioma PT/EN.

A tela de Consulta será a página inicial da aplicação.

## 8. Formulários

Os formulários utilizarão:

- Labels posicionadas acima dos campos;
- Campos espaçosos;
- Bordas levemente arredondadas;
- Agrupamento por contexto;
- Espaçamento generoso entre informações.

O cadastro será organizado em painéis:

1. Identificação;
2. Valores;
3. Informações comerciais;
4. Dados adicionais.

## 9. Feedback da interface

Após o cadastro de uma cotação, o sistema deverá apresentar:

1. Toast confirmando a operação;
2. Resumo da cotação cadastrada.

Possíveis duplicidades deverão ser apresentadas antes da persistência,
permitindo ao usuário confirmar ou cancelar a operação.

## 10. Internacionalização

A interface será desenvolvida inicialmente em português e inglês.

Os textos visíveis da aplicação não deverão ficar acoplados diretamente
à lógica de negócio, permitindo a troca de idioma entre PT e EN.

A preferência de idioma poderá ser persistida localmente no navegador.

## 11. Movimento

A aplicação poderá utilizar transições perceptíveis, porém profissionais.

As animações deverão:

- Comunicar mudança de estado;
- Fornecer feedback;
- Evitar movimentos puramente decorativos;
- Respeitar `prefers-reduced-motion`.

## 12. Evolução

Este documento representa o Design System v0.1.

Tokens, componentes e padrões poderão ser alterados conforme testes de
usabilidade e evolução do produto.

Mudanças relevantes deverão ser registradas em novas versões deste
documento.