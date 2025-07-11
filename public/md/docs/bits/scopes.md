# Scopes in Bitterer

## Scope Types

### Singleton (Default)
``` typescript
@Bit({ scope: 'singleton' })
export class SingletonService {
  instanceId = Math.random();
}
```

**Behavior**:
``` typescript
const instance1 = container.getBit<SingletonService>('singletonService');
const instance2 = container.getBit<SingletonService>('singletonService');

console.log(instance1.instanceId === instance2.instanceId); // true
```

### Prototype
``` typescript
@Bit({ scope: 'prototype' })
export class PrototypeService {
  instanceId = Math.random();
}
```

**Behavior**:
``` typescript
const instance1 = container.getBit<PrototypeService>('prototypeService');
const instance2 = container.getBit<PrototypeService>('prototypeService');

console.log(instance1.instanceId === instance2.instanceId); // false
```

## Scope Configuration

### Global Default Scope (NOT IMPLEMENTED YET)
``` typescript
const container = new Bitter({
  defaultScope: 'prototype' // Changes default to prototype
});
```

### Mixed Scope Usage
``` typescript
@Bit({ scope: 'singleton' })
export class UserRepository {
  // singleton instance
}

@Bit({ scope: 'prototype' })
export class UserController {
  constructor(
    @Inject('userRepository') private repo: UserRepository
  ) {}
}
```

## Scope Best Practices

| Use Case          | Recommended Scope | Reason                          |
|-------------------|-------------------|---------------------------------|
| Stateful Services | Singleton         | Maintains consistent state      |
| Request Handlers  | Prototype         | Avoids request contamination    |
| Configuration     | Singleton         | Single source of truth          |
| Middleware        | Prototype         | Isolates request processing     |

## Advanced Scope Patterns

### Scoped Provider Factory (NOT IMPLEMENTED YET)
``` typescript
@Bit({
  name: 'scopedService',
  scope: (context) => context.request ? 'prototype' : 'singleton'
})
export class ScopedService {}
```