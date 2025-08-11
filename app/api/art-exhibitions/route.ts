import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ExhibitionStatus } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as ExhibitionStatus | null;

    const where = status ? { status } : {};

    const exhibitions = await prisma.artExhibition.findMany({
      where,
      orderBy: [
        { status: 'asc' }, // Current first, then Upcoming, then Past
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: exhibitions
    });
  } catch (error) {
    console.error('Error fetching art exhibitions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch art exhibitions'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const exhibition = await prisma.artExhibition.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        artistAr: body.artistAr,
        artistFr: body.artistFr,
        datesAr: body.datesAr,
        datesFr: body.datesFr,
        locationAr: body.locationAr,
        locationFr: body.locationFr,
        descriptionAr: body.descriptionAr,
        descriptionFr: body.descriptionFr,
        image: body.image,
        status: body.status || 'UPCOMING'
      }
    });

    return NextResponse.json({
      success: true,
      data: exhibition
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating art exhibition:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create art exhibition'
      },
      { status: 500 }
    );
  }
}