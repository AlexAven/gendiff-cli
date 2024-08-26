install:
	npm ci
gendiff:
	node bin/gendiff
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8