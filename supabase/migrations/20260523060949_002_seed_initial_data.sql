/*
  # Seed Initial Data for SmartMess

  Adds sample institutions and data for testing the platform.
*/

-- Insert sample institutions
INSERT INTO institutions (name, slug, description, location, contact_email, student_count) VALUES
  ('IIT Delhi Mess', 'iit-delhi', 'Indian Institute of Technology Delhi Cafeteria', 'New Delhi, India', 'mess@iitd.ac.in', 9000),
  ('NIT Trichy Mess', 'nit-trichy', 'National Institute of Technology Tiruchirappalli', 'Trichy, Tamil Nadu', 'mess@nitt.edu', 5500),
  ('BITS Pilani Cafeteria', 'bits-pilani', 'Birla Institute of Technology and Science', 'Pilani, Rajasthan', 'cafeteria@bits-pilani.ac.in', 5000),
  ('VIT Vellore Mess', 'vit-vellore', 'Vellore Institute of Technology', 'Vellore, Tamil Nadu', 'mess@vit.ac.in', 18000)
ON CONFLICT (slug) DO NOTHING;

-- Get institution IDs for use in subsequent inserts
WITH inst AS (
  SELECT id, slug FROM institutions WHERE slug IN ('iit-delhi', 'nit-trichy', 'bits-pilani', 'vit-vellore')
)
-- Insert sample facility metrics for the last 30 days
INSERT INTO facility_metrics (institution_id, metric_date, food_score, hygiene_score, staff_score, service_score, facilities_score, overall_score, feedback_count, sentiment_distribution)
SELECT
  inst.id,
  CURRENT_DATE - (series.day)::integer,
  ROUND((3.5 + (random() * 1.5))::numeric, 2),
  ROUND((4.0 + (random() * 0.9))::numeric, 2),
  ROUND((3.8 + (random() * 1.0))::numeric, 2),
  ROUND((3.6 + (random() * 1.1))::numeric, 2),
  ROUND((4.1 + (random() * 0.8))::numeric, 2),
  ROUND((3.8 + (random() * 0.9))::numeric, 2),
  (100 + (random() * 200)::integer),
  jsonb_build_object(
    'happy', floor(random() * 35)::integer,
    'satisfied', floor(random() * 35)::integer,
    'neutral', floor(random() * 15)::integer,
    'dissatisfied', floor(random() * 10)::integer,
    'angry', floor(random() * 5)::integer
  )
FROM inst,
LATERAL (SELECT generate_series(0, 29) AS day) series
ON CONFLICT (institution_id, metric_date) DO NOTHING;
