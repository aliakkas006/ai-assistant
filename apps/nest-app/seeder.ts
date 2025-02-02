import { db } from '@repo/db';
import { professionals } from '@repo/db/src/schemas/professionals';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');

  const sampleProfessionals: any = [
    {
      id: '1',
      type: 'Organization',
      orgOrPracId: '1234567',
      usernameOrBusinessUrl: 'user1',
      name: 'Hospital 1',
      ranking: 10,
      photo: 'https://example.com/photo1.jpg',
      category: 'Healthcare',
      subCategory: ['Medicine', 'Eye'],
      rating: 4.7,
      totalAppointments: 1000,
      zone: ['Cal', 'Nev', 'NY'],
      branch: ['branch 1', 'branch 2'],
      areaOfPractice: 'local',
    },
    {
      id: '2',
      type: 'Practitioner',
      orgOrPracId: '9876543',
      usernameOrBusinessUrl: 'doc_mike',
      name: 'Dr. Mike Johnson',
      ranking: 9,
      photo: 'https://example.com/photo2.jpg',
      category: 'Doctor',
      subCategory: ['Cardiology'],
      rating: 4.9,
      totalAppointments: 500,
      zone: ['Dhaka', 'Uttara'],
      branch: ['Uttara Branch'],
      areaOfPractice: 'local',
    },
  ];

  for (const prof of sampleProfessionals) {
    try {
      // Check if the professional already exists
      const exists = await db
        .select()
        .from(professionals)
        .where(eq(professionals.id, prof.id)); // Remove .execute()

      if (exists.length === 0) {
        // Insert the professional if it doesn't exist
        await db.insert(professionals).values(prof); // Remove .execute()
        console.log(`✅ Inserted: ${prof.name}`);
      } else {
        console.log(`⚠️ Skipped (Already Exists): ${prof.name}`);
      }
    } catch (error) {
      console.error(`❌ Error inserting ${prof.name}:`, error);
    }
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
