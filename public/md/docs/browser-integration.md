# Browser Integration

## Core Setup for Web Apps

### Basic Browser Configuration
``` typescript
import { BrowserBitter } from 'bitterer/browser';
import "reflect-metadata";

const container = new BrowserBitter();
```

## React Integration
For react integration bitterer provide some hooks to simplify the develop

### useBitter Hook
``` typescript
import { useBitter } from 'bitterer/browser';

const container = useBitter();
```

### useBit Hook
```typescript
function UserList() {
  const userService = useBit<UserService>('userService');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.loadUsers().then(setUsers);
  }, []);

  return /* ... */;
}
```

## Browser-Specific Services

### Web Storage Service
``` typescript
@Bit('storageService')
export class WebStorageService {
  constructor(
    @Inject('localStorage') private storage: Storage
  ) {}

  getItem(key: string) {
    return this.storage.getItem(key);
  }
}
```

### Registration Example (NOT IMPLEMENTED YET)
```typescript
container.registerValue('localStorage', window.localStorage);
container.registerValue('sessionStorage', window.sessionStorage);
```

## Performance Optimization

### Code Splitting (NOT IMPLEMENTED YET)
```typescript
container.register({
  'chartingLibrary': {
    loader: () => import('charting-library'),
    scope: 'prototype'
  }
});
```

## Browser Lifecycle

### Page Visibility Integration (NOT IMPLEMENTED YET)
```typescript
@Bit('performanceMonitor')
export class PerformanceMonitor {
  @PostConstruct()
  init() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  @PreDestroy()
  cleanup() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
}
```