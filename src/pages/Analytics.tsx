import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';
import { supabase, Student, FacilityMetrics } from '../lib/supabase';
import { ArrowUp, ArrowDown, TrendingUp, LogOut } from 'lucide-react';

export default function Analytics() {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [metrics, setMetrics] = useState<FacilityMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (studentData) {
          setStudent(studentData);

          const { data: metricsData } = await supabase
            .from('facility_metrics')
            .select('*')
            .eq('institution_id', studentData.institution_id)
            .order('metric_date', { ascending: false })
            .limit(30);

          if (metricsData) {
            setMetrics(metricsData.reverse());
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen bg-brand-off pt-20 text-center">Loading...</div>;
  if (!student) return <div className="min-h-screen bg-brand-off pt-20 text-center">No data</div>;

  const latestMetric = metrics[metrics.length - 1];
  const previousMetric = metrics[metrics.length - 2];

  const getChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return current - previous;
  };

  return (
    <div className="min-h-screen bg-brand-off">
      <div className="fixed top-0 left-0 right-0 z-40 bg-brand-off border-b-[3px] border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="font-grotesk font-bold text-brand-black text-xl">Analytics</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-black border-2 border-brand-black shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all px-4 py-2"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-7xl mx-auto pb-20">
        <div className="mb-12">
          <h2 className="font-grotesk font-bold text-3xl text-brand-black mb-2">30-Day Trends</h2>
          <p className="font-serif italic text-brand-black/60">Institutional feedback trends and sentiment analysis</p>
        </div>

        {latestMetric && previousMetric && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              { label: 'Food Quality', current: latestMetric.food_score, prev: previousMetric.food_score },
              { label: 'Hygiene', current: latestMetric.hygiene_score, prev: previousMetric.hygiene_score },
              { label: 'Staff Service', current: latestMetric.staff_score, prev: previousMetric.staff_score },
              { label: 'Service Speed', current: latestMetric.service_score, prev: previousMetric.service_score },
              { label: 'Facilities', current: latestMetric.facilities_score, prev: previousMetric.facilities_score },
            ].map((m) => {
              const change = getChange(m.current, m.prev);
              const isPositive = change >= 0;

              return (
                <div key={m.label} className="bg-white border-2 border-brand-black shadow-brutal p-4">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-black/50 mb-2">{m.label}</div>
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="font-grotesk font-bold text-brand-black text-2xl">{m.current.toFixed(2)}</div>
                    <div className={`flex items-center gap-1 font-mono text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      {Math.abs(change).toFixed(2)}
                    </div>
                  </div>
                  <div className="w-full bg-brand-off h-2 rounded-full">
                    <div className="bg-brand-blue h-2 rounded-full" style={{ width: `${(m.current / 5) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trend chart */}
        <div className="bg-white border-3 border-brand-black shadow-brutal p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-brand-blue" />
            <h3 className="font-grotesk font-bold text-2xl text-brand-black">Overall Satisfaction Trend</h3>
          </div>

          <div className="h-64 flex items-end gap-1">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="flex-1 bg-brand-blue group relative hover:bg-brand-pink transition-colors cursor-pointer"
                style={{ height: `${(m.overall_score / 5) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-brand-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold whitespace-nowrap">
                  {m.metric_date}
                  <br />
                  {m.overall_score.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-xs font-mono text-brand-black/50">
            <span>{metrics[0]?.metric_date}</span>
            <span>{metrics[metrics.length - 1]?.metric_date}</span>
          </div>
        </div>

        {/* Sentiment distribution */}
        {latestMetric?.sentiment_distribution && (
          <div className="bg-white border-3 border-brand-black shadow-brutal p-8">
            <h3 className="font-grotesk font-bold text-2xl text-brand-black mb-6">Today&apos;s Sentiment Distribution</h3>

            <div className="space-y-4">
              {Object.entries(latestMetric.sentiment_distribution).map(([sentiment, count]: [string, any]) => {
                const total = Object.values(latestMetric.sentiment_distribution).reduce((a: number, b: any) => a + b, 0);
                const percentage = ((count / total) * 100).toFixed(0);

                return (
                  <div key={sentiment}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-black/60">{sentiment}</span>
                      <span className="font-grotesk font-bold text-brand-black">{percentage}%</span>
                    </div>
                    <div className="w-full bg-brand-off h-3 rounded-full">
                      <div
                        className="h-3 rounded-full bg-brand-blue"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-brand-black">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-black/40">
                Total feedbacks: {latestMetric.feedback_count}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
