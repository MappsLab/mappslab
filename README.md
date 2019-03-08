## Development

### Initial Setup

- Install [localstack](https://github.com/localstack/localstack) to mock AWS services during development: `pip install localstack`
- Install packages and flow types: `yarn install && yarn flow:doctor`
- Set up `.env` files:
  - `./api/.env.test`
  - `./api/.env.development`
  - `./api/.env.staging`
