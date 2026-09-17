# StoryLens AI — API Reference

Base URL: `http://localhost:8000/api/v1`  
Interactive docs: `http://localhost:8000/docs`

## Health

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| GET    | `/health` | Service + DB health status  |

## Auth

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/auth/signup` | Register new user, returns tokens   |
| POST   | `/auth/login`  | Login, returns token pair           |
| POST   | `/auth/refresh`| Refresh access token                |
| GET    | `/auth/me`     | Current user profile (protected)    |

### Signup Request
```json
{ "email": "user@example.com", "full_name": "Jane Doe", "password": "secret123" }
```

### Token Response
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": { "id": 1, "email": "user@example.com", "full_name": "Jane Doe", "is_active": true, "is_verified": false }
}
```

## Documents (protected)

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/documents/upload`  | Upload file (multipart)        |
| GET    | `/documents`         | List documents (paginated)     |
| GET    | `/documents/{id}`    | Get document                   |
| DELETE | `/documents/{id}`    | Delete document                |

### Upload
```
POST /api/v1/documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: file=<file>
```

## Generations (protected)

| Method | Endpoint            | Description                          |
| ------ | ------------------- | ------------------------------------ |
| POST   | `/generations`      | Generate artifact (see below)        |
| GET    | `/generations`      | List generations (`?document_id=`)   |
| GET    | `/generations/{id}` | Get one generation                   |

### Generate Request
```json
{ "document_id": 1, "generation_type": "timeline" }
```
`generation_type` ∈ `timeline | mindmap | quiz | presentation | podcast`

## Chat (protected)

| Method | Endpoint  | Description                      |
| ------ | --------- | -------------------------------- |
| POST   | `/chat`   | Ask a question about a document  |

### Chat Request
```json
{ "document_id": 1, "question": "What is the main conclusion?" }
```

### Chat Response
```json
{
  "answer": "The document concludes that ...",
  "sources": [{ "text": "...", "chunk_index": 2, "score": 0.82 }]
}
```

