#!/bin/bash

# OdooHub - Hostinger Setup Script
# This script sets up the Docker environment according to Hostinger's structure

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
    exit 1
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Main setup
print_header "OdooHub - Hostinger Setup"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
   print_error "This script must be run as root"
fi

# Create Hostinger directory structure
print_header "Creating Hostinger Directory Structure"

mkdir -p /docker/website02/data
mkdir -p /docker/website02/logs
mkdir -p /docker/website02/node_modules

print_success "Created /docker/website02/data"
print_success "Created /docker/website02/logs"
print_success "Created /docker/website02/node_modules"

# Set proper permissions
print_header "Setting Permissions"

chmod -R 755 /docker/website02
chmod -R 777 /docker/website02/data
chmod -R 777 /docker/website02/logs
chmod -R 777 /docker/website02/node_modules

print_success "Permissions set correctly"

# Check if .env exists
print_header "Environment Configuration"

if [ ! -f .env ]; then
    if [ -f .env.hostinger.example ]; then
        cp .env.hostinger.example .env
        print_success ".env created from .env.hostinger.example"
        print_warning "Please edit .env with your credentials:"
        echo -e "${YELLOW}  nano .env${NC}"
    else
        print_error ".env file not found and .env.hostinger.example not available"
    fi
else
    print_success ".env file already exists"
fi

# Check Docker installation
print_header "Checking Docker Installation"

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed!"
fi
print_success "Docker is installed: $(docker --version)"

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed!"
fi
print_success "Docker Compose is installed: $(docker-compose --version)"

# Build with Hostinger-specific compose file
print_header "Building Docker Image"

if docker-compose -f docker-compose.hostinger.yml build --no-cache; then
    print_success "Docker image built successfully"
else
    print_error "Failed to build Docker image"
fi

# Create systemd service for auto-restart (optional)
print_header "Creating Systemd Service (Optional)"

read -p "Do you want to create a systemd service for auto-restart? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    SERVICE_FILE="/etc/systemd/system/website02-docker.service"

    cat > $SERVICE_FILE << 'EOF'
[Unit]
Description=OdooHub Website02 Docker Container
After=docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=/home/your_username/website02
ExecStart=/usr/local/bin/docker-compose -f docker-compose.hostinger.yml up
ExecStop=/usr/local/bin/docker-compose -f docker-compose.hostinger.yml down
Restart=always
RestartSec=10
User=root

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    print_success "Systemd service created at $SERVICE_FILE"
    echo -e "${YELLOW}Edit the file and change 'your_username' to your actual username${NC}"
fi

# Display summary
print_header "Setup Complete!"

echo -e "${GREEN}Directory Structure:${NC}"
echo "  Data:        /docker/website02/data"
echo "  Logs:        /docker/website02/logs"
echo "  Node Modules: /docker/website02/node_modules"
echo
echo -e "${GREEN}Next Steps:${NC}"
echo "1. Edit .env with your credentials:"
echo "   ${YELLOW}nano .env${NC}"
echo
echo "2. Start the application:"
echo "   ${YELLOW}docker-compose -f docker-compose.hostinger.yml up -d${NC}"
echo
echo "3. Check the logs:"
echo "   ${YELLOW}docker-compose -f docker-compose.hostinger.yml logs -f web${NC}"
echo
echo "4. Monitor container status:"
echo "   ${YELLOW}docker ps${NC}"
echo
echo "5. Access application:"
echo "   ${YELLOW}http://localhost:3000${NC}"
echo

print_success "Setup script completed!"
