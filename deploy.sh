#!/bin/bash

# OdooHub - Deployment Script for Hostinger
# Usage: ./deploy.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Main deployment
print_header "OdooHub Deployment Script"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed!"
    exit 1
fi
print_success "Docker is installed"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed!"
    exit 1
fi
print_success "Docker Compose is installed"

# Check if .env exists
if [ ! -f .env ]; then
    print_error ".env file not found!"
    echo -e "${YELLOW}Please create .env file from .env.local.example or .env.hostinger.example${NC}"
    exit 1
fi
print_success ".env file found"

# Parse environment
print_header "Deployment Configuration"
echo "Environment Variables:"
echo -e "  GOOGLE_CLIENT_ID: ${GREEN}$(grep GOOGLE_CLIENT_ID .env | cut -d= -f2 | head -c 20)...${NC}"
echo -e "  NEXTAUTH_URL: ${GREEN}$(grep NEXTAUTH_URL .env | cut -d= -f2)${NC}"
echo -e "  ODOO_URL: ${GREEN}$(grep ODOO_URL .env | cut -d= -f2)${NC}"

# Ask for confirmation
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Deployment cancelled"
    exit 1
fi

# Update code from GitHub
print_header "Updating Code"
if git pull origin main; then
    print_success "Code updated from GitHub"
else
    print_warning "Could not update from GitHub (might be first deployment)"
fi

# Build Docker image
print_header "Building Docker Image"
if docker-compose build --no-cache; then
    print_success "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Stop existing containers
print_header "Stopping Existing Containers"
if docker-compose down; then
    print_success "Existing containers stopped"
else
    print_warning "No containers to stop"
fi

# Start new containers
print_header "Starting Application"
if docker-compose up -d; then
    print_success "Application started"
else
    print_error "Failed to start application"
    exit 1
fi

# Wait for application to be ready
print_header "Waiting for Application to Be Ready"
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker-compose exec -T web curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Application is ready!"
        break
    fi
    attempt=$((attempt + 1))
    echo -ne "Waiting... ($attempt/$max_attempts)\r"
    sleep 1
done

if [ $attempt -eq $max_attempts ]; then
    print_warning "Application did not respond after $max_attempts attempts"
    print_header "Container Logs"
    docker-compose logs web | tail -20
fi

# Display status
print_header "Deployment Complete!"
print_success "Application Status:"
docker-compose ps

print_header "Next Steps"
echo -e "${BLUE}1. Check application logs:${NC}"
echo "   docker-compose logs -f web"
echo
echo -e "${BLUE}2. Verify application is running:${NC}"
echo "   curl -I http://localhost:3000"
echo
echo -e "${BLUE}3. Test your domain:${NC}"
echo "   Open https://your-domain.com in your browser"
echo

print_success "Deployment script completed!"
