# Vaultify

> **A privacy-first, offline-first password manager designed to keep credentials encrypted on-device without requiring a cloud account.**

| Project Information | Details |
| --- | --- |
| Project Type | Personal Product / Mobile Security Utility |
| Platform | Android / Hybrid Mobile App |
| Status | Active Development |
| Repository | https://github.com/jczamora-git/VaultManager |
| Core Focus | Local-first security, encryption, biometric access, portable encrypted backups |

## Project Overview

Vaultify is a local-first password manager built around a simple principle: sensitive credentials should remain under the user's control.

The application stores vault data locally and encrypts credentials before they are written to device storage. Core vault access does not depend on a remote account, cloud database, subscription, or internet connection.

Vaultify combines strong local encryption with practical mobile usability through master-password protection, a six-digit quick-unlock PIN, native biometric authentication, configurable auto-lock behavior, encrypted backup and restore, a password generator, categories, favorites, and search.

## Why I Built It

Many password-management workflows trade convenience for privacy by relying heavily on remote accounts and cloud synchronization.

Vaultify explores a different product direction:

- keep the core vault offline
- minimize network dependency
- encrypt data before local persistence
- support multiple secure unlock methods
- preserve portability through encrypted backups
- retain a polished mobile experience without requiring a backend

The result is a security-focused mobile application where the core credential workflow remains usable even without connectivity.

## Core Features

### Local Encrypted Vault

Credential data is encrypted locally using authenticated **AES-GCM-256** encryption.

The project uses the Web Crypto API for cryptographic operations and derives keys using **PBKDF2 + SHA-256**. The current implementation uses a high iteration count for password-based derivation.

### Master Password Protection

The master password acts as the primary vault-unlock mechanism.

It is used during key derivation and is not treated as plaintext application data.

### Six-Digit Quick Unlock PIN

Vaultify includes a faster day-to-day unlock path using a six-digit PIN.

The PIN workflow is protected through PBKDF2-based derivation and includes attempt-lockout behavior.

### Native Biometric Unlock

The Capacitor mobile build integrates device biometrics such as:

- fingerprint authentication
- Face ID / supported platform biometrics

Biometric access is backed by native platform keychain / keystore behavior rather than implementing biometric verification as a purely visual client-side shortcut.

### Password Generator

The built-in password generator supports configurable:

- length
- uppercase / lowercase characters
- numbers
- symbols
- ambiguous-character filtering

Randomization uses cryptographically secure browser APIs rather than `Math.random()`.

### Encrypted Backup & Restore

Users can export a portable encrypted Vaultify backup containing:

- profile information
- stored credentials
- preferences

The exported backup remains encrypted and requires the correct master password to restore.

Raw PIN values and device biometric secrets are not exported as plain backup data.

### Categories, Favorites & Search

Vault contents can be organized using categories and favorites, with local search and filtering for fast retrieval.

### Auto-Lock

Vaultify includes configurable inactivity locking and lock-on-background behavior.

When the vault is locked, sensitive in-memory vault state is cleared.

### Light & Dark Themes

The interface includes a custom red, black, and neutral design system with both light and dark themes.

## Security Architecture

```text
                    RANDOM 256-BIT VAULT KEY
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   MASTER PASSWORD       QUICK-UNLOCK PIN    DEVICE BIOMETRICS
    PBKDF2 + SHA-256      PBKDF2 wrapping     Native secure auth
          │                   │                   │
          └───────────────────┴───────────────────┘
                              │
                              ▼
                       ENCRYPTED VAULT
                       AES-GCM-256
                              │
                              ▼
                       LOCAL STORAGE
```

The application stores encrypted vault data locally through Capacitor-backed device preferences/storage.

Core credential functionality does not require an online backend.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Ionic Vue 8 |
| UI Runtime | Vue 3 Composition API |
| Language | TypeScript |
| Build Tool | Vite |
| State Management | Pinia |
| Routing | Ionic Vue Router |
| Native Runtime | Capacitor 6 |
| Device Storage | Capacitor Preferences |
| Biometrics | Capgo Capacitor Native Biometric |
| Cryptography | Web Crypto API / SubtleCrypto |
| Password Strength | zxcvbn-ts |
| Styling | Custom CSS design system |
| Android Packaging | Capacitor Android / Gradle |
| CI/CD | GitHub Actions |

## Engineering Highlights

### 1. Offline-First Security Model

The core product is deliberately designed without a required cloud backend.

That architectural decision reduces the amount of sensitive credential data that needs to leave the device.

### 2. Multiple Unlock Paths Around One Vault

Vaultify separates convenience from the underlying encrypted data model.

The same secure vault can be unlocked through:

- master password
- quick PIN
- native biometrics

without storing the raw vault contents unencrypted for convenience.

### 3. Cryptographically Secure Password Generation

The password generator uses secure random values and a Fisher-Yates-style shuffle instead of predictable pseudo-random browser utilities.

### 4. Encrypted Portability

The backup system preserves portability without exporting credentials in plaintext.

This allows the user to move or restore a vault while maintaining the application's local-first security model.

### 5. Lifecycle-Aware Locking

The application responds to inactivity and backgrounding events by locking the vault and clearing sensitive in-memory state.

## Build & Release Workflow

Vaultify includes automated Android build and release workflows using GitHub Actions.

The repository supports:

- development builds
- production bundle generation
- Android debug APK builds
- tag-triggered release builds
- GitHub Release publishing

Example release flow:

```text
git tag v1.x.x
        ↓
GitHub Actions
        ↓
Android build
        ↓
APK / AAB artifacts
        ↓
GitHub Release
```

## Privacy Model

Vaultify is designed so that its core vault does not require a cloud service.

Optional network behavior, such as retrieving a website favicon, can access external domains, but credential content itself is not intentionally sent to a remote password-management backend.

## What This Project Demonstrates

Vaultify demonstrates experience in:

- security-oriented application architecture
- local-first product design
- applied cryptography
- AES-GCM authenticated encryption
- PBKDF2 key derivation
- mobile biometric integration
- secure local persistence
- Vue 3 / TypeScript development
- Ionic / Capacitor mobile development
- application lifecycle security
- backup and restore architecture
- Android build automation
- GitHub Actions CI/CD
- UX design for security-sensitive workflows

## Suggested Portfolio Screenshots

1. Vault dashboard
2. Credential detail / edit screen
3. Master-password unlock screen
4. PIN unlock screen
5. Biometric unlock prompt
6. Password generator
7. Category / favorites view
8. Backup / restore flow
9. Settings / auto-lock configuration
10. Light and dark theme comparison

## Short Portfolio Description

> **Vaultify** is a privacy-first, offline-first password manager built with Ionic Vue, TypeScript, and Capacitor. It encrypts credentials locally using AES-GCM-256, derives access keys with PBKDF2, supports master-password, PIN, and native biometric unlock, and includes encrypted backup/restore, secure password generation, auto-lock, and mobile release automation without requiring a cloud vault backend.

## Suggested Portfolio Tags

`Ionic Vue` `Vue 3` `TypeScript` `Capacitor` `Mobile Development` `AES-GCM` `PBKDF2` `Biometrics` `Web Crypto API` `Pinia` `Offline-First` `Security` `Android` `GitHub Actions`

## Card Copy

**Vaultify**  
Privacy-first, offline-first password manager with local AES-GCM encryption, biometric unlock, encrypted backups, and secure mobile vault workflows.

**Category:** Personal Product  
**Focus:** Mobile Security / Local-First Architecture
