# VariableText

A React component for safely replacing variables in text with styled elements.

[![npm version](https://img.shields.io/npm/v/react-variable-text.svg)](https://www.npmjs.com/package/react-variable-text)
[![license](https://img.shields.io/npm/l/react-variable-text.svg)](https://github.com/yourusername/react-variable-text/blob/main/LICENSE)

## Problem

In React applications, especially games or content-heavy apps, you often need to:

1. Load text from configuration files
2. Insert variables with custom styling
3. Do this without using `dangerouslySetInnerHTML`

The standard approach of string concatenation or using `String.replace()` with HTML becomes problematic due to React's security features.

## Solution

`VariableText` provides a simple, declarative way to replace variables in text with React elements, avoiding sanitization issues completely.

## Installation

```bash
npm install react-variable-text
# or
yarn add react-variable-text
```

## Basic Usage

```jsx
import VariableText from 'react-variable-text';

function WelcomeMessage() {
  return (
    <p>
      <VariableText
        text="Hello, {name}! Welcome to {game}."
        variables={{
          name: <span className="text-blue-500 font-bold">Player1</span>,
          game: <span className="text-green-500">Adventure Quest</span>
        }}
      />
    </p>
  );
}
```

## Features

- **Safe**: No `dangerouslySetInnerHTML`, no XSS vulnerabilities
- **Flexible**: Replace variables with React elements, strings, or function results
- **Customizable**: Style both the variables and the surrounding text
- **Robust**: Handle missing variables gracefully

## Props

| Prop              | Type     | Description                                                      | Required |
|-------------------|----------|------------------------------------------------------------------|----------|
| `text`            | string   | Text containing variables in curly braces: `{variableName}`      | Yes      |
| `variables`       | object   | Map of variable names to React elements, strings, or functions   | No       |
| `defaultStyles`   | object   | Styles to apply to text segments                                 | No       |
| `onMissingVariable` | function | Handler for undefined variables, receives name and returns JSX or string | No |

## Advanced Examples

### Dynamic Content Based on Game State

```jsx
const playerStats = ({hp, maxHp}) => {
  // Change color based on HP percentage
  const getHpElement = () => {
    const percentage = (hp / maxHp) * 100;
    
    let colorClass = "text-green-500";
    if (percentage < 30) {
      colorClass = "text-red-500 font-bold";
    } else if (percentage < 70) {
      colorClass = "text-yellow-500";
    }
    
    return <span className={colorClass}>{hp}</span>;
  };
  
  return (
    <VariableText 
      text="HP: {currentHp}/{maxHp}"
      variables={{
        currentHp: getHpElement(),
        maxHp: maxHp
      }}
    />
  );
};
```

### Multiple Styled Elements

```jsx
<VariableText
  text="Level {level} {character} found a {rarity} {item}!"
  variables={{
    level: <span className="text-blue-300">5</span>,
    character: <span className="text-green-400 font-bold">Wizard</span>,
    rarity: <span className="text-purple-300">Legendary</span>,
    item: <span className="text-yellow-300">Staff of Power</span>
  }}
  defaultStyles={{ color: 'white' }}
/>
```

### Custom Handling for Missing Variables

```jsx
<VariableText
  text="Welcome to {location}! Beware of {enemy}."
  variables={{
    location: <span className="font-bold">Dark Forest</span>
    // enemy is missing
  }}
  onMissingVariable={(name) => (
    <span className="bg-red-800 text-white px-1">
      [missing: {name}]
    </span>
  )}
/>
```

## Use with Localization

`VariableText` works great with localization systems:

```jsx
import { useTranslation } from 'react-i18next';

function LocalizedMessage() {
  const { t } = useTranslation();
  
  return (
    <VariableText
      text={t('welcome.message')} // "Welcome, {name}! You have {count} messages."
      variables={{
        name: <span className="font-bold">John</span>,
        count: <span className="text-blue-500">5</span>
      }}
    />
  );
}
```

## Performance Considerations

For optimal performance:

- Use React.memo for the parent component if VariableText is used in lists
- For frequently changing text, memoize complex variable elements

## License

MIT
