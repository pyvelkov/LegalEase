-- FUNCTION: public.templates_view_iud()

-- DROP FUNCTION IF EXISTS public.templates_view_iud();

CREATE OR REPLACE FUNCTION public.templates_view_iud()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
begin

	if TG_OP = 'INSERT' then
	    -- Only do inserts for user templates
	    insert into public.user_templates values (new.tmp_uuid,
												  new.tmp_name,
												  new.tmp_path,
												  new.tmp_date_created,
												  new.tmp_user_id);
	    return new;
	elsif TG_OP = 'UPDATE' then
	    return null;
		
	elseif TG_OP = 'DELETE' then
	    --Only delete user templates
	    if old.is_standard = 'N' then
		    delete from public.user_templates
		    where tmp_uuid = old.tmp_uuid;
			return old;
	    else
			raise exception 'Cannot delete standard template.';
	    end if;
	end if;
end;
$BODY$;

ALTER FUNCTION public.templates_view_iud()
    OWNER TO postgres;

COMMENT ON FUNCTION public.templates_view_iud()
    IS 'Handles delete DML on the templates view.';
