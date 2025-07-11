# Installation Guide

## Prerequisites

Before installing Bitterer, ensure you have:

* Node.js v16+ installed
* TypeScript v4.5+ installed

## Core Installation

1. Install the main package:

``` bash
npm install bitterer reflect-metadata
```

2. Configure your TypeScript compiler options:

``` json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES2017",
    "module": "commonjs"
  }
}
```

## Environment-Specific Setup

### For Node.js Applications

Add the startup code to your main application file:

```typescript
import "reflect-metadata";
import { Bitter } from 'bitterer';

const container = new Bitter();
await container.scan();
```

### For Browser Applications

Include in your application:

```typescript
import "reflect-metadata";
import { BrowserBitter } from 'bitterer/browser';

const container = new BrowserBitter();
```

### For React Applications

Then use the provider component:

``` typescript
import { useBitter } from 'bitterer/browser';

function App() {
  const container = useBitter()

  return (
    ...
  );
}
```

## Verification

To verify your installation is working:

1. Create a test service:

``` typescript
// test.service.ts
@Bit('testService')
export class TestService {
  test() {
    return 'Bitterer is working!';
  }
}
```

2. Run a test:

```typescript
const container = new Bitter();
await container.scan();
const testService = container.getBit<TestService>('testService');
console.log(testService.test()); // Should output "Bitterer is working!"
```