import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { WorkshopStatus } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as WorkshopStatus | null;
    const categoryId = searchParams.get('categoryId');

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    const workshops = await prisma.workshop.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: workshops
    });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const workshop = await prisma.workshop.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        dateAr: body.dateAr,
        dateFr: body.dateFr,
        time: body.time,
        locationAr: body.locationAr,
        locationFr: body.locationFr,
        instructorAr: body.instructorAr,
        instructorFr: body.instructorFr,
        price: body.price,
        status: body.status || 'OPEN',
        categoryId: parseInt(body.categoryId),
        examplesAr: body.examplesAr || [],
        examplesFr: body.examplesFr || []
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      success: true,
      data: workshop
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create workshop' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }

    const workshop = await prisma.workshop.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true
      }
    });

    return NextResponse.json({
      success: true,
      data: workshop
    });
  } catch (error) {
    console.error('Error updating workshop:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update workshop' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.workshop.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Workshop deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete workshop' },
      { status: 500 }
    );
  }
}