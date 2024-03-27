-- Table: public.templates

-- DROP TABLE IF EXISTS public.templates;

CREATE TABLE IF NOT EXISTS public.templates
(
    tmp_uuid uuid NOT NULL,
    tmp_name text COLLATE pg_catalog."default" NOT NULL,
    tmp_path text COLLATE pg_catalog."default" NOT NULL,
    tmp_date_created date NOT NULL,
    tmp_user_id text NOT NULL,
    CONSTRAINT templates_pkey PRIMARY KEY (tmp_uuid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.templates
    OWNER to postgres;

COMMENT ON TABLE public.templates
    IS 'Stores all template records';