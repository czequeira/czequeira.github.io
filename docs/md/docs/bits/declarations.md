# Bit Declarations

## Basic Bit Definition

The fundamental building block in Bitterer is a **Bit** an injectable class marked with the `@Bit` decorator:

``` typescript
@Bit('userService')
export class UserService {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}
```

## Bit Configuration Options

The `@Bit` decorator accepts a configuration object:

``` typescript
@Bit({
  name: 'authService',       // Custom service identifier
  scope: 'singleton',       // or 'prototype'
})
export class AuthService {
  // implementation
}
```

## Bit Registration Methods

### 1. Class Decorator (Preferred)

``` typescript
@Bit('serviceA')
export class ServiceA {}
```

### 2. Manual Registration

``` typescript
container.register({
  'serviceB': {
    class: ServiceB,
    scope: 'singleton'
  }
});
```

### 3. Factory Function (NOT IMPLEMENTED YET)

```typescript
@Bit({
  name: 'configService',
  factory: (container) => new ConfigService(container.getBit('env'))
})
export class ConfigService {}
```