import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request, { params }) {
  const { folder } = await params;
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .max_results(50)
    .execute();
  return Response.json(result.resources);
}
