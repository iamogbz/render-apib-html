# Render APIB HTML

[![Dependabot badge](https://badgen.net/dependabot/iamogbz/render-apib-html/?icon=dependabot)](https://app.dependabot.com)
[![Dependencies](https://david-dm.org/iamogbz/render-apib-html.svg)](https://github.com/iamogbz/render-apib-html)
[![Build Status](https://github.com/iamogbz/render-apib-html/workflows/Build/badge.svg)](https://github.com/iamogbz/render-apib-html/actions)
[![Coverage Status](https://coveralls.io/repos/github/iamogbz/render-apib-html/badge.svg?branch=master)](https://coveralls.io/github/iamogbz/render-apib-html?branch=master)

Serverless rendering of api blueprint files as styled html

## Usage

Make a request with the api blueprint base64 encoded in the `X-Blueprint` header.

### Endpoint

```http
https://d31myey2oeipxs.cloudfront.net
```

### Headers

```json
{
  "X-Blueprint": "IyBIZWxsbyBXb3JsZCE="
}
```

### Response

```html
<h1>Hello World!</h1>
```

### Example

```sh
curl -X GET \
  https://d31myey2oeipxs.cloudfront.net/v1 \
  -H 'X-Blueprint: IyBIZWxsbyBXb3JsZCE='
```
