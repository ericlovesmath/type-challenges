#!/usr/bin/env bash

# Prints progress per difficulty and writes to README
# - solved = problem typechecks
# - in progress = file with errors
# - next up = lowest-numbered challenge not pulled yet

set -euo pipefail

ERRORS=$(npx tsc --noEmit 2>&1 || true)
SLUGS=$(curl -fsSL --max-time 10 \
    "https://raw.githubusercontent.com/type-challenges/type-challenges/main/README.md" |
    grep -oP 'questions/\K[0-9]+-[a-z]+-[^/)]+' | sort -u)

progress() {
    printf '  %-8s %-7s %s\n' "" "solved" "next up"
    wip=()
    for diff in easy medium hard extreme; do
        total=0
        solved=0
        next=""
        while IFS= read -r slug; do
            total=$((total + 1))
            num=${slug%%-*}
            f=$(find challenges/${num}-*.ts 2>/dev/null | head -1 || true)
            if [ -n "$f" ]; then
                if grep -q "^$f(" <<<"$ERRORS"; then
                    wip+=("  $slug")
                else solved=$((solved + 1)); fi
            elif [ -z "$next" ]; then
                next=$slug
            fi
        done < <(grep -F -- "-$diff-" <<<"$SLUGS" | sort -t- -k1,1n)
        printf '  %-8s %-7s %s\n' "$diff" "$solved/$total" "${next:-done!}"
    done
    if ((${#wip[@]})); then
        printf '\nin progress:\n'
        printf '%s\n' "${wip[@]}"
    fi
}

result=$(progress)
printf '%s\n' "$result"

cat >README.md <<EOF
# TS Type Challenges

Solving [TypeScript Type Challenges](https://github.com/type-challenges/type-challenges)

\`\`\`
$result
\`\`\`
EOF
