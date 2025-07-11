# Component Lifecycle in Bitterer

## Lifecycle Phases

### 1. Initialization Phase
``` typescript
@Bit('databaseService')
export class DatabaseService {
  @PostConstruct()
  async initialize() {
    console.log('Connecting to database...');
    await this.connect();
  }
}
```

### 2. Runtime Phase
``` typescript
@Bit('userService')
export class UserService {
  private cache = new Map();

  @PreDestroy()
  flushCache() {
    console.log('Flushing cache...');
    this.cache.clear();
  }
}
```

## Lifecycle Sequence Diagram

```plaintext
[Container Start]
  │
  ├─ 1. Instantiation
  │    (constructor called)
  │
  ├─ 2. Dependency Injection
  │    (@Inject properties set)
  │
  ├─ 3. @PostConstruct
  │    (async initialization)
  │
  ├─ 4. Ready for Use
  │
  └─ 5. @PreDestroy
       (cleanup on shutdown)
```

## Advanced Lifecycle Hooks

### Ordered Initialization (NOT IMPLEMENTED YET)
``` typescript
@Bit('multiPhaseService')
export class MultiPhaseService {
  @PostConstruct({ order: 1 })
  initFirst() {
    console.log('Phase 1');
  }

  @PostConstruct({ order: 2 })
  initSecond() {
    console.log('Phase 2');
  }
}
```

### Conditional Hooks (NOT IMPLEMENTED YET)
```typescript
@Bit('conditionalService')
export class ConditionalService {
  @PostConstruct({
    when: (container) => 
      container.getBit('configService').environment === 'production'
  })
  prodOnlyInit() {
    console.log('Production-only init');
  }
}
```

## Lifecycle Error Handling

### Initialization Failure
``` typescript
@Bit('criticalService')
export class CriticalService {
  @PostConstruct()
  async init() {
    throw new Error('Connection failed');
  }
}

// Container will propagate the error
container.scan().catch(err => {
  console.error('Initialization failed:', err);
});
```

## Lifecycle Best Practices

| Hook            | Do's                                  | Don'ts                         |
|-----------------|---------------------------------------|--------------------------------|
| @PostConstruct  | Lightweight async operations          | Heavy blocking operations      |
| @PreDestroy     | Resource cleanup                      | Starting new operations        |
|                 | Cache flushing                        | Complex dependency resolution  |

## Custom Lifecycle Adapters (NOT IMPLEMENTED YET)

### Creating a Custom Hook
``` typescript
function @Validate() {
  return function(target: any, key: string) {
    container.addLifecycleHook(target.constructor, {
      type: 'post-construct',
      handler: target[key]
    });
  }
}
```

### Usage Example
``` typescript
@Bit('validatedService')
export class ValidatedService {
  @Validate()
  checkConfig() {
    if (!this.config.valid) {
      throw new Error('Invalid config');
    }
  }
}
```