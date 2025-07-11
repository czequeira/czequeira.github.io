# Configuration in Bitterer

## YAML Configuration

### Basic Config Structure
```yaml
# bitterer-config.yml
scan: true  # Auto-scan enabled
bits:
  tool:
    implementations:
      - name: prodTool
```

### Environment-Specific Config
```yaml
bits:
  paymentProcessor:
    implementations:
      - name: stripeProcessor
        when: 
          env: production
      - name: mockProcessor
        when:
          env: development
```

### Manual configuration (NOT IMPLEMENTED YET)
``` typescript
container.register({
  'configService': {
    class: ConfigService,
    scope: 'singleton',
    config: {
      apiUrl: process.env.API_URL
    }
  }
});
```


### JSON Configuration (NOT IMPLEMENTED YET)
``` json
{
  "bits": {
    "cacheService": {
      "class": "./cache/RedisCache",
      "scope": "singleton"
    }
  }
}
```

## Advanced Config Patterns

### Conditional Beans
``` yaml
bits:
  logger:
    implementations:
      - name: fileLogger
        when:
          allOf:
            env: production
            region: us-east
      - class: consoleLogger
        when:
          anyOf:
            env: development
            debug: true
```

### Value Injection (NOT IMPLEMENTED YET)
```yaml
values:
  apiSettings:
    timeout: 5000
    retries: 3
```

``` typescript
@Bit('apiClient')
export class ApiClient {
  constructor(
    @Inject('apiSettings') private config: any
  ) {}
}
```

## Config Best Practices

| Pattern               | When to Use                          | Example                      |
|-----------------------|--------------------------------------|------------------------------|
| YAML Config           | Complex project setups               | Microservice architectures   |
| Programmatic Config   | Dynamic requirements                 | Feature flags                |
| Environment Variables | Sensitive data                       | API keys, DB credentials     |
| JSON Config           | Simple static configuration          | UI theme settings            |

## Config Validation

### Schema Validation (NOT IMPLEMENTED YET)
```typescript
import { validateConfig } from 'bitterer/config';

const schema = {
  bits: {
    type: 'object',
    required: ['database']
  }
};

validateConfig(myConfig, schema);
```

### Runtime Type Checking
```typescript
@Bit('configService')
export class ConfigService {
  @PostConstruct()
  validate() {
    if (!this.config.apiUrl) {
      throw new Error('Missing required API URL');
    }
  }
}
```