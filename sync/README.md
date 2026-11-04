# Saving classes online (one-time setup)

The website, the desktop app and the downloaded file can save every teacher's classes in a Google Sheet,
so they're there on any computer. Someone with a Google account sets this up once (about 5 minutes).
Teachers don't need a Google account: they type the school password once on each computer.

1. Go to **sheets.new** to make a new Google Sheet. Call it *Name tags*.
2. In the sheet, click **Extensions → Apps Script**.
3. Delete everything in the box, then paste everything from
   [google-apps-script.js](google-apps-script.js) (open it, click the copy icon at the top right).
4. On line 5, replace `change-this-password` with a password for your school. Click the save icon.
5. Click **Deploy → New deployment**. Click the gear next to *Select type* and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, then **Authorize access** and pick your Google account.
   Google warns that the app isn't verified, because you wrote it yourself: click **Advanced**, then
   **Go to … (unsafe)**, then **Allow**.
7. Copy the **Web app URL** (it ends in `/exec`) and send it to whoever looks after this repository.
   It goes into `index.html` (`const SHEET_URL = '...'`).

To check it works, open the Web app URL in a browser: it should say *online saving is working*.

**Good to know**
- The class lists live in your Google Sheet, in your Google Drive. You can see who saved what and when.
  Please don't edit the "Saved classes" cells.
- Changing the password later: edit line 5, save, then **Deploy → Manage deployments → ✎ → Version: New version → Deploy**.
  The URL stays the same. Each teacher is asked for the new password.
- The claude.ai version of the tool keeps its own online save and is not linked to this sheet.
