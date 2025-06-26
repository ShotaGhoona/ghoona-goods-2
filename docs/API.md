# API Documentation

## Overview
This document describes the API endpoints for the Ghoona Goods application.

## Base URL
- Development: `http://localhost:8000`
- Production: TBD

## Authentication
The API uses Clerk for authentication. Include the bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
- **GET** `/health`
- **Description**: Check API health status
- **Response**: 
  ```json
  {
    "status": "healthy"
  }
  ```

### API Version 1

#### Test Endpoint
- **GET** `/api/v1/test`
- **Description**: Test endpoint to verify API v1 is working
- **Response**:
  ```json
  {
    "message": "API v1 is working!"
  }
  ```

## Error Responses

All error responses follow this format:
```json
{
  "detail": "Error message"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error