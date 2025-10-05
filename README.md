# SaaS Base

Nowoczesna aplikacja SaaS zbudowana z Next.js i Supabase.

## Funkcje

- ✅ **Next.js 15** - Najnowsza wersja z App Router
- ✅ **TypeScript** - Pełne wsparcie dla TypeScript
- ✅ **Tailwind CSS** - Nowoczesne style
- ✅ **Supabase** - Backend as a Service
- ✅ **Autentykacja** - Magic link authentication
- ✅ **Middleware** - Ochrona tras
- ✅ **Dashboard** - Panel użytkownika

## Szybki start

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/wiktormazur/saasbase.git
   cd saasbase
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj Supabase**
   - Skopiuj `env.example` do `.env.local`
   - Dodaj swoje klucze Supabase:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Uruchom aplikację**
   ```bash
   npm run dev
   ```

5. **Otwórz w przeglądarce**
   ```
   http://localhost:3000
   ```

## Struktura projektu

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/
│   │   └── auth-code-error/
│   ├── dashboard/
│   ├── login/
│   └── page.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── middleware.ts
│       └── server.ts
└── ...
```

## Konfiguracja Supabase

1. Utwórz nowy projekt w [Supabase](https://supabase.com)
2. Skopiuj URL projektu i klucz anon
3. Włącz Email Authentication w Authentication > Settings
4. Dodaj `http://localhost:3000/auth/callback` do Redirect URLs

## Dostępne skrypty

- `npm run dev` - Uruchom w trybie deweloperskim
- `npm run build` - Zbuduj aplikację
- `npm run start` - Uruchom produkcyjnie
- `npm run lint` - Sprawdź kod ESLint

## Następne kroki

- [ ] Dodać płatności (Stripe)
- [ ] Zaimplementować system subskrypcji
- [ ] Dodać metryki i analitykę
- [ ] Stworzyć API endpoints
- [ ] Dodać testy

## Licencja

MIT