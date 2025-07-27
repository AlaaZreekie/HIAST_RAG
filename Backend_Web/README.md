# Backend_Web Project Structure

This document provides an overview of the project structure and organization.

## Project Overview

The `Backend_Web` project follows Clean Architecture principles with four main layers:

```
Backend_Web/
├── Domain/                    # Core business logic and entities
├── Application/               # Application services and DTOs
├── Infrastructure/            # Data access and external services
└── Presentation/              # Web API controllers and middleware
```

## Layer Details

### Domain Layer
- **Entities**: Core business objects (Program, Specialization, Language, etc.)
- **Enums**: Business enumerations
- **Common**: Base classes and shared domain logic

### Application Layer
- **Dtos/**: Data Transfer Objects for input/output
  - `LanguageDtos/`
  - `ProgramDtos/`
  - `SpecializationDtos/`
  - `AuthenticationDto/`
  - `AppUserDto/`
- **Feature/**: MediatR commands and queries
  - `Languages/` - Language CRUD operations
  - `Programs/` - Program CRUD operations
  - `Specializations/` - Specialization CRUD operations
- **IServices/**: Service interfaces
- **IUnitOfWork/**: Unit of Work pattern interfaces
- **IRepository/**: Repository pattern interfaces
- **Mapper/**: AutoMapper profiles
- **ResultResponse/**: API response models

### Infrastructure Layer
- **Context/**: Entity Framework DbContext
- **Services/**: Service implementations
- **Repository/**: Repository implementations
- **UnitOfWork/**: Unit of Work implementation
- **Migrations/**: Database migrations
- **Seeder/**: Data seeding logic

### Presentation Layer
- **Controllers/**: API controllers
- **Areas/**: Organized by user roles (Admin, Guest, User)
- **Middleware/**: Custom middleware components
- **wwwroot/**: Static files

## Key Patterns Used

- **Clean Architecture**: Separation of concerns across layers
- **CQRS**: Commands and Queries for different operations
- **MediatR**: Mediator pattern for request handling
- **Repository Pattern**: Data access abstraction
- **Unit of Work**: Transaction management
- **AutoMapper**: Object mapping between layers

## Database Entities

- **Program**: Academic programs with translations and specializations
- **Specialization**: Specific degrees within programs
- **Language**: Supported languages for translations
- **Location**: Physical campus locations
- **Translation Entities**: Language-specific content for programs and specializations 