#!/usr/bin/env bash

# Pulls type challenge, statement, and tests into ./challenges/<slug>.ts

set -euo pipefail

SLUG="${1:?usage: ./fetch-challenge.sh <slug>, e.g. 00011-easy-tuple-to-object}"
BASE="https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/$SLUG"
OUT="challenges/$SLUG.ts"

mkdir -p challenges

if [ -e "$OUT" ]; then
    echo "already exists: $OUT" >&2
    exit 1
fi

fetch() {
    curl -fsSL "$BASE/$1" || {
        echo "error: could not fetch '$1' for slug '$SLUG'" >&2
        exit 1
    }
}

README=$(fetch README.md)
TEMPLATE=$(fetch template.ts)
TESTS=$(fetch test-cases.ts)

# Comment README and drop HTML badges
{
    printf '%s\n' "$README" | sed -e '/<!--info-/d' -e 's|^|// |'
    echo
    echo "// ============= Code ============="
    printf '\n%s\n' "$TEMPLATE"
    echo
    echo "// ============= Tests ============="
    printf '\n%s\n' "$TESTS"
} >"$OUT"

echo "created $OUT"

if command -v prettierd >/dev/null 2>&1; then
    if FORMATTED=$(prettierd "$OUT" <"$OUT" 2>/dev/null); then
        printf '%s\n' "$FORMATTED" >"$OUT"
        echo "formatted $OUT"
    fi
fi
