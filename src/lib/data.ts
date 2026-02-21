// ==================== TYPES ====================

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  savedProcedures: string[];
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
}

export interface Hospital {
  id: string;
  hospitalName: string;
  city: string;
  procedure: string; // procedure id
  costMin: number;
  costMax: number;
  patientRating: number;
  doctorExperienceYears: number;
  recoveryTime: string;
  verifiedReviewsCount: number;
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  hospitalName: string;
  procedure: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}

// ==================== SEED DATA ====================

export const procedures: Procedure[] = [
  { id: "knee-replacement", name: "Knee Replacement", description: "Total or partial knee replacement surgery", category: "Orthopedics", city: "Pune" },
  { id: "hip-replacement", name: "Hip Replacement", description: "Total hip arthroplasty procedure", category: "Orthopedics", city: "Pune" },
  { id: "cardiac-bypass", name: "Cardiac Bypass (CABG)", description: "Coronary artery bypass grafting surgery", category: "Cardiology", city: "Pune" },
  { id: "cataract-surgery", name: "Cataract Surgery", description: "Phacoemulsification with IOL implant", category: "Ophthalmology", city: "Pune" },
  { id: "spinal-fusion", name: "Spinal Fusion", description: "Fusion of two or more vertebrae", category: "Orthopedics", city: "Pune" },
  { id: "hernia-repair", name: "Hernia Repair", description: "Laparoscopic or open hernia surgery", category: "General Surgery", city: "Pune" },
  { id: "appendectomy", name: "Appendectomy", description: "Surgical removal of the appendix", category: "General Surgery", city: "Pune" },
  { id: "gallbladder-removal", name: "Gallbladder Removal", description: "Laparoscopic cholecystectomy", category: "General Surgery", city: "Pune" },
  { id: "angioplasty", name: "Angioplasty with Stent", description: "Percutaneous coronary intervention", category: "Cardiology", city: "Pune" },
  { id: "kidney-stone", name: "Kidney Stone Removal (PCNL/URS)", description: "Percutaneous or ureteroscopic lithotripsy", category: "Urology", city: "Pune" },
];

export const hospitals: Hospital[] = [
  // Ruby Hall Clinic
  { id: "ruby-hall-knee", hospitalName: "Ruby Hall Clinic", city: "Pune", procedure: "knee-replacement", costMin: 250000, costMax: 400000, patientRating: 4.5, doctorExperienceYears: 22, recoveryTime: "6–8 weeks", verifiedReviewsCount: 312, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },
  { id: "ruby-hall-cardiac", hospitalName: "Ruby Hall Clinic", city: "Pune", procedure: "cardiac-bypass", costMin: 300000, costMax: 500000, patientRating: 4.6, doctorExperienceYears: 25, recoveryTime: "8–12 weeks", verifiedReviewsCount: 278, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },
  { id: "ruby-hall-angioplasty", hospitalName: "Ruby Hall Clinic", city: "Pune", procedure: "angioplasty", costMin: 150000, costMax: 300000, patientRating: 4.6, doctorExperienceYears: 20, recoveryTime: "1–2 weeks", verifiedReviewsCount: 189, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },

  // Sahyadri Hospitals
  { id: "sahyadri-knee", hospitalName: "Sahyadri Hospitals", city: "Pune", procedure: "knee-replacement", costMin: 220000, costMax: 350000, patientRating: 4.4, doctorExperienceYears: 18, recoveryTime: "6–8 weeks", verifiedReviewsCount: 245, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { id: "sahyadri-hip", hospitalName: "Sahyadri Hospitals", city: "Pune", procedure: "hip-replacement", costMin: 280000, costMax: 450000, patientRating: 4.3, doctorExperienceYears: 16, recoveryTime: "8–10 weeks", verifiedReviewsCount: 198, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { id: "sahyadri-hernia", hospitalName: "Sahyadri Hospitals", city: "Pune", procedure: "hernia-repair", costMin: 50000, costMax: 100000, patientRating: 4.5, doctorExperienceYears: 15, recoveryTime: "2–4 weeks", verifiedReviewsCount: 167, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { id: "sahyadri-appendectomy", hospitalName: "Sahyadri Hospitals", city: "Pune", procedure: "appendectomy", costMin: 60000, costMax: 120000, patientRating: 4.4, doctorExperienceYears: 14, recoveryTime: "2–3 weeks", verifiedReviewsCount: 210, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },

  // Jehangir Hospital
  { id: "jehangir-cardiac", hospitalName: "Jehangir Hospital", city: "Pune", procedure: "cardiac-bypass", costMin: 280000, costMax: 480000, patientRating: 4.5, doctorExperienceYears: 24, recoveryTime: "8–12 weeks", verifiedReviewsCount: 301, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },
  { id: "jehangir-knee", hospitalName: "Jehangir Hospital", city: "Pune", procedure: "knee-replacement", costMin: 230000, costMax: 380000, patientRating: 4.4, doctorExperienceYears: 20, recoveryTime: "6–8 weeks", verifiedReviewsCount: 256, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },
  { id: "jehangir-cataract", hospitalName: "Jehangir Hospital", city: "Pune", procedure: "cataract-surgery", costMin: 25000, costMax: 60000, patientRating: 4.6, doctorExperienceYears: 18, recoveryTime: "1–2 weeks", verifiedReviewsCount: 420, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },
  { id: "jehangir-angioplasty", hospitalName: "Jehangir Hospital", city: "Pune", procedure: "angioplasty", costMin: 140000, costMax: 280000, patientRating: 4.5, doctorExperienceYears: 22, recoveryTime: "1–2 weeks", verifiedReviewsCount: 195, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },

  // KEM Hospital Pune
  { id: "kem-hernia", hospitalName: "KEM Hospital, Pune", city: "Pune", procedure: "hernia-repair", costMin: 35000, costMax: 75000, patientRating: 4.2, doctorExperienceYears: 15, recoveryTime: "2–4 weeks", verifiedReviewsCount: 134, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop" },
  { id: "kem-appendectomy", hospitalName: "KEM Hospital, Pune", city: "Pune", procedure: "appendectomy", costMin: 40000, costMax: 90000, patientRating: 4.1, doctorExperienceYears: 12, recoveryTime: "2–3 weeks", verifiedReviewsCount: 156, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop" },
  { id: "kem-gallbladder", hospitalName: "KEM Hospital, Pune", city: "Pune", procedure: "gallbladder-removal", costMin: 45000, costMax: 100000, patientRating: 4.2, doctorExperienceYears: 14, recoveryTime: "1–2 weeks", verifiedReviewsCount: 112, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop" },

  // Deenanath Mangeshkar Hospital
  { id: "deenanath-hip", hospitalName: "Deenanath Mangeshkar Hospital", city: "Pune", procedure: "hip-replacement", costMin: 260000, costMax: 420000, patientRating: 4.5, doctorExperienceYears: 20, recoveryTime: "8–10 weeks", verifiedReviewsCount: 187, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop" },
  { id: "deenanath-spinal", hospitalName: "Deenanath Mangeshkar Hospital", city: "Pune", procedure: "spinal-fusion", costMin: 350000, costMax: 600000, patientRating: 4.4, doctorExperienceYears: 22, recoveryTime: "3–6 months", verifiedReviewsCount: 98, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop" },
  { id: "deenanath-kidney", hospitalName: "Deenanath Mangeshkar Hospital", city: "Pune", procedure: "kidney-stone", costMin: 60000, costMax: 150000, patientRating: 4.5, doctorExperienceYears: 17, recoveryTime: "1–2 weeks", verifiedReviewsCount: 223, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop" },
  { id: "deenanath-cataract", hospitalName: "Deenanath Mangeshkar Hospital", city: "Pune", procedure: "cataract-surgery", costMin: 20000, costMax: 50000, patientRating: 4.5, doctorExperienceYears: 16, recoveryTime: "1–2 weeks", verifiedReviewsCount: 345, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop" },

  // Aditya Birla Memorial Hospital
  { id: "abmh-cardiac", hospitalName: "Aditya Birla Memorial Hospital", city: "Pune", procedure: "cardiac-bypass", costMin: 320000, costMax: 550000, patientRating: 4.6, doctorExperienceYears: 26, recoveryTime: "8–12 weeks", verifiedReviewsCount: 267, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },
  { id: "abmh-knee", hospitalName: "Aditya Birla Memorial Hospital", city: "Pune", procedure: "knee-replacement", costMin: 240000, costMax: 400000, patientRating: 4.5, doctorExperienceYears: 19, recoveryTime: "6–8 weeks", verifiedReviewsCount: 201, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },
  { id: "abmh-angioplasty", hospitalName: "Aditya Birla Memorial Hospital", city: "Pune", procedure: "angioplasty", costMin: 160000, costMax: 320000, patientRating: 4.6, doctorExperienceYears: 23, recoveryTime: "1–2 weeks", verifiedReviewsCount: 178, image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop" },

  // Sancheti Hospital
  { id: "sancheti-knee", hospitalName: "Sancheti Hospital", city: "Pune", procedure: "knee-replacement", costMin: 200000, costMax: 350000, patientRating: 4.6, doctorExperienceYears: 25, recoveryTime: "6–8 weeks", verifiedReviewsCount: 389, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { id: "sancheti-hip", hospitalName: "Sancheti Hospital", city: "Pune", procedure: "hip-replacement", costMin: 250000, costMax: 400000, patientRating: 4.5, doctorExperienceYears: 23, recoveryTime: "8–10 weeks", verifiedReviewsCount: 276, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { id: "sancheti-spinal", hospitalName: "Sancheti Hospital", city: "Pune", procedure: "spinal-fusion", costMin: 300000, costMax: 550000, patientRating: 4.4, doctorExperienceYears: 21, recoveryTime: "3–6 months", verifiedReviewsCount: 112, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },

  // Columbia Asia Hospital
  { id: "columbia-gallbladder", hospitalName: "Columbia Asia Hospital", city: "Pune", procedure: "gallbladder-removal", costMin: 55000, costMax: 120000, patientRating: 4.3, doctorExperienceYears: 14, recoveryTime: "1–2 weeks", verifiedReviewsCount: 145, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },
  { id: "columbia-hernia", hospitalName: "Columbia Asia Hospital", city: "Pune", procedure: "hernia-repair", costMin: 45000, costMax: 90000, patientRating: 4.3, doctorExperienceYears: 13, recoveryTime: "2–4 weeks", verifiedReviewsCount: 132, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },
  { id: "columbia-kidney", hospitalName: "Columbia Asia Hospital", city: "Pune", procedure: "kidney-stone", costMin: 50000, costMax: 130000, patientRating: 4.3, doctorExperienceYears: 15, recoveryTime: "1–2 weeks", verifiedReviewsCount: 167, image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop" },

  // Poona Hospital
  { id: "poona-cataract", hospitalName: "Poona Hospital", city: "Pune", procedure: "cataract-surgery", costMin: 18000, costMax: 45000, patientRating: 4.3, doctorExperienceYears: 18, recoveryTime: "1–2 weeks", verifiedReviewsCount: 389, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop" },
  { id: "poona-kidney", hospitalName: "Poona Hospital", city: "Pune", procedure: "kidney-stone", costMin: 55000, costMax: 140000, patientRating: 4.2, doctorExperienceYears: 16, recoveryTime: "1–2 weeks", verifiedReviewsCount: 178, image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop" },
];

// Seed reviews
export const seedReviews: Review[] = [
  { id: "r1", userId: "seed", hospitalName: "Ruby Hall Clinic", procedure: "knee-replacement", rating: 5, comment: "Excellent care and modern facilities. Dr. Patil was very thorough with pre-op and post-op instructions.", verified: true, createdAt: "2025-11-15" },
  { id: "r2", userId: "seed", hospitalName: "Ruby Hall Clinic", procedure: "cardiac-bypass", rating: 4, comment: "Very competent cardiac team. Post-surgery ICU care was outstanding. Slightly expensive but worth it.", verified: true, createdAt: "2025-10-22" },
  { id: "r3", userId: "seed", hospitalName: "Sahyadri Hospitals", procedure: "knee-replacement", rating: 4, comment: "Good experience overall. Physiotherapy support was excellent. Wait time was manageable.", verified: true, createdAt: "2025-12-01" },
  { id: "r4", userId: "seed", hospitalName: "Sancheti Hospital", procedure: "knee-replacement", rating: 5, comment: "Best orthopedic hospital in Pune. Dr. Sancheti's team is world-class. Recovery was smooth.", verified: true, createdAt: "2025-09-18" },
  { id: "r5", userId: "seed", hospitalName: "Jehangir Hospital", procedure: "cataract-surgery", rating: 5, comment: "Quick, painless procedure. Vision restored within days. Very professional ophthalmology department.", verified: true, createdAt: "2025-11-30" },
  { id: "r6", userId: "seed", hospitalName: "KEM Hospital, Pune", procedure: "hernia-repair", rating: 4, comment: "Affordable and reliable. Staff was caring. The hospital is a bit old but the surgical team is excellent.", verified: true, createdAt: "2025-08-14" },
  { id: "r7", userId: "seed", hospitalName: "Deenanath Mangeshkar Hospital", procedure: "kidney-stone", rating: 5, comment: "PCNL went smoothly. Minimal pain post-surgery. Discharged in 2 days. Highly recommend.", verified: true, createdAt: "2025-12-10" },
  { id: "r8", userId: "seed", hospitalName: "Aditya Birla Memorial Hospital", procedure: "cardiac-bypass", rating: 5, comment: "Top-tier cardiac care. The entire process from admission to discharge was well-coordinated.", verified: true, createdAt: "2025-10-05" },
  { id: "r9", userId: "seed", hospitalName: "Columbia Asia Hospital", procedure: "gallbladder-removal", rating: 4, comment: "Laparoscopic surgery went well. Discharged next day. Clean and modern facility.", verified: true, createdAt: "2025-11-02" },
  { id: "r10", userId: "seed", hospitalName: "Poona Hospital", procedure: "cataract-surgery", rating: 4, comment: "Very affordable cataract surgery. Good results. The hospital has a long-standing reputation in Pune.", verified: true, createdAt: "2025-07-20" },
];

// ==================== HELPER FUNCTIONS ====================

export function getHospitalsForProcedure(procedureId: string): Hospital[] {
  return hospitals.filter((h) => h.procedure === procedureId);
}

export function getHospitalById(id: string): Hospital | undefined {
  return hospitals.find((h) => h.id === id);
}

export function getProcedureById(id: string): Procedure | undefined {
  return procedures.find((p) => p.id === id);
}

export function getReviewsForHospital(hospitalName: string, procedureId?: string): Review[] {
  const stored = getStoredReviews();
  const all = [...seedReviews, ...stored];
  return all.filter((r) => r.hospitalName === hospitalName && (!procedureId || r.procedure === procedureId));
}

// ==================== LOCAL STORAGE PERSISTENCE ====================

const USERS_KEY = "treatwise_users";
const CURRENT_USER_KEY = "treatwise_current_user";
const REVIEWS_KEY = "treatwise_reviews";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return "hashed_" + Math.abs(hash).toString(36);
}

export function getStoredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getStoredUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, error: "Email already registered" };
  }
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: simpleHash(password),
    savedProcedures: [],
  };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, error: "No account found with this email" };
  if (user.passwordHash !== simpleHash(password)) return { success: false, error: "Incorrect password" };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function toggleSavedProcedure(procedureId: string): User | null {
  const user = getCurrentUser();
  if (!user) return null;
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx === -1) return null;

  const saved = users[idx].savedProcedures;
  const i = saved.indexOf(procedureId);
  if (i > -1) saved.splice(i, 1);
  else saved.push(procedureId);

  users[idx].savedProcedures = saved;
  saveUsers(users);
  const updatedUser = users[idx];
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}

export function getStoredReviews(): Review[] {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  } catch { return []; }
}

export function addReview(review: Omit<Review, "id" | "createdAt">): Review {
  const reviews = getStoredReviews();
  const newReview: Review = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  reviews.push(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
}
