# 🌐 HTTP Server From Scratch (Node.js Core Only)

A project to build a minimal HTTP server using **only Node.js core modules** — no Express, no frameworks. The goal is to deeply understand how HTTP works at the protocol level, skills that transfer to any language or framework.

---

## 🎯 Project Goal

Implement a fully functional HTTP server from scratch, covering:

- CRUD routing
- Session management via cookies
- CORS and preflight handling
- HTTP caching with ETags
- Gzip compression
- Content negotiation

---

## 🗂️ Project Phases

### Phase 1 — Basic HTTP Server Skeleton

Use Node's built-in `http` module to create a server, listen on a port, and log incoming request method, URL, and headers.

**Learning Outcome:** Understand raw HTTP requests and how the server receives them.

---

### Phase 2 — Manual Routing

Implement routing manually for the following endpoints:

| Method   | Route           |
|----------|-----------------|
| `GET`    | `/`             |
| `GET`    | `/users`        |
| `POST`   | `/users`        |
| `PUT`    | `/users/:id`    |
| `DELETE` | `/users/:id`    |

**Learning Outcome:** Understand method-based routing and URL parsing without frameworks.

---

### Phase 3 — Parsing Request Body

- Handle JSON request bodies
- Parse the incoming data stream manually
- Handle invalid JSON safely with proper error responses

**Learning Outcome:** Understand how HTTP request bodies are streamed and parsed.

---

### Phase 4 — Response Construction

- Send proper status codes: `200`, `201`, `400`, `404`
- Set `Content-Type` headers correctly
- Return both JSON and HTML responses

**Learning Outcome:** Understand HTTP response structure and status code semantics.

---

### Phase 5 — Idempotency Awareness

- Ensure `GET` does not mutate state
- Implement `PUT` as a full replacement
- Implement `POST` as creation only
- Implement `DELETE` correctly
- Test behavior with repeated requests to verify idempotency

**Learning Outcome:** Understand the difference between idempotent and non-idempotent HTTP methods.

---

### Phase 6 — Cookie-Based Sessions

- Generate session IDs on login
- Store sessions in memory using a `Map`
- Send `Set-Cookie` header in responses
- Parse `Cookie` header on incoming requests
- Validate sessions for protected routes
- Experiment with `HttpOnly`, `Secure`, and `SameSite` flags

**Learning Outcome:** Understand stateful session management and cookie-based authentication.

---

### Phase 7 — CORS + Preflight

- Handle `OPTIONS` preflight requests
- Implement the following CORS headers:
  - `Access-Control-Allow-Origin`
  - `Access-Control-Allow-Methods`
  - `Access-Control-Allow-Headers`
- Test from the browser using `fetch()`

**Learning Outcome:** Understand browser CORS enforcement and how preflight requests work.

---

### Phase 8 — HTTP Caching

- Implement `Cache-Control` header
- Generate `ETag` values for resources
- Handle `If-None-Match` header on requests
- Return `304 Not Modified` when the resource hasn't changed

**Learning Outcome:** Understand the difference between strong and conditional caching.

---

### Phase 9 — HTTP Compression

- Detect the `Accept-Encoding` request header
- Implement `gzip` compression using Node's `zlib` module
- Set the `Content-Encoding` response header correctly
- Test using `curl --compressed`

**Learning Outcome:** Understand response compression and bandwidth optimization.

---

### Phase 10 — Content Negotiation

- Use the `Accept` header to return either JSON or HTML
- Use `Accept-Language` to serve language-specific responses
- Add `Vary` header where appropriate

**Learning Outcome:** Understand multi-representation resources and server-driven content negotiation.

---

## ✅ Final Deliverable

By the end of this project, your server should:

- [x] Handle full CRUD operations
- [x] Manage cookie-based sessions
- [x] Support CORS with preflight
- [x] Implement caching with ETag and `304` responses
- [x] Support gzip compression
- [x] Perform content negotiation via `Accept` headers
- [x] Respect HTTP semantics throughout

---

## 🚀 Getting Started
```bash
# Clone the repo
git clone https://github.com/your-username/BFFP
cd HTTP-BFFP

# Run the server (no dependencies required)
node app.js or app1.js or app2.js or app4.js
```

> **Requirements:** Node.js v18+ recommended. No `npm install` needed — this project uses core modules only.

---

## 🧪 Testing

You can test endpoints using:
```bash
# Basic GET request
curl http://localhost:3000/

# POST with JSON body
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'

# Test compression
curl --compressed http://localhost:3000/users

# Test caching (use ETag from first response)
curl -H 'If-None-Match: "your-etag-here"' http://localhost:3000/users
```

---

## 📚 Key Concepts Covered

- HTTP request/response lifecycle
- Streaming and manual body parsing
- Stateless vs stateful HTTP (sessions)
- Idempotency and safe methods
- Browser security model (CORS)
- Caching strategies
- Compression and content negotiation

---

