# Contributing to ToggleNest

Thank you for considering contributing to ToggleNest! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ToggleNest.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add some feature"`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

## Code Style

- We use ESLint for code linting
- We use Prettier for code formatting
- Follow the existing code style
- Run `npm run lint` before committing

## Commit Guidelines

We follow conventional commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add user authentication`

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation as needed
3. Ensure all tests pass
4. Request review from maintainers
5. Wait for approval before merging

## Reporting Issues

- Use the GitHub issue tracker
- Clearly describe the issue including steps to reproduce
- Include screenshots if applicable
- Specify your environment (OS, Node version, etc.)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing! 🎉
