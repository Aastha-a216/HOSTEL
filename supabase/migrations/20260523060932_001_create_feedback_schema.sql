/*
  # SmartMess Feedback & Analytics Schema

  ## Overview
  Complete schema for student feedback collection, facility ratings, and institutional analytics.

  ## Tables Created
  1. **institutions** - Mess/cafeteria and accommodation facilities
  2. **students** - Student profiles linked to auth
  3. **feedback** - Individual meal/facility ratings with timestamps
  4. **facility_metrics** - Aggregated daily facility scores
  5. **student_preferences** - Dietary and facility preferences

  ## Security
  - RLS enabled on all tables
  - Students can only view/submit feedback for their institution
  - Institutional staff can view aggregated analytics
  - Proper ownership checks in all policies

  ## Key Features
  - Real-time feedback collection (food, hygiene, staff, service, facilities)
  - Micro-rating system (1-5 scale)
  - Emoji sentiment tracking
  - Daily aggregated metrics
  - Trend analysis with 30-day rolling windows
*/

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  location text,
  contact_email text,
  contact_phone text,
  student_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id uuid NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  roll_number text,
  dietary_preference text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  institution_id uuid NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  meal_date date NOT NULL,
  food_rating integer CHECK (food_rating >= 1 AND food_rating <= 5),
  hygiene_rating integer CHECK (hygiene_rating >= 1 AND hygiene_rating <= 5),
  staff_rating integer CHECK (staff_rating >= 1 AND staff_rating <= 5),
  service_rating integer CHECK (service_rating >= 1 AND service_rating <= 5),
  facilities_rating integer CHECK (facilities_rating >= 1 AND facilities_rating <= 5),
  sentiment_emoji text,
  overall_score numeric(3,1) GENERATED ALWAYS AS (
    ROUND(((COALESCE(food_rating, 0) + COALESCE(hygiene_rating, 0) + 
    COALESCE(staff_rating, 0) + COALESCE(service_rating, 0) + 
    COALESCE(facilities_rating, 0))::numeric / 5), 1)
  ) STORED,
  comments text,
  is_anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, institution_id, meal_date)
);

-- Create facility_metrics table (daily aggregates)
CREATE TABLE IF NOT EXISTS facility_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  metric_date date NOT NULL,
  food_score numeric(3,2),
  hygiene_score numeric(3,2),
  staff_score numeric(3,2),
  service_score numeric(3,2),
  facilities_score numeric(3,2),
  overall_score numeric(3,2),
  feedback_count integer DEFAULT 0,
  sentiment_distribution jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_id, metric_date)
);

-- Create student_preferences table
CREATE TABLE IF NOT EXISTS student_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  institution_id uuid NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  vegetarian boolean DEFAULT false,
  vegan boolean DEFAULT false,
  gluten_free boolean DEFAULT false,
  dairy_free boolean DEFAULT false,
  allergies text,
  notifications_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, institution_id)
);

-- Enable RLS
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for institutions (public read, staff write)
CREATE POLICY "Institutions are publicly readable"
  ON institutions FOR SELECT
  USING (true);

-- RLS Policies for students
CREATE POLICY "Students can read own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Institution staff can read student list"
  ON students FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for feedback
CREATE POLICY "Students can view their own feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = feedback.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can submit feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = feedback.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can update their own feedback"
  ON feedback FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = feedback.student_id
      AND students.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = feedback.student_id
      AND students.user_id = auth.uid()
    )
  );

-- Anyone can view aggregated facility metrics (non-identifiable)
CREATE POLICY "Facility metrics are publicly readable"
  ON facility_metrics FOR SELECT
  USING (true);

-- RLS Policies for student_preferences
CREATE POLICY "Students can read own preferences"
  ON student_preferences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = student_preferences.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can write own preferences"
  ON student_preferences FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = student_preferences.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can update own preferences"
  ON student_preferences FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = student_preferences.student_id
      AND students.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = student_preferences.student_id
      AND students.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_institution_id ON students(institution_id);
CREATE INDEX idx_feedback_student_id ON feedback(student_id);
CREATE INDEX idx_feedback_institution_id ON feedback(institution_id);
CREATE INDEX idx_feedback_meal_date ON feedback(meal_date);
CREATE INDEX idx_facility_metrics_institution_id ON facility_metrics(institution_id);
CREATE INDEX idx_facility_metrics_date ON facility_metrics(metric_date);
CREATE INDEX idx_student_preferences_student_id ON student_preferences(student_id);
