-- Table: public.templates

-- DROP TABLE IF EXISTS public.templates;

CREATE TABLE IF NOT EXISTS public.templates
(
    tmp_uuid uuid NOT NULL,
    tmp_name text COLLATE pg_catalog."default" NOT NULL,
    tmp_path text COLLATE pg_catalog."default" NOT NULL,
    tmp_date_created date NOT NULL,
    tmp_user_id uuid NOT NULL,
    CONSTRAINT templates_pkey PRIMARY KEY (tmp_uuid),
    CONSTRAINT users_fk FOREIGN KEY (tmp_user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.templates
    OWNER to postgres;

COMMENT ON TABLE public.templates
    IS 'Stores all template records';

COMMENT ON CONSTRAINT users_fk ON public.templates
    IS 'Users link';