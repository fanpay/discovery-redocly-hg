---
title: Connect with AI
description: Connect your AI coding assistant to the Museum API documentation via MCP.
---

# Connect your AI assistant

Use the button below to wire your AI coding assistant directly to this documentation.
Once connected, tools like **Cursor**, **VS Code**, or **Claude Code** can read the Museum API
in real time and help you write code that calls it correctly — no copy-pasting required.

{% connect-mcp placement="bottom" alignment="start" options=["cursor", "vscode", "copy"] /%}

---

## What your AI gets access to

After connecting, your assistant can use the following tools from the Museum API:

| Tool | What it does |
|---|---|
| `getMuseumHours` | Fetch upcoming opening hours by date range |
| `listSpecialEvents` | Browse all upcoming special events |
| `getSpecialEvent` | Get full details for a specific event |
| `buyMuseumTickets` | Purchase general admission or event tickets |
| `getTicketCode` | Retrieve the QR code for a purchased ticket |

Admin operations (`createSpecialEvent`, `updateSpecialEvent`, `deleteSpecialEvent`) are intentionally
excluded — those require human review and are not available to AI tools.

---

## How to connect

### Cursor

1. Open the Command Palette (`Cmd+Shift+P`)
2. Run **MCP: Add MCP Server**
3. Choose **URL** and paste your project's `/mcp` endpoint
4. Optionally add an `Authorization` header if your project requires auth

### VS Code

1. Open Settings → MCP Servers
2. Add a new entry pointing to your project's `/mcp` endpoint

### Claude Code

Use the copy option above to get the server URL, then add it to your Claude Code MCP config.

---

## How it works under the hood

Your Redocly Realm project automatically exposes an MCP-compatible endpoint at `/mcp`.
The tools listed above come from the `x-mcp` extension in the OpenAPI definition — that's where
tool names, descriptions, and which operations to include are declared.

The server name shown to MCP clients ("Museum API Docs") is configured in `redocly.yaml`
under `mcp.docs.name`.
