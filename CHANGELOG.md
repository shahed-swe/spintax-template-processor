# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-13

### Added
- Initial release
- Core spintax parsing functionality
- Support for text variations with `{option1|option2}` syntax
- Nested spintax support
- Conditional logic with mathematical and comparison operators
- Variable substitution with `{var:variable_name}` syntax
- Media support for images, attachments, and URLs
- Multiple utility functions for validation, extraction, and analysis
- Comprehensive documentation and examples
- ES Module support

### Features
- `parseSpintax()` - Basic spintax parsing
- `parseSpintaxWithConditionals()` - Parse with conditional logic
- `parseSpintaxWithMedia()` - Parse with media extraction
- `generateSpintaxVariations()` - Generate multiple variations
- `validateSpintax()` - Syntax validation
- `validateSpintaxWithMedia()` - Enhanced validation
- `countSpintaxVariations()` - Count possible combinations
- `extractSpintaxPatterns()` - Extract patterns
- `extractMediaFromSpintax()` - Extract media references
- `extractConditionalsFromSpintax()` - Extract conditionals
- `generateSampleVariables()` - Generate test data
- `getConditionalTemplates()` - Get common templates
