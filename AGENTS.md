# AGENTS.md

## Cursor Cloud specific instructions

This is the Mifiel JS/TypeScript **library monorepo** (`pnpm` workspaces + Nx + Lerna). There is no long-running backend; the packages are published npm libraries. Node 22 and `pnpm@11.5.3` are already available on the VM, and the update script runs `pnpm install --frozen-lockfile`.

Packages (`packages/*`):
- `@mifiel/models` — TypeScript types only. Lint only (`tsc --noemit` + eslint).
- `@mifiel/api-client-auth` — auth library. Has `build`, `test` (jest), `lint`.
- `@mifiel/api-client` — API client. Has `build`, `test` (jest), `lint`.
- `@mifiel/widget` (`packages/widget-stencil`, published as `@mifiel/widget`) — the StencilJS web component; this is the runnable "app".
- `@mifiel/widget-react`, `@mifiel/widget-vue`, `@mifiel/widget-angular` — framework wrappers generated from the Stencil build. `build` only.

Standard commands (defined in root `package.json` and mirrored by `.github/workflows/ci.yml`):
- Build everything: `pnpm run build`
- Test: `pnpm run test`
- Lint: `pnpm run lint`

Non-obvious caveats:
- **Build order matters.** CI runs build → test → lint, and the root `build` script builds `@mifiel/api-client-auth`/`@mifiel/api-client` first, then the widgets. `@mifiel/api-client` resolves `@mifiel/api-client-auth` types from its `dist/`, so run `pnpm run build` before `pnpm run test` after a clean install.
- **Run the widget dev server** with `pnpm --filter @mifiel/widget start` (`stencil build --dev --watch --serve`), served at `http://localhost:3333/`. The served page is `packages/widget-stencil/src/index.html`.
- The widget at runtime loads an external script from `app.mifiel.com` (production) or `app-sandbox.mifiel.com` (sandbox, via `environment="sandbox"`) and renders the signing flow in an iframe, so demonstrating it in a browser needs outbound network access. To view a real document, set a valid production widget id on the `<mifiel-widget id="...">` element in `src/index.html` (default `environment` is `production`). A successful render shows a "Documento Ejemplo" PDF page.
- Stencil prints harmless build warnings about the reserved `id` prop and `onSign*` prop names; these do not fail the build.
- The `@mifiel` scope is configured (`.npmrc` / `pnpm-workspace.yaml`) to publish to GitHub Packages, but all `@mifiel/*` deps are `workspace:*`, so a normal install does not need GitHub registry auth.
