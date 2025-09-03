import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type - allow images and documents
    const allowedTypes = [
      'image/',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const isAllowedType = allowedTypes.some(type => file.type.startsWith(type) || file.type === type);
    
    if (!isAllowedType) {
      return NextResponse.json(
        { success: false, error: 'File must be an image or document (PDF, DOC, DOCX)' },
        { status: 400 }
      );
    }

    // Check file size - 5MB for images, 10MB for documents
    const maxSize = file.type.startsWith('image/') ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const limitText = file.type.startsWith('image/') ? '5MB' : '10MB';
      return NextResponse.json(
        { success: false, error: `File size must be less than ${limitText}` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileName = `${Date.now()}-${file.name}`;
    
    // Try Vercel Blob first, fallback to local storage if no token
    if (process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN !== 'your_actual_token_here') {
      try {
        const blob = await put(fileName, file, {
          access: 'public',
        });

        return NextResponse.json({
          success: true,
          url: blob.url
        });
      } catch (blobError) {
        console.log('Vercel Blob failed, falling back to local storage:', blobError);
      }
    }

    // Fallback: Save to local public directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save to public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);
    
    // Create uploads directory if it doesn't exist
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      // Try to create directory first
      const { mkdir } = await import('fs/promises');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filePath, buffer);
    }
    
    // Return local URL
    const localUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({
      success: true,
      url: localUrl,
      note: 'Using local storage. Set BLOB_READ_WRITE_TOKEN for Vercel Blob.'
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
