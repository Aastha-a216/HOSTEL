import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Institution = {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  student_count: number;
};

export type Student = {
  id: string;
  user_id: string;
  institution_id: string;
  full_name: string;
  email: string;
  roll_number: string;
};

export type Feedback = {
  id: string;
  student_id: string;
  institution_id: string;
  meal_date: string;
  food_rating: number;
  hygiene_rating: number;
  staff_rating: number;
  service_rating: number;
  facilities_rating: number;
  sentiment_emoji: string;
  overall_score: number;
  comments: string;
};

export type FacilityMetrics = {
  id: string;
  institution_id: string;
  metric_date: string;
  food_score: number;
  hygiene_score: number;
  staff_score: number;
  service_score: number;
  facilities_score: number;
  overall_score: number;
  feedback_count: number;
  sentiment_distribution: Record<string, number>;
};
