install: # perfoming a clean intallation of dependencies
	npm ci

gendiff: # running the program
	node bin/gendiff.js

publish: # publishing package to NPM in a test-mode
	npm publish --dry-run

lint: # making a eslint code-check according Airbnb Style Guide
	npx eslint . 
