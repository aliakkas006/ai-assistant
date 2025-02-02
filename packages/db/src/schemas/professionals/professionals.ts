import { pgTable, serial, varchar, text, timestamp, numeric,  integer } from 'drizzle-orm/pg-core';

// Professional table schema   
export const professionals = pgTable("professionals", {
    id: serial("id").primaryKey(),
    type: text("type").notNull(), 
    orgOrPracId: varchar('org_or_prac_id', { length: 255 }).notNull(),
    usernameOrBusinessUrl: varchar('username_or_business_url', { length: 255 }),
    name: varchar('name', { length: 255 }).notNull(),
    ranking: integer("ranking").default(0),
    photo: varchar('photo_url', { length: 255 }),
    category: varchar('category', { length: 255 }).notNull(),
    subCategory: text("sub_category").array().notNull(),
    rating: numeric("rating", { precision: 2, scale: 1 }),
    totalAppointments: integer("total_appointments").default(0),
    zone: text("zone").array().notNull(),
    branch: text("branch").array().notNull(),
    areaOfPractice: text("area_of_practice").notNull(),
  });

  export type Professional = typeof professionals.$inferSelect;

