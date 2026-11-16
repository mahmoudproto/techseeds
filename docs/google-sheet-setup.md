# Connect the test to a Google Sheet

Do this once. It takes about five minutes.

1. Create a new Google Sheet, for example "Tech Seeds – نتائج الاختبار". Leave it empty; the header row is added by the first result.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete what is in the editor and paste the contents of [`apps-script.gs`](./apps-script.gs). Save.
4. Click **Deploy → New deployment**. Choose type **Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, approve the permissions Google asks for, and copy the **Web app URL** (it ends in `/exec`).
6. In Vercel, open the project → **Settings → Environment Variables** and add:
   - `SHEET_WEBHOOK_URL` = the URL you copied
   - `SHEET_WEBHOOK_SECRET` = optional; only if you set `SECRET` in the script, with the same value
7. In Vercel, open **Deployments** and **Redeploy** the latest one so it picks up the variables.
8. Take the test once yourself. A row should appear in the sheet within a few seconds.

## If no row appears

- Check that the URL in Vercel ends in `/exec`, not `/dev`.
- Check that "Who has access" is **Anyone**.
- If you edit the script later, deploy again with **Deploy → Manage deployments → Edit → Version: New version**. The URL stays the same.
- The parent still sees the result even when the sheet can't be reached, so test this after every change.

## Columns

التاريخ والوقت · اسم الطفل · السن · النسخة · اسم ولي الأمر · واتساب · درجة التفكير · نقطة القوة · نقاط التكنولوجيا · مستوى التكنولوجيا · نقاط كل مسار · الميل الأول · الميل التاني · الوقت بالدقايق · كل الإجابات
