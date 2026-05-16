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


# Stage 2

## Suggested Database

I would use PostgreSQL as the primary database because:

- Strong ACID compliance
- Reliable transactions
- Efficient indexing
- Good scalability
- Suitable for relational notification data

---

## Database Schema

### users

| Column | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| created_at | TIMESTAMP |

### notifications

| Column | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| type | ENUM(Event, Result, Placement) |
| title | VARCHAR |
| message | TEXT |
| is_read | BOOLEAN |
| created_at | TIMESTAMP |

---

## Important Indexes

```sql
CREATE INDEX idx_notifications_user
ON notifications(user_id);

CREATE INDEX idx_notifications_read
ON notifications(is_read);

CREATE INDEX idx_notifications_created
ON notifications(created_at);

# Stage 3

## Existing Query

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;

# Stage 4

## Problem

Notifications are fetched from the database on every page load for every student. This creates:

- High database load
- Slow API response
- Poor user experience
- Increased server cost

---

## Suggested Improvements

### 1. Pagination

Fetch notifications in smaller batches.

Example:

```http
GET /api/v1/notifications?page=1&limit=20