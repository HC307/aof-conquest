# AOF Conquest Documentation

Welcome to the AOF Conquest code documentation. This documentation provides a comprehensive overview of the application's architecture, components, and implementation details.

## Table of Contents

1. [Architecture Overview](./architecture.md) - High-level system architecture and design patterns
2. [State Management](./state-management.md) - NgRx store structure and data flow
3. [Domain Models](./domain-models.md) - Core data models and interfaces
4. [Components Guide](./components.md) - Reusable UI components
5. [Features](./features.md) - Feature modules and routing
6. [Services](./services.md) - Application services and utilities
7. [Development Guide](./development.md) - Setup, build, and deployment instructions

## Quick Start

AOF Conquest is an Angular 19 application that serves as a companion tool for a game system. It includes:

- **Compendium**: Browse game entities (tiles, constructions, trophies, etc.)
- **Generators**: Random generation tools for game content
- **Rules**: Game rules reference
- **Persistent Storage**: Browser-based state persistence

## Project Structure

```
src/
├── app/
│   ├── components/        # Shared UI components
│   ├── domain/           # Business logic and data
│   │   ├── data/        # Static data collections
│   │   ├── model/       # Domain interfaces
│   │   └── store/       # NgRx state management
│   ├── features/         # Feature modules
│   └── services/         # Shared services
├── styles/               # Global styles
└── index.html           # Entry point
```

## Technology Stack

- **Angular 19**: Core framework
- **NgRx**: State management
- **TypeScript**: Programming language
- **SCSS**: Styling
- **Karma/Jasmine**: Testing
- **GitHub Pages**: Deployment

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm start` for development
4. Navigate to `http://localhost:4200`

For more detailed information, explore the documentation sections listed above.