# List recipes
default:
	@just --list

# Install dependencies
deps:
	npm install

# Run development server
run:
	npm run dev
