import { MD } from "../../core/ui/MD"

export function FeatureSection() {
  return (
    <section className="flex flex-col gap-4 py-4">
      <div className="container mx-auto px-4 flex flex-col gap-2 items-center">
        <h2 className="text-xl font-bold">Core Features</h2>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 text-lg items-center p-2 shadow overflow-x-auto rounded">
          <b>Declarative Dependency Injection</b>
          <MD data={`
\`\`\`typescript
@Bit('userService')
class UserService {
  constructor(
    @Inject('logger') private logger: LoggerService
  ) {}
}
\`\`\`  
- Annotation-based dependency injection  
- Constructor, property, and method injection  
- Zero boilerplate configuration 
        `} />
        </div>

       <div className="flex flex-col gap-2 text-lg items-center p-2 shadow overflow-x-auto rounded">
          <b>React Integration</b>
          <MD data={`
\`\`\`typescript
function UserComponent() {
  const userService = useBit<UserService>('userService');
  // ...
}
\`\`\`  
- Built-in React hooks  
  - useBitter  
  - useBit  
        `} />
        </div>

       <div className="flex flex-col gap-2 text-lg items-center p-2 shadow overflow-x-auto rounded">
          <b>YAML Configuration</b>
          <MD data={`
\`\`\`yaml
bits:
  serviceInterface:
    implementations:
      - name: serviceImplementation
        when: 
          env: production
      - name: mockImplementation
        when:
          env: development
\`\`\`  
- External configuration support  
- Environment-specific profiles  
        `} />
        </div>
      </div>
    </section>
  )
}