
BIN := ./node_modules/.bin
MOCHA ?= $(BIN)/mocha

test:
	@$(MOCHA)

node_modules: package.json
	@npm install

.PHONY: test
