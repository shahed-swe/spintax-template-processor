# Spintax Template Processor

[![npm version](https://img.shields.io/npm/v/spintax-template-processor.svg)](https://www.npmjs.com/package/spintax-template-processor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful and flexible spintax parser and template processor with support for text variations, nested spintax, conditional logic, variables, and media attachments. Perfect for email templates, content generation, A/B testing, and dynamic messaging.

## Features

✨ **Text Variations** - Generate randomized content variations  
🔄 **Nested Spintax** - Support for deeply nested patterns  
🎯 **Conditional Logic** - Mathematical and comparison conditions  
📝 **Variable Substitution** - Dynamic variable replacement  
🖼️ **Media Support** - Handle images, attachments, and URLs  
✅ **Validation** - Built-in syntax validation  
📊 **Analytics** - Count possible variations and extract patterns  

## Installation

```bash
npm install spintax-template-processor
```

## Quick Start

```javascript
import { parseSpintax, parseSpintaxWithConditionals } from 'spintax-template-processor';

// Basic text variation
const text = "{Hello|Hi|Hey} {world|universe}!";
const result = parseSpintax(text);
// Output: "Hello world!" or "Hi universe!" or any combination

// With conditional logic
const template = "{if:customer_id%2==0?Welcome back, valued customer!:Hello there, new friend!}";
const variables = { customer_id: 42 };
const parsed = parseSpintaxWithConditionals(template, variables);
console.log(parsed.text);
// Output: "Welcome back, valued customer!"
```

## Usage Examples

### 1. Basic Text Variations

```javascript
import { parseSpintax, generateSpintaxVariations } from 'spintax-template-processor';

const text = "{Good morning|Hello|Hi there}, {how are you|what's up}?";

// Single variation
console.log(parseSpintax(text));
// Output: "Good morning, how are you?" (random)

// Multiple unique variations
const variations = generateSpintaxVariations(text, 5);
console.log(variations);
// Output: [
//   "Good morning, how are you?",
//   "Hello, what's up?",
//   "Hi there, how are you?",
//   ...
// ]
```

### 2. Nested Spintax

```javascript
const nested = "{Hello {world|universe}|Hi {there|everyone}}!";
const result = parseSpintax(nested);
// Output: "Hello world!" or "Hi there!" or other combinations
```

### 3. Conditional Logic

```javascript
import { parseSpintaxWithConditionals } from 'spintax-template-processor';

// Mathematical conditions
const template = "{if:order_total>100?🎉 Free shipping!:Order $100 for free shipping}";
const result = parseSpintaxWithConditionals(template, { order_total: 150 });
console.log(result.text);
// Output: "🎉 Free shipping!"

// Modulo operations
const evenOdd = "{if:user_id%2==0?Even user:Odd user}";
const result2 = parseSpintaxWithConditionals(evenOdd, { user_id: 42 });
// Output: "Even user"

// Nested conditionals
const nested = "{if:is_vip?{if:order_total>200?Premium VIP:Standard VIP}:Regular customer}";
const result3 = parseSpintaxWithConditionals(nested, { is_vip: true, order_total: 250 });
// Output: "Premium VIP"
```

### 4. Variable Substitution

```javascript
const template = "Dear {var:firstname} {var:lastname}, your order #{var:order_id} is ready!";
const variables = {
  firstname: "John",
  lastname: "Doe",
  order_id: "12345"
};

const result = parseSpintaxWithConditionals(template, variables);
console.log(result.text);
// Output: "Dear John Doe, your order #12345 is ready!"
```

### 5. Media Support (Images, Attachments, URLs)

```javascript
import { parseSpintaxWithMedia, extractMediaFromSpintax } from 'spintax-template-processor';

// Images
const imageTemplate = "Check out this {img:product1.jpg|img:product2.jpg|img:product3.jpg}!";
const result = parseSpintaxWithMedia(imageTemplate);
console.log(result);
// Output: {
//   text: "Check out this [IMAGE: product2.jpg]!",
//   images: ["product2.jpg"],
//   attachments: [],
//   urls: []
// }

// Attachments
const attachTemplate = "See {att:report.pdf|att:summary.pdf}";
const result2 = parseSpintaxWithMedia(attachTemplate);

// URLs
const urlTemplate = "Visit {url:https://example1.com|url:https://example2.com}";
const result3 = parseSpintaxWithMedia(urlTemplate);

// Extract all media references
const allMedia = extractMediaFromSpintax(imageTemplate);
console.log(allMedia);
// Output: {
//   images: ["product1.jpg", "product2.jpg", "product3.jpg"],
//   attachments: [],
//   urls: []
// }
```

### 6. Validation

```javascript
import { validateSpintax, validateSpintaxWithMedia } from 'spintax-template-processor';

// Basic validation
const valid = validateSpintax("{Hello|Hi} world!");
console.log(valid);
// Output: { isValid: true, errors: [] }

const invalid = validateSpintax("{Hello|Hi world!");
console.log(invalid);
// Output: { isValid: false, errors: ["Unmatched opening brace(s)"] }

// Validate with media
const mediaValid = validateSpintaxWithMedia("{img:photo.jpg|img:image.png}");
console.log(mediaValid);
// Output: { isValid: true, errors: [], media: {...} }
```

### 7. Analytics and Utilities

```javascript
import { 
  countSpintaxVariations, 
  extractSpintaxPatterns,
  extractConditionalsFromSpintax 
} from 'spintax-template-processor';

// Count possible variations
const text = "{Hello|Hi|Hey} {world|universe}!";
const count = countSpintaxVariations(text);
console.log(count); // Output: 6

// Extract patterns
const patterns = extractSpintaxPatterns(text);
console.log(patterns); // Output: ["{Hello|Hi|Hey}", "{world|universe}"]

// Extract conditionals
const conditional = "{if:age>18?Adult content:General content}";
const extracted = extractConditionalsFromSpintax(conditional);
console.log(extracted);
// Output: {
//   conditionals: [{
//     condition: "age>18",
//     trueValue: "Adult content",
//     falseValue: "General content"
//   }],
//   variables: ["age"]
// }
```

## API Reference

### Core Functions

#### `parseSpintax(text)`
Parse spintax text and return a random variation.

- **Parameters:** `text` (string) - Text containing spintax syntax
- **Returns:** string - Parsed text with random variations

#### `parseSpintaxWithConditionals(text, variables)`
Parse spintax with conditional logic and variable substitution.

- **Parameters:** 
  - `text` (string) - Text containing spintax syntax
  - `variables` (object) - Variable values for conditions and substitution
- **Returns:** object - `{ text, images, attachments, urls, variables }`

#### `parseSpintaxWithMedia(text)`
Parse spintax and extract media references.

- **Parameters:** `text` (string)
- **Returns:** object - `{ text, images, attachments, urls }`

#### `generateSpintaxVariations(text, count)`
Generate multiple unique variations.

- **Parameters:**
  - `text` (string)
  - `count` (number) - Number of variations to generate (default: 5)
- **Returns:** array - Array of unique variations

### Validation Functions

#### `validateSpintax(text)`
Validate spintax syntax.

- **Parameters:** `text` (string)
- **Returns:** object - `{ isValid, errors }`

#### `validateSpintaxWithMedia(text)`
Enhanced validation with media support.

- **Parameters:** `text` (string)
- **Returns:** object - `{ isValid, errors, media }`

### Utility Functions

#### `countSpintaxVariations(text)`
Count total possible variations.

#### `extractSpintaxPatterns(text)`
Extract all spintax patterns from text.

#### `extractMediaFromSpintax(text)`
Extract all media references (images, attachments, URLs).

#### `extractConditionalsFromSpintax(text)`
Extract conditional patterns and variables.

#### `generateSampleVariables()`
Generate sample variables for testing.

#### `getConditionalTemplates()`
Get common conditional pattern templates.

## Syntax Guide

### Text Variations
```javascript
"{Hello|Hi|Hey} {world|universe}!"
```

### Nested Spintax
```javascript
"{Hello {world|universe}|Hi {there|everyone}}!"
```

### Conditionals
```javascript
"{if:condition?true_value:false_value}"
"{if:age>18?Adult:Minor}"
"{if:count%2==0?Even:Odd}"
```

### Variables
```javascript
"{var:variable_name}"
"Hello {var:firstname}!"
```

### Media
```javascript
"{img:image1.jpg|img:image2.jpg}"
"{att:document.pdf|att:file.docx}"
"{url:https://example1.com|url:https://example2.com}"
```

## Use Cases

- 📧 **Email Marketing** - Personalized email campaigns with variations
- 🤖 **Chatbots** - Dynamic response generation
- 📝 **Content Generation** - Blog posts, social media content
- 🎯 **A/B Testing** - Test different message variations
- 📱 **SMS Marketing** - Variable text messages
- 🎨 **Template Systems** - Dynamic content rendering
- 📊 **Reporting** - Customized report generation

## Browser Support

This is an ES Module package that works in Node.js 14+ and modern browsers.

```html
<!-- Browser usage -->
<script type="module">
  import { parseSpintax } from './node_modules/spintax-template-processor/index.js';
  
  const result = parseSpintax("{Hello|Hi} World!");
  console.log(result);
</script>
```

## TypeScript

While this package is written in JavaScript, it includes JSDoc comments for IDE support. For TypeScript projects, types can be inferred automatically.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [flashsites-org](https://github.com/flashsites-org)

## Links

- [GitHub Repository](https://github.com/flashsites-org/spintax-template-processor)
- [npm Package](https://www.npmjs.com/package/spintax-template-processor)
- [Report Issues](https://github.com/flashsites-org/spintax-template-processor/issues)

## Support

If you find this package helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation

---

Made with ❤️ by [flashsites-org](https://github.com/flashsites-org)
