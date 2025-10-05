# SaaS Base

Nowoczesna aplikacja SaaS zbudowana z Next.js i Supabase.

## Funkcje

- ✅ **Next.js 15** - Najnowsza wersja z App Router
- ✅ **TypeScript** - Pełne wsparcie dla TypeScript
- ✅ **Tailwind CSS** - Nowoczesne style
- ✅ **Supabase** - Backend as a Service z PostgreSQL
- ✅ **Multi-tenant Architecture** - Subdomain-based tenants
- ✅ **Autentykacja** - Magic link authentication
- ✅ **Middleware** - Ochrona tras i routing subdomen
- ✅ **Dashboard** - Panel użytkownika
- ✅ **Panel Administracyjny** - Zarządzanie tenantami
- ✅ **API Endpoints** - REST API dla tenantów

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
   http://localhost:3000          # Strona główna
   http://localhost:3000/admin    # Panel administracyjny
   http://tenant.localhost:3000   # Przykładowa subdomena (po utworzeniu tenanta)
   ```

## Struktura projektu

```
src/
├── app/
│   ├── (tenant)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   └── tenant-list.tsx
│   ├── api/
│   │   └── tenants/
│   │       ├── route.ts
│   │       └── [subdomain]/
│   │           └── route.ts
│   ├── auth/
│   │   ├── callback/
│   │   └── auth-code-error/
│   ├── dashboard/
│   ├── login/
│   └── page.tsx
├── lib/
│   ├── tenants.ts
│   ├── tenant.ts
│   └── supabase/
│       ├── client.ts
│       ├── middleware.ts
│       └── server.ts
└── ...
```

## Konfiguracja

### Supabase
1. Utwórz nowy projekt w [Supabase](https://supabase.com)
2. Skopiuj URL projektu i klucz anon
3. Włącz Email Authentication w Authentication > Settings
4. Dodaj `http://localhost:3000/auth/callback` do Redirect URLs

### Database Setup
1. W Supabase Dashboard przejdź do SQL Editor
2. Uruchom migrację z pliku `supabase/migrations/001_create_tenants_table.sql`
3. To utworzy tabelę `tenants` z odpowiednimi uprawnieniami

### Multi-tenant Development
Dla lokalnego rozwoju z subdomenami:
1. Dodaj wpis do `/etc/hosts`:
   ```
   127.0.0.1 tenant.localhost
   127.0.0.1 example.localhost
   ```
2. Dostęp do tenantów: `http://tenant.localhost:3000`

## Dostępne skrypty

- `npm run dev` - Uruchom w trybie deweloperskim
- `npm run build` - Zbuduj aplikację
- `npm run start` - Uruchom produkcyjnie
- `npm run lint` - Sprawdź kod ESLint

## Funkcje Multi-tenant

- 🏢 **Subdomain Routing** - Każdy tenant ma własną subdomenę
- 🎨 **Branding** - Każdy tenant może mieć własne emoji i kolory
- 🔐 **Izolacja** - Dane każdego tenanta są oddzielone
- 📊 **Panel Admin** - Zarządzanie wszystkimi tenantami
- 🚀 **API** - REST endpoints dla CRUD operacji
- 🌐 **Development** - Obsługa localhost subdomen

## Następne kroki

- [ ] Dodać płatności (Stripe)
- [ ] Zaimplementować system subskrypcji
- [ ] Dodać metryki i analitykę
- [ ] Rozszerzyć API o więcej funkcji
- [ ] Dodać testy
- [ ] Dodać custom domeny dla tenantów

## Licencja

MIT