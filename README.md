## Development

### Initial Setup

- Install Docker
- Install [localstack](https://github.com/localstack/localstack) to mock AWS services during development: `pip install localstack`
- Install packages and flow types: `yarn install && yarn flow:doctor`
- Set up `.env` files with the proper values:
  - `./api/.env.test`
  - `./api/.env.development`
  - `./api/.env.staging`
- Initialize the Database and LocalStack containers: `yarn workspace mappslab-api db:init`
- When the containers are up, apply initial settings to the mocked AWS S3 instance: `yarn workspace mappslab-api localstack:setup` _(todo: automate this step)_

At this point you should be ready to go.

### Working

In separate terminals:

- `yarn workspace mappslab-api dev`
- `yarn workspace mappslab-app dev`

The `develop` branch is protected on the repo. Work on a separate branch, then push to github and make PR.

### Commits

Commits should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. The format is:

```
<type>[scope]: <description>

[optional body]

[optional footer]
```

Examples:

- `chore(repo): update flow`
- `feat(app): prompt for new user emails & temp passwords`
- `fix(app): fix inspector browsing & history`

Scopes for this repo are: `repo`, `api`, `app`, `mapp`

Commit types (copied from the link above):

- `fix:` a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- `feat:` a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
- `BREAKING CHANGE:` a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section introduces a breaking API change (correlating with MAJOR in semantic versioning). A breaking change can be part of commits of any type. e.g., a fix:, feat: & chore: types would all be valid, in addition to any other type.
  Others: commit types other than `fix:` and `feat:` are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others. We also recommend `improvement:` for commits that improve a current implementation without adding a new feature or fixing a bug. Notice these types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE, which is NOT recommended).
  A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.
