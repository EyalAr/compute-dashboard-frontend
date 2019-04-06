# Compute Dashboard Frontend

The dashboard UI is built with React and is based on the
[`react-admin`](https://github.com/marmelab/react-admin) project;
which provides an easy way to create CRUD interfaces.

## Quickstart

Follow the [quickstart instructions of the backend](https://github.com/EyalAr/compute-dashboard-backend#quickstart),
and then copy-paste to your terminal:

```sh
npm install && \            # install dependencies
npm run build && \          # build web app into ./.build/
npm run docker-build && \   # build docker container with a nginx server
npm run docker-network && \ # set up bridge network to connect with backend
npm run docker              # run server
```

And point your browser to [`http://localhost:8080`](http://localhost:8080).

Log in with username/password: `demo`/`demo`.

## Usage

Install dependencies (do this before each of the following):

```sh
npm install
```

Run tests:

```sh
npm run test
```

Run development server:

```sh
BACKEND=localhost:8081 npm run dev
# If not specified, BACKEND defaults to localhost:8081
```

See the [backend project](https://github.com/EyalAr/compute-dashboard-backend)
for instructions of how to run the backend.

### Using Docker

Both the frontend and the backend are designed to run in Docker containers.
They are built independently, but in order for them to communicate from within
their containers, some networking mechanics needs to be done (see more in the
Design section below).

**Build a docker container:**

```sh
npm run build
docker build . -t compute-dashboard-frontend
# npm run docker-build
```

Set up a network bridge:

```sh
docker network create --driver bridge compute-dashboard
# npm run docker-network
```

Run your built container:

```sh
docker run --rm -d \
  -p 8080:80 \                  # route port 8080 on host to port 80
  --network compute-dashboard \ # connect to the compute-dashboard network
  --name compute-dashboard-frontend compute-dashboard-frontend
# npm run docker
```

Now point your browser to [`http://localhost:8080`](http://localhost:8080) to
load the frontend.

Log in with username/password: `demo`/`demo`.

## Design

The frontend code assumes all API endpoints are available on `/api/*`.

When running in development mode, the webpack development server proxies all
calls to `/api/*` to the backend provided in the `BACKEND` environment variable
(or to `http://localhost:8081` by default).

In production, this proxying needs to be done by the environment which serves
the frontend app.

In this repo, a `Dockerfile` is provided which builds an nginx server which:

1. Serves the frontend code.
2. Takes care of proxying `/api/*` to `http://compute-dashboard-backend`
   upstream inside the container.

There are many ways to make sure `http://compute-dashboard-backend` points to
the correct place (with Kubernetes networking, docker compose, etc.).

For this exercise we're using pure `docker` networking (see above):

1. We create a bridge network called `compute-dashboard`.
2. We connect the backend container to that network. Docker service discovery
   makes sure it's available as the host `compute-dashboard-backend`.
3. We connect the frontend container to that network.
   `http://compute-dashboard-backend` is available inside the container.

See the [backend project](https://github.com/EyalAr/compute-dashboard-backend)
for instructions of how to run the backend.

## Testing

All unit tests are run with Jest.

Code coverage is reported to the console and to `./.coverage`.

CircleCI automatically runs tests on every commit (when pushed to Github).

For E2E tests see [compute-dashboard-e2e](https://github.com/EyalAr/compute-dashboard-e2e)
project.

Unit tests for the UI components are [redundant since we're using react-admin](https://marmelab.com/react-admin/UnitTesting.html).

Unit tests are implemented for non-UI modules.

Run with `npm run test`
