# Commit Message Conventions

This project uses **Commitlint** with the Conventional Commits specification to enforce standardized commit messages across the monorepo.

## Commit Message Format

All commit messages must follow this format:

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

### Type

The type must be one of the following:

- **feat** — A new feature
- **fix** — A bug fix
- **docs** — Documentation-only changes
- **style** — Code style changes (formatting, missing semicolons, etc.)
- **refactor** — Code refactoring without fixing bugs or adding features
- **perf** — Performance improvements
- **test** — Adding or updating tests
- **chore** — Build, dependency, tooling, or CI/CD configuration changes
- **revert** — Reverts a previous commit

### Subject

- Use the imperative mood ("add feature" not "added feature")
- Do **not** capitalize the first letter
- Do **not** end with a period
- Limit to 50 characters
- Be concise and descriptive

### Scope (Optional)

Specify which part of the codebase is affected:

- `backend` — Backend API changes
- `web` — Web frontend changes
- `mobile` — Mobile app changes
- `shared` — Shared package changes
- `docs` — Documentation
- `ci` — CI/CD configuration

Example with scope: `feat(backend): add user authentication endpoint`

### Body (Optional)

- Use the imperative mood
- Include motivation for the change
- Contrast with previous behavior
- Reference GitHub issues if applicable

### Footer (Optional)

Reference issues or breaking changes:

```
Closes #123
Fixes #456
BREAKING CHANGE: describe what breaks
```

## Examples

### Valid Commits

```
feat: add image cropping modal for avatar uploads

Implemented react-easy-crop library to allow users to crop and rotate
avatar images before saving. Modal supports zoom and rotation controls.

Closes #42
```

```
fix(backend): handle expired jwt tokens gracefully

Added middleware to catch expired token errors and return 401 response
with clear error message for client-side re-authentication.
```

```
docs: update database setup instructions for PostgreSQL
```

```
chore(deps): upgrade prisma to v5.22.0
```

```
refactor(web): simplify filter state management in DiscoverSection
```

### Invalid Commits

❌ `Added new feature` — Capitalized, missing type
❌ `feat: Add feature` — Capitalized subject
❌ `feat: adds feature` — Wrong tense
❌ `feat: add feature.` — Ends with period
❌ `feature: add new item creation modal` — Invalid type

## Enforced by Git Hooks

Commitlint is installed with Husky and automatically validates commit messages on `git commit`. If your commit message doesn't follow the conventions, the commit will be rejected:

```bash
✖ subject must not end with a period [subject-full-stop]
✖ type must be lowercase [type-case]

commit message: Subject ends with period. TYPE: add feature

The commit-msg hook will prevent commits that don't comply.
```

## Running Commitlint Manually

To test a commit message before committing:

```bash
echo "fix: resolve authentication issue" | npx commitlint
```

## Contributing

When making commits to this project:

1. Write meaningful commit messages following these conventions
2. Keep commits focused and atomic
3. Use scopes to clarify which workspace/feature is affected
4. Let Husky validate your message — if rejected, review and fix the message

Thank you for keeping our commit history clean and readable! 🎯
