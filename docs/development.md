# Development Guide

This guide covers setting up, developing, and deploying AOF Conquest.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Initial Setup

### 1. Clone the Repository
```bash
git clone [repository-url]
cd aof-conquest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

## Development Commands

### Build Commands
```bash
# Development build
ng build

# Production build
ng build --configuration production

# Watch mode (rebuilds on changes)
ng build --watch --configuration development
```

### Testing Commands
```bash
# Run all unit tests
ng test

# Run specific test file
ng test --include='**/component-name.spec.ts'

# Run tests in headless mode
ng test --browsers=ChromeHeadless

# Run tests with code coverage
ng test --code-coverage
```

### Linting
```bash
# Run ESLint
ng lint

# Fix auto-fixable issues
ng lint --fix
```

### Deployment
```bash
# Deploy to GitHub Pages
ng deploy --base-href=/aof-conquest/
```

## Development Workflow

### 1. Creating New Components
```bash
# Generate standalone component
ng generate component components/component-name --standalone

# Generate feature component
ng generate component features/feature-name/components/component-name --standalone
```

### 2. Creating New Services
```bash
ng generate service services/service-name
```

### 3. Working with State

#### Adding New Entity Type
1. Create model interface in `/domain/model/`
2. Create state interface in `/domain/store/[entity]/`
3. Create entity adapter
4. Create reducer
5. Create selectors
6. Add to AppState and reducers
7. Create data collection in `/domain/data/`

#### Example State Files
```
domain/store/new-entity/
├── new-entity.state.ts
├── new-entity-entities.reducers.ts
├── new-entity.selectors.ts
└── newEntityAdapter.ts
```

### 4. Adding Routes
Update `app.routes.ts`:
```typescript
{
  path: 'new-route',
  title: 'New Feature',
  component: NewComponent
}
```

## Code Style Guidelines

### TypeScript
- Use strict typing
- Prefer interfaces over types for objects
- Use enums for fixed sets of values
- Document complex logic with comments

### Angular
- Use standalone components
- Follow Angular style guide
- Use OnPush change detection where possible
- Implement proper lifecycle hooks

### SCSS
- Use BEM naming convention
- Leverage SCSS variables from `/styles/config/`
- Keep component styles scoped
- Use mixins for repeated patterns

### File Naming
- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Interfaces: `interface-name.interface.ts`
- Enums: `enum-name.enum.ts`

## Project Structure

### Source Organization
```
src/
├── app/
│   ├── components/      # Shared UI components
│   ├── domain/         # Business logic
│   ├── features/       # Feature modules
│   ├── services/       # Application services
│   └── styles/         # Global styles
├── assets/             # Static assets
└── index.html         # Entry point
```

### Import Paths
Use relative imports:
```typescript
// From components
import { Service } from '../../services/service';

// From features
import { Component } from '../../components/component';
```

## State Persistence

The app automatically persists state to localStorage:
- Key: `aof-conquest-state`
- Saves on every state change
- Loads on app initialization

To clear stored data:
1. Open browser DevTools
2. Go to Application > Local Storage
3. Delete `aof-conquest-state` key

## Debugging

### Browser DevTools
- Use Redux DevTools for state debugging
- Check Network tab for any API calls
- Use Console for error messages

### Angular DevTools
Install Angular DevTools browser extension for:
- Component tree inspection
- Performance profiling
- Change detection debugging

### Common Issues

#### State Not Persisting
- Check localStorage is not disabled
- Verify meta-reducer is configured
- Check for localStorage quota exceeded

#### Styling Issues
- Verify SCSS imports
- Check component style encapsulation
- Review global vs component styles

#### Build Errors
- Clear node_modules and reinstall
- Check TypeScript version compatibility
- Verify all imports are correct

## Performance Optimization

### 1. Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 2. Lazy Loading
Convert features to lazy-loaded modules when needed.

### 3. Bundle Size
- Monitor with `ng build --stats-json`
- Use webpack-bundle-analyzer
- Remove unused dependencies

### 4. State Selectors
Use memoized selectors for expensive computations.

## Testing Best Practices

### Unit Tests
- Test component inputs/outputs
- Mock services and store
- Test user interactions
- Verify error handling

### Integration Tests
- Test feature workflows
- Verify state updates
- Test service integration

### Test Structure
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;
  
  beforeEach(() => {
    // Setup
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // Additional tests
});
```

## Deployment

### GitHub Pages
The app is configured for GitHub Pages deployment:

1. Build the app: `ng build --configuration production`
2. Deploy: `ng deploy --base-href=/aof-conquest/`
3. Access at: `https://[username].github.io/aof-conquest/`

### Environment Configuration
Update environment files for different deployments:
- Development: Default configuration
- Production: Optimized builds

## Contributing

### 1. Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### 2. Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/tool changes

### 3. Pull Request Process
1. Create feature branch
2. Make changes
3. Run tests and lint
4. Create pull request
5. Code review
6. Merge to develop

## Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Documentation](https://ngrx.io)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [SCSS Documentation](https://sass-lang.com)