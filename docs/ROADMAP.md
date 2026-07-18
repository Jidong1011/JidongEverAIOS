# Jidong Ever AIOS roadmap

This roadmap separates repository readiness, product readiness, and Skill competitiveness. Passing one layer does not prove the next.

## P0 — Reproducible repository baseline

Goal: make every source change reviewable and verifiable.

- [x] Extract the V1.0 Mini Program source into Git.
- [x] Exclude WeChat Developer Tools private configuration.
- [x] Add dependency-free static validation and read-only API smoke checks.
- [x] Add repository operating rules and the first agent Skill scaffold.
- [ ] Install WeChat Developer Tools and record a clean import/compile result.
- [ ] Replace placeholder agreement and privacy actions with approved content.
- [ ] Resolve `dev`/`prod` configuration and remove the production placeholder.

Exit evidence: clean CI, clean Developer Tools compile, and a documented configuration path that does not depend on editing source by hand.

## P1 — Product acceptance loop

Goal: prove the current platform flows from a user perspective.

- [ ] Anonymous home, report, and event browsing.
- [ ] Phone authorization and login on a real WeChat account.
- [ ] Member profile read/update, including avatar upload.
- [ ] Membership and event order creation in an approved test environment.
- [ ] Payment success, cancellation, failure, and idempotency evidence.
- [ ] Privacy, consent, data retention, and account exit checks.

Exit evidence: a versioned acceptance report with screenshots or logs, known limitations, and human sign-off for side-effecting flows.

## P2 — Ever AIOS Feature loop

Goal: evolve the platform from evidence rather than feature volume.

- Capture `Run/Event/Result` for each real use.
- Admit only evidence-backed `candidate_feature` entries.
- Keep a Feature contract for purpose, inputs, outputs, quality bar, failure modes, side effects, and evidence path.
- Assemble 3–7 proven Features into a Skill only when orchestration adds a stable outcome.
- Keep Capacity at `candidate_capacity` until repeated delivery or business evidence exists.

Exit evidence: at least one reproducible Feature outcome, one evaluated Skill orchestration, and a trace from user result back to code and evidence.

## P3 — Competitive public Skill

Goal: make `develop-ever-aios` useful beyond a single maintainer prompt.

- [ ] Collect 10 real trigger phrases and 5 non-trigger examples.
- [ ] Add eval cases for repository diagnosis, scoped implementation, API verification, and release preparation.
- [ ] Measure trigger precision, task completion, regression escape rate, and time-to-evidence.
- [ ] Add public examples only after private data, domains, and merchant identifiers are reviewed.
- [ ] Choose a license and contribution policy.
- [ ] Publish tagged releases with clear compatibility and verification notes.

Exit evidence: repeatable eval results across fresh sessions plus real pull requests produced by the Skill. Stars and downloads are distribution signals, not capability proof.

## Near-term order

1. Complete the P0 Developer Tools compile and configuration cleanup.
2. Establish the P1 anonymous browsing acceptance path.
3. Exercise `develop-ever-aios` on the first real feature change and record its failures.
4. Improve the Skill from that evidence before marketing it as competitive.
