// src/app/api/flashcards/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
  const { question, answer } = await req.json();

  try {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
      [question, answer]
    );
    return NextResponse.json({ id: result.insertId, question, answer });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {
      const [rows] = await db.query('SELECT * FROM flashcards');
      return NextResponse.json(rows);
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
