import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

// Creates a SQL connection using our en variables
export const sql = neon(
   `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// This sql function we export is used as a tagged template literal, which allows to write sql queries safely

// postgresql://neondb_owner:npg_tiRoQw79eDbl@ep-sparkling-poetry-a5mipr4d-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require