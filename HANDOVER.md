# Name Tag Generator: handover

*Written 5 November 2026 so someone else can look after the tool. Last updated 12 November 2026.*
**The Name Tag Generator was made by Joseph McLaren.** His credit ("by / Made by Joseph McLaren") appears in the
header, footer, the "Who's making name tags?" screen, the bottom of every printed page, the Copy students box
and the page's author tag. Keep it there. There is deliberately **no** copyright or "All rights reserved" line.

---

## 1. What it is and who it's for

A web page that turns a TOPIA class list into printable name tags. Teachers cut the tags out with a paper
guillotine and tape them onto students' book covers.

It replaced the name tag sheets in the old *PrepHelper.xlsm* workbook, which had stopped working.

Who uses it:
- Many different teachers, often on a shared school computer, and many of them are not confident with
  technology. Everything has to be obvious without training.
- English and Korean speakers. The **한/EN** button switches the whole screen between English and Korean.
  Messages in the Copy students box show English with Korean underneath.

Goal from the start: **original, intuitive, and usable by anyone.**

---

## 2. Versions and links

There is one tool in four versions. All of them run from the same code.

| Version | Where | Who it's for | Where classes are saved |
|---|---|---|---|
| **Website** (GitHub Pages) | https://disconnekted.github.io/Name-tag-generator-/ | Anyone, no account needed | School Google Sheet (see section 5) |
| **Desktop app** | Install from the website in Chrome or Edge (Install icon in the address bar) | Teachers who want an icon on their computer | School Google Sheet; also opens offline |
| **Offline file** | `name-tags/name-tag-generator.html` in the Claude project files | Opening as a file, or emailing to someone | School Google Sheet when online, otherwise that browser |
| **claude.ai version** | https://claude.ai/artifact/VJKK8aH25mCsAz8ov76Tky (private) | People with a claude.ai account who have been invited | claude.ai's own online database (not the sheet) |

- **Code:** GitHub repository `Disconnekted/Name-tag-generator-`, branch `main`. Pages publishes from `main`.
- **One source file.** The repo's `index.html` is the master copy. The offline file and the claude.ai version are
  `index.html` with the block between `<!-- website-only` and `<!-- /website-only -->` at the top taken out
  (the manifest, icons and service worker that make the desktop app work). Nothing else differs:
  - on claude.ai the tool always uses claude.ai's own database and never the Google Sheet;
  - the **💻 Get the desktop app** button only appears when the tool is opened as a file, and explains how to
    install the website version instead.

### Files in the repository

| File | What it is |
|---|---|
| `index.html` | The whole tool: one self-contained page (HTML, CSS, JavaScript, no outside libraries) |
| `manifest.webmanifest`, `icons/` | Lets Chrome / Edge install it as an app (maroon / cream / navy name tag icon) |
| `sw.js` | Service worker: always tries the internet first, falls back to the saved copy offline. Cache name `name-tags-v1`. **Change that name if you change the list of cached files.** |
| `sync/google-apps-script.js` | The code that runs inside the school's Google Sheet |
| `sync/README.md` | Step-by-step setup of the Google Sheet (for a non-technical person) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
| `HANDOVER.md` | This document |

---

## 3. How teachers use it

1. **Pick your name** on the "Who's making name tags?" screen (or add yourself). No PINs, on purpose.
2. **Get students from TOPIA.** Once, drag the red **Copy students** button to the bookmarks bar (the tool's
   Step 2 shows only this one instruction; the rest is explained by the bookmark's own red box and the tour).
   On the day's class list on the TOPIA attendance page, click that bookmark, then **Copy for name tags**, then
   press Ctrl+V in the tool. Pasting two days' lists builds the days (for example Mon / Wed).
   How the bookmark reads TOPIA is in section 7.
3. **Check each class:** choose the subject, click Mon / Wed or Tues / Thurs, set copies (×1 to ×5).
   Click any student's name to change it (Enter to save, Esc to cancel).
   A class time is optional (the "Time (optional)" box next to Subject); when filled in it prints before the
   days, e.g. "4:00 Mon / Wed". Left blank, the tag shows just the days.
   Copy students fills it in from TOPIA's Time column (start time, "16:00~16:50" becomes "4:00"),
   unless the teacher already typed a time.
   The **Time** button next to Tick all / Untick all turns class times on or off for every tag (off hides the
   Time boxes; the times stay saved).
   A missing student can be typed into the class's **Add a student** box.
4. **Print tags.** Then the **🎉 All done! / 다 했어요!** button appears.

The **?** button runs a guided tour (it opens by itself the first time, when there are no classes yet).

---

## 4. Features and the decisions behind them

These were all decided by the project owner. Please don't undo them without asking.

### Getting students in
- **The Copy students bookmark is the only way to add classes and students** (decided 3 Nov 2026). File import,
  drag-and-drop, Excel paste and "Add a class" were removed. The paste box only accepts text that starts with
  `#TOPIA-NAMETAGS`. Class and student names from TOPIA are read-only.
- **Names can be changed** by clicking them (decided 13 Nov 2026). A changed TOPIA name is remembered per class
  (`c.renamed`: TOPIA's spelling → the teacher's), so copying the class in again keeps the change. Accepting an
  English name suggestion counts as a change too.
- Each class also has an **Add a student** box (in both print modes) for someone missing from
  TOPIA. Typed names can be removed with ✕, stay after re-importing, and disappear if TOPIA later lists them.
- The TOPIA attendance page needs a login, so the tool can't fetch it. That's why the bookmark exists.
  The bookmark waits for the right popup and the full number of rows, retries a class up to 3 times, and shows
  how many students it found per class.
- New students on a re-import get a **NEW** badge (screen only). "Reprint these" ticks them.
- Students without an English name get suggestions (from the Korean name), which the teacher can accept or
  "Keep Korean only".

### The tags
- Landscape pages, tags always 57 × 32.5 mm: **A4 = 5 × 6 = 30 tags per page** (default) or **US Letter = 4 × 6 = 24**
  (Paper size, in the Tag style box; added 13 Nov 2026). One class per page (optional). Only this tag size (a Large
  size was tried and removed).
- Names shown as **English | Korean** (default), **Korean | English**, or one of them. **Student names are never red.**
- Four styles: **Classic** (the original maroon), **Modern**, **Cute** (yellow; corners must stay square for
  cutting), **TOPIA** (inspired by the school website). The squirrel watermark is an original drawing.
- Subject, class and days must never be cut off with "…": the text shrinks, then wraps.
- **Colours follow the subject:** Debate red, Grammar yellow (the owner's choice); Phonics orange, Speaking blue,
  Writing green, Integrated purple, Language Arts teal, TOEFL Reading navy.
- **Subjects:** Debate, Grammar, Integrated, Language Arts, Phonics, Speaking, Writing, TOEFL Reading,
  plus "Other (type it)". No Listening or Intensives.
- **Days are always Mon / Wed or Tues / Thurs** ("Tues", not "Tue"). Anything typed or pasted is tidied into one
  of these pairs.
- **Cutting guides:** bold black marks in the margin plus thin grey lines along every cut, and a class / page
  label in the margin.
- The **"by Joseph McLaren" credit prints on every page**, even with cutting guides turned off.

### Printing modes
- **Print all classes:** tick which classes to print ("Printing n of m classes", Tick all / Untick all).
- **Reprint some students:** tick individual students, ×1 to ×5 each, packed onto as few pages as possible.

### The screen
- Header (with Print) stays visible while scrolling. **Undo / Redo** buttons (Ctrl+Z, Ctrl+Y) match the other
  outline header buttons.
- Dark mode for the screen only (moon / sun icon). Printing is never dark.
- The preview shows exactly what prints and follows the class being edited.
- Teacher profiles; the same tab stays signed in after a reload; auto sign-out after 30 idle minutes.

### "All done!" celebration
After printing (or saving the print file), a **🎉 All done! / 다 했어요!** button appears next to Print tags.
Clicking it shows a big, deliberately "in your face" popup (about 88% of the screen): red card with turning gold
rays, huge yellow headline, lots of confetti and a random cheer in English and Korean using the teacher's name.
The button hides again on sign out. Code: `showYay`, `hideYay`, `celebrate`, `confetti` in `index.html`.

### Taken out on purpose (don't bring back without asking)
- **Simple view**: tried and rejected ("take it out entirely").
- **Printer check** page: removed at the owner's request.
- TIMS: no longer used by the school; don't mention it.

---

## 5. Saving across computers (Google Sheet + school password)

The website, desktop app and offline file save every teacher's classes in a Google Sheet owned by the school.
Teachers don't need a Google account; they type the **school password** once on each computer.

- `index.html` has `const SHEET_URL = '…/exec'` (the deployed Apps Script web app). If it's empty, the tool saves
  only in that browser, as before.
- The sheet tab is called **Name tags**, one row per teacher: ID | Teacher | Last saved | saved classes
  (long ones split over several cells). Don't edit the saved-classes cells by hand.
- The tool checks for changes every 30 seconds while it's open, and keeps a copy in the browser so it still opens
  without internet.
- The password is checked by the script in the sheet (`PASSWORD` at the top of `google-apps-script.js`).
  **The real password is not in the repository or in this document.** Ask the project owner.
- **Changing the password:** edit line 5 in Apps Script, save, then Deploy → Manage deployments → ✎ →
  Version: New version → Deploy. The URL stays the same; each teacher is asked for the new password.
- **Setting it up again from scratch** (new school, new Google account): follow `sync/README.md`, then put the new
  `/exec` URL into `SHEET_URL` in both `index.html` and the offline file.
- The **claude.ai version is not linked to the sheet.** It uses claude.ai's own database (collection `teachers`).
  Teachers there need a claude.ai account and an Editor invite through the Share menu.

---

## 6. How to update each version

Change only `index.html`. To make the offline file, copy `index.html` and delete the `website-only` block at the
top (from `<!-- website-only` to `<!-- /website-only -->`). That same file is what goes on claude.ai.

| Version | How to put a change live |
|---|---|
| Website + desktop app | Change `index.html` on a branch, open a pull request, merge into `main`. GitHub Pages updates within a few minutes; the desktop app picks it up the next time it opens online. |
| Offline file | Replace `name-tags/name-tag-generator.html` in the project files. Send the new file to anyone who keeps a copy. |
| claude.ai version | Republish the offline file to the **same** artifact URL with the capabilities `db` and `downloads`, so the link and saved classes stay. |
| Copy students bookmark | Teachers who already dragged it keep the old version until they drag the new button onto their bookmarks bar again. Only needed when the bookmark's code changes. |

Things to know when changing the code:
- On claude.ai, the page can't open the print dialog or show browser pop-up confirmations. So **Print** saves an
  .html print file that prints itself when opened, and all "Are you sure?" questions are shown inside the page.
  Keep it that way.
- The screen language uses `data-i18n` keys plus a Korean dictionary for fixed text, and `L(en, ko)` for text
  built in code. Every new piece of screen text needs both languages. Tag content is printed as typed.
- The guided tour is the `TOUR` list. Add a step when you add a visible feature.
- Test printing with real class lists: no "…" anywhere, Cute corners square, credit on every page.
- Never copy class lists with phone numbers anywhere (the old Eugene list had them).

---

## 7. Open and unfinished items

- **The Google Sheet saving has not been tested end to end by the developer**, because the development
  environment couldn't reach Google. The owner deployed the script and the URL is live in the tool.
  First job for a new owner: on two computers, sign in as the same teacher, change a class on one, and check it
  appears on the other within about 30 seconds.
- **No PINs:** any teacher (or anyone with the school password) can open or delete any teacher's classes. This was
  the owner's choice for a shared computer; revisit only if it causes problems.
- The claude.ai version and the website save to different places, so a teacher's classes don't move between them.
- Ideas offered but not chosen yet: a pre-print check (missing English names, duplicates), a recently-deleted bin,
  sorting / tidying names, blank write-in tags, desk tent cards, a backup file, and a Chrome extension instead of
  the bookmark.
- If TOPIA changes, the Copy students bookmark (`copyStudentsBookmarklet` in `index.html`) is the part most
  likely to break. It first reads every class at once from TOPIA's API
  (`front-api.topiaenglishzone.co.kr/v1/t/class/attendance?searchDate=` for the classes,
  `/v1/t/class/attendance/{classId}?searchDate=` for `data.info.studentObjList[].nameE / nameK`, header
  `Authorization: Bearer <__TP_ACCESS_TOKEN cookie>`). If that fails it opens each class's Attendance popup in
  turn, reads rows of `.tbl__row` / `.tbl__col` ("Class Name : …", names like `Sam(김시율)`), and closes it with
  **Cancel** (never Save or All Present).

---

## 8. History in short

| Date | Change |
|---|---|
| 19 Oct 2026 | First version: four styles, crop marks, reprints, NEW badges, dark mode, Copy students bookmark |
| 20 Oct 2026 | Korean screen, guided tour, teacher profiles |
| 23 Oct 2026 | Online on claude.ai and GitHub Pages; Undo; subject colours, paired days, English name suggestions; Korean \| English names; credit on every page |
| 3 Nov 2026 | Clearer cutting lines; sticky header + Redo; installable desktop app; Copy students becomes the only input |
| 4 Nov 2026 | Add a student box; Google Sheet saving across computers; All done! button |
| 5 Nov 2026 | Bigger All done! popup; this handover |
| 6 Nov 2026 | Optional class time, printed before the days (PR #12); filled in from TOPIA (PR #13) |
| 9 Nov 2026 | Time on/off button; Copy students reads all classes at once via TOPIA's API (PR #14) |
| 11 Nov 2026 | Step 2 shows only the bookmark instruction (PR #15) |
| 12 Nov 2026 | Clean-up: removed leftover code and text from removed features; one source file for all versions |
| 13 Nov 2026 | Up to ×5 copies; US Letter paper; student names can be changed |

The pull requests on GitHub have the details of each change.
