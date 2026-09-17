-- ============================================================
-- StoryLens AI — PostgreSQL initialization script
-- Executed automatically on first container start.
-- ============================================================

-- Extensions (if needed for advanced features)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure the app role exists (the postgres image already creates
-- POSTGRES_USER, but this guards non-container setups).
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'storylens') THEN
      CREATE ROLE storylens LOGIN PASSWORD 'storylens_password';
   END IF;
END
$$;

-- Grant privileges on the database to the app role
GRANT ALL PRIVILEGES ON DATABASE storylens TO storylens;

