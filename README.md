# Render APIB HTML

[![Dependabot badge](https://badgen.net/github/dependabot/iamogbz/render-apib-html/?icon=dependabot)](https://app.dependabot.com)
[![Dependencies](https://img.shields.io/librariesio/github/iamogbz/render-apib-html)](https://github.com/iamogbz/render-apib-html)
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
curl --request GET \
  --location 'https://d31myey2oeipxs.cloudfront.net/v1' \
  --header 'X-Blueprint: Rk9STUFUOiAxQQoKIyBIZWxsbyBXb3JsZA=='
```

### Credits

- [Snowboard](//github.com/bukalapak/snowboard)
- [Aglio](//github.com/danielgtaylor/aglio) <sup>*needs maintenance*</sup>
