-- Table: public.TEMPLATES

-- DROP TABLE IF EXISTS public."TEMPLATES";

CREATE TABLE IF NOT EXISTS public."TEMPLATES"
(
    "TMP_UUID" uuid NOT NULL,
    "TMP_NAME" text COLLATE pg_catalog."default" NOT NULL,
    "TMP_PATH" text COLLATE pg_catalog."default" NOT NULL,
    "TMP_DATE_CREATED" date NOT NULL,
    CONSTRAINT "TEMPLATES_pkey" PRIMARY KEY ("TMP_UUID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TEMPLATES"
    OWNER to postgres;

COMMENT ON TABLE public."TEMPLATES"
    IS 'Stores all template records';