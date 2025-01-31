#!/bin/bash

echo "🚀 Starting PrivateConnect deployment..."

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ dfx is not installed. Please install it first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install it first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building the project..."
npm run build

echo "🌐 Starting local Internet Computer network..."
dfx start --background

echo "📤 Deploying canisters..."
dfx deploy

echo "✨ Deployment complete! Your app should now be running."
echo "🔍 You can access it at: http://localhost:8000/?canisterId=$(dfx canister id private_connect_frontend)"
