### 13.0.0

- Foundry v13 compatibility (fork: tmancino/foundryvtt-border-control)
- Convert ApplicationV2 hook handlers (`renderTokenConfig`, `renderTokenHUD`, `renderSettingsConfig`) to native HTMLElement DOM
- Migrate `Dialog` → `foundry.applications.api.DialogV2` for the custom-color picker
- Replace removed `canvas.grid.grid.getPolygon(...)` with v13 `canvas.grid.getShape()` for hex-grid borders
- Namespace `renderTemplate` → `foundry.applications.handlebars.renderTemplate`
- Namespace `Color.from` → `foundry.utils.Color.from`
- Switch border refresh to `token.renderFlags.set({ refreshBorder: true })` (v13 idiomatic)
- libWrapper overrides on `Token.prototype._refreshBorder` / `_getBorderColor` retained — those methods still exist on v13

### 12.0.2

- Add zoomScaling feature https://github.com/p4535992/foundryvtt-border-control

### 12.0.0-1

- Update for v12: https://github.com/p4535992/foundryvtt-border-control/issues/11 ty to @LeRatierBretonnien
- Probably fixed: https://github.com/p4535992/foundryvtt-border-control/issues/9 ty to @LeRatierBretonnien
- Probably fixed: https://github.com/p4535992/foundryvtt-border-control/issues/6 ty to @LeRatierBretonnien

### 2.2.3

- Update manifest v12

### 2.2.2

- Little fix for hex grid

### 2.2.1

- BUg fix: https://github.com/p4535992/foundryvtt-border-control/issues/8
- Bug fix: https://github.com/p4535992/foundryvtt-border-control/issues/7

### 2.1.1-2

- Update for v11

### 2.0.2

- First new rewrited release for FVTT 10

### 2.0.0

- Complete rewrite of the code....

### 1.2.05

- Fix for player accounts loading into a black screen
- Fix for cursors not being set correctly to hidden tokens

### 1.3.02

- Update for v9
