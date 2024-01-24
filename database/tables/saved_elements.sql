-- Table: public.saved_elements

-- DROP TABLE IF EXISTS public.saved_elements;

CREATE TABLE IF NOT EXISTS public.saved_elements
(
    sve_uuid uuid NOT NULL,
    sve_name text COLLATE pg_catalog."default" NOT NULL,
    sve_definition json NOT NULL,
    CONSTRAINT saved_elements_pkey PRIMARY KEY (sve_uuid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.saved_elements
    OWNER to postgres;

COMMENT ON TABLE public.saved_elements
    IS 'Stores all definitions for saved elements.';