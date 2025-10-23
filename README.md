# npca-api

Api desenvolvida para o site do NPCA

## Estrutura do projeto

```
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 controllers
│   │   │   └── 📁 users
│   │   │       ├── 📁 factories
│   │   │       │   └── 📄 makeSignUpController.ts
│   │   │       └── 📄 SignUpController.ts
│   │   ├── 📁 errors
│   │   │   ├── 📄 AccountAlreadyExists.ts
│   │   │   └── 📄 InvalidCredentials.ts
│   │   ├── 📁 types
│   │   │   ├── 📄 Controller.ts
│   │   │   ├── 📄 JwtAdapter.ts
│   │   │   └── 📄 User.ts
│   │   └── 📁 useCases
│   │       ├── 📁 factories
│   │       │   └── 📄 makeUserUseCase.ts
│   │       └── 📄 UserUseCases.ts
│   ├── 📁 infra
│   │   ├── 📁 config
│   │   │   └── 📄 env.ts
│   │   ├── 📁 models
│   │   │   └── 📄 User.ts
│   │   └── 📁 repositories
│   │       ├── 📁 factories
│   │       │   └── 📄 makeUserRepository.ts
│   │       └── 📄 UserRepository.ts
│   └── 📁 main
│       ├── 📁 adapters
│       │   ├── 📄 JwtAdapter.ts
│       │   └── 📄 routeAdapter.ts
│       ├── 📁 plugins
│       │   ├── 📄 authenticate.ts
│       │   ├── 📄 authorization.ts
│       │   └── 📄 mongoose.ts
│       ├── 📁 routes
│       │   ├── 📄 index.ts
│       │   └── 📄 users.ts
│       ├── 📁 schemas
│       │   └── 📄 signUpSchema.ts
│       ├── 📁 types
│       │   └── 📄 fastify.d.ts
│       ├── 📄 app.ts
│       └── 📄 server.ts
├── ⚙️ .gitignore
├── ⚙️ docker-compose.yml
├── 📄 env.example
├── ⚙️ package.json
├── ⚙️ tsconfig.json
└── 📦 yarn.lock
```
