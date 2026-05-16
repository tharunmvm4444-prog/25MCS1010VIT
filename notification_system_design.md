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

# Stage 5

## Problems in Existing Implementation

The current implementation has several issues:

1. Sequential processing is slow
2. Failure handling is weak
3. No retry mechanism
4. Email API failures can stop processing
5. Tight coupling between DB and email service
6. Poor scalability for 50,000 students

---

## What Happens if Email Fails for 200 Students?

Some students may receive:
- only database notification
- only app notification
- no email

This creates inconsistency.

---

## Recommended Solution

Use asynchronous event-driven architecture with message queues.

Suggested tools:
- RabbitMQ
- Kafka
- AWS SQS

---

## Improved Architecture

1. API receives notify_all request
2. Notifications are pushed into queue
3. Worker services process jobs independently
4. Failed jobs are retried automatically
5. Logging and monitoring are added

---

## Should DB Save and Email Send Happen Together?

No.

Reason:

- Email systems are external services
- External APIs can fail or timeout
- Database transactions should remain short and reliable

Instead:
1. Save notification in DB
2. Push email task to queue
3. Process email asynchronously

---

## Revised Pseudocode

```python
def notify_all(student_ids, message):

    for student_id in student_ids:

        save_notification_to_db(student_id, message)

        publish_to_queue({
            "student_id": student_id,
            "message": message
        })


def email_worker(job):

    try:
        send_email(job["student_id"], job["message"])
        push_to_app(job["student_id"], job["message"])

    except Exception:
        retry_job(job)


# Stage 6

## Priority Inbox Design

The system prioritizes unread notifications using:

1. Notification type weight
2. Recency score

Priority order:

```text
Placement > Result > Event