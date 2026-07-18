# Release checklist

## Before editing

- Confirm repository, branch, remote, and worktree state.
- Read repository `AGENTS.md` and the affected files.
- State one user outcome and the verification path.

## Before commit

- Review the diff for unrelated edits and private configuration.
- Run `npm test`.
- Run `npm run test:api` only when read-only backend evidence is relevant.
- Record any missing Developer Tools or real-device evidence.
- Check that no login, order, payment, upload, or production mutation was triggered by validation.

## Before push or pull request

- Use a `codex/` branch and never push directly to `main`.
- Use a concise commit message tied to the user outcome.
- Include verification output and limitations in the pull request.
- Add a rollback path for configuration, privacy, payment, or data-contract changes.
- Keep Feature status conservative; code completion alone is not capability proof.

## Before merge or release

- Require human review for production configuration and side-effecting flows.
- Confirm CI is green.
- Confirm the source, version notes, and packaged artifact refer to the same commit.
- Tag only a state that has an explicit acceptance record.
