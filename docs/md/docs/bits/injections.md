# Dependency Injection in Bitterer

## Basic Injection

### Constructor Injection (Recommended)
``` typescript
@Bit('userService')
export class UserService {
  constructor(
    @Inject('loggerService') private logger: LoggerService
  ) {}
}
```

### Property Injection (NOT IMPLEMENTED YET)
``` typescript
@Bit('authService')
export class AuthService {
  @Inject('configService')
  private config!: ConfigService;
}
```

## Advanced Injection Patterns

### Optional Dependencies (NOT IMPLEMENTED YET)
```typescript
@Inject({
  token: 'analyticsService',
  optional: true
})
private analytics?: AnalyticsService;
```

### Multiple Implementations (NOT IMPLEMENTED YET)
``` typescript
@InjectAll('plugin')
private plugins: PluginInterface[];
``` 

### Value Injection (NOT IMPLEMENTED YET)
``` typescript
container.registerValue('apiKey', '123-456-789');

@Inject('apiKey')
private apiKey: string;
```

## Injection Configuration

### Custom Providers
```typescript
container.register({
  'customService': {
    class: CustomServiceImpl,
    scope: 'singleton',
    args: [{
      name: 'dependencyName',
      ref: 'bitReferencedName'
    }]
  }
});
```

### Factory Providers (NOT IMPLEMENTED YET)
```typescript
container.register({
  'dynamicService': {
    useFactory: (container) => {
      return new DynamicService(container.getBit('config'));
    },
    scope: 'prototype'
  }
});
```

### Aliased Providers (NOT IMPLEMENTED YET)
```typescript
container.register({
  'primaryService': {
    useExisting: 'legacyService'
  }
});
```

## Injection Best Practices

| Pattern               | When to Use                          | Example                      |
|-----------------------|--------------------------------------|------------------------------|
| Constructor Injection | Most common case                     | Core services                |
| Property Injection    | Circular dependencies                | Logger utilities             |
| Setter Injection      | Optional dependencies                | Analytics providers          |
| Interface Injection   | Multiple implementations             | Storage providers            |

## Debugging Injections

### Circular Dependencies
``` typescript
@Bit('serviceA')
export class ServiceA {
  constructor(
    @Inject('serviceB') private serviceB: ServiceB
  ) {}
}

@Bit('serviceB')
export class ServiceB {
  constructor(
    @Inject('serviceA') private serviceA: ServiceA
  ) {}
}
```

**Solution**: Use property injection or `@InjectLazy` (NOT IMPLEMENTED YET)

### Missing Dependencies
```typescript
try {
  container.getBit('unregisteredService');
} catch (error) {
  console.error('Dependency missing:', error.message);
}
```