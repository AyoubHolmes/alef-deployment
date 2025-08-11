import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const issues = await prisma.publicationIssue.findMany({
      where: { magazine: 'AMIS_DIONYSOS' },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: issues.map((i) => ({
        id: i.id,
        number: i.number,
        titleAr: i.titleAr,
        titleFr: i.titleFr,
        date: i.date.toISOString().slice(0, 10),
        image: i.image,
        featuredAr: i.featuredAr,
        featuredFr: i.featuredFr,
        contentAr: i.contentAr,
        contentFr: i.contentFr,
      }))
    });
  } catch (error) {
    console.error('Error fetching Amis Dionysos issues:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await prisma.publicationIssue.create({
      data: {
        magazine: 'AMIS_DIONYSOS',
        number: body.number,
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        date: new Date(body.date),
        image: body.image,
        featuredAr: body.featuredAr,
        featuredFr: body.featuredFr,
        contentAr: body.contentAr,
        contentFr: body.contentFr,
      }
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating Amis Dionysos issue:', error);
    return NextResponse.json({ success: false, error: 'Failed to create issue' }, { status: 500 });
  }
}

