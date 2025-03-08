// src/stories/VariableText.stories.jsx
import React from 'react';
import VariableText from '../components/VariableText';

export default {
  title: 'Components/VariableText',
  component: VariableText,
  argTypes: {
    text: { 
      control: 'text',
      description: 'Text containing variable placeholders in {variableName} format'
    },
    variables: { 
      control: 'object',
      description: 'An object with variable names as keys and React elements or strings as values'
    },
    defaultStyles: { 
      control: 'object',
      description: 'Default styles to apply to text segments'
    },
    onMissingVariable: { 
      description: 'Handler for undefined variables, receives name and returns JSX or string',
      control: { disable: true }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A React component for safely replacing variables in text with styled elements or components.'
      },
    },
  },
};

// Basic example
export const Basic = {
  args: {
    text: 'Hello, {name}!',
    variables: {
      name: <span style={{ fontWeight: 'bold', color: 'blue' }}>World</span>,
    },
  },
};

// Multiple variables
export const MultipleVariables = {
  args: {
    text: 'Player {player} found {item} in the {location}!',
    variables: {
      player: <span style={{ fontWeight: 'bold', color: 'green' }}>Hero</span>,
      item: <span style={{ fontWeight: 'bold', color: 'goldenrod' }}>Treasure</span>,
      location: <span style={{ fontStyle: 'italic', color: 'purple' }}>Ancient Cave</span>,
    },
  },
};

// Custom styling
export const WithCustomStyles = {
  args: {
    text: 'This is {highlight} text with styling.',
    variables: {
      highlight: <span style={{ backgroundColor: 'yellow', padding: '0 4px' }}>highlighted</span>,
    },
    defaultStyles: { 
      fontFamily: 'monospace', 
      color: '#333',
      fontSize: '16px',
    },
  },
};

// Dynamic styling based on value
export const DynamicStyling = () => {
  // Example game character health
  const health = 30;
  const maxHealth = 100;
  
  // Styling based on health percentage
  const getHealthElement = () => {
    const percentage = (health / maxHealth) * 100;
    
    let style = { fontWeight: 'bold' };
    
    if (percentage < 30) {
      style.color = 'red';
    } else if (percentage < 70) {
      style.color = 'orange';
    } else {
      style.color = 'green';
    }
    
    return <span style={style}>{health}</span>;
  };
  
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <VariableText
        text="HP: {currentHealth}/{maxHealth}"
        variables={{
          currentHealth: getHealthElement(),
          maxHealth: maxHealth,
        }}
      />
    </div>
  );
};

// Game message example
export const GameMessage = () => {
  const messageStyles = {
    error: {
      backgroundColor: '#fdd',
      border: '1px solid #c00',
      padding: '8px 12px',
      borderRadius: '4px',
    },
    success: {
      backgroundColor: '#dfd',
      border: '1px solid #0c0',
      padding: '8px 12px',
      borderRadius: '4px',
    },
    info: {
      backgroundColor: '#ddf',
      border: '1px solid #00c',
      padding: '8px 12px',
      borderRadius: '4px',
    },
  };
  
  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={messageStyles.error}>
        <VariableText
          text="Error: {errorMessage}"
          variables={{
            errorMessage: <span style={{ fontWeight: 'bold' }}>Unable to equip item</span>,
          }}
        />
      </div>
      
      <div style={messageStyles.success}>
        <VariableText
          text="{character} successfully completed the quest!"
          variables={{
            character: <span style={{ fontWeight: 'bold' }}>Hero</span>,
          }}
        />
      </div>
      
      <div style={messageStyles.info}>
        <VariableText
          text="You need {resource} to craft {item}."
          variables={{
            resource: <span style={{ color: 'brown', fontWeight: 'bold' }}>5 Wood</span>,
            item: <span style={{ color: 'goldenrod' }}>Wooden Shield</span>,
          }}
        />
      </div>
    </div>
  );
};

// Missing variables
export const MissingVariables = {
  args: {
    text: 'Hello, {name}! Welcome to {location}.',
    variables: {
      name: <span style={{ fontWeight: 'bold' }}>Traveler</span>,
      // location is missing
    },
    onMissingVariable: (name) => (
      <span style={{ 
        backgroundColor: '#f8d7da', 
        color: '#721c24',
        padding: '0 4px',
        borderRadius: '2px',
        fontSize: '14px'
      }}>
        [missing: {name}]
      </span>
    ),
  },
};

// Interactive elements
export const WithInteractiveElements = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <VariableText
        text="Click {button} to continue."
        variables={{
          button: (
            <button
              style={{
                backgroundColor: '#4CAF50',
                border: 'none',
                color: 'white',
                padding: '4px 8px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                margin: '0 5px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => alert('Button clicked!')}
            >
              here
            </button>
          ),
        }}
      />
    </div>
  );
};

// Function variables
export const FunctionVariables = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <VariableText
        text="Current time: {time}"
        variables={{
          time: () => {
            const now = new Date();
            return (
              <span style={{ color: 'blue', fontWeight: 'bold' }}>
                {now.toLocaleTimeString()}
              </span>
            );
          },
        }}
      />
    </div>
  );
};
