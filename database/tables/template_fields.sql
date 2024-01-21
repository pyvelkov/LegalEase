-- Table: public.TEMPLATE_FIELDS

-- DROP TABLE IF EXISTS public."TEMPLATE_FIELDS";

CREATE TABLE IF NOT EXISTS public."TEMPLATE_FIELDS"
(
    "TMPF_TMP_UUID" uuid NOT NULL,
    "TMPF_FIELDS" json NOT NULL,
    CONSTRAINT "TEMPLATE_FIELDS_pkey" PRIMARY KEY ("TMPF_TMP_UUID"),
    CONSTRAINT "TEMPLATES_FK" FOREIGN KEY ("TMPF_TMP_UUID")
        REFERENCES public."TEMPLATES" ("TMP_UUID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TEMPLATE_FIELDS"
    OWNER to postgres;

COMMENT ON TABLE public."TEMPLATE_FIELDS"
    IS 'Stores all unique available fields for each template.';

COMMENT ON CONSTRAINT "TEMPLATES_FK" ON public."TEMPLATE_FIELDS"
    IS 'Link to template records.';