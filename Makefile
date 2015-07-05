
NODE ?= node
NODE_FLAGS ?= $(shell $(NODE) --v8-options | grep generators | cut -d ' ' -f 3)

BIN := ./node_modules/.bin
MOCHA := $(BIN)/_mocha
ESLINT := $(BIN)/eslint

test: node_modules
	@$(NODE) $(NODE_FLAGS) $(MOCHA)

node_modules: package.json
	@npm install

lint: node_modules
	@$(ESLINT) .

.PHONY: test
