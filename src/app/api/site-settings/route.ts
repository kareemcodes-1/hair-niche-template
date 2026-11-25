import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, body, {
        new: true,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}