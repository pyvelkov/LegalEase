-- Table: public.template_fields

-- DROP TABLE IF EXISTS public.template_fields;

CREATE TABLE IF NOT EXISTS public.template_fields
(
    tmpf_tmp_uuid uuid NOT NULL,
    tmpf_fields json NOT NULL,
    CONSTRAINT template_fields_pkey PRIMARY KEY (tmpf_tmp_uuid),
    CONSTRAINT templates_fk FOREIGN KEY (tmpf_tmp_uuid)
        REFERENCES public.templates (tmp_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.template_fields
    OWNER to postgres;

COMMENT ON TABLE public.template_fields
    IS 'Stores all unique available fields for each template.';

COMMENT ON CONSTRAINT templates_fk ON public.template_fields
    IS 'Link to template records.';