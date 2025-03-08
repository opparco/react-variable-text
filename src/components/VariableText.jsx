import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component that replaces variable placeholders in text with React elements or strings
 * @param {Object} props Component properties
 * @param {string} props.text Text containing variable placeholders (e.g., "Hello {name}")
 * @param {Object} props.variables Object with placeholder names as keys and replacement elements or strings as values
 * @param {Object} props.defaultStyles Default styles for text segments (optional)
 * @param {function} props.onMissingVariable Handler for when a placeholder is not found in variables (optional)
 * @returns {React.ReactElement} Text with variables replaced
 */
const VariableText = ({ 
  text, 
  variables = {}, 
  defaultStyles = {}, 
  onMissingVariable = (placeholder) => `{${placeholder}}` 
}) => {
  // Return text as-is if there are no placeholders
  if (!text || typeof text !== 'string' || !text.includes('{')) {
    return <>{text}</>;
  }

  // Regular expression to detect placeholders
  const regex = /{([^{}]+)}/g;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  
  // Find all placeholders using regex
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} style={defaultStyles}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }
    
    // Get placeholder name (the part inside curly braces)
    const variableName = match[1];
    
    // Get replacement from variables object
    if (variableName in variables) {
      const replacement = variables[variableName];
      
      // Handle different types of replacements: React elements, functions, or other data types
      if (React.isValidElement(replacement)) {
        // For React elements, clone with a unique key
        parts.push(React.cloneElement(replacement, { key: key++ }));
      } else if (typeof replacement === 'function') {
        // For functions, add the result of execution
        const result = replacement();
        parts.push(<span key={key++}>{result}</span>);
      } else {
        // For other types, convert to string
        parts.push(<span key={key++}>{String(replacement)}</span>);
      }
    } else {
      // Handle case when variableName doesn't exist in variables
      const fallback = onMissingVariable(variableName);
      parts.push(<span key={key++}>{fallback}</span>);
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(
      <span key={key++} style={defaultStyles}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return <>{parts}</>;
};

VariableText.propTypes = {
  text: PropTypes.string.isRequired,
  variables: PropTypes.object,
  defaultStyles: PropTypes.object,
  onMissingVariable: PropTypes.func
};

export default VariableText;
