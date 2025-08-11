import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.workshopCategory.findMany({
      include: {
        workshops: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching workshop categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workshop categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const category = await prisma.workshopCategory.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        icon: body.icon,
        descriptionAr: body.descriptionAr,
        descriptionFr: body.descriptionFr
      }
    });

    return NextResponse.json({
      success: true,
      data: category
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating workshop category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create workshop category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const category = await prisma.workshopCategory.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error updating workshop category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update workshop category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.workshopCategory.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Workshop category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting workshop category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete workshop category' },
      { status: 500 }
    );
  }
}