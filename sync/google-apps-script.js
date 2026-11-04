// Name Tag Generator: online saving in a Google Sheet. Made by Joseph McLaren.
// Paste all of this into the Google Sheet's Extensions → Apps Script (see README.md next to this file).
//
// 1. Change the password between the quotes. Teachers type it once on each computer.
const PASSWORD = 'change-this-password';

// Nothing below needs changing.
const SHEET_NAME = 'Name tags';
const CHUNK = 40000; // a cell holds up to 50,000 characters, so long class lists use several cells

function doGet() {
  return reply({ ok: true, message: 'Name Tag Generator online saving is working.' });
}

function doPost(e) {
  let p = {};
  try { p = JSON.parse(e.postData.contents); } catch (err) {}
  return reply(handle(p));
}

function handle(p) {
  if (PASSWORD === 'change-this-password') return { ok: false, error: 'setup' };
  if (String(p.key || '') !== PASSWORD) return { ok: false, error: 'password' };
  const sheet = getSheet();
  if (p.action === 'list') return { ok: true, docs: readAll(sheet) };
  const id = String(p.id || '');
  if (!/^p[a-z0-9]{1,40}$/.test(id)) return { ok: false, error: 'id' };
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const row = findRow(sheet, id);
    if (p.action === 'delete') {
      if (row) sheet.deleteRow(row);
      return { ok: true };
    }
    if (p.action === 'set') {
      const doc = p.doc || {};
      const json = JSON.stringify({ name: String(doc.name || ''), state: doc.state || {}, by: String(doc.by || '') });
      if (json.length > 2000000) return { ok: false, error: 'big' };
      // Each data cell starts with "~" so Sheets never reads it as a number or a formula.
      const cells = [id, String(doc.name || '').replace(/^[=+\-@]+/, ''), new Date()];
      for (let i = 0; i < json.length; i += CHUNK) cells.push('~' + json.slice(i, i + CHUNK));
      const r = row || sheet.getLastRow() + 1;
      if (cells.length > sheet.getMaxColumns()) sheet.insertColumnsAfter(sheet.getMaxColumns(), cells.length - sheet.getMaxColumns());
      if (row) sheet.getRange(r, 1, 1, sheet.getMaxColumns()).clearContent();
      sheet.getRange(r, 1, 1, cells.length).setValues([cells]);
      return { ok: true };
    }
    return { ok: false, error: 'action' };
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 4).setValues([['ID', 'Teacher', 'Last saved', 'Saved classes (used by the tool, please do not edit)']]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function findRow(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const ids = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return i + 2;
  return 0;
}

function readAll(sheet) {
  const docs = {}, last = sheet.getLastRow();
  if (last < 2) return docs;
  const rows = sheet.getRange(2, 1, last - 1, sheet.getLastColumn()).getValues();
  rows.forEach(r => {
    const id = String(r[0] || '');
    if (!id) return;
    let json = '';
    for (let i = 3; i < r.length; i++) { const c = String(r[i] || ''); if (!c) break; json += c.slice(1); }
    try {
      const d = JSON.parse(json);
      docs[id] = { name: d.name, state: d.state, by: d.by, updated: r[2] instanceof Date ? r[2].getTime() : 0 };
    } catch (err) {}
  });
  return docs;
}

function reply(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
