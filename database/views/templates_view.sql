-- View: public.templates_view

-- DROP VIEW public.templates_view;

CREATE OR REPLACE VIEW public.templates_view
 AS
 SELECT standard_templates.tmp_uuid,
    standard_templates.tmp_name,
    standard_templates.tmp_path,
    standard_templates.tmp_date_created,
    standard_templates.tmp_user_id,
    'Y'::text AS is_standard
   FROM standard_templates
UNION ALL
 SELECT user_templates.tmp_uuid,
    user_templates.tmp_name,
    user_templates.tmp_path,
    user_templates.tmp_date_created,
    user_templates.tmp_user_id,
    'N'::text AS is_standard
   FROM user_templates;

ALTER TABLE public.templates_view
    OWNER TO postgres;
COMMENT ON VIEW public.templates_view
    IS 'Show all templates';


CREATE OR REPLACE TRIGGER templates_view_iud
    INSTEAD OF INSERT OR DELETE OR UPDATE 
    ON public.templates_view
    FOR EACH ROW
    EXECUTE FUNCTION public.templates_view_iud();

COMMENT ON TRIGGER templates_view_iud ON public.templates_view
    IS IUD trigger for templates_view.;
