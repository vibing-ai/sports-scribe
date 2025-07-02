# Authentication

This document outlines the authentication methods and security practices for the Sport Scribe API.

## Overview

Sport Scribe uses a multi-layered authentication system built on Supabase Auth, supporting multiple authentication methods while maintaining high security standards.

## Authentication Methods

### 1. JWT Token Authentication

The primary authentication method uses JSON Web Tokens (JWT) issued by Supabase Auth.

#### Token Structure

```
Authorization: Bearer <jwt_token>
```

#### Example Request

```bash
curl -X GET "https://api.sportscribe.com/api/articles" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### 2. API Key Authentication

For service-to-service communication and automated systems.

#### Header Format

```
X-API-Key: <api_key>
```

#### Example Request

```bash
curl -X POST "https://api.sportscribe.com/api/articles/generate" \
  -H "X-API-Key: sk_live_1234567890abcdef..." \
  -H "Content-Type: application/json" \
  -d '{"game_id": "123", "focus_type": "game_recap"}'
```

### 3. Session-Based Authentication

For web application users through cookie-based sessions.

#### Cookie Structure

```
sb-access-token=<token>; sb-refresh-token=<refresh_token>
```

## Authentication Flows

### 1. User Registration

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password123",
  "name": "John Doe",
  "role": "reader"
}
```

**Response:**

```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader",
    "created_at": "2024-01-15T10:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "v1.Mr5hBVBTSSxn...",
    "expires_at": 1705395600,
    "token_type": "bearer"
  }
}
```

### 2. User Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader",
    "last_login": "2024-01-15T10:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "v1.Mr5hBVBTSSxn...",
    "expires_at": 1705395600,
    "token_type": "bearer"
  }
}
```

### 3. Token Refresh

```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "v1.Mr5hBVBTSSxn..."
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "v1.Mr5hBVBTSSxn...",
  "expires_at": 1705395600,
  "token_type": "bearer"
}
```

### 4. Logout

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "Successfully logged out"
}
```

## OAuth Providers

### Google OAuth

```http
GET /auth/oauth/google
```

**Query Parameters:**

- `redirect_to` (optional): URL to redirect after successful authentication

### GitHub OAuth

```http
GET /auth/oauth/github
```

**Query Parameters:**

- `redirect_to` (optional): URL to redirect after successful authentication

### Twitter OAuth

```http
GET /auth/oauth/twitter
```

**Query Parameters:**

- `redirect_to` (optional): URL to redirect after successful authentication

## API Key Management

### Creating API Keys

```http
POST /api/user/api-keys
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "My API Key",
  "description": "For automated article generation",
  "permissions": ["articles:read", "articles:generate"],
  "expires_at": "2024-12-31T23:59:59Z"
}
```

**Response:**

```json
{
  "id": "key_123e4567-e89b-12d3-a456-426614174000",
  "name": "My API Key",
  "key": "sk_live_1234567890abcdef...",
  "permissions": ["articles:read", "articles:generate"],
  "created_at": "2024-01-15T10:00:00Z",
  "expires_at": "2024-12-31T23:59:59Z",
  "last_used": null
}
```

### Listing API Keys

```http
GET /api/user/api-keys
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "api_keys": [
    {
      "id": "key_123e4567-e89b-12d3-a456-426614174000",
      "name": "My API Key",
      "permissions": ["articles:read", "articles:generate"],
      "created_at": "2024-01-15T10:00:00Z",
      "expires_at": "2024-12-31T23:59:59Z",
      "last_used": "2024-01-15T15:30:00Z"
    }
  ]
}
```

### Revoking API Keys

```http
DELETE /api/user/api-keys/{key_id}
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "API key revoked successfully"
}
```

## User Roles and Permissions

### Role Hierarchy

1. **Super Admin** - Full system access
2. **Admin** - Organization management, user management
3. **Editor** - Content creation and editing
4. **Writer** - Content creation only
5. **Reader** - Read-only access

### Permission System

#### Article Permissions

- `articles:read` - Read published articles
- `articles:read_all` - Read all articles (including drafts)
- `articles:create` - Create new articles
- `articles:edit` - Edit existing articles
- `articles:delete` - Delete articles
- `articles:publish` - Publish articles
- `articles:generate` - Generate articles via AI

#### User Management Permissions

- `users:read` - View user profiles
- `users:create` - Create new users
- `users:edit` - Edit user profiles
- `users:delete` - Delete users
- `users:manage_roles` - Assign/change user roles

#### Analytics Permissions

- `analytics:read` - View analytics data
- `analytics:export` - Export analytics data

## Security Best Practices

### Token Security

1. **Token Expiration**: Access tokens expire after 1 hour
2. **Refresh Tokens**: Valid for 30 days, automatically rotated
3. **Secure Storage**: Use secure, httpOnly cookies for web apps
4. **Token Rotation**: Implement automatic token refresh

### API Key Security

1. **Prefix Identification**: All API keys start with `sk_live_` or `sk_test_`
2. **Scoped Permissions**: Limit API keys to minimum required permissions
3. **Expiration**: Set reasonable expiration dates
4. **Regular Rotation**: Rotate keys periodically
5. **Secure Storage**: Never store keys in client-side code

### Rate Limiting

#### Authentication Endpoints

- Login attempts: 5 per minute per IP
- Registration: 3 per minute per IP
- Password reset: 3 per hour per email

#### API Endpoints

- Authenticated users: 1000 requests per hour
- API keys: 5000 requests per hour
- Public endpoints: 100 requests per hour per IP

### CORS Configuration

```javascript
// Allowed origins for CORS
const allowedOrigins = [
  'https://sportscribe.com',
  'https://www.sportscribe.com',
  'https://admin.sportscribe.com'
];

// Development origins (only in development)
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:3000');
}
```

## Error Handling

### Authentication Errors

#### 401 Unauthorized

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "details": "The provided authentication token is invalid or has expired"
  }
}
```

#### 403 Forbidden

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions",
    "details": "You don't have permission to access this resource"
  }
}
```

#### 429 Too Many Requests

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": "Too many requests. Please try again later.",
    "retry_after": 60
  }
}
```

## Implementation Examples

### Frontend (React/Next.js)

```typescript
// hooks/useAuth.ts
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  return {
    user,
    login,
    logout,
    getToken,
    isAuthenticated: !!user,
  };
};
```

### Backend (Python/FastAPI)

```python
# auth/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
import jwt

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """Verify JWT token and return user information."""
    token = credentials.credentials

    try:
        # Verify token with Supabase
        payload = jwt.decode(
            token,
            options={"verify_signature": False}  # Supabase handles verification
        )

        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        return {"id": user_id, "email": payload.get("email")}

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

async def require_permission(permission: str):
    """Decorator to require specific permission."""
    def permission_checker(current_user: dict = Depends(get_current_user)):
        # Check user permissions from database
        if not has_permission(current_user["id"], permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission '{permission}' required"
            )
        return current_user

    return permission_checker
```

## Testing Authentication

### Unit Tests

```python
# tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data["session"]
    assert "user" in data

def test_login_invalid_credentials():
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "wrong_password"
    })

    assert response.status_code == 401
    assert "error" in response.json()

def test_protected_endpoint_without_token():
    response = client.get("/api/articles")
    assert response.status_code == 401

def test_protected_endpoint_with_valid_token():
    # First login to get token
    login_response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })

    token = login_response.json()["session"]["access_token"]

    # Use token to access protected endpoint
    response = client.get(
        "/api/articles",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
```

## Related Documentation

- [API Endpoints](./endpoints.md)
- [Webhooks](./webhooks.md)
- [Security Guide](../development/security.md)
- [Deployment Guide](../deployment/)
