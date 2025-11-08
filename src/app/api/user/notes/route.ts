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
  try {
    const body = await req.json();
    const { title, subject, institute, description, filelink } = body;
    
    if (!title || !subject || !institute || !filelink) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO public.notes (title, subject, institute, description, filelink) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [title, subject, institute, description, filelink]
      );
      const note_id = result.rows[0].id;
      client.release();
      return NextResponse.json({ message: "Note added successfully", note_id }, { status: 200 });
    } catch (err) {
      client.release();
      console.error("Database error:", err);
      return NextResponse.json(
        { message: "Database error", error: err },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
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

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Note ID is required" },
      { status: 400 }
    );
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM public.notes WHERE id = $1 RETURNING *`,
      [id]
    );

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully", deletedNote: result.rows[0] },
      { status: 200 }
    );
  } catch (err) {
    client.release();
    console.error("Error deleting note:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}
