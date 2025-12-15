## תשאל את דודו — Monorepo (Web + Mobile + Backend)

מונורפו מוכן ל״תשאל את דודו״: אתר + אפליקציה + שרת, עם i18n (he/ar/ru), RTL, אבטחה בסיסית (JWT), העלאת תמונות, Rate Limit ו־Audit Log.

### Requirements

- **Node.js 20+**
- **MongoDB** (לוקאלי או Atlas)

### Quick start

1) התקנת תלויות:

```bash
npm install
```

2) יצירת קובץ env לשרת:

```bash
copy server\env.example server\.env
```

3) הרצת השרת:

```bash
npm run dev:server
```

4) הרצת ה־Web:

```bash
npm run dev:web
```

5) הרצת ה־Mobile (Expo):

```bash
npm run dev:mobile
```

### הערות חשובות (Mobile)

- **Android/iOS אמיתי**: `localhost` לא מצביע לשרת שלך. ערכי את `apps/mobile/src/api.ts` ל־IP המקומי שלך, למשל `http://192.168.1.10:4000`.
- **Uploads**: תמונות נשמרות ב־`server/uploads/` ונגישות דרך `/uploads/<filename>`.

### Apps / Packages

- **`server/`**: Express + TypeScript + MongoDB + Upload + Notifications hooks
- **`apps/web/`**: React + MUI + i18next + Wizard + Listings
- **`apps/mobile/`**: Expo React Native + i18next + Listings
- **`packages/shared/`**: Types + i18n resources (he/ar/ru)
- **`packages/api/`**: API client משותף (Web + Mobile)
- **`packages/ui/`**: Design tokens / components משותפים (מינימלי כרגע)


