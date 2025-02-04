# setup for pnpm store
echo "⚙️ Setting up pnpm store..."
pnpm config set store-dir /home/node/.pnpm-store 
sudo chown -R node:node /home/node/.pnpm-store
echo "✅ Done!"

# create .env file
cp .env.example .env 
echo "✅ .env file created!"