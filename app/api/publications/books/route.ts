import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { year: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: books.map((book) => ({
        id: book.id,
        titleAr: book.titleAr,
        titleFr: book.titleFr,
        authorAr: book.authorAr,
        authorFr: book.authorFr,
        year: book.year,
        pages: book.pages,
        isbn: book.isbn,
        image: book.image,
        descriptionAr: book.descriptionAr,
        descriptionFr: book.descriptionFr,
        summaryAr: book.summaryAr,
        summaryFr: book.summaryFr,
        downloadUrl: book.downloadUrl,
      }))
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await prisma.book.create({
      data: {
        titleAr: body.titleAr,
        titleFr: body.titleFr,
        authorAr: body.authorAr,
        authorFr: body.authorFr,
        year: body.year,
        pages: body.pages,
        isbn: body.isbn,
        image: body.image,
        descriptionAr: body.descriptionAr,
        descriptionFr: body.descriptionFr,
        summaryAr: body.summaryAr,
        summaryFr: body.summaryFr,
        downloadUrl: body.downloadUrl,
      }
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ success: false, error: 'Failed to create book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updated = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        titleAr: updateData.titleAr,
        titleFr: updateData.titleFr,
        authorAr: updateData.authorAr,
        authorFr: updateData.authorFr,
        year: updateData.year,
        pages: updateData.pages,
        isbn: updateData.isbn,
        image: updateData.image,
        descriptionAr: updateData.descriptionAr,
        descriptionFr: updateData.descriptionFr,
        summaryAr: updateData.summaryAr,
        summaryFr: updateData.summaryFr,
        downloadUrl: updateData.downloadUrl,
      }
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ success: false, error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.book.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete book' }, { status: 500 });
  }
}