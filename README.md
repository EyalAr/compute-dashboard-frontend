# Compute Dashboard Frontend

The dashboard UI is built with React and is based on the
[`react-admin`](https://github.com/marmelab/react-admin) project;
which provides an easy way to create CRUD interfaces.

## Usage

**Install dependencies (do this before each of the following):**

```sh
npm install
```

**Run tests:**

```sh
npm run test
```

**Run development server with mock data:**

```sh
npm run dev
```

**Run development server with real backend:**

```sh
BACKEND=localhost:8081 npm run dev
```

See the [backend project](https://github.com/EyalAr/compute-dashboard-backend)
for instructions of how to run the backend on a host port.

**Build a docker container:**

```sh
npm run build
docker build . -t compute-dashboard-frontend
# npm run build-docker
```

**Run your built container with the backend:**

(See Design section below for explanation of how this works.)

Assuming the backend is running on host port `8081`:

```sh
docker run --rm -d -p 8080:80 -p 8081:9090 --add-host api_backend:127.0.0.1:9090 compute-dashboard-frontend
# npm run docker
```

Now you can go to `http://localhost:8080` to load the frontend.

## Design

The frontend code assumes all API endpoints are available on `/api/*`.

When running in development mode, the webpack development server proxies all
calls to `/api/*` to either the mock server, or the backend provided in the
`BACKEND` environment variable.

In production, this proxying needs to be done by the environment which serves
the frontend app.

In this repo, a `Dockerfile` is provided which builds an nginx server which:

1. Serves the frontend code.
2. Takes care of proxying `/api/*` to port `http://api_backend` upstream inside
   the container.

There are many ways to make sure `http://api_backend` points to the correct
place (Kubernetes networking, docker compose, etc.).

For this exercise we're using pure docker (see above). In order for the API
backend to be available inside the frontend container we need to:

1. Have the backend running on a port on the host (e.g. `localhost:8081`)
2. Map the host port to an internal port of the frontend container (e.g. `9090`)
3. Map the `api_backend` host name to the local container port on which the
   backend is available.

See the [backend project](https://github.com/EyalAr/compute-dashboard-backend)
for instructions of how to run the backend on a host port.
