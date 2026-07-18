# Jidong Ever AIOS repository rules

## Source of truth

- Treat `longpalace_miniprogram/` as the editable Mini Program source.
- Treat `longpalace_miniprogram.zip` as the historical V1.0 artifact, not an editable source tree.
- Never commit `project.private.config.json`, tokens, session data, payment credentials, or other local runtime state.

## Architecture and naming

- Use `Ever AIOS` as the overall service model.
- Treat the Long Palace Mini Program as a productized working platform built on that model.
- Preserve the Feature-first chain: `Run/Event/Result -> candidate_feature -> Feature -> Skill -> candidate_capacity -> Capacity -> Pattern -> Configuration`.
- Do not promote generated code, documentation volume, or an untested flow as Feature or Capacity evidence.

## Change workflow

1. Read the relevant page, API wrapper, configuration, and current roadmap entry.
2. Separate verified code behavior from product intent described in copy or documentation.
3. Use a `codex/` branch for Codex-authored changes. Do not push directly to `main`.
4. Keep each change scoped to one user outcome when practical.
5. Run `npm test`. Run `npm run test:api` only for read-only live API verification.
6. Require human acceptance for phone authorization, privacy, payment, production domains, and Mini Program release operations.
7. Summarize verification, limitations, and evidence in the pull request.

## Safety boundaries

- Do not create orders, invoke payment, upload user data, or alter production records during automated checks.
- Do not change the AppID, merchant number, store ID, API domain, or environment selection without an explicit task and verification plan.
- Do not claim end-to-end completion without WeChat Developer Tools or real-device evidence when the change depends on WeChat-only APIs.

## Skill evolution

- Keep `skills/develop-ever-aios/SKILL.md` concise and procedural.
- Put detailed platform facts and release gates in `references/`.
- Validate the skill with the official `quick_validate.py` before publishing changes to it.
- Treat the skill as `candidate_skill` until it has been used on real repository changes and its outcomes are recorded.
