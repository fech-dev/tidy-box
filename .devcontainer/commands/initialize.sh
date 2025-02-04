if ! docker volume inspect pnpm-store >/dev/null 2>&1; then
  echo "💿 pnpm-store docker volume creation..."
  docker volume create pnpm-store
  echo "✅ volume created!"
fi