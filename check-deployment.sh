#!/bin/bash
# Quick deployment status checker for NexFlare

echo "🚀 NexFlare Deployment Status Checker"
echo "====================================="
echo ""

echo "📁 Repository: https://github.com/ArsathPrabu96-PE/NexFlare-Streaming"
echo "⚡ Actions: https://github.com/ArsathPrabu96-PE/NexFlare-Streaming/actions"
echo "🌐 Live Site: https://arsathprabu96-pe.github.io/NexFlare-Streaming/"
echo "⚙️  Settings: https://github.com/ArsathPrabu96-PE/NexFlare-Streaming/settings/pages"
echo ""

echo "🔧 To enable GitHub Pages:"
echo "1. Go to Settings → Pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo "3. Save the settings"
echo ""

echo "📊 Current Status:"
echo "- Latest Commit: $(git log --oneline -1)"
echo "- Current Branch: $(git branch --show-current)"
echo "- Remote URL: $(git remote get-url origin)"
echo ""

echo "✅ Deployment should be available in 2-5 minutes after GitHub Actions completes"