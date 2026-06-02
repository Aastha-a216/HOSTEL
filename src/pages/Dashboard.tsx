import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { supabase, Student, FacilityMetrics } from '../lib/supabase';
import { Star, Droplets, Users, TrendingUp, Activity, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [metrics, setMetrics] = useState<FacilityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState({
    food: 0,
    hygiene: 0,
    staff: 0,
    service: 0,
    facilities: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (studentError) throw studentError;
        if (studentData) {
          setStudent(studentData);

          const { data: metricsData, error: metricsError } = await supabase
            .from('facility_metrics')
            .select('*')
            .eq('institution_id', studentData.institution_id)
            .order('metric_date', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (metricsError && metricsError.code !== 'PGRST116') throw metricsError;
          if (metricsData) {
            setMetrics(metricsData);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, navigate]);

  const handleSubmitFeedback = async () => {
    if (!student) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('feedback').insert({
        student_id: student.id,
        institution_id: student.institution_id,
        meal_date: new Date().toISOString().split('T')[0],
        food_rating: selectedRatings.food,
        hygiene_rating: selectedRatings.hygiene,
        staff_rating: selectedRatings.staff,
        service_rating: selectedRatings.service,
        facilities_rating: selectedRatings.facilities,
      });

      if (error) throw error;

      setSelectedRatings({ food: 0, hygiene: 0, staff: 0, service: 0, facilities: 0 });
      alert('Feedback submitted successfully!');
    } catch (err: any) {
      alert('Error submitting feedback: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-off pt-20 text-center">Loading...</div>;
  }

  if (!student) {
    return <div className="min-h-screen bg-brand-off pt-20 text-center">No student profile found</div>;
  }

  return (
    <div className="min-h-screen bg-brand-off">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-brand-off border-b-[3px] border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="font-grotesk font-bold text-brand-black text-xl">SmartMess Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-black border-2 border-brand-black shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-4 py-2"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-7xl mx-auto pb-20">
        {/* Welcome section */}
        <div className="mb-12">
          <div className="bg-white border-3 border-brand-black shadow-brutal p-8">
            <h2 className="font-grotesk font-bold text-3xl text-brand-black mb-2">Welcome, {student.full_name}</h2>
            <p className="font-serif italic text-brand-black/60">Share your feedback to help improve the dining experience</p>
          </div>
        </div>

        {/* Today's metrics */}
        {metrics && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: 'Food Quality', value: metrics.food_score, icon: <Star size={18} /> },
              { label: 'Hygiene', value: metrics.hygiene_score, icon: <Droplets size={18} /> },
              { label: 'Staff Service', value: metrics.staff_score, icon: <Users size={18} /> },
              { label: 'Service Speed', value: metrics.service_score, icon: <TrendingUp size={18} /> },
              { label: 'Facilities', value: metrics.facilities_score, icon: <Activity size={18} /> },
            ].map((m) => (
              <div key={m.label} className="bg-white border-2 border-brand-black shadow-brutal p-4">
                <div className="flex items-center gap-2 text-brand-blue mb-2">{m.icon}</div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/50 mb-1">{m.label}</div>
                <div className="font-grotesk font-bold text-brand-black text-2xl">{m.value.toFixed(1)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback form */}
        <div className="bg-white border-3 border-brand-black shadow-brutal p-8">
          <h3 className="font-grotesk font-bold text-2xl text-brand-black mb-6">Submit Today&apos;s Feedback</h3>

          <div className="space-y-6">
            {[
              { key: 'food', label: 'Food Quality', color: 'text-brand-pink' },
              { key: 'hygiene', label: 'Hygiene', color: 'text-brand-blue' },
              { key: 'staff', label: 'Staff Service', color: 'text-brand-yellow' },
              { key: 'service', label: 'Service Speed', color: 'text-brand-pink' },
              { key: 'facilities', label: 'Facilities', color: 'text-brand-blue' },
            ].map((category) => (
              <div key={category.key}>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-mono text-sm font-bold uppercase tracking-widest text-brand-black">
                    {category.label}
                  </label>
                  <span className={`font-grotesk font-bold text-lg ${category.color}`}>
                    {selectedRatings[category.key as keyof typeof selectedRatings] || '—'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        setSelectedRatings({
                          ...selectedRatings,
                          [category.key]: rating,
                        })
                      }
                      className={`flex-1 py-3 border-2 border-brand-black font-grotesk font-bold text-lg transition-all ${
                        selectedRatings[category.key as keyof typeof selectedRatings] === rating
                          ? 'bg-brand-black text-white shadow-brutal'
                          : 'bg-white text-brand-black hover:bg-brand-off'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitFeedback}
            disabled={
              submitting ||
              !selectedRatings.food ||
              !selectedRatings.hygiene ||
              !selectedRatings.staff ||
              !selectedRatings.service ||
              !selectedRatings.facilities
            }
            className="w-full mt-8 bg-brand-blue border-3 border-brand-black shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all py-4 font-grotesk font-bold text-white"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}
