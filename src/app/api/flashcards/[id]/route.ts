// src/app/api/flashcards/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.query('DELETE FROM flashcards WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Flashcard deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
