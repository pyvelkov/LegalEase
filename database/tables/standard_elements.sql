-- Table: public.standard_elements

-- DROP TABLE IF EXISTS public.standard_elements;

CREATE TABLE IF NOT EXISTS public.standard_elements
(
    stde_uuid uuid NOT NULL,
    stde_name text COLLATE pg_catalog."default" NOT NULL,
    stde_definition json NOT NULL,
    CONSTRAINT standard_elements_pkey PRIMARY KEY (stde_uuid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.standard_elements
    OWNER to postgres;

COMMENT ON TABLE public.standard_elements
    IS 'Stores definitions for all standard elements.';