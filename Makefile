up:
	@echo "Starting Docker..."
	docker compose up -d --build

down:
	@echo "Stopping Docker..."
	docker compose down
