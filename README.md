# NPCA API

> API RESTful desenvolvida para o sistema do Núcleo de Pesquisa em Ciências Aplicadas (NPCA)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.6.1-black)](https://www.fastify.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.7.2-green)](https://www.mongodb.com/)
[![Test Coverage](https://img.shields.io/badge/coverage-88.57%25-brightgreen)](https://vitest.dev/)

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Testes](#-testes)
- [API Endpoints](#-api-endpoints)
- [Arquitetura](#-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## 🎯 Sobre

A NPCA API é uma aplicação backend construída com foco em segurança, escalabilidade e manutenibilidade. Implementa autenticação JWT, controle de acesso baseado em roles (RBAC) e segue princípios de Clean Architecture e SOLID.

## ✨ Funcionalidades

### Autenticação e Autorização

- ✅ Cadastro de usuários com validação de dados
- ✅ Login com JWT (JSON Web Tokens)
- ✅ Sistema de roles (Student, Admin)
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Autorização baseada em roles

### Gestão de Usuários (Admin)

- ✅ Criar novos administradores
- ✅ Conceder role de admin a usuários existentes
- ✅ Atualizar dados de usuários
- ✅ Deletar usuários do sistema

### Segurança

- ✅ Hash de senhas com Argon2
- ✅ Validação de dados com Zod
- ✅ Sanitização de inputs
- ✅ Tratamento de erros customizado

## 🚀 Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Fastify](https://www.fastify.io/)** - Framework web de alta performance

### Database & ODM

- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB
- **[@typegoose/typegoose](https://typegoose.github.io/typegoose/)** - Classes TypeScript para Mongoose

### Autenticação & Segurança

- **[@fastify/jwt](https://github.com/fastify/fastify-jwt)** - Plugin JWT para Fastify
- **[Argon2](https://github.com/ranisalt/node-argon2)** - Hashing de senhas

### Validação

- **[Zod](https://zod.dev/)** - Schema validation TypeScript-first
- **[fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)** - Integração Zod com Fastify

### Testes

- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[Supertest](https://github.com/ladjs/supertest)** - Testes HTTP
- **[@faker-js/faker](https://fakerjs.dev/)** - Geração de dados fake para testes

### DevOps

- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **Yarn** >= 1.22.x
- **Docker** & **Docker Compose** (para executar o MongoDB)

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/jovemcleb/npca-api.git
cd npca-api
```

2. **Instale as dependências**

```bash
yarn install
```

## ⚙️ Configuração

1. **Crie o arquivo `.env`** baseado no `env.example`:

```bash
cp env.example .env
```

2. **Configure as variáveis de ambiente** no arquivo `.env`:

```env
NODE_ENV="development"
MONGO_URL="mongodb://root:root@localhost:27017/npca?authSource=admin"
JWT_SECRET="sua-chave-secreta-super-segura"
```

3. **Para testes, crie o arquivo `.env.test`**:

```env
NODE_ENV="test"
MONGO_URL="mongodb://root:root@localhost:27017/npca-test?authSource=admin"
JWT_SECRET="test-secret"
```

## 🏃 Executando o Projeto

### 1. Inicie o MongoDB com Docker:

```bash
docker-compose up -d
```

### 2. Inicie o servidor em modo desenvolvimento:

```bash
yarn dev
```

O servidor estará rodando em `http://localhost:3333`

### 3. Acesse a documentação da API:

- Swagger UI: `http://localhost:3333/docs`
- Scalar UI: `http://localhost:3333/reference`

## 🧪 Testes

### Executar todos os testes:

```bash
yarn test
```

### Executar testes em modo watch:

```bash
yarn test:watch
```

### Gerar relatório de cobertura:

```bash
yarn test:coverage
```

**Cobertura atual:** 88.57% de code coverage com 37 testes

## 📡 API Endpoints

### � Rotas Públicas

#### Cadastro de Usuário

```http
POST /signup
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "institution": "UFSC",
  "course": "Ciência da Computação"
}
```

**Resposta:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /signin
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### � Rotas Protegidas (Admin)

> **Nota:** Todas as rotas abaixo requerem autenticação via Bearer Token e role de ADMIN

#### Criar Administrador

```http
POST /create-admin
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "senhaSegura123",
  "institution": "NPCA",
  "course": "Administração",
  "roles": ["admin", "student"]
}
```

**Resposta:** `201 Created`

```json
{
  "id": "507f1f77bcf86cd799439011"
}
```

#### Conceder Role de Admin

```http
POST /grant-admin-role
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011"
}
```

**Resposta:** `200 OK`

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@example.com",
  "roles": ["student", "admin"]
}
```

#### Atualizar Usuário

```http
PATCH /update-user/:userId
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva Junior",
  "email": "joao.junior@example.com",
  "password": "novaSenha123",
  "institution": "UFSC",
  "course": "Engenharia de Software",
  "roles": ["student", "admin"]
}
```

**Resposta:** `200 OK`

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "João Silva Junior",
  "email": "joao.junior@example.com",
  "institution": "UFSC",
  "course": "Engenharia de Software",
  "roles": ["student", "admin"]
}
```

#### Deletar Usuário

```http
DELETE /delete-user/:userId
Authorization: Bearer {token}
```

**Resposta:** `204 No Content`

---

### � Códigos de Status HTTP

| Código | Descrição                                   |
| ------ | ------------------------------------------- |
| `200`  | ✅ Requisição bem-sucedida                  |
| `201`  | ✅ Recurso criado com sucesso               |
| `204`  | ✅ Requisição bem-sucedida sem conteúdo     |
| `400`  | ❌ Dados inválidos na requisição            |
| `401`  | ❌ Não autenticado (token ausente/inválido) |
| `403`  | ❌ Não autorizado (sem permissão)           |
| `404`  | ❌ Recurso não encontrado                   |
| `409`  | ❌ Conflito (ex: email já cadastrado)       |
| `500`  | ❌ Erro interno do servidor                 |

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**, com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                 │
│            (Controllers, Routes, Schemas)            │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                  Application Layer                   │
│              (Use Cases, Business Logic)             │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                 Infrastructure Layer                 │
│           (Database, Repositories, Models)           │
└─────────────────────────────────────────────────────┘
```

### Padrões Utilizados

- **Repository Pattern**: Abstração do acesso a dados
- **Use Case Pattern**: Encapsulamento da lógica de negócio
- **Factory Pattern**: Criação de instâncias com dependências
- **Adapter Pattern**: Adaptação entre camadas
- **Dependency Injection**: Inversão de controle

## 🔐 Autenticação & Autorização

### JWT Token

Os tokens JWT são gerados após login/cadastro e contêm:

```typescript
{
  "sub": "507f1f77bcf86cd799439011",  // ID do usuário
  "roles": ["student"],                // Roles do usuário
  "iat": 1635724800,                   // Issued at
  "exp": 1635728400                    // Expiration time
}
```

### Proteção de Rotas

Use o header `Authorization` com o token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Sistema de Roles

| Role      | Descrição     | Permissões                        |
| --------- | ------------- | --------------------------------- |
| `student` | Usuário comum | Acesso básico ao sistema          |
| `admin`   | Administrador | Acesso total + gestão de usuários |

## 🐳 Docker

### Subir o MongoDB:

```bash
docker-compose up -d
```

### Parar o MongoDB:

```bash
docker-compose down
```

### Ver logs:

```bash
docker-compose logs -f mongodb
```

## 👥 Autores

- **Caleb Lima** - [@jovemcleb](https://github.com/jovemcleb)

**Desenvolvido com ❤️ para o NPCA**
