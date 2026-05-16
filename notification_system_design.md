# Notification System Design

# Stage 1

## Overview

The system is designed to support real-time notifications for students using REST APIs and scalable backend architecture. The platform supports notification creation, retrieval, read status tracking, deletion, and real-time delivery.

Supported notification types:
- Event
- Result
- Placement

---

## Core Actions

1. Create Notification
2. Fetch Notifications
3. Mark Notification as Read
4. Delete Notification
5. Fetch Unread Notifications
6. Real-Time Notification Delivery

---

# REST API Design

## 1. Fetch Notifications

### Endpoint

```http
GET /api/v1/notifications