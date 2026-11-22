.PHONY: help build up down logs shell deploy dev-install dev-run clean

help:
	@echo "OdooHub - Available Commands"
	@echo "=============================="
	@echo ""
	@echo "Development:"
	@echo "  make dev-install    Install dependencies locally"
	@echo "  make dev-run        Run locally with npm"
	@echo ""
	@echo "Docker:"
	@echo "  make build          Build Docker image"
	@echo "  make up             Start containers"
	@echo "  make down           Stop containers"
	@echo "  make logs           Show container logs"
	@echo "  make shell          Enter application shell"
	@echo "  make restart        Restart containers"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy         Full deployment (build + up)"
	@echo "  make update         Update from GitHub and redeploy"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean          Remove containers and images"
	@echo "  make prune          Clean up Docker resources"
	@echo "  make env            Setup .env file"
	@echo ""
	@echo "Monitoring:"
	@echo "  make ps             Show container status"
	@echo "  make stats          Show resource usage"
	@echo "  make health         Check application health"

# Development
dev-install:
	npm install

dev-run:
	npm run dev

dev-build:
	npm run build

# Docker
build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f web

shell:
	docker-compose exec web sh

restart:
	docker-compose restart

ps:
	docker-compose ps

stats:
	docker stats

# Deployment
deploy: build up
	@echo "Deployment complete!"

update:
	git pull origin main
	$(MAKE) deploy

# Maintenance
clean:
	docker-compose down -v
	docker system prune -a --volumes -f

prune:
	docker system prune -a -f

env:
	@if [ ! -f .env ]; then \
		cp .env.local.example .env; \
		echo ".env file created from .env.local.example"; \
		echo "Please edit .env with your credentials"; \
	else \
		echo ".env file already exists"; \
	fi

# Health checks
health:
	@echo "Checking application health..."
	@docker-compose exec -T web curl -s http://localhost:3000 > /dev/null && echo "✓ Application is running" || echo "✗ Application is not responding"

check-env:
	@echo "Checking environment variables..."
	@docker-compose exec web env | grep -E "GOOGLE|ODOO|NEXTAUTH"

test:
	@echo "Running tests..."
	@docker-compose exec web npm run lint
	@echo "Tests complete!"

# Combined commands
install-and-run: dev-install dev-run

fresh: clean build up logs

setup: env docker-install docker-compose-install build up

# Docker installation helpers
docker-install:
	@command -v docker >/dev/null 2>&1 || (curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh)
	@docker --version

docker-compose-install:
	@command -v docker-compose >/dev/null 2>&1 || (sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose)
	@docker-compose --version

# Output colors
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color
