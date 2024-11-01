import { Router } from "express";
import pg from "pg";

const router = Router({ mergeParams: true });

/* =================
 * Get specific template metadata (fields, date, etc.)
 * ================= */
router.get("/", async (req, res) => {
    const userId = req.auth.payload.sub;

    // Establish new database connection
    const dbClient = new pg.Client();
    await dbClient.connect();

    // Configure SQL query to select all required template metadata
    const templateSqlQuery = {
        text: "select tmp_uuid, tmp_name, tmp_date_created, tmpf_fields \
                from public.templates_view join public.template_fields \
                on tmp_uuid = tmpf_tmp_uuid \
                where tmp_uuid = cast ($1 as uuid) \
                and tmp_user_id = $2",
        values: [req.params.templateId, userId],
    };

    // Execute queries in database and wait for success/fail response
    let dbRes;
    try {
        dbRes = await dbClient.query(templateSqlQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Error getting template metadata from DB: " + error
        );
        return;
    } finally {
        await dbClient.end();
    }

    // Return 404 if no records found, otherwise should only be 1 record
    dbRes.rowCount > 0
        ? res.status(200).json(dbRes.rows[0])
        : res.status(404).send();
});

export default router;
