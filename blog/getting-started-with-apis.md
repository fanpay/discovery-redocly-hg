---
title: Getting Started with APIs
template: '../@theme/Templates/BlogPost'
author:
  name: Fabian Payan
  avatar: https://avatars.githubusercontent.com/u/1?v=4
date: June 16, 2026
timeToRead: 5 min
tags:
  - APIs
  - OpenAPI
  - Beginner
---

## What is an API?

An **API** (Application Programming Interface) is a contract that defines how two software systems communicate. Think of it as a menu at a restaurant — it tells you what you can order, what information you need to provide, and what you'll receive in return.

## Why OpenAPI?

The [OpenAPI Specification](https://openapis.org) is the industry standard for describing REST APIs. With Redocly, you can take an OpenAPI file and instantly get:

- Interactive documentation
- Request/response examples
- Schema validation

## A Simple Example

Here's what a minimal OpenAPI operation looks like:

```yaml
paths:
  /users/{id}:
    get:
      summary: Get a user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: The user object
```

## Next Steps

Explore the [API reference](/apis/openapi.yaml) included in this project to see a full example, then try editing the spec and watch the docs update in real time.
