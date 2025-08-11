import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventStatus } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as EventStatus | null;

    const where = status ? { status } : {};

    const events = await prisma.literaryEvent.findMany({
      where,
      orderBy: [
        { status: 'asc' }, // Upcoming first, then Past
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching literary events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch literary events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const event = await prisma.literaryEvent.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        dateAr: body.dateAr,
        dateFr: body.dateFr,
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
      data: event
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating literary event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create literary event' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const event = await prisma.literaryEvent.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error updating literary event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update literary event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.literaryEvent.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Literary event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting literary event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete literary event' },
      { status: 500 }
    );
  }
}