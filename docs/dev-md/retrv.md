# Retrv

> **A community-powered Lost & Found platform designed to turn isolated lost-item posts into searchable, social, real-time recovery workflows.**

| Project Information | Details |
| --- | --- |
| Project Type | Personal Product / Community Mobile Platform |
| Platform | Hybrid Mobile Application |
| Status | Active Development |
| Repository | https://github.com/jczamora-git/retrv-app |
| Core Focus | Lost & Found, community interaction, realtime messaging, push notifications |

## Project Overview

Retrv is a community Lost & Found platform built around the idea that recovering belongings works better when people can collaborate around one structured report.

Instead of functioning as a basic classified-listing board, Retrv combines:

- lost and found reports
- photos
- categories and location details
- public comments
- threaded replies
- private messaging
- member profiles
- notifications
- push notifications
- resolution tracking
- community merit / achievement recognition

The product is designed as a social recovery workflow where a report can move from discovery to discussion, private coordination, resolution, and recognition of the person who helped.

## Core Community Flow

```text
ITEM IS LOST
     ↓
USER CREATES REPORT
     ↓
COMMUNITY DISCOVERS POST
     ↓
COMMENTS / SIGHTINGS / CLUES
     ↓
PRIVATE CONVERSATION
     ↓
ITEM IS RETURNED
     ↓
POST MARKED RESOLVED
     ↓
HELPER CAN RECEIVE MERIT
```

## Lost & Found Posts

Users can create structured Lost or Found reports containing information such as:

- item name
- description
- category
- subcategory
- photo
- location
- date
- status
- optional coordinate data

Posts support states such as:

- open
- resolved
- claimed

## Community Discussions

Each report can become a discussion thread.

Community members can add comments and replies to provide:

- possible sightings
- item-identification details
- location information
- ownership clues
- recovery updates

Keeping these conversations attached to the original post helps prevent useful information from being scattered across unrelated chat channels.

## Private Messaging

Retrv includes private conversation and message models for situations where sensitive details should not be posted publicly.

Examples include:

- exact handoff locations
- ownership verification
- meetup coordination
- private identifying details

The data model includes dedicated conversation and message records.

## Realtime Chat

Private messaging uses Supabase realtime subscriptions.

Conversation channels can listen for database changes and update live message state without requiring manual refreshes.

The application also maintains unread-message behavior and user-level realtime updates.

## Community Merit System

Retrv includes a recognition system for people who successfully help recover belongings.

When a report is resolved, the owner can associate the resolution with the community member who helped.

Achievement levels can represent repeated positive participation, turning successful returns into visible community trust signals.

## Member Profiles

Profiles can surface information such as:

- profile photo
- display name
- username
- posts
- lost reports
- found reports
- resolved reports
- achievements
- community activity

## Search & Filtering

Lost and Found reports can be explored using attributes such as:

- Lost / Found type
- categories
- subcategories
- keywords
- item details
- location
- resolution state

## Image Uploads

Post images are handled through an UploadThing-based upload workflow.

The application includes dedicated image-upload logic for post media and profile imagery.

## Notifications

Retrv supports in-app notification records for activities such as:

- messages
- comments
- replies
- new posts
- merit awards
- resolved posts
- post updates

Users can control notification categories through stored preference settings.

## Mobile Push Notifications

The application includes a push-notification pipeline with:

- mobile push-token storage
- notification preference records
- Firebase / FCM integration
- server-side notification delivery logic

The repository includes a Supabase Edge Function for sending push notifications through FCM.

## Data Architecture

The Supabase/PostgreSQL schema includes domains for:

```text
profiles
posts
comments
conversations
messages
notifications
push_tokens
notification_preferences
achievements
subcategories
lost_found activity
```

Core post records include fields for:

- author
- category / subcategory
- location
- Lost / Found type
- status
- photos
- coordinates
- resolution target
- resolution timestamp

## Security Model

Row Level Security is enabled on the main Supabase tables in the repository schema.

Because Retrv is under active development, portfolio claims should remain limited to the fact that RLS-enabled tables and application authorization flows exist; the project should not be presented as having completed security hardening without a dedicated security review.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Ionic Vue 9 |
| UI Runtime | Vue 3.5 |
| Language | TypeScript |
| Build Tool | Vite |
| Native Runtime | Capacitor 8 |
| Backend / Database | Supabase / PostgreSQL |
| Realtime | Supabase Realtime |
| Authentication | Supabase Auth |
| Image Upload | UploadThing |
| Push Infrastructure | Firebase / Firebase Admin / FCM |
| Server Utilities | Express |
| Mobile Push | Capacitor Push Notifications |
| UI Components | Reka UI / Ionic |
| Unit Testing Tooling | Vitest |
| E2E Testing Tooling | Cypress |

## Application Architecture

```text
                    RETRV MOBILE APP
                          │
                          ▼
                    IONIC VUE UI
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
       ▼                  ▼                  ▼
 LOST/FOUND POSTS     REALTIME CHAT      NOTIFICATIONS
       │                  │                  │
       ├── comments       ├── messages      ├── in-app
       ├── photos         ├── unread        └── push / FCM
       └── resolution     └── realtime
                          │
                          ▼
                 SUPABASE / POSTGRESQL
                          │
               ┌──────────┼──────────┐
               ▼          ▼          ▼
             Auth       Realtime     Data
```

## Engineering Highlights

### 1. Social Recovery Workflow

Retrv models the complete recovery process rather than only storing listings.

The product architecture connects:

```text
report
→ discussion
→ private coordination
→ resolution
→ community recognition
```

### 2. Realtime Messaging

Messaging is implemented as a database-backed conversation system with Supabase realtime updates.

This gives the application a live community experience without requiring a separately hosted websocket backend.

### 3. Notification Preferences

Push and in-app notification categories can be controlled at the user preference level.

This prevents every event type from being treated as equally important.

### 4. Push Delivery Pipeline

The system includes persistent device push tokens and server-side push delivery using an FCM-oriented workflow.

### 5. Community Reputation

The merit/achievement model gives successful recovery activity a durable identity-level signal rather than limiting the experience to isolated posts.

### 6. Structured Lost & Found Data

Posts store structured attributes such as type, category, location, status, photos, and resolution metadata.

That structure makes searching and filtering more useful than a freeform social post alone.

## What This Project Demonstrates

Retrv demonstrates experience in:

- Ionic Vue / Vue 3
- TypeScript
- Capacitor mobile applications
- Supabase
- PostgreSQL schema design
- realtime database subscriptions
- private messaging
- social/community product architecture
- push notifications
- Firebase Cloud Messaging
- notification preference systems
- media upload workflows
- community reputation mechanics
- search and filtering
- mobile product design
- hybrid app development

## Suggested Portfolio Screenshots

1. Lost & Found feed
2. Create Lost/Found report
3. Post details with comments
4. Threaded reply interface
5. Search and filtering
6. Private conversation
7. Realtime chat
8. Notifications screen
9. Notification settings
10. Member profile
11. Community merit / achievement badge
12. Resolved-post workflow

## Short Portfolio Description

> **Retrv** is a community-powered Lost & Found mobile platform built with Ionic Vue, TypeScript, Capacitor, and Supabase. It combines structured item reporting, public discussions, realtime private messaging, media uploads, resolution tracking, achievements, and push notifications into a social workflow for helping people recover lost belongings.

## Suggested Portfolio Tags

`Ionic Vue` `Vue 3` `TypeScript` `Capacitor` `Supabase` `PostgreSQL` `Realtime` `Firebase` `FCM` `Push Notifications` `UploadThing` `Mobile Development` `Community Platform` `Lost & Found`

## Card Copy

**Retrv**  
Community Lost & Found platform with structured reports, realtime messaging, public discussions, resolution tracking, achievements, and mobile push notifications.

**Category:** Personal Product  
**Focus:** Community Platform / Realtime Mobile App
