import {
  parseSpintax,
  parseSpintaxWithConditionals,
  generateSpintaxVariations,
  validateSpintax,
  countSpintaxVariations
} from './index.js';

// Example 1: Basic text variations
console.log('=== Example 1: Basic Text Variations ===');
const text1 = "{Hello|Hi|Hey} {world|universe}!";
console.log('Template:', text1);
console.log('Result:', parseSpintax(text1));
console.log('Possible combinations:', countSpintaxVariations(text1));
console.log();

// Example 2: Multiple variations
console.log('=== Example 2: Multiple Unique Variations ===');
const variations = generateSpintaxVariations(text1, 5);
variations.forEach((v, i) => console.log(`${i + 1}. ${v}`));
console.log();

// Example 3: Conditional logic
console.log('=== Example 3: Conditional Logic ===');
const conditional = "{if:user_id%2==0?Welcome back, valued customer!:Hello there, new friend!}";
console.log('Template:', conditional);
console.log('Result (user_id=42):', parseSpintaxWithConditionals(conditional, { user_id: 42 }).text);
console.log('Result (user_id=43):', parseSpintaxWithConditionals(conditional, { user_id: 43 }).text);
console.log();

// Example 4: Variables
console.log('=== Example 4: Variable Substitution ===');
const varTemplate = "Dear {var:firstname} {var:lastname}, your order #{var:order_id} is ready!";
const variables = {
  firstname: "John",
  lastname: "Doe",
  order_id: "12345"
};
console.log('Template:', varTemplate);
console.log('Result:', parseSpintaxWithConditionals(varTemplate, variables).text);
console.log();

// Example 5: Complex nested example
console.log('=== Example 5: Complex Nested Example ===');
const complex = "{if:is_vip?{Premium|Exclusive} VIP {offer|deal}:{Standard|Regular} {offer|deal}}";
console.log('Template:', complex);
console.log('Result (is_vip=true):', parseSpintaxWithConditionals(complex, { is_vip: true }).text);
console.log('Result (is_vip=false):', parseSpintaxWithConditionals(complex, { is_vip: false }).text);
console.log();

// Example 6: Validation
console.log('=== Example 6: Validation ===');
const validText = "{Hello|Hi} world!";
const invalidText = "{Hello|Hi world!";
console.log('Valid template:', validText, '→', validateSpintax(validText).isValid);
console.log('Invalid template:', invalidText, '→', validateSpintax(invalidText).isValid);
console.log('Errors:', validateSpintax(invalidText).errors);
