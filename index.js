/**
 * Enhanced Spintax Parser Utility with Conditional Logic
 * 
 * Supports:
 * - Text variations: {option1|option2|option3}
 * - Nested spintax: {Hello {world|universe}|Hi there}
 * - Image variations: {img:image1.jpg|img:image2.jpg|img:image3.jpg}
 * - Attachment variations: {att:document1.pdf|att:document2.pdf}
 * - URL variations: {url:https://example1.com|url:https://example2.com}
 * - Conditional logic: {if:condition?true_value:false_value}
 * - Mathematical conditions: {if:var%2==0?Even message:Odd message}
 * - Comparison conditions: {if:count>5?Many items:Few items}
 * - Variable references: {var:variable_name}
 * 
 * Examples:
 * Text: "{Hello|Hi} {world|universe}!" 
 * Images: "Check out this {img:product1.jpg|img:product2.jpg|img:product3.jpg}!"
 * Conditional: "{if:customer_id%2==0?Welcome back, valued customer!:Hello there, new friend!}"
 * Variable: "Dear {var:customer_name}, your order #{var:order_id} is ready!"
 * Complex: "{if:order_total>100?{img:premium-banner.jpg}|{img:standard-banner.jpg}} - {if:is_vip?VIP pricing available:Regular pricing}"
 */

/**
 * Parse spintax text and return a random variation
 * @param {string} text - Text containing spintax syntax
 * @returns {string} - Parsed text with random variations selected
 */
export function parseSpintax(text) {
  if (!text || typeof text !== 'string') {
    return text || '';
  }

  let result = text;
  let depth = 0;
  const maxDepth = 10; // Prevent infinite loops
  
  // Keep processing until no more spintax patterns are found
  while (result.includes('{') && result.includes('}') && depth < maxDepth) {
    result = processSpintaxLayer(result);
    depth++;
  }
  
  return result;
}

/**
 * Process one layer of spintax patterns
 * @param {string} text - Text to process
 * @returns {string} - Text with one layer of spintax resolved
 */
function processSpintaxLayer(text) {
  // Find all spintax patterns in the text
  const spintaxPattern = /\{([^{}]*)\}/g;
  
  return text.replace(spintaxPattern, (match, content) => {
    // Split by pipe and choose random option
    const options = content.split('|').map(option => option.trim());
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex] || '';
  });
}

/**
 * Generate multiple variations of spintax text
 * @param {string} text - Text containing spintax syntax
 * @param {number} count - Number of variations to generate
 * @returns {string[]} - Array of unique variations
 */
export function generateSpintaxVariations(text, count = 5) {
  if (!text || typeof text !== 'string') {
    return [text || ''];
  }

  const variations = new Set();
  const maxAttempts = count * 3; // Prevent infinite loops
  let attempts = 0;
  
  while (variations.size < count && attempts < maxAttempts) {
    const variation = parseSpintax(text);
    variations.add(variation);
    attempts++;
  }
  
  return Array.from(variations);
}

/**
 * Count total possible variations in spintax text
 * @param {string} text - Text containing spintax syntax
 * @returns {number} - Total number of possible combinations
 */
export function countSpintaxVariations(text) {
  if (!text || typeof text !== 'string') {
    return 1;
  }

  let totalCombinations = 1;
  const spintaxPattern = /\{([^{}]*)\}/g;
  let match;
  
  while ((match = spintaxPattern.exec(text)) !== null) {
    const options = match[1].split('|').filter(option => option.trim());
    totalCombinations *= options.length;
  }
  
  return totalCombinations;
}

/**
 * Validate spintax syntax
 * @param {string} text - Text to validate
 * @returns {object} - Validation result with isValid boolean and errors array
 */
export function validateSpintax(text) {
  if (!text || typeof text !== 'string') {
    return { isValid: true, errors: [] };
  }

  const errors = [];
  
  // Check for balanced braces
  let braceCount = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      braceCount++;
    } else if (text[i] === '}') {
      braceCount--;
      if (braceCount < 0) {
        errors.push('Unmatched closing brace at position ' + i);
        break;
      }
    }
  }
  
  if (braceCount > 0) {
    errors.push('Unmatched opening brace(s)');
  }
  
  // Check for empty spintax patterns
  const emptyPattern = /\{\s*\}/g;
  if (emptyPattern.test(text)) {
    errors.push('Empty spintax pattern found');
  }
  
  // Check for spintax patterns and validate them
  const spintaxPattern = /\{([^{}]*)\}/g;
  let match;
  while ((match = spintaxPattern.exec(text)) !== null) {
    const content = match[1].trim();
    
    // Skip validation for valid patterns
    if (content.startsWith('if:') || 
        content.startsWith('var:') || 
        content.startsWith('img:') || 
        content.startsWith('att:') || 
        content.startsWith('url:') ||
        content.includes('|')) {
      continue;
    }
    
    // Only flag as error if it's truly invalid
    if (content === '') {
      errors.push('Empty spintax pattern found');
    } else {
      errors.push(`Invalid spintax pattern: {${content}} - should contain options separated by | or use var:, if:, img:, att:, or url: syntax`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Extract all spintax patterns from text
 * @param {string} text - Text to analyze
 * @returns {string[]} - Array of spintax patterns found
 */
export function extractSpintaxPatterns(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const patterns = [];
  const spintaxPattern = /\{([^{}]*)\}/g;
  let match;
  
  while ((match = spintaxPattern.exec(text)) !== null) {
    patterns.push(match[0]); // Include the braces
  }
  
  return patterns;
}

/**
 * Preview spintax text with highlighted patterns
 * @param {string} text - Text containing spintax syntax
 * @returns {object} - Object with original text and highlighted version
 */
export function previewSpintax(text) {
  if (!text || typeof text !== 'string') {
    return { original: text || '', highlighted: text || '' };
  }

  const highlighted = text.replace(/\{([^{}]*)\}/g, (match, content) => {
    // Different colors for different types
    if (content.includes('img:')) {
      return `<mark class="bg-blue-200 px-1 rounded" title="Image variation">{${content}}</mark>`;
    } else if (content.includes('att:')) {
      return `<mark class="bg-green-200 px-1 rounded" title="Attachment variation">{${content}}</mark>`;
    } else if (content.includes('url:')) {
      return `<mark class="bg-purple-200 px-1 rounded" title="URL variation">{${content}}</mark>`;
    } else {
      return `<mark class="bg-yellow-200 px-1 rounded" title="Text variation">{${content}}</mark>`;
    }
  });
  
  return {
    original: text,
    highlighted: highlighted
  };
}

/**
 * Evaluate a conditional expression
 * @param {string} condition - The condition to evaluate (e.g., "var%2==0", "count>5")
 * @param {object} variables - Object containing variable values
 * @returns {boolean} - Result of the condition
 */
function evaluateCondition(condition, variables = {}) {
  try {
    // Replace variable references with their values
    let processedCondition = condition;
    
    // Handle variable references
    Object.keys(variables).forEach(varName => {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      processedCondition = processedCondition.replace(regex, variables[varName]);
    });
    
    // Handle common mathematical and comparison operators
    // This is a simplified evaluator - in production, you'd want a more robust parser
    const safeEval = (expr) => {
      // Only allow safe operations
      const allowedChars = /^[0-9+\-*/%()<>=!&|\s.]+$/;
      if (!allowedChars.test(expr)) {
        return false;
      }
      
      try {
        // Replace == with === and != with !==
        expr = expr.replace(/==/g, '===').replace(/!=/g, '!==');
        // Use Function constructor instead of eval for better security
        return new Function(`return ${expr}`)();
      } catch {
        return false;
      }
    };
    
    return safeEval(processedCondition);
  } catch {
    return false;
  }
}

/**
 * Parse spintax with conditional logic and media support
 * @param {string} text - Text containing spintax syntax
 * @param {object} variables - Object containing variable values for conditions
 * @returns {object} - Parsed content with text, images, attachments, and URLs
 */
export function parseSpintaxWithConditionals(text, variables = {}) {
  if (!text || typeof text !== 'string') {
    return {
      text: text || '',
      images: [],
      attachments: [],
      urls: [],
      variables: {}
    };
  }

  const result = {
    text: text,
    images: [],
    attachments: [],
    urls: [],
    variables: { ...variables }
  };

  let processedText = text;
  let depth = 0;
  const maxDepth = 15; // Increased for more complex nesting

  while (processedText.includes('{') && processedText.includes('}') && depth < maxDepth) {
    let hasChanges = false;
    
    // Process innermost patterns first (no nested braces)
    processedText = processedText.replace(/\{([^{}]*)\}/g, (match, content) => {
      hasChanges = true;
      
      // Handle conditional statements: {if:condition?true_value:false_value}
      if (content.startsWith('if:')) {
        const conditionPart = content.substring(3);
        
        // Handle chained conditionals like: if:a?b|if:c?d:e
        if (conditionPart.includes('|if:')) {
          // This is a chained conditional, treat as regular spintax for now
          const options = content.split('|').map(option => option.trim());
          
          // Process each option as a potential conditional
          for (const option of options) {
            if (option.startsWith('if:')) {
              const subConditionPart = option.substring(3);
              const questionMarkIndex = subConditionPart.indexOf('?');
              if (questionMarkIndex !== -1) {
                const condition = subConditionPart.substring(0, questionMarkIndex);
                const valuesPart = subConditionPart.substring(questionMarkIndex + 1);
                const colonIndex = valuesPart.lastIndexOf(':');
                if (colonIndex !== -1) {
                  const trueValue = valuesPart.substring(0, colonIndex);
                  const falseValue = valuesPart.substring(colonIndex + 1);
                  const conditionResult = evaluateCondition(condition, variables);
                  if (conditionResult) {
                    return trueValue;
                  }
                  // If condition is false, continue to next option or return false value
                  if (options.indexOf(option) === options.length - 1) {
                    return falseValue; // Last option, return its false value
                  }
                }
              }
            } else {
              // Non-conditional option, return it (fallback)
              return option;
            }
          }
          return match; // Fallback if nothing matched
        } else {
          // Simple conditional
          const questionMarkIndex = conditionPart.indexOf('?');
          if (questionMarkIndex !== -1) {
            const condition = conditionPart.substring(0, questionMarkIndex);
            const valuesPart = conditionPart.substring(questionMarkIndex + 1);
            const colonIndex = valuesPart.lastIndexOf(':');
            if (colonIndex !== -1) {
              const trueValue = valuesPart.substring(0, colonIndex);
              const falseValue = valuesPart.substring(colonIndex + 1);
              const conditionResult = evaluateCondition(condition, variables);
              return conditionResult ? trueValue : falseValue;
            }
          }
        }
        return match; // Return original if parsing fails
      }
      
      // Handle variable references: {var:variable_name}
      if (content.startsWith('var:')) {
        const varName = content.substring(4);
        return variables[varName] !== undefined ? variables[varName] : `[${varName}]`;
      }
      
      // Handle regular spintax with media (only if no nested braces)
      if (!content.includes('{') && !content.includes('}')) {
        const options = content.split('|').map(option => option.trim());
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex] || '';

        // Handle different types of content
        if (selectedOption.startsWith('img:')) {
          const imagePath = selectedOption.substring(4);
          result.images.push(imagePath);
          return `[IMAGE: ${imagePath}]`;
        } else if (selectedOption.startsWith('att:')) {
          const attachmentPath = selectedOption.substring(4);
          result.attachments.push(attachmentPath);
          return `[ATTACHMENT: ${attachmentPath}]`;
        } else if (selectedOption.startsWith('url:')) {
          const url = selectedOption.substring(4);
          result.urls.push(url);
          return url;
        } else {
          return selectedOption;
        }
      }
      
      // Return unchanged if contains nested braces (will be processed in next iteration)
      return match;
    });
    
    // Break if no changes were made (prevents infinite loops)
    if (!hasChanges) {
      break;
    }
    
    depth++;
  }

  result.text = processedText;
  return result;
}

/**
 * Parse spintax and return structured content with media
 * @param {string} text - Text containing spintax syntax
 * @returns {object} - Parsed content with text, images, attachments, and URLs
 */
export function parseSpintaxWithMedia(text) {
  if (!text || typeof text !== 'string') {
    return {
      text: text || '',
      images: [],
      attachments: [],
      urls: []
    };
  }

  const result = {
    text: text,
    images: [],
    attachments: [],
    urls: []
  };

  let processedText = text;
  let depth = 0;
  const maxDepth = 10;

  while (processedText.includes('{') && processedText.includes('}') && depth < maxDepth) {
    processedText = processedText.replace(/\{([^{}]*)\}/g, (match, content) => {
      const options = content.split('|').map(option => option.trim());
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex] || '';

      // Handle different types of content
      if (selectedOption.startsWith('img:')) {
        const imagePath = selectedOption.substring(4);
        result.images.push(imagePath);
        return `[IMAGE: ${imagePath}]`;
      } else if (selectedOption.startsWith('att:')) {
        const attachmentPath = selectedOption.substring(4);
        result.attachments.push(attachmentPath);
        return `[ATTACHMENT: ${attachmentPath}]`;
      } else if (selectedOption.startsWith('url:')) {
        const url = selectedOption.substring(4);
        result.urls.push(url);
        return url;
      } else {
        return selectedOption;
      }
    });
    depth++;
  }

  result.text = processedText;
  return result;
}

/**
 * Extract all media references from spintax text
 * @param {string} text - Text containing spintax syntax
 * @returns {object} - Object with arrays of all possible images, attachments, and URLs
 */
export function extractMediaFromSpintax(text) {
  if (!text || typeof text !== 'string') {
    return {
      images: [],
      attachments: [],
      urls: []
    };
  }

  const media = {
    images: new Set(),
    attachments: new Set(),
    urls: new Set()
  };

  const spintaxPattern = /\{([^{}]*)\}/g;
  let match;

  while ((match = spintaxPattern.exec(text)) !== null) {
    const options = match[1].split('|').map(option => option.trim());
    
    options.forEach(option => {
      if (option.startsWith('img:')) {
        media.images.add(option.substring(4));
      } else if (option.startsWith('att:')) {
        media.attachments.add(option.substring(4));
      } else if (option.startsWith('url:')) {
        media.urls.add(option.substring(4));
      }
    });
  }

  return {
    images: Array.from(media.images),
    attachments: Array.from(media.attachments),
    urls: Array.from(media.urls)
  };
}

/**
 * Validate spintax with media support
 * @param {string} text - Text to validate
 * @returns {object} - Enhanced validation result
 */
export function validateSpintaxWithMedia(text) {
  const basicValidation = validateSpintax(text);
  
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  const errors = [...basicValidation.errors];
  const media = extractMediaFromSpintax(text);

  // Validate image references
  media.images.forEach(imagePath => {
    if (!imagePath || imagePath.trim() === '') {
      errors.push('Empty image path found');
    } else if (!imagePath.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      errors.push(`Invalid image format: ${imagePath}. Supported: jpg, jpeg, png, gif, webp, svg`);
    }
  });

  // Validate attachment references
  media.attachments.forEach(attachmentPath => {
    if (!attachmentPath || attachmentPath.trim() === '') {
      errors.push('Empty attachment path found');
    }
  });

  // Validate URLs
  media.urls.forEach(url => {
    if (!url || url.trim() === '') {
      errors.push('Empty URL found');
    } else {
      try {
        new URL(url);
      } catch {
        errors.push(`Invalid URL format: ${url}`);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors,
    media: media
  };
}

/**
 * Generate sample variables for testing conditional spintax
 * @returns {object} - Sample variables object
 */
export function generateSampleVariables() {
  const firstNames = ['John', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'Tom', 'Mary'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const companies = ['Acme Corp', 'Tech Solutions Inc', 'Digital Marketing Pro', 'Web Design Studio', 'Global Enterprises'];
  const campaigns = ['Summer Sale 2025', 'Black Friday Deal', 'Newsletter Edition #12', 'Product Launch', 'Holiday Special'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    // Customer Information
    firstname: firstName,
    lastname: lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    company: companies[Math.floor(Math.random() * companies.length)],
    
    // Website Images
    firstimage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    secondimage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
    thirdimage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400',
    fourthimage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    
    // Performance Metrics
    load_time: (Math.random() * 3 + 1).toFixed(1) + 's',
    website_url: 'https://example.com',
    performance_score: Math.floor(Math.random() * 30) + 70, // 70-100
    mobile_score: Math.floor(Math.random() * 30) + 65, // 65-95
    desktop_score: Math.floor(Math.random() * 20) + 80, // 80-100
    
    // Date & Time
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    datetime: new Date().toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    
    // Campaign Information
    campaign_name: campaigns[Math.floor(Math.random() * campaigns.length)],
    unsubscribe_link: 'https://example.com/unsubscribe?token=' + Math.random().toString(36).substring(7)
  };
}

/**
 * Extract all conditional patterns and variables from text
 * @param {string} text - Text containing spintax with conditionals
 * @returns {object} - Object with conditionals and variables found
 */
export function extractConditionalsFromSpintax(text) {
  if (!text || typeof text !== 'string') {
    return {
      conditionals: [],
      variables: []
    };
  }

  const conditionals = [];
  const variables = new Set();
  
  const spintaxPattern = /\{([^{}]*)\}/g;
  let match;

  while ((match = spintaxPattern.exec(text)) !== null) {
    const content = match[1];
    
    // Extract conditionals
    if (content.startsWith('if:')) {
      const conditionPart = content.substring(3);
      const parts = conditionPart.split('?');
      if (parts.length === 2) {
        const condition = parts[0];
        const valueParts = parts[1].split(':');
        if (valueParts.length === 2) {
          conditionals.push({
            condition: condition,
            trueValue: valueParts[0],
            falseValue: valueParts[1]
          });
          
          // Extract variable names from condition
          const varMatches = condition.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g);
          if (varMatches) {
            varMatches.forEach(varName => {
              if (!['true', 'false', 'and', 'or', 'not'].includes(varName.toLowerCase())) {
                variables.add(varName);
              }
            });
          }
        }
      }
    }
    
    // Extract variable references
    if (content.startsWith('var:')) {
      const varName = content.substring(4);
      variables.add(varName);
    }
  }

  return {
    conditionals: conditionals,
    variables: Array.from(variables)
  };
}

/**
 * Create common conditional patterns
 * @returns {object} - Object with common conditional templates
 */
export function getConditionalTemplates() {
  return {
    'Even/Odd ID': '{if:customer_id%2==0?Welcome back, valued customer!:Hello there, new friend!}',
    'VIP Status': '{if:is_vip?Exclusive VIP offers inside!:Check out our latest deals!}',
    'Order Amount': '{if:order_total>100?Thank you for your large order!:Thanks for your purchase!}',
    'Visit Frequency': '{if:visit_count>5?Welcome back, loyal customer!:Great to see you again!}',
    'Day of Week': '{if:day_of_week==1?Monday special offers!:Midweek deals available!}',
    'Age Group': '{if:age<30?Young professional discounts!:Mature customer benefits!}',
    'Points Balance': '{if:points>500?You have enough points for rewards!:Keep shopping to earn more points!}',
    'Subscription Tier': '{if:subscription_tier==gold?Gold member exclusive content:Standard member benefits}',
    'Multiple Conditions': '{if:is_vip?{if:order_total>200?Premium VIP treatment:VIP customer care}:Standard service}'
  };
}