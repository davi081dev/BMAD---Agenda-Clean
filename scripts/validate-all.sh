#!/bin/bash
# =========================================
# Validate All - Frontend + Backend
# =========================================
# Script para validar frontend e backend simultaneamente
# Executa: lint + type-check + build em ambos
# Exit code: 0 se sucesso, 1 se falha

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo ""
echo "🔍 Validando projeto agenda-clean..."
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend Validation
echo "${YELLOW}📦 Validando Backend...${NC}"
cd "$PROJECT_ROOT/backend"

if npm run validate > /dev/null 2>&1; then
    echo "${GREEN}✅ Backend OK${NC}"
else
    echo "${RED}❌ Backend FALHOU${NC}"
    echo ""
    echo "Erros encontrados no backend:"
    npm run validate
    exit 1
fi

echo ""

# Frontend Validation
echo "${YELLOW}📦 Validando Frontend...${NC}"
cd "$PROJECT_ROOT/frontend"

if npm run validate > /dev/null 2>&1; then
    echo "${GREEN}✅ Frontend OK${NC}"
else
    echo "${RED}❌ Frontend FALHOU${NC}"
    echo ""
    echo "Erros encontrados no frontend:"
    npm run validate
    exit 1
fi

echo ""
echo "=========================================="
echo "${GREEN}🎉 Tudo pronto para commit!${NC}"
echo "=========================================="
echo ""
echo "✅ Próximos passos:"
echo "  1. git add ."
echo "  2. git commit -m 'seu commit message'"
echo "  3. git push origin <branch>"
echo ""

exit 0
