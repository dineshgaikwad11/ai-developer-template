# Local Containers

Set `MSSQL_SA_PASSWORD` in the environment to a strong local-only SQL Server Developer password, then run `docker compose up --build` from the repository root. The API is available at `http://localhost:5000`; the frontend is at `http://localhost:8080` and proxies same-origin `/api` requests to the API container. SQL Server state is stored in the named `mssql-data` volume.

Compose requires the SA password through the environment and does not store a database password in the repository. Apply reviewed migrations as a deliberate local or release step; the API does not migrate automatically. Production must inject credentials from a secret provider, run non-development configuration, use TLS at ingress, configure the JWT authority/audience and browser token integration, and apply migrations through a controlled release stage.

To reset local database state, stop the stack and remove the named `mssql-data` volume deliberately. This deletes local data.
