# Jeizi OCR Controller

> **A real-time OCR and broadcast-telemetry desktop system built for esports productions, tournament overlays, and live data extraction.**

| Project Information | Details |
| --- | --- |
| Project Type | Personal Product / Broadcast Automation Tool |
| Platform | Windows Desktop |
| Version | 2.0 |
| Repository | https://github.com/jczamora-git/jeizi_ocr |
| Core Focus | Real-time OCR, computer vision, broadcast telemetry, multi-source capture |

## Project Overview

Jeizi OCR Controller is a Windows desktop application that converts live visual broadcast data into structured telemetry.

It can capture frames from displays, application windows, webcams, capture cards, OBS Virtual Camera, video files, or static images, then isolate specific visual regions, preprocess them with OpenCV, run OCR, stabilize recognized values, and dispatch confirmed data to broadcast overlays or external controller systems.

The project was designed around esports production workflows where scoreboards, timers, kills, gold values, player statistics, standings, and other visual data need to become machine-readable in real time.

## Core Architecture

Jeizi OCR Controller uses a four-level configuration hierarchy:

```text
PROFILE
└── SCENE
    └── SOURCE VIEW
        └── OCR FIELD
```

### Profile

A profile represents the complete tournament or production configuration.

It contains:

- scenes
- capture source settings
- OCR intervals
- confirmation thresholds
- field configuration
- output settings

### Scene

Scenes represent distinct broadcast contexts such as:

- Gameplay
- Results
- Draft
- Standings
- MVP

Only the active scene runs automatic OCR, which helps prevent unnecessary processing across inactive tournament contexts.

### Source View

A Source View is a cropped sub-region derived from the base capture source.

Multiple views can share one capture stream, allowing the system to isolate different parts of the broadcast without duplicating the entire capture pipeline.

### OCR Field

An OCR Field defines the final recognition region and OCR behavior for one piece of telemetry.

Examples:

- Blue Kills
- Red Kills
- Gold
- Game Timer
- Player Name
- Player Level
- Player Stats

## Key Features

### Multi-Source Capture

The application supports:

- multi-monitor display capture
- application/window capture
- webcams
- capture cards
- OBS Virtual Camera
- local video files
- static PNG/JPG/BMP images

This makes the same OCR configuration useful during live tournaments, prerecorded analysis, and offline calibration.

### Scene-Based Runtime OCR

Tournament productions can define isolated scene configurations.

Only the active scene performs background OCR, conserving processing resources and keeping output state aligned with the current broadcast context.

### Virtual Source Views

Multiple cropped views can be created from one base frame.

This allows the application to process scoreboard sections, minimaps, timers, player panels, or other regions independently without opening separate capture pipelines.

### OpenCV Preprocessing

Each view can apply image-enhancement filters such as:

- grayscale conversion
- contrast adjustment
- Otsu thresholding
- fixed thresholding
- color keying / chromakey extraction
- inversion
- dilation
- erosion

These filters help normalize broadcast graphics before OCR.

### Interactive OCR Region Editor

OCR fields can be positioned directly over the preview.

The editor includes draggable regions and resize handles for pixel-level adjustment.

### Tournament Templates

The application provides organized field templates for recurring esports data such as:

- team kills
- towers
- lord/objective counts
- gold
- game timers
- player names
- player statistics

### Offline Tesseract OCR

Recognition runs locally through Tesseract.

Specialized recognition modes support:

- numeric values
- decimal values
- timers
- general text

### Noise Rejection & Stabilization

Recognized values are not immediately trusted.

The runtime includes stabilization behavior such as:

- consecutive-match confirmation
- whitespace normalization
- newline normalization
- last-known-good preservation

This helps reduce false updates from noisy video frames.

## Broadcast Output Pipeline

Jeizi OCR Controller can distribute recognized values in several formats.

```text
CAPTURE SOURCE
      ↓
SOURCE VIEW
      ↓
PREPROCESSING
      ↓
OCR FIELD
      ↓
STABILIZATION
      ↓
      ├── TXT FILES
      ├── live_ocr.json
      └── HTTP JSON PUSH
```

### TXT Output

Individual fields can be written to text files such as:

```text
blue_kills.txt
red_kills.txt
game_timer.txt
```

These are suitable for OBS text sources or other broadcast tooling.

### JSON Output

The application can write a consolidated `live_ocr.json` state file for browser-based overlays or custom production systems.

The project uses atomic/batched output behavior to reduce partial writes and file-lock conflicts.

### HTTP Controller Push

Structured JSON telemetry can also be pushed directly to external tournament controller servers.

The application monitors connection state and supports configurable push intervals.

## Backward Compatibility

Version 2 introduced the Scene architecture while preserving compatibility with older profiles.

Legacy configurations are migrated automatically into a default Gameplay scene while preserving:

- view IDs
- source-view bindings
- field coordinates
- templates
- schedules
- filenames
- JSON keys

This allowed a major architecture change without forcing users to rebuild existing tournament profiles manually.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Language | C# 12 |
| Runtime | .NET 8 |
| Desktop UI | Windows Forms |
| OCR | Tesseract 5.2 |
| Computer Vision | OpenCvSharp 4 |
| Camera / Capture Hardware | DirectShowLib |
| Output | TXT / JSON / HTTP |
| Packaging | Self-contained win-x64 |
| Installer | Inno Setup |
| CI/CD | GitHub Actions |

## Engineering Highlights

### 1. Shared Capture Pipeline

Source Views reuse a common captured frame rather than opening duplicate streams for each OCR region.

This keeps the architecture suitable for multi-field tournament telemetry.

### 2. Runtime Scene Isolation

Inactive scenes do not run automatic OCR.

That design separates editing configuration from the runtime OCR context and keeps processing focused on the current production state.

### 3. OCR Stabilization

The system does more than return raw OCR strings.

It includes validation and stabilization logic so broadcast overlays are less likely to react to one bad frame.

### 4. Atomic Output Strategy

TXT and JSON output paths are designed to avoid incomplete state writes and reduce file-locking issues with OBS or browser overlays reading the same files.

### 5. Migration-Safe Architecture Evolution

The Scene system was introduced while preserving legacy profile data automatically.

That is an important engineering concern for a desktop utility where users may have invested significant time configuring field coordinates and templates.

## Testing

Jeizi OCR Controller includes a built-in automated component test suite.

The repository documents **43 test suites** covering areas such as:

- coordinate transformations
- OCR sanitization
- scheduling
- atomic file operations
- realtime push state transitions
- live-data serialization
- image capture
- template grouping
- scene management

Tests can be run through:

```powershell
dotnet run -- --test
```

## Packaging & Release

The project supports self-contained Windows releases.

Available package styles include:

- portable ZIP
- Windows installer
- SHA-256 checksums

The release automation can:

1. compile a self-contained win-x64 build
2. validate native dependencies
3. include Tesseract language models
4. generate a portable package
5. generate checksums
6. build an Inno Setup installer
7. publish release artifacts through GitHub workflows

## What This Project Demonstrates

Jeizi OCR Controller demonstrates experience in:

- C# / .NET desktop development
- Windows Forms
- real-time OCR systems
- OpenCV image preprocessing
- Tesseract integration
- DirectShow capture
- broadcast automation
- realtime telemetry pipelines
- state stabilization
- file synchronization
- HTTP integration
- desktop configuration architecture
- backwards-compatible migrations
- automated testing
- Windows packaging
- CI/CD release automation

## Suggested Portfolio Screenshots

1. Main OCR workspace
2. Gameplay Scene with multiple OCR fields
3. Scene Manager
4. Source View editor
5. OCR field editor with resize handles
6. Preprocessing / threshold controls
7. Live Data panel
8. TXT / JSON output configuration
9. HTTP controller connection state
10. OBS overlay consuming OCR output

## Short Portfolio Description

> **Jeizi OCR Controller** is a .NET 8 desktop system for extracting live esports telemetry from broadcast video. It combines multi-source capture, OpenCV preprocessing, Tesseract OCR, scene-based runtime configuration, stabilization, and atomic TXT/JSON/HTTP output so recognized scoreboard data can drive OBS overlays and tournament control systems in real time.

## Suggested Portfolio Tags

`C#` `.NET 8` `Windows Forms` `Tesseract` `OpenCV` `Computer Vision` `OCR` `DirectShow` `Broadcast Automation` `OBS` `Realtime Systems` `Desktop Development` `Inno Setup` `GitHub Actions`

## Card Copy

**Jeizi OCR Controller**  
Real-time esports OCR and broadcast-telemetry system that converts live video into stabilized TXT, JSON, and HTTP data for overlays and tournament controllers.

**Category:** Personal Product  
**Focus:** Computer Vision / Broadcast Automation
