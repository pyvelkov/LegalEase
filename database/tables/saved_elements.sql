-- Table: public.SAVED_ELEMENTS

-- DROP TABLE IF EXISTS public."SAVED_ELEMENTS";

CREATE TABLE IF NOT EXISTS public."SAVED_ELEMENTS"
(
    "SVE_UUID" uuid NOT NULL,
    "SVE_NAME" text COLLATE pg_catalog."default" NOT NULL,
    "SVE_DEFINITION" json NOT NULL,
    CONSTRAINT "SAVED_ELEMENTS_pkey" PRIMARY KEY ("SVE_UUID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SAVED_ELEMENTS"
    OWNER to postgres;

COMMENT ON TABLE public."SAVED_ELEMENTS"
    IS 'Stores all definitions for saved elements.';