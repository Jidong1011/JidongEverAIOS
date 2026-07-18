# Platform contract

## Product boundary

- `Ever AIOS` is the overall service model.
- The Long Palace WeChat Mini Program is the current working platform.
- The editable source lives in `longpalace_miniprogram/`.
- The root ZIP is a historical V1.0 artifact.

## Current Mini Program surface

The application declares 10 pages: home, login, daily intelligence, events, pearls, member center, member benefits, report list, report detail, and event detail. It also uses a custom tab bar and top-bar component.

The shared API wrapper lives in `longpalace_miniprogram/config/api.js`. The environment and endpoint configuration live in `longpalace_miniprogram/config/config.js`.

## High-risk flows

Treat these as requiring explicit human or approved test-environment acceptance:

- phone-number authorization and login;
- token and profile persistence;
- avatar upload and user-data changes;
- membership settlement and payment;
- event enrollment, settlement, and payment;
- AppID, merchant, store, domain, or environment changes;
- privacy consent and policy content.

Automated live checks must remain read-only. Never create an order merely to prove that an endpoint responds.

## Known baseline gaps

- The active `dev` config targets a live backend.
- The `prod` config contains a placeholder domain.
- Agreement and privacy actions are placeholders.
- The repository baseline has no WeChat Developer Tools compile or real-device evidence.
