import { db, Professional } from '@repo/db';
import { professionals } from '@repo/db';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');

  const sampleProfessionals: Professional[] = [
    {
      id: 1,
      type: 'Organization',
      orgOrPracId: '1234567',
      usernameOrBusinessUrl: 'user1',
      name: 'Hospital 1',
      ranking: 10,
      photo: 'https://example.com/photo1.jpg',
      category: 'Healthcare',
      subCategory: ['Medicine', 'Eye'],
      rating: '4.7',
      totalAppointments: 1000,
      zone: ['Cal', 'Nev', 'NY'],
      branch: ['branch 1', 'branch 2'],
      areaOfPractice: 'local',
    },
    {
      id: 2,
      type: 'Practitioner',
      orgOrPracId: '9876543',
      usernameOrBusinessUrl: 'doc_mike',
      name: 'Doctor 1',
      ranking: 9,
      photo: 'https://example.com/photo2.jpg',
      category: 'Doctor',
      subCategory: ['Cardiology'],
      rating: '4.9',
      totalAppointments: 500,
      zone: ['Dhaka', 'Uttara'],
      branch: ['Uttara Branch'],
      areaOfPractice: 'local',
    },
  ];

  for (const professional of sampleProfessionals) {
    try {
      // Check if the professional already exists
      const exists = await db
        .select()
        .from(professionals)
        .where(eq(professionals.id, professional.id));

      console.log('exists', exists);

      if (exists.length === 0) {
        await db.insert(professionals).values(professional);
        console.log(`✅ Inserted: ${professional.name}`);
      } else {
        console.log(`⚠️ Skipped (Already Exists): ${professional.name}`);
      }
    } catch (error) {
      console.error(`❌ Error inserting ${professional.name}:`, error);
    }
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
