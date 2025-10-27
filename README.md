# npca-api

Api desenvolvida para o site do NPCA

## Estrutura do projeto

```
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 controllers
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 factories
│   │   │   │   │   └── 📄 makeCreateAdminController.ts
│   │   │   │   └── 📄 CreateAdminController.ts
│   │   │   └── 📁 users
│   │   │       ├── 📁 factories
│   │   │       │   ├── 📄 makeSignInController.ts
│   │   │       │   └── 📄 makeSignUpController.ts
│   │   │       ├── 📄 SignUpController.ts
│   │   │       └── 📄 SingInController.ts
│   │   ├── 📁 errors
│   │   │   ├── 📄 AccountAlreadyExists.ts
│   │   │   ├── 📄 InvalidCredentials.ts
│   │   │   └── 📄 InvalidRoles.ts
│   │   ├── 📁 types
│   │   │   ├── 📄 Controller.ts
│   │   │   └── 📄 JwtAdapter.ts
│   │   └── 📁 useCases
│   │       ├── 📁 admin
│   │       │   ├── 📁 factories
│   │       │   │   └── 📄 makeCreateAdminUseCase.ts
│   │       │   └── 📄 CreateAdminUseCase.ts
│   │       └── 📁 user
│   │           ├── 📁 factories
│   │           │   ├── 📄 makeSigInUseCase.ts
│   │           │   └── 📄 makeSignUpUseCase.ts
│   │           ├── 📄 SignInUseCase.ts
│   │           └── 📄 SignUpUseCase.ts
│   ├── 📁 infra
│   │   ├── 📁 config
│   │   │   └── 📄 env.ts
│   │   ├── 📁 models
│   │   │   └── 📄 User.ts
│   │   └── 📁 repositories
│   │       ├── 📁 factories
│   │       │   └── 📄 makeUserRepository.ts
│   │       └── 📄 UserRepository.ts
│   ├── 📁 main
│   │   ├── 📁 adapters
│   │   │   ├── 📄 JwtAdapter.ts
│   │   │   └── 📄 routeAdapter.ts
│   │   ├── 📁 plugins
│   │   │   ├── 📄 authenticate.ts
│   │   │   ├── 📄 authorization.ts
│   │   │   └── 📄 mongoose.ts
│   │   ├── 📁 routes
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 users.ts
│   │   ├── 📁 schemas
│   │   │   ├── 📄 createAdminSchema.ts
│   │   │   ├── 📄 signInSchema.ts
│   │   │   └── 📄 signUpSchema.ts
│   │   ├── 📁 types
│   │   │   └── 📄 fastify.d.ts
│   │   ├── 📄 app.ts
│   │   └── 📄 server.ts
│   └── 📁 tests
│       ├── 📁 factories
│       │   └── 📄 makeUser.ts
│       ├── 📄 setup.ts
│       ├── 📄 signIn.test.ts
│       └── 📄 signUp.test.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ docker-compose.yml
├── 📄 env.example
├── ⚙️ package.json
├── ⚙️ tsconfig.json
├── 📄 vitest.config.ts
└── 📦 yarn.lock
```
