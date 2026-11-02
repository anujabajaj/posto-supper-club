// Posto Supper Club: stores checklist ticks in this Google Sheet.
// Paste into Extensions → Apps Script, then Deploy → New deployment → Web app
// (Execute as: Me, Who has access: Anyone). Copy the web app URL into index.html.

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Ticks') || ss.insertSheet('Ticks');
  if (sh.getLastRow() === 0) sh.appendRow(['id', 'item', 'done', 'updated']);
  return sh;
}

function read_() {
  var rows = sheet_().getDataRange().getValues();
  var done = {};
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][2] === true) done[rows[i][0]] = true;
  }
  return { done: done };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_(read_());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var body = JSON.parse(e.postData.contents);
    var id = String(body.id || '').slice(0, 40);
    if (!/^[a-z0-9-]+$/.test(id)) return json_(read_());
    var sh = sheet_();
    var rows = sh.getDataRange().getValues();
    var row = -1;
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] === id) { row = i + 1; break; }
    }
    var values = [[id, String(body.item || '').slice(0, 200), body.done === true, new Date()]];
    if (row === -1) sh.appendRow(values[0]);
    else sh.getRange(row, 1, 1, 4).setValues(values);
    return json_(read_());
  } finally {
    lock.releaseLock();
  }
}
