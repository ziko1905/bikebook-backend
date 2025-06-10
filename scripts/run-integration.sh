#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

docker compose down -v
docker compose up -d

echo '🟡 - Waiting for database to be ready...'

# select 1 ensures db readiness
$DIR/wait-until.sh "docker compose exec -T -e PGPASSWORD=${POSTGRES_PASSWORD_INTEGRATION} db psql -U ${POSTGRES_USER_INTEGRATION} ${POSTGRES_DB_INTEGRATION} -c 'select 1'" 15 && echo '🟢 - Database is ready!'

npx prisma migrate dev --name init
if [ "$#" -eq "0" ]; then
  vitest -c ./vitest.config.integration.ts
else
  vitest -c ./vitest.config.integration.ts --ui
fi
