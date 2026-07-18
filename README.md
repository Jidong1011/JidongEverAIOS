# Jidong Ever AIOS

> AIOS for everyone.

Jidong Ever AIOS is the overall service model. The current working product in this repository is the Long Palace WeChat Mini Program, which turns AI intelligence, reports, events, membership, and service delivery into an operational platform.

This repository now keeps the reviewable source code alongside the original V1.0 ZIP artifact. The source tree is the development source of truth; the ZIP is retained only as the historical V1.0 delivery artifact.

## Current status

- WeChat Mini Program: 10 pages covering home, daily intelligence, reports, events, membership, login, profile editing, and payment flows.
- Backend read path: verified against the configured API on 2026-07-18 for article count, member count, and service count.
- Repository checks: JavaScript syntax, JSON parsing, page file completeness, route declarations, and WXML event handlers.
- End-to-end limitation: WeChat Developer Tools is not installed on the current Mac, so login, phone authorization, payment, and real-device behavior still require manual acceptance.

## Repository layout

```text
.
├── longpalace_miniprogram/       # Reviewable Mini Program source
├── longpalace_miniprogram.zip    # Historical V1.0 artifact
├── scripts/                      # Repository validation and API smoke checks
├── skills/develop-ever-aios/     # Agent skill for repeatable platform iteration
├── docs/ROADMAP.md               # Evidence-gated product and skill roadmap
├── AGENTS.md                     # Repository-specific operating contract
└── package.json                  # Dependency-free validation commands
```

## Validate locally

Requirements: Node.js 18 or newer.

```bash
npm test
```

Run the optional read-only API smoke test when network verification is relevant:

```bash
npm run test:api
```

To run the Mini Program, import `longpalace_miniprogram/` into WeChat Developer Tools. Do not commit `project.private.config.json`.

## Development model

Ever AIOS evolves Feature-first:

```text
Run / Event / Result
  -> candidate_feature
  -> Feature
  -> Skill
  -> candidate_capacity
  -> Capacity
  -> Pattern
  -> Configuration
```

Generated files or code volume are not capability evidence. A Feature is promoted only after a concrete user outcome and reproducible verification. Capacity requires repeated delivery or business evidence.

Every change should follow this loop:

1. State the user outcome and affected surface.
2. Make the smallest coherent change on a branch.
3. Run repository checks and relevant product checks.
4. Record evidence and known limitations in the pull request.
5. Merge only after human review for login, privacy, payment, or production configuration changes.

See [docs/ROADMAP.md](docs/ROADMAP.md) for the next milestones and [skills/develop-ever-aios/SKILL.md](skills/develop-ever-aios/SKILL.md) for the reusable agent workflow.

## Known P0 gaps

- `prod` still uses a placeholder domain while the active `dev` configuration points at a live backend.
- User agreement and privacy policy actions are placeholders.
- Payment and phone-login flows have not been accepted in WeChat Developer Tools or on a real device from this repository baseline.
- The repository does not yet declare an open-source license; reuse terms remain unspecified until the owner chooses one.
