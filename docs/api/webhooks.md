# Webhooks

This document describes the webhook system for Sport Scribe, allowing you to receive real-time notifications about events in your application.

## Overview

Sport Scribe webhooks allow your application to receive HTTP POST notifications whenever certain events occur. This enables real-time integration with your systems without the need for constant polling.

## Webhook Events

### Article Events

#### `article.generated`

Triggered when an AI article generation is completed.

```json
{
  "event": "article.generated",
  "timestamp": "2024-01-15T20:05:00Z",
  "data": {
    "generation_request_id": "gen_123e4567-e89b-12d3-a456-426614174000",
    "article_id": "123e4567-e89b-12d3-a456-426614174000",
    "game_id": "456e7890-f12b-34c5-d678-901234567890",
    "status": "completed",
    "generation_time_seconds": 45,
    "word_count": 850,
    "focus_type": "game_recap",
    "created_at": "2024-01-15T20:00:00Z",
    "completed_at": "2024-01-15T20:05:00Z"
  }
}
```

#### `article.published`

Triggered when an article is published.

```json
{
  "event": "article.published",
  "timestamp": "2024-01-15T20:10:00Z",
  "data": {
    "article_id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Manchester United Beat City in Derby Thriller",
    "author": "AI Sports Writer",
    "sport": "football",
    "league": "Premier League",
    "published_at": "2024-01-15T20:10:00Z",
    "tags": ["Premier League", "Manchester United", "Manchester City"],
    "url": "https://sportscribe.com/articles/123e4567-e89b-12d3-a456-426614174000"
  }
}
```

#### `article.updated`

Triggered when an article is updated.

```json
{
  "event": "article.updated",
  "timestamp": "2024-01-15T21:00:00Z",
  "data": {
    "article_id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Lakers Beat Warriors in Overtime Thriller",
    "changes": {
      "title": {
        "old": "Lakers Beat Warriors",
        "new": "Lakers Beat Warriors in Overtime Thriller"
      },
      "content": {
        "changed": true
      }
    },
    "updated_at": "2024-01-15T21:00:00Z",
    "updated_by": "user_456e7890-f12b-34c5-d678-901234567890"
  }
}
```

#### `article.deleted`

Triggered when an article is deleted.

```json
{
  "event": "article.deleted",
  "timestamp": "2024-01-15T22:00:00Z",
  "data": {
    "article_id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Lakers Beat Warriors in Overtime Thriller",
    "deleted_at": "2024-01-15T22:00:00Z",
    "deleted_by": "user_456e7890-f12b-34c5-d678-901234567890"
  }
}
```

### Generation Events

#### `generation.started`

Triggered when article generation begins.

```json
{
  "event": "generation.started",
  "timestamp": "2024-01-15T20:00:00Z",
  "data": {
    "generation_request_id": "gen_123e4567-e89b-12d3-a456-426614174000",
    "game_id": "456e7890-f12b-34c5-d678-901234567890",
    "focus_type": "game_recap",
    "target_length": 800,
    "estimated_completion": "2024-01-15T20:05:00Z",
    "requested_by": "user_456e7890-f12b-34c5-d678-901234567890"
  }
}
```

#### `generation.failed`

Triggered when article generation fails.

```json
{
  "event": "generation.failed",
  "timestamp": "2024-01-15T20:03:00Z",
  "data": {
    "generation_request_id": "gen_123e4567-e89b-12d3-a456-426614174000",
    "game_id": "456e7890-f12b-34c5-d678-901234567890",
    "error": {
      "code": "INSUFFICIENT_DATA",
      "message": "Not enough game data available for article generation",
      "details": "Game statistics are incomplete"
    },
    "failed_at": "2024-01-15T20:03:00Z"
  }
}
```

### User Events

#### `user.registered`

Triggered when a new user registers.

```json
{
  "event": "user.registered",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "user_id": "user_123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "reader",
    "registration_method": "email",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

#### `user.role_changed`

Triggered when a user's role is changed.

```json
{
  "event": "user.role_changed",
  "timestamp": "2024-01-15T15:00:00Z",
  "data": {
    "user_id": "user_123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "old_role": "reader",
    "new_role": "editor",
    "changed_by": "admin_456e7890-f12b-34c5-d678-901234567890",
    "changed_at": "2024-01-15T15:00:00Z"
  }
}
```

### System Events

#### `system.maintenance_scheduled`

Triggered when system maintenance is scheduled.

```json
{
  "event": "system.maintenance_scheduled",
  "timestamp": "2024-01-15T08:00:00Z",
  "data": {
    "maintenance_id": "maint_123e4567-e89b-12d3-a456-426614174000",
    "type": "database_upgrade",
    "scheduled_start": "2024-01-16T02:00:00Z",
    "estimated_duration_minutes": 120,
    "affected_services": ["api", "web"],
    "description": "Database performance improvements"
  }
}
```

## Webhook Configuration

### Creating Webhooks

```http
POST /api/webhooks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/sportscribe",
  "events": [
    "article.generated",
    "article.published",
    "generation.failed"
  ],
  "secret": "your-webhook-secret",
  "active": true,
  "description": "Main webhook for article events"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "webhook_123e4567-e89b-12d3-a456-426614174000",
    "url": "https://your-app.com/webhooks/sportscribe",
    "events": [
      "article.generated",
      "article.published",
      "generation.failed"
    ],
    "secret": "whsec_1234567890abcdef",
    "active": true,
    "created_at": "2024-01-15T10:00:00Z",
    "last_delivery": null,
    "delivery_count": 0
  }
}
```

### Listing Webhooks

```http
GET /api/webhooks
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "webhooks": [
      {
        "id": "webhook_123e4567-e89b-12d3-a456-426614174000",
        "url": "https://your-app.com/webhooks/sportscribe",
        "events": ["article.generated", "article.published"],
        "active": true,
        "created_at": "2024-01-15T10:00:00Z",
        "last_delivery": "2024-01-15T20:05:00Z",
        "delivery_count": 45,
        "last_response_status": 200
      }
    ]
  }
}
```

### Updating Webhooks

```http
PUT /api/webhooks/{webhook_id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "events": [
    "article.generated",
    "article.published",
    "article.updated",
    "generation.failed"
  ],
  "active": true
}
```

### Deleting Webhooks

```http
DELETE /api/webhooks/{webhook_id}
Authorization: Bearer <access_token>
```

## Webhook Delivery

### Headers

All webhook requests include the following headers:

```http
POST /your-webhook-endpoint
Content-Type: application/json
User-Agent: SportScribe-Webhooks/1.0
X-SportScribe-Event: article.generated
X-SportScribe-Delivery: 123e4567-e89b-12d3-a456-426614174000
X-SportScribe-Signature-256: sha256=1234567890abcdef...
X-SportScribe-Timestamp: 1705395600
```

### Signature Verification

Sport Scribe signs webhook payloads with HMAC-SHA256 using your webhook secret. You should verify this signature to ensure the webhook is from Sport Scribe.

#### Python Example

```python
import hmac
import hashlib
import time

def verify_webhook_signature(payload_body, signature_header, secret, timestamp_header):
    """Verify webhook signature and timestamp."""

    # Check timestamp (reject if older than 5 minutes)
    timestamp = int(timestamp_header)
    if abs(time.time() - timestamp) > 300:
        raise ValueError("Timestamp too old")

    # Create expected signature
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload_body,
        hashlib.sha256
    ).hexdigest()

    # Extract signature from header
    signature = signature_header.replace('sha256=', '')

    # Compare signatures
    if not hmac.compare_digest(expected_signature, signature):
        raise ValueError("Invalid signature")

    return True

# Usage in Flask
from flask import Flask, request, abort

app = Flask(__name__)

@app.route('/webhooks/sportscribe', methods=['POST'])
def handle_webhook():
    try:
        verify_webhook_signature(
            request.get_data(),
            request.headers.get('X-SportScribe-Signature-256'),
            'your-webhook-secret',
            request.headers.get('X-SportScribe-Timestamp')
        )
    except ValueError:
        abort(400)

    event_type = request.headers.get('X-SportScribe-Event')
    payload = request.get_json()

    # Process webhook
    handle_sportscribe_event(event_type, payload)

    return '', 200
```

#### Node.js Example

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payloadBody, signatureHeader, secret, timestampHeader) {
  // Check timestamp (reject if older than 5 minutes)
  const timestamp = parseInt(timestampHeader);
  if (Math.abs(Date.now() / 1000 - timestamp) > 300) {
    throw new Error('Timestamp too old');
  }

  // Create expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payloadBody)
    .digest('hex');

  // Extract signature from header
  const signature = signatureHeader.replace('sha256=', '');

  // Compare signatures
  if (!crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
    throw new Error('Invalid signature');
  }

  return true;
}

// Usage in Express
const express = require('express');
const app = express();

app.use('/webhooks/sportscribe', express.raw({ type: 'application/json' }));

app.post('/webhooks/sportscribe', (req, res) => {
  try {
    verifyWebhookSignature(
      req.body,
      req.headers['x-sportscribe-signature-256'],
      'your-webhook-secret',
      req.headers['x-sportscribe-timestamp']
    );
  } catch (error) {
    return res.status(400).send('Invalid signature');
  }

  const eventType = req.headers['x-sportscribe-event'];
  const payload = JSON.parse(req.body);

  // Process webhook
  handleSportScribeEvent(eventType, payload);

  res.status(200).send('OK');
});
```

### Response Requirements

Your webhook endpoint should:

1. **Respond quickly** (within 10 seconds)
2. **Return HTTP 2xx** status code for successful processing
3. **Return HTTP 4xx/5xx** for errors (will trigger retries)
4. **Be idempotent** (handle duplicate deliveries gracefully)

### Retry Logic

Sport Scribe implements exponential backoff for failed webhook deliveries:

- **Immediate retry** for 5xx errors
- **1 minute** delay for first retry
- **5 minutes** delay for second retry
- **15 minutes** delay for third retry
- **1 hour** delay for fourth retry
- **6 hours** delay for fifth retry
- **24 hours** delay for final retry

After 7 failed attempts, the webhook will be automatically disabled.

## Webhook Logs

### Get Delivery Logs

```http
GET /api/webhooks/{webhook_id}/deliveries
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (integer): Page number
- `limit` (integer): Items per page (max 100)
- `status` (string): Filter by delivery status (success, failed, pending)
- `event` (string): Filter by event type

**Response:**

```json
{
  "success": true,
  "data": {
    "deliveries": [
      {
        "id": "delivery_123e4567-e89b-12d3-a456-426614174000",
        "event_type": "article.generated",
        "status": "success",
        "response_status_code": 200,
        "response_time_ms": 150,
        "attempt_count": 1,
        "delivered_at": "2024-01-15T20:05:00Z",
        "next_retry_at": null,
        "payload_size_bytes": 1024
      },
      {
        "id": "delivery_456e7890-f12b-34c5-d678-901234567890",
        "event_type": "article.published",
        "status": "failed",
        "response_status_code": 500,
        "response_time_ms": 5000,
        "attempt_count": 3,
        "delivered_at": "2024-01-15T19:30:00Z",
        "next_retry_at": "2024-01-15T20:30:00Z",
        "error_message": "Internal server error"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "total_pages": 3
    }
  }
}
```

### Get Delivery Details

```http
GET /api/webhooks/{webhook_id}/deliveries/{delivery_id}
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "delivery_123e4567-e89b-12d3-a456-426614174000",
    "webhook_id": "webhook_123e4567-e89b-12d3-a456-426614174000",
    "event_type": "article.generated",
    "status": "success",
    "request": {
      "url": "https://your-app.com/webhooks/sportscribe",
      "headers": {
        "Content-Type": "application/json",
        "X-SportScribe-Event": "article.generated",
        "X-SportScribe-Delivery": "delivery_123e4567-e89b-12d3-a456-426614174000"
      },
      "payload": {
        "event": "article.generated",
        "timestamp": "2024-01-15T20:05:00Z",
        "data": {
          "article_id": "123e4567-e89b-12d3-a456-426614174000"
        }
      }
    },
    "response": {
      "status_code": 200,
      "headers": {
        "Content-Type": "text/plain"
      },
      "body": "OK",
      "time_ms": 150
    },
    "delivered_at": "2024-01-15T20:05:00Z"
  }
}
```

### Retry Delivery

```http
POST /api/webhooks/{webhook_id}/deliveries/{delivery_id}/retry
Authorization: Bearer <access_token>
```

## Testing Webhooks

### Webhook Testing Tool

Sport Scribe provides a webhook testing endpoint for development:

```http
POST /api/webhooks/test
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "webhook_id": "webhook_123e4567-e89b-12d3-a456-426614174000",
  "event": "article.generated",
  "payload": {
    "article_id": "test_123e4567-e89b-12d3-a456-426614174000",
    "title": "Test Article"
  }
}
```

### Local Development

For local development, you can use tools like ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose local port 3000
ngrok http 3000

# Use the ngrok URL for your webhook
# https://abc123.ngrok.io/webhooks/sportscribe
```

### Example Implementation

```python
from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/webhooks/sportscribe', methods=['POST'])
def handle_sportscribe_webhook():
    event_type = request.headers.get('X-SportScribe-Event')
    payload = request.get_json()

    logging.info(f"Received webhook: {event_type}")

    try:
        if event_type == 'article.generated':
            handle_article_generated(payload['data'])
        elif event_type == 'article.published':
            handle_article_published(payload['data'])
        elif event_type == 'generation.failed':
            handle_generation_failed(payload['data'])
        else:
            logging.warning(f"Unknown event type: {event_type}")

        return jsonify({"status": "success"}), 200

    except Exception as e:
        logging.error(f"Error processing webhook: {str(e)}")
        return jsonify({"error": str(e)}), 500

def handle_article_generated(data):
    """Handle article generation completion."""
    article_id = data['article_id']
    logging.info(f"Article {article_id} generated successfully")

    # Your custom logic here
    # e.g., send notification, update database, etc.

def handle_article_published(data):
    """Handle article publication."""
    article_id = data['article_id']
    title = data['title']
    logging.info(f"Article published: {title}")

    # Your custom logic here

def handle_generation_failed(data):
    """Handle generation failure."""
    generation_id = data['generation_request_id']
    error = data['error']
    logging.error(f"Generation {generation_id} failed: {error['message']}")

    # Your custom logic here

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

## Security Best Practices

1. **Always verify signatures** to ensure webhooks are from Sport Scribe
2. **Validate timestamps** to prevent replay attacks
3. **Use HTTPS** for your webhook endpoints
4. **Implement rate limiting** to handle webhook bursts
5. **Log webhook events** for debugging and monitoring
6. **Handle idempotency** to prevent duplicate processing
7. **Keep secrets secure** and rotate them regularly

## Related Documentation

- [API Endpoints](./endpoints.md)
- [Authentication](./authentication.md)
- [Error Handling](../development/error-handling.md)
- [Security Guide](../development/security.md)
