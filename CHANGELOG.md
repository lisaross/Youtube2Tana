# Changelog

All notable changes to the YouTube to Tana Raycast extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive testing setup with Vitest
- Unit tests for utility functions
- Test coverage reporting
- Mock implementations for browser APIs
- Test documentation in README

## [1.0.0] - 2025-03-20

### Added
- Initial release of YouTube to Tana Raycast extension
- One-click extraction of YouTube video metadata
- Formatting of extracted data for Tana import
- Support for video title, URL, channel URL, author name, and full description
- Preservation of description formatting including timestamps and sections
- Automatic clipboard integration for easy pasting into Tana
- TypeScript setup with strict typing
- ESLint and Prettier configuration for code quality
- Browser wrapper for API interactions with YouTube

### Changed
- Refactored project structure for better organization
- Enhanced README with comprehensive documentation
- Modified VideoInfo type to include video URL
- Improved formatting logic for better Tana integration

### Removed
- Removed Vitest and related dependencies to streamline project
- Eliminated redundant mock files to simplify testing setup

[Unreleased]: https://github.com/lisaross/Youtube2Tana/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/lisaross/Youtube2Tana/releases/tag/v1.0.0 