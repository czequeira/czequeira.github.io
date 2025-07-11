# Introduction to Bitterer  
**A Spring-inspired IoC Container for Modern TypeScript Applications**  

Bitterer is a lightweight, decorator-based Inversion of Control (IoC) container designed specifically for TypeScript applications.  

## Key Features  
* Strongly-typed dependency injection  
* Browser and Node.js support  
* React hooks integration  
* YAML configuration  
* Scopes: Singleton and Prototype  

## Basic Example  

``` typescript
// Basic service
@Bit('userService')
export class UserService {
  private users = [{ id: 1, name: 'John' }];

  getUsers() {
    return this.users;
  }
}
```

``` typescript
// Controller with DI
@Bit('userController')
export class UserController {
  constructor(
    @Inject('userService') private userService: UserService
  ) {}

  handleRequest() {
    return this.userService.getUsers();
  }
}
```

``` typescript
// Container usage
const container = new Bitter();
await container.scan();

const controller = container.getBit<UserController>('userController');
console.log(controller.handleRequest()); // [{ id: 1, name: 'John' }]
```

## Spring Comparison  

| Concept       | Bitterer            | Spring              |
|--------------|---------------------|---------------------|
| Component    | @Bit               | @Component/@Service |
| Injection    | @Inject            | @Autowired          |
| Scope        | singleton/prototype | singleton/prototype |
| Configuration| YAML/TypeScript     | XML/JavaConfig      |
