-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL,
    user_name text COLLATE pg_catalog."default",
    user_email text COLLATE pg_catalog."default" NOT NULL,
    user_auth_provider text COLLATE pg_catalog."default" NOT NULL,
    user_auth_id text COLLATE pg_catalog."default" NOT NULL,
    user_last_login date NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (user_id),
    CONSTRAINT user_uk1 UNIQUE (user_email, user_auth_provider),
    CONSTRAINT user_uk2 UNIQUE (user_auth_id, user_auth_provider)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

COMMENT ON TABLE public.users
    IS 'Stores all user records';