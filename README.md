# Posto Supper Club plan

Shared planning page for the Posto Kitchen launch supper club (Sat 7 Nov 2026).
Ticks are saved to a Google Sheet so AB and AS see the same progress.

## Connect the Google Sheet (one time)

1. Create a blank Google Sheet, e.g. "Posto supper club ticks".
2. In the sheet, open **Extensions → Apps Script**. Delete what's there and paste in `apps-script.gs`. Save.
3. Click **Deploy → New deployment**. Choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, approve the permissions, and copy the **Web app URL** (ends in `/exec`).
5. Put that URL in `index.html`, in the line `var SHEET_URL="";`.

## Turn on GitHub Pages

Repository **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**.
The page appears at https://anujabajaj.github.io/posto-supper-club/ after a minute or two.

Anyone with the link can tick boxes, so only share it with the team.
