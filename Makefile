# STACK_NAME=gh-pro-view-render-apib-html
# DEPLOYMENT_BUCKET=gh-pro-view
# DEPLOYMENT_PREFIX=render-apib-html-deployments

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

# test:
# 	@sam local invoke RenderApibHtmlFunction --event tests/mocks/helloWorldEvent.json

# build:
# 	@sam build

# package: build
# 	@zip -r artifacts/dist.zip .aws-sam/build/RenderApibHtmlFunction

# deploy:
# 	@sam deploy \
# 	--stack-name $(STACK_NAME) \
# 	--s3-bucket $(DEPLOYMENT_BUCKET) \
# 	--s3-prefix $(DEPLOYMENT_PREFIX) \
# 	--capabilities CAPABILITY_IAM

# teardown:
# 	@aws cloudformation delete-stack --stack-name $(STACK_NAME)

ifndef VERBOSE
.SILENT:
endif
