/**
 * Maikeise Quotations
 * Database Setup
 *
 * @author Anny Maikeise
 * @version 1.0.0
 */

const DATABASE = {
  VERSION: '1.0.0',

  SHEETS: {
    QUOTATIONS: 'COTACOES',
    OPTIONAL_DATA: 'DADOS_OPCIONAIS',
    AUDIT: 'AUDITORIA',
    CONFIG: 'CONFIG',
  },
};

/**
 * Creates the initial database structure required by
 * Maikeise Quotations.
 *
 * This function is designed to be idempotent:
 * existing sheets are not recreated.
 */
function setupDatabase() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error('No active spreadsheet was found.');
  }

  createSheetIfNotExists_(
    spreadsheet,
    DATABASE.SHEETS.QUOTATIONS,
    [
      'ID_COTACAO',
      'RFP',
      'CODIGO_ITEM',
      'REFERENCIA',
      'DESCRICAO',
      'FORNECEDOR',
      'QUANTIDADE',
      'VALOR_UNITARIO',
      'VALOR_TOTAL',
      'NCM',
      'PRAZO',
      'PAGAMENTO',
      'ENTREGA',
      'DATA_SOLICITADA',
      'STATUS',
      'CRIADO_EM',
      'ATUALIZADO_EM',
      'VERSAO',
    ]
  );

  createSheetIfNotExists_(
    spreadsheet,
    DATABASE.SHEETS.OPTIONAL_DATA,
    [
      'ID_DADO',
      'ID_COTACAO',
      'CHAVE',
      'VALOR',
      'ORDEM',
    ]
  );

  createSheetIfNotExists_(
    spreadsheet,
    DATABASE.SHEETS.AUDIT,
    [
      'ID_EVENTO',
      'ID_COTACAO',
      'ACAO',
      'DATA_HORA',
      'USUARIO',
      'RESUMO',
    ]
  );

  createSheetIfNotExists_(
    spreadsheet,
    DATABASE.SHEETS.CONFIG,
    [
      'CHAVE',
      'VALOR',
    ]
  );

  initializeConfig_(spreadsheet);

  console.log(
    `Database initialized successfully. Schema version: ${DATABASE.VERSION}`
  );
}


/**
 * Creates a sheet only when it does not already exist.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 * @param {string} sheetName
 * @param {string[]} headers
 */
function createSheetIfNotExists_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (sheet) {
    return;
  }

  sheet = spreadsheet.insertSheet(sheetName);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);

  headerRange.setValues([headers]);

  formatHeader_(headerRange);

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}


/**
 * Applies the standard database header formatting.
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 */
function formatHeader_(range) {
  range
    .setFontWeight('bold')
    .setBackground('#172033')
    .setFontColor('#FFFFFF')
    .setVerticalAlignment('middle');
}


/**
 * Initializes system configuration.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 */
function initializeConfig_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(
    DATABASE.SHEETS.CONFIG
  );

  const existingValues = sheet.getDataRange().getValues();

  const schemaAlreadyExists = existingValues.some(
    row => row[0] === 'SCHEMA_VERSION'
  );

  if (schemaAlreadyExists) {
    return;
  }

  sheet.appendRow([
    'SCHEMA_VERSION',
    DATABASE.VERSION,
  ]);

  sheet.appendRow([
    'APPLICATION',
    'Maikeise Quotations',
  ]);

  sheet.appendRow([
    'ENVIRONMENT',
    'DEV',
  ]);
}