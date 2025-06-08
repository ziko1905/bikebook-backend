#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

echo '🟡 - Waiting for database to be ready...'
$DIR/wait-until.sh "docker compose exec -d db pg_isready" 15 && echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
if [ "$#" -eq "0" ]; then
  vitest -c ./vitest.config.integration.ts
else
  vitest -c ./vitest.config.integration.ts --ui
fi
