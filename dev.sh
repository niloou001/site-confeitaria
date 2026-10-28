#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if command -v php >/dev/null 2>&1; then
  exec php -S 0.0.0.0:"${PORT:-8000}" -t .
fi
runtime=/workspace/php-runtime
if [[ -x "$runtime/usr/bin/php8.4" ]]; then
  export LD_LIBRARY_PATH="$runtime/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
  exec "$runtime/usr/bin/php8.4" -n -S 0.0.0.0:"${PORT:-8000}" -t .
fi
printf '%s\n' 'Instale PHP 8.1 ou superior para executar este site.' >&2
exit 1
