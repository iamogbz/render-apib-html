AWS_DEPLOYMENT_BUCKET:=gh-pro-view
AWS_DEPLOYMENT_PREFIX:=render-apib-html-deployments
AWS_REGION:=us-east-1
AWS_STACK_NAME:=gh-pro-view-render-apib-html
GIT_BRANCH:=$(shell git rev-parse --abbrev-ref HEAD)
FUNCTION_VERSION:=$(shell git rev-parse --short HEAD)
BUILT_TEMPLATE:=.aws-sam/build/template.yaml

upstream:
	@git remote add upstream https://github.com/iamogbz/node-js-boilerplate
	@git push origin master
	@git push --all
	@echo "upstream: remote successfully configured"

eject:
	@git fetch --all --prune
	@git checkout -b boilerplate-ejection
	@git pull upstream master --allow-unrelated-histories --no-edit -Xours
	@git pull upstream boilerplate-ejection --no-edit -Xours
	@git reset master --soft && git add --all && git commit -m "chore: eject" -n
	@echo "eject: branch created, complete by replacing placeholder values"

test-local:
	@sam local invoke RenderApibHtmlFunction --event tests/mocks/helloWorldEvent.json

test-deploy: package deploy

test-release:
	@npm run release -- --no-ci --branches=$(GIT_BRANCH) --prerelease --dry-run --debug

stage:
	@echo "###################################################################"
	@echo "START: $(STAGE)"
	@echo "==========================================================="
	@$(COMMAND)
	@echo "==========================================================="
	@echo "FINISH: $(STAGE)"
	@echo "###################################################################"

build:
	make stage STAGE="node build" COMMAND="npm run build"
	make stage STAGE="sam build" COMMAND="sam build"

package: build
	make stage STAGE="version function" COMMAND="sed -i "" "s/RenderApibHtmlFunctionVersion/RenderApibHtmlFunctionVersion$(FUNCTION_VERSION)/g" $(BUILT_TEMPLATE)"

deploy:
	make stage STAGE="sam deploy" COMMAND="sam deploy \
	--region $(AWS_REGION) \
	--stack-name $(AWS_STACK_NAME) \
	--s3-bucket $(AWS_DEPLOYMENT_BUCKET) \
	--s3-prefix $(AWS_DEPLOYMENT_PREFIX) \
	--capabilities CAPABILITY_IAM"

ifndef VERBOSE
.SILENT:
endif
