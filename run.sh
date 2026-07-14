#!/bin/bash
# Launch the visit-ui demo app on http://localhost:4000
# If port 4000 is already in use, free it first.
cd "$(dirname "$0")"

PORT=4000
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
	echo "Port $PORT is in use by PID $PID, killing it..."
	kill -9 $PID
fi

# Watch-build the visit-ui package so the demo picks up library changes.
pnpm --filter visit-ui dev &
PKG_PID=$!
trap "kill $PKG_PID 2>/dev/null" EXIT

pnpm --filter demo dev --port $PORT
