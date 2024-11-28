import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // You might want to make this an environment variable as well
  ssl: {
    rejectUnauthorized: false, // You might want to adjust this based on your SSL settings
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { title, subject, institute, description, filelink } = body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO public.notes (title, subject, institute, description, filelink) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [title, subject, institute, description, filelink]
    );
    const note_id = result.rows[0].id;
    client.release();
    return NextResponse.json({ message: "Note added successfully", note_id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal server error", err });
  }
}

export async function GET(request: NextRequest) {
  const client = await pool.connect();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    let result;
    if (id) {
      result = await client.query(`SELECT * FROM public.notes WHERE id = $1`, [
        id,
      ]);
    } else {
      result = await client.query(`SELECT * FROM public.notes`);
    }

    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal server error", err });
  }
}
