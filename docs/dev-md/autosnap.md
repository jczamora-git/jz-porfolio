# AutoSnap

> **A Windows capture and local transcription application for automatically documenting screens, videos, meetings, and browser sessions without sending media to cloud transcription services.**

| Project Information | Details |
| --- | --- |
| Project Type | Personal Product / Desktop Productivity Tool |
| Platform | Windows 10 / 11 |
| Version | 1.2 |
| Repository | https://github.com/jczamora-git/AutoSnap |
| Core Focus | Automated capture, offline transcription, local media processing |

## Project Overview

AutoSnap is a Windows desktop application for automatically capturing screenshots and producing local speech-to-text transcripts.

It combines several workflows that are normally handled by separate tools:

- timed screenshot capture
- window and monitor capture
- browser-tab capture
- local video frame extraction
- system-audio capture
- browser-tab audio capture
- local Whisper transcription
- subtitle/text export
- transcript recovery
- background system-tray operation

The application is designed around local processing and privacy. Screenshots, video frames, and transcriptions stay on the user's machine rather than being sent to an external transcription API.

## Core Features

### Automatic Screen Capture

AutoSnap can capture:

- individual application windows
- full displays / monitors
- browser tabs
- manual snapshots

Capture intervals can be configured using preset or custom timings.

### Browser Tab Capture

Browser-tab capture uses the browser's native media-sharing workflow through `getDisplayMedia`.

This allows users to explicitly choose a tab or visual source rather than requiring unsafe browser automation.

### Live Preview

The capture workflow includes a live visual preview with throttling so the user can confirm the selected source without continuously performing unnecessary full-rate updates.

### System Tray Operation

AutoSnap can continue running in the background through a Windows system-tray workflow.

This supports long capture sessions without requiring the main window to remain open in the foreground.

## Local Video Processing

AutoSnap can process existing media files without replaying them in real time.

Supported workflows include:

- interval-based frame extraction
- snapshot generation
- video metadata inspection
- audio extraction
- transcription
- combined snapshot + transcription jobs
- progress reporting
- cancellation

Video processing uses **FFmpeg / FFprobe**.

A representative frame extraction flow is:

```text
LOCAL VIDEO
    ↓
FFprobe metadata
    ↓
Configured time intervals
    ↓
FFmpeg frame extraction
    ↓
JPEG / PNG snapshots
```

## Offline Whisper Transcription

AutoSnap includes local speech-to-text functionality powered by Whisper.

The transcription pipeline is designed to work without a cloud transcription API.

### Supported Audio Sources

- Windows system audio
- browser-tab audio
- local audio files
- local video files

### System Audio Capture

Windows desktop audio is captured through **WASAPI loopback** using NAudio.

This allows the application to transcribe content such as:

- meetings
- lectures
- browser video
- calls
- desktop media

without requiring microphone capture.

### Language Modes

The application supports:

- Taglish
- English
- Filipino / Tagalog
- automatic language detection

The Taglish mode is specifically useful for mixed Filipino-English speech.

### Transcript Export

Transcripts can be exported as:

- TXT
- SRT
- VTT

A built-in editor allows the transcript to be reviewed before export.

### Transcript Recovery

Long-running transcription sessions are protected by periodic autosave.

The current default configuration saves transcript recovery data every **30 seconds**.

## Whisper Model Management

AutoSnap includes a model manager for locally downloaded Whisper models.

Supported model families include options such as:

- Tiny
- Base
- Small
- Medium
- Large variants
- Turbo variants

The application also includes hardware-aware recommendations based on available system resources.

This helps users choose a model that better matches their CPU and memory capacity.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Language | C# |
| Runtime | .NET 8 |
| Desktop UI | Windows Forms |
| Audio | NAudio |
| Speech-to-Text | Whisper.net |
| Video Processing | FFmpeg / FFprobe |
| Browser Capture | `getDisplayMedia` bridge |
| System Audio | WASAPI Loopback |
| Packaging | Self-contained win-x64 |
| Installer | Inno Setup |
| Release Automation | GitHub Actions |

## Application Architecture

```text
                    AUTOSNAP
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
 SCREEN CAPTURE    LOCAL VIDEO      TRANSCRIPTION
       │               │                │
       │            FFmpeg              │
       │               │                ├── System Audio
       │               │                ├── Browser Audio
       │               │                └── Local Media
       │               │
       └───────────────┴────────────────┘
                       │
                       ▼
                 LOCAL OUTPUT
                       │
              ┌────────┼─────────┐
              ▼        ▼         ▼
           Images     TXT       SRT/VTT
```

## Engineering Highlights

### 1. Multi-Source Capture

The application supports several capture models instead of being tied to one source type.

That makes the same tool useful for:

- automated documentation
- meeting capture
- browser sessions
- lectures
- video review
- offline transcription

### 2. Browser Capture Through Native Consent

Browser-tab capture relies on the browser's native sharing permission flow.

This avoids silently capturing arbitrary browser content.

### 3. Offline Transcription

The transcription system runs locally, preserving privacy and avoiding recurring API usage costs.

### 4. WASAPI Loopback

System-audio transcription captures desktop output directly through Windows audio APIs rather than mixing microphone audio into the source.

### 5. Non-Real-Time Video Extraction

Frame extraction does not require waiting for a video to play from beginning to end.

FFmpeg can seek directly to configured timestamps and extract frames as a processing job.

### 6. Crash-Resistant Long Sessions

Periodic transcript autosave protects longer transcription workflows from losing all progress after a crash or unexpected shutdown.

### 7. Hardware-Aware Model Selection

Whisper model selection is treated as a performance problem, not only a UI option.

The application inspects local machine capabilities and recommends models based on available hardware.

## Privacy

AutoSnap is designed around local media processing.

The project states that:

- screenshots remain local
- extracted video frames remain local
- transcription runs locally
- browser sharing requires explicit user permission
- the capture bridge runs on local loopback
- screenshots and audio are not intentionally sent to cloud transcription APIs

## Packaging & Distribution

AutoSnap supports:

- Windows installer builds
- portable ZIP builds
- SHA-256 checksums
- self-contained Windows releases

The repository includes an Inno Setup installer and GitHub release automation.

## What This Project Demonstrates

AutoSnap demonstrates experience in:

- C# / .NET desktop applications
- Windows Forms
- screen capture
- Windows audio APIs
- WASAPI loopback
- NAudio
- Whisper speech-to-text
- offline AI inference
- FFmpeg automation
- browser media capture
- background system-tray applications
- asynchronous processing
- progress/cancellation workflows
- local-first privacy architecture
- installer creation
- GitHub release automation

## Suggested Portfolio Screenshots

1. Capture dashboard
2. Window / monitor source selection
3. Browser-tab capture prompt
4. Live capture preview
5. Local Video processing screen
6. Frame extraction progress
7. Transcription workspace
8. Taglish language selection
9. Whisper Model Manager
10. Transcript editor/export
11. System tray controls
12. Settings / FFmpeg configuration

## Short Portfolio Description

> **AutoSnap** is a .NET 8 Windows desktop application for automated screenshot capture, FFmpeg-based video frame extraction, and fully local Whisper transcription. It supports display, window, browser-tab, system-audio, and local-media workflows while keeping captured content and speech processing on the user's machine.

## Suggested Portfolio Tags

`C#` `.NET 8` `Windows Forms` `Whisper` `Whisper.net` `FFmpeg` `NAudio` `WASAPI` `Speech-to-Text` `Offline AI` `Desktop Development` `Screen Capture` `Local-First` `Inno Setup`

## Card Copy

**AutoSnap**  
Windows capture and offline transcription tool combining timed screenshots, browser and display capture, FFmpeg video processing, and local Whisper speech-to-text.

**Category:** Personal Product  
**Focus:** Desktop Automation / Offline AI
