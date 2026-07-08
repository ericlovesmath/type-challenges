#!/usr/bin/env bash

# Prints progress and what to work on next, per difficulty
# - solved = problem typechecks
# - in progress = file with errors
# - next up = lowest-numbered challenge not pulled yet

set -euo pipefail

ERRORS=$(npx tsc --noEmit 2>&1 || true)

ALL=$(curl -fsSL --max-time 10 \
    "https://raw.githubusercontent.com/type-challenges/type-challenges/main/README.md" |
    grep -oP 'questions/\K[0-9]+-[a-z]+-[^/)]+' | sort -u) ||
    {
        ALL=""
        echo "> offline, showing local files only"
    }

if [ -n "$ALL" ]; then
    wip=""
    printf '  %-8s %-7s %s\n' "" "solved" "next up"
    for diff in easy medium hard extreme; do
        total=0
        solved=0
        next=""
        while IFS= read -r slug; do
            total=$((total + 1))
            num="${slug%%-*}"
            f=$(ls "challenges/${num}"-*.ts 2>/dev/null | head -1 || true)
            if [ -n "$f" ]; then
                if echo "$ERRORS" | grep -q "^$f("; then
                    wip+="  $slug"$'\n'
                else solved=$((solved + 1)); fi
            elif [ -z "$next" ]; then
                next="$slug"
            fi
        done < <(printf '%s\n' "$ALL" | grep -- "-$diff-" | sort -t- -k1,1n)
        printf '  %-8s %-7s %s\n' "$diff" "$solved/$total" "${next:-done!}"
    done
    [ -n "$wip" ] && printf '\nin progress:\n%s' "$wip"
else
    # offline fallback
    for f in challenges/*.ts; do
        [ -e "$f" ] || continue
        name=$(basename "$f" .ts)
        if echo "$ERRORS" | grep -q "^$f("; then
            echo "  [ ] $name"
        else echo "  [x] $name"; fi
    done
fi
