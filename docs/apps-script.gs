/**
 * Tech Seeds placement test -> Google Sheet.
 * Paste this into Extensions > Apps Script of the sheet, then deploy it as a web app.
 * Steps: docs/google-sheet-setup.md
 */

// Optional. If you set a value here, put the same value in Vercel as SHEET_WEBHOOK_SECRET.
const SECRET = '';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (SECRET && data.secret !== SECRET) return reply({ ok: false, error: 'secret' });
    if (!Array.isArray(data.values) || !Array.isArray(data.headers)) {
      return reply({ ok: false, error: 'bad payload' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(data.headers);
        sheet.getRange(1, 1, 1, data.headers.length).setFontWeight('bold');
        sheet.setFrozenRows(1);
        sheet.setRightToLeft(true);
      }
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, data.values.length);
      range.setNumberFormat('@'); // plain text, so phone numbers keep their leading zero
      range.setValues([data.values]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
