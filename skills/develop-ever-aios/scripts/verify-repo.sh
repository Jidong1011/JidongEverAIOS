#!/usr/bin/env bash
set -euo pipefail

repo_root="${1:-$(git rev-parse --show-toplevel)}"
mode="${2:-}"

npm --prefix "$repo_root" test

if [[ "$mode" == "--api" ]]; then
  npm --prefix "$repo_root" run test:api
elif [[ -n "$mode" ]]; then
  printf 'Unknown option: %s\n' "$mode" >&2
  exit 2
fi
