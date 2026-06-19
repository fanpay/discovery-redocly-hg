#!/usr/bin/env bash
# Usage: ./switch-env.sh <dev|qa|staging|production>
# Prints the --config flag to use and exports REDOCLY_CONFIG for the shell.

set -euo pipefail

ENV="${1:-}"

if [[ -z "$ENV" ]]; then
  echo "Usage: $0 <dev|qa|staging|production>"
  exit 1
fi

case "$ENV" in
  dev)        CONFIG="redocly.dev.yaml" ;;
  qa)         CONFIG="redocly.qa.yaml" ;;
  staging)    CONFIG="redocly.staging.yaml" ;;
  production) CONFIG="redocly.yaml" ;;
  *)
    echo "Unknown environment: $ENV"
    echo "Valid options: dev, qa, staging, production"
    exit 1
    ;;
esac

echo "Environment : $ENV"
echo "Config file : $CONFIG"
echo ""
echo "Run commands with:"
echo "  redocly lint --config $CONFIG"
echo "  redocly build-docs --config $CONFIG"
echo "  redocly preview --config $CONFIG"
echo "  redocly push --config $CONFIG"
echo ""
echo "Or export for the session:"
echo "  export REDOCLY_CONFIG=$CONFIG"
