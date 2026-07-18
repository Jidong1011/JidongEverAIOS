---
name: develop-ever-aios
description: Develop, diagnose, verify, and release changes for the Jidong Ever AIOS Long Palace WeChat Mini Program and its repository operating system. Use for repository orientation, Mini Program page or API changes, regression diagnosis, Feature-first evidence decisions, GitHub branch or pull-request preparation, release readiness, and evolution of the Ever AIOS platform Skill.
---

# Develop Ever AIOS

Operate the Jidong Ever AIOS repository as an evidence-gated product loop. Keep the Mini Program working while turning verified outcomes into reusable Features and Skills.

## Start from repository truth

1. Locate the repository and read `AGENTS.md`, `README.md`, and the relevant source files.
2. Inspect the current branch, worktree changes, remote, and recent commits before editing.
3. Read [references/platform-contract.md](references/platform-contract.md) for Mini Program or API work.
4. Read [references/release-checklist.md](references/release-checklist.md) before any commit, push, pull request, tag, or release.
5. Separate verified code behavior from product copy and roadmap intent.

## Classify the request

- For explanation, review, or status: inspect and report; do not mutate the repository.
- For diagnosis: establish the cause and evidence; do not implement unless requested.
- For implementation: make the smallest coherent change and verify it.
- For publication: use a `codex/` branch, verify first, then commit, push, and open a pull request when authorized.
- For production-side effects: stop before phone authorization, order creation, payment, user-data upload, deployment, or Mini Program release unless the task explicitly authorizes that action.

## Run the Feature-first loop

Use this evidence ladder:

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

For a candidate Feature, record:

- user outcome and trigger;
- input and output contracts;
- preconditions and side effects;
- quality bar and failure modes;
- verification command or acceptance path;
- evidence location and remaining uncertainty.

Do not promote generated code or documentation volume. Promote a Feature only after a reproducible user outcome. Promote Capacity only after repeated delivery or business evidence.

## Implement and verify

1. Trace the page, WXML handler, API wrapper, configuration, and backend contract affected by the change.
2. Preserve existing behavior outside the stated user outcome.
3. Do not commit `project.private.config.json`, credentials, tokens, or user data.
4. Run `scripts/verify-repo.sh <repo-path>`.
5. Add `--api` only when a read-only live API check is relevant.
6. Require WeChat Developer Tools or real-device evidence for WeChat-only behavior.
7. Report what was verified, what was not verified, and why.

## Publish with evidence

Keep one pull request centered on one user outcome when practical. In the pull request include:

- outcome and scope;
- key implementation choices;
- commands and acceptance evidence;
- risks, side effects, and rollback path;
- Feature status: raw evidence, `candidate_feature`, or proven Feature.

Never push directly to `main`. Do not market the Skill as competitive from stars or file count alone; use trigger precision, task completion, regression escape rate, time-to-evidence, and real pull-request outcomes.
