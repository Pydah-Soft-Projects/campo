import React, { useState, useEffect, useRef } from 'react';
import { SEO } from '../components/SEO';
import { CampoLogo } from '../components/CampoLogo';
import { API_BASE_URL } from '../services/api';

const STAFF_PIN = '2580';
const IDLE_MS = 90000;
const PKEY = 'campo_hc_pending';
const RKEY = 'campo_hc_responses';
const LKEY = 'campo_hc_tablet';
const TABLETS = ['Tablet 1', 'Tablet 2', 'Tablet 3', 'Tablet 4'];

const CATS = [
  { key: 'acad', n: '01', name: 'Academics Operations' },
  { key: 'admin', n: '02', name: 'Administrative Operations' },
  { key: 'campus', n: '03', name: 'Campus Operations' },
  { key: 'students', n: '04', name: 'Student Management & Engagement' },
];

const Q = [
  {
    cat: 0,
    q: "When do you find out a class's attendance is dropping?",
    o: [
      ['Same day', 12.5],
      ['Every week', 8],
      ['End of month', 4],
      ['Only when parents complain', 0],
    ],
  },
  {
    cat: 0,
    q: 'How are exam timetables, marks and results managed?',
    o: [
      ['Fully in software', 12.5],
      ['Partly software, partly Excel', 6],
      ['Mostly Excel and paper', 0],
    ],
  },
  {
    cat: 1,
    q: 'How do fee reminders go out?',
    o: [
      ['Automatically', 12.5],
      ['Staff call or message each parent', 5],
      ['Only when someone checks', 0],
    ],
  },
  {
    cat: 1,
    q: 'Where are admission enquiries tracked?',
    o: [
      ['One system, assigned to counsellors', 12.5],
      ['Excel or registers', 5],
      ['Not tracked', 0],
    ],
  },
  {
    cat: 2,
    q: 'How often do parents call to ask where the bus is?',
    o: [
      ['Rarely, they track it live', 12.5],
      ['A few times a week', 6],
      ['Every day', 0],
    ],
  },
  {
    cat: 2,
    q: 'How are hostel, maintenance and stock issues handled?',
    o: [
      ['Logged and tracked to closure', 12.5],
      ['Noted on paper or WhatsApp', 5],
      ['Reported only as complaints', 0],
    ],
  },
  {
    cat: 3,
    q: 'How do circulars and notices reach parents?',
    o: [
      ['App, SMS and WhatsApp, with read status', 12.5],
      ['WhatsApp groups', 6],
      ['Paper, or students carry them', 0],
    ],
  },
  {
    cat: 3,
    q: 'Can parents check fees, attendance and marks themselves?',
    o: [
      ['Yes, in one app', 12.5],
      ['Some of it, in different places', 6],
      ['No, they call the office', 0],
    ],
  },
];

const INSIGHT = {
  acad: [
    'Academics Operations needs attention',
    "Attendance and exam issues surface late. Campo's AI alerts flag a slipping section the same day, so you act early.",
  ],
  admin: [
    'Administrative Operations needs attention',
    'Fees and enquiries depend on manual follow-up. Campo sends fee reminders and assigns every enquiry automatically.',
  ],
  campus: [
    'Campus Operations needs attention',
    "Bus calls and campus issues reach you as complaints. Campo's live bus tracking and request logging fix this.",
  ],
  students: [
    'Student Engagement needs attention',
    "Parents can't see everything in one place. Campo's parent app shows fees, attendance, marks and notices together.",
  ],
};

const ROLES = ['Principal', 'Management', 'HOD', 'Administrator', 'Other'];
const SIZES = ['Under 500', '500–2,000', '2,000–5,000', '5,000+'];

function getLabel() {
  try {
    return localStorage.getItem(LKEY) || '';
  } catch {
    return '';
  }
}

function setLabel(v) {
  try {
    localStorage.setItem(LKEY, v);
  } catch {}
}

function getStoredResponses() {
  try {
    return JSON.parse(localStorage.getItem(RKEY) || '[]');
  } catch {
    return [];
  }
}

function setStoredResponses(list) {
  try {
    localStorage.setItem(RKEY, JSON.stringify(list));
  } catch {}
}

function getPending() {
  try {
    return JSON.parse(localStorage.getItem(PKEY) || '[]');
  } catch {
    return [];
  }
}

function setPending(a) {
  try {
    localStorage.setItem(PKEY, JSON.stringify(a));
  } catch {}
}

export function CampusHealthPage({ onNavigateHome }) {
  const [view, setView] = useState('welcome'); // welcome, q, result, form, thanks, staff
  const [qIndex, setQIndex] = useState(0);
  const [ans, setAns] = useState(Array(Q.length).fill(null));
  const [docState, setDocState] = useState(null);
  const [contact, setContact] = useState({
    name: '',
    inst: '',
    role: '',
    mobile: '',
    city: '',
    size: '',
    consent: false,
  });
  const [formErr, setFormErr] = useState('');
  const [staffTab, setStaffTab] = useState('insights'); // insights, leads
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [currentTablet, setCurrentTablet] = useState(getLabel() || 'Tablet 1');
  const [allData, setAllData] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [expMsg, setExpMsg] = useState('');
  const [counterNum, setCounterNum] = useState(0);

  const idleTimerRef = useRef(null);
  const thanksTimerRef = useRef(null);

  // Sync state with local storage on load
  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const local = getStoredResponses();
    const pend = getPending();
    const map = new Map();
    local.forEach((r) => map.set(r.id, r));
    pend.forEach((p) => map.set(p.id, p));
    const merged = [...map.values()].sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt))
    );
    setAllData(merged);
    setPendingCount(pend.length);

    // Try fetching from backend if available
    fetch(`${API_BASE_URL}/health-check`)
      .then((res) => (res.ok ? res.json() : null))
      .then((result) => {
        if (result && Array.isArray(result.data)) {
          const remoteList = result.data.map((d) => ({
            id: d.responseId,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
            tablet: d.tablet,
            scores: d.scores,
            total: d.totalScore,
            weakest: d.weakestArea,
            answers: d.answers,
            contact: d.contact,
            consent: d.consent,
            whatsapp: d.whatsapp,
          }));
          remoteList.forEach((r) => map.set(r.id, r));
          const allMerged = [...map.values()].sort((a, b) =>
            String(b.createdAt).localeCompare(String(a.createdAt))
          );
          setAllData(allMerged);
          setStoredResponses(allMerged);
        }
      })
      .catch(() => {});
  };

  // Idle timeout tracking for kiosk / event tablet mode
  useEffect(() => {
    const handlePoke = () => {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (view !== 'welcome' && view !== 'staff') {
          handleStartOver();
        }
      }, IDLE_MS);
    };

    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, handlePoke, { passive: true }));
    handlePoke();

    return () => {
      clearTimeout(idleTimerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, handlePoke));
    };
  }, [view]);

  // Animated circular arc & counter for Result view
  useEffect(() => {
    if (view === 'result' && docState?.result) {
      const targetScore = docState.result.total;
      setCounterNum(0);
      const start = performance.now();
      const duration = 1200;

      let raf;
      const step = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const easeVal = 1 - Math.pow(1 - p, 3);
        setCounterNum(Math.round(targetScore * easeVal));
        if (p < 1) {
          raf = requestAnimationFrame(step);
        }
      };
      raf = requestAnimationFrame(step);

      return () => cancelAnimationFrame(raf);
    }
  }, [view, docState]);

  // Thank you view auto-return timeout
  useEffect(() => {
    if (view === 'thanks') {
      clearTimeout(thanksTimerRef.current);
      thanksTimerRef.current = setTimeout(() => {
        handleStartOver();
      }, 25000);
      return () => clearTimeout(thanksTimerRef.current);
    }
  }, [view]);

  const handleStartOver = () => {
    setQIndex(0);
    setAns(Array(Q.length).fill(null));
    setDocState(null);
    setContact({
      name: '',
      inst: '',
      role: '',
      mobile: '',
      city: '',
      size: '',
      consent: false,
    });
    setFormErr('');
    setView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const computeScore = (answersArray) => {
    const cs = { acad: 0, admin: 0, campus: 0, students: 0 };
    Q.forEach((q, k) => {
      const chosenOpt = answersArray[k];
      if (chosenOpt != null && q.o[chosenOpt]) {
        cs[CATS[q.cat].key] += q.o[chosenOpt][1];
      }
    });
    const total = Math.round(Object.values(cs).reduce((a, b) => a + b, 0));
    let weakest = 'acad';
    let min = 999;
    CATS.forEach((c) => {
      if (cs[c.key] < min) {
        min = cs[c.key];
        weakest = c.key;
      }
    });
    return { cs, total, weakest };
  };

  const getBandInfo = (total) => {
    if (total >= 80) return ['Smart campus', 'var(--teal)'];
    if (total >= 50) return ['Room to grow', 'var(--amber)'];
    return ['Needs attention', 'var(--coral)'];
  };

  const saveDoc = (newDoc) => {
    // 1. Update local storage
    const local = getStoredResponses();
    const updatedLocal = local.filter((x) => x.id !== newDoc.id);
    updatedLocal.unshift(newDoc);
    setStoredResponses(updatedLocal);

    const pend = getPending().filter((x) => x.id !== newDoc.id);
    pend.push(newDoc);
    setPending(pend);
    setPendingCount(pend.length);
    refreshAllData();

    // 2. Transmit to backend
    fetch(`${API_BASE_URL}/health-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoc),
    })
      .then((res) => {
        if (res.ok) {
          const remainingPend = getPending().filter((x) => x.id !== newDoc.id);
          setPending(remainingPend);
          setPendingCount(remainingPend.length);
        }
      })
      .catch(() => {
        // Keep in pend, will sync later
      });
  };

  const handleOptionSelect = (optIndex) => {
    const nextAns = [...ans];
    nextAns[qIndex] = optIndex;
    setAns(nextAns);

    setTimeout(() => {
      if (qIndex < Q.length - 1) {
        setQIndex(qIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const result = computeScore(nextAns);
        const docId =
          'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        const now = new Date().toISOString();
        const tab = currentTablet || getLabel() || 'Unlabelled';

        const newDoc = {
          id: docId,
          createdAt: now,
          updatedAt: now,
          answers: Q.map((q, k) => ({
            cat: CATS[q.cat].key,
            question: q.q,
            answer: q.o[nextAns[k]][0],
            points: q.o[nextAns[k]][1],
          })),
          scores: result.cs,
          total: result.total,
          weakest: result.weakest,
          contact: null,
          consent: false,
          tablet: tab,
        };

        setDocState({ ...newDoc, result });
        saveDoc(newDoc);
        setView('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 320);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!contact.name.trim()) return setFormErr('Please enter your name.');
    if (!contact.inst.trim()) return setFormErr('Please enter your institution name.');
    if (!contact.role) return setFormErr('Please choose your role.');
    if (!/^[6-9]\d{9}$/.test(contact.mobile.trim())) {
      return setFormErr('Please enter a valid 10-digit mobile number.');
    }
    if (!contact.consent) {
      return setFormErr('Please tick the box so we can send your report.');
    }

    setFormErr('');
    const updatedDoc = {
      ...docState,
      contact: { ...contact },
      consent: true,
      updatedAt: new Date().toISOString(),
    };
    setDocState(updatedDoc);
    saveDoc(updatedDoc);
    setView('thanks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabletChange = (t) => {
    setCurrentTablet(t);
    setLabel(t);
  };

  const flushPending = () => {
    const pend = getPending();
    if (!pend.length) return;

    Promise.all(
      pend.map((item) =>
        fetch(`${API_BASE_URL}/health-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
          .then((r) => (r.ok ? item.id : null))
          .catch(() => null)
      )
    ).then((syncedIds) => {
      const validSynced = new Set(syncedIds.filter(Boolean));
      const remaining = pend.filter((p) => !validSynced.has(p.id));
      setPending(remaining);
      setPendingCount(remaining.length);
      refreshAllData();
    });
  };

  const generateCsv = () => {
    const head = [
      'Time',
      'Tablet',
      'Name',
      'Role',
      'Institution',
      'City',
      'Mobile',
      'Student strength',
      'Consent',
      'Score',
      'Academics /25',
      'Administrative /25',
      'Campus /25',
      'Students /25',
      'Weakest area',
    ].concat(Q.map((q, k) => `Q${k + 1} ${q.q}`));

    const lines = [head];
    allData.forEach((r) => {
      const c = r.contact || {};
      const sc = r.scores || {};
      const weakestName = (CATS.find((x) => x.key === r.weakest) || {}).name || '';
      const answersList = (r.answers || []).map((a) => a.answer);

      lines.push(
        [
          r.createdAt,
          r.tablet || 'Unlabelled',
          c.name || '',
          c.role || '',
          c.inst || '',
          c.city || '',
          c.mobile ? `+91 ${c.mobile}` : '',
          c.size || '',
          r.consent ? 'Yes' : 'No',
          r.total,
          sc.acad != null ? sc.acad : '',
          sc.admin != null ? sc.admin : '',
          sc.campus != null ? sc.campus : '',
          sc.students != null ? sc.students : '',
          weakestName,
        ].concat(answersList)
      );
    });

    return lines
      .map((l) =>
        l
          .map((v) => {
            v = v == null ? '' : String(v);
            return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
          })
          .join(',')
      )
      .join('\n');
  };

  const exportCsv = () => {
    try {
      const csvContent = '\uFEFF' + generateCsv();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('href', url);
      link.setAttribute('download', `campo-health-check-${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExpMsg('CSV downloaded successfully.');
    } catch {
      setExpMsg('Failed to download CSV. Use Copy as CSV instead.');
    }
  };

  const copyCsv = () => {
    try {
      navigator.clipboard.writeText(generateCsv()).then(
        () => setExpMsg('Copied to clipboard! Paste into Excel or Google Sheets.'),
        () => setExpMsg('Copy was blocked by browser permissions.')
      );
    } catch {
      setExpMsg('Copy was blocked by browser permissions.');
    }
  };

  const handleKeypadPress = (val) => {
    if (val === 'cancel') {
      setShowPinModal(false);
      setPin('');
      setPinErr('');
      return;
    }
    if (val === 'del') {
      setPin((prev) => prev.slice(0, -1));
      setPinErr('');
      return;
    }
    if (pin.length < 4) {
      const nextPin = pin + val;
      setPin(nextPin);
      setPinErr('');
      if (nextPin.length === 4) {
        if (nextPin === STAFF_PIN) {
          setShowPinModal(false);
          setPin('');
          setView('staff');
          refreshAllData();
        } else {
          setPinErr('Wrong PIN');
          setTimeout(() => setPin(''), 600);
        }
      }
    }
  };

  // Precomputed stats for Staff Insights
  const leadsOnly = allData.filter((r) => r.contact && r.contact.name);
  const avgScore = allData.length
    ? Math.round(allData.reduce((acc, cur) => acc + (cur.total || 0), 0) / allData.length)
    : 0;

  const weakCountMap = {};
  allData.forEach((r) => {
    if (r.weakest) weakCountMap[r.weakest] = (weakCountMap[r.weakest] || 0) + 1;
  });
  const topWeakEntry = Object.entries(weakCountMap).sort((a, b) => b[1] - a[1])[0];
  const topWeakName = topWeakEntry
    ? (CATS.find((c) => c.key === topWeakEntry[0]) || {}).name
    : '—';

  const tabletCounts = {};
  allData.forEach((r) => {
    const t = r.tablet || 'Unlabelled';
    tabletCounts[t] = (tabletCounts[t] || 0) + 1;
  });

  const R = 140;
  const C = 2 * Math.PI * R;
  const currentTotal = docState?.result?.total || 0;
  const strokeOffset = C * (1 - currentTotal / 100);
  const currentBand = getBandInfo(currentTotal);
  const currentInsight = docState?.result?.weakest
    ? INSIGHT[docState.result.weakest]
    : INSIGHT.acad;

  return (
    <>
      <SEO
        title="Campus Health Check — Free 60-Second Institutional Evaluation | Campo"
        description="Benchmark your campus across Academics, Administration, Transport, Hostels, and Student Engagement in 60 seconds. Get your instant Campo Campus Score and a free 90-day transformation plan."
        keywords="Campus health check, institutional evaluation, college ERP audit, campus operations score, school management assessment, Campo"
        canonical="https://campo.co.in/campus-health"
      />

      {/* Embedded Style Block matching the exact specified theme and design system */}
      <style>{`
        .campo-hc-root {
          --navy: #1B2447;
          --navy2: #232E5A;
          --navy3: #2C3970;
          --line: #3A4880;
          --teal: #43BEA2;
          --teal2: #62D8BC;
          --tdark: #107864;
          --white: #ffffff;
          --soft: #DCE4F5;
          --muted: #A9B6D6;
          --amber: #F5B544;
          --coral: #F07167;
          min-height: 100vh;
          background-color: var(--navy);
          color: var(--white);
          font-family: Inter, system-ui, sans-serif;
          -webkit-tap-highlight-color: transparent;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }

        .campo-hc-root * {
          box-sizing: border-box;
        }

        .campo-hc-root button {
          font: inherit;
          color: inherit;
          cursor: pointer;
        }

        .campo-hc-root h1,
        .campo-hc-root h2,
        .campo-hc-root h3,
        .campo-hc-root h4 {
          font-family: Outfit, sans-serif;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .campo-hc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px clamp(20px, 4vw, 56px) 0;
          position: relative;
          z-index: 20;
        }

        .campo-hc-top-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .campo-hc-tag {
          font-family: Outfit, sans-serif;
          font-weight: 600;
          color: var(--teal2);
          font-size: clamp(13px, 1.4vw, 17px);
          letter-spacing: 0.02em;
        }

        .campo-hc-nav-home {
          background: var(--navy2);
          border: 1px solid var(--line);
          color: var(--soft);
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .campo-hc-nav-home:hover {
          background: var(--navy3);
          color: var(--white);
          border-color: var(--teal);
        }

        .campo-hc-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px clamp(20px, 4vw, 56px) 40px;
        }

        .campo-hc-screen {
          width: 100%;
          max-width: 980px;
          animation: campoHcIn 0.35s ease both;
        }

        @keyframes campoHcIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .campo-hc-eyebrow {
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: clamp(12px, 1.3vw, 15px);
          color: var(--teal2);
          text-transform: uppercase;
        }

        .campo-hc-btn {
          border: 0;
          border-radius: 999px;
          background: var(--teal);
          color: var(--navy);
          font-family: Outfit, sans-serif;
          font-weight: 700;
          font-size: clamp(18px, 2vw, 24px);
          padding: 18px 40px;
          min-height: 60px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: transform 0.15s, background 0.15s;
          box-shadow: 0 4px 16px rgba(67, 190, 162, 0.25);
        }

        .campo-hc-btn:hover {
          background: var(--teal2);
        }

        .campo-hc-btn:active {
          transform: scale(0.97);
        }

        .campo-hc-btn:disabled {
          background: #4a5580;
          color: #9aa6c8;
          cursor: not-allowed;
        }

        .campo-hc-btn.ghost {
          background: transparent;
          color: var(--soft);
          border: 2px solid var(--line);
          box-shadow: none;
        }

        .campo-hc-btn.ghost:hover {
          background: var(--navy2);
          border-color: var(--soft);
        }

        .campo-hc-link {
          background: none;
          border: 0;
          color: var(--muted);
          font-size: 16px;
          padding: 12px;
          min-height: 44px;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s;
        }

        .campo-hc-link:hover {
          color: var(--white);
        }

        /* Welcome */
        .campo-hc-welcome {
          text-align: center;
        }

        .campo-hc-welcome h1 {
          font-size: clamp(44px, 7vw, 92px);
          font-weight: 800;
          line-height: 1;
          margin: 18px 0 18px;
        }

        .campo-hc-welcome h1 span {
          color: var(--teal2);
        }

        .campo-hc-welcome p.lead {
          font-size: clamp(18px, 2.2vw, 26px);
          color: var(--soft);
          margin: 0 0 34px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        .campo-hc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin: 34px 0 0;
        }

        .campo-hc-chip {
          border: 1.5px solid var(--line);
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 16px;
          color: var(--soft);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .campo-hc-chip svg {
          width: 18px;
          height: 18px;
          color: var(--teal2);
        }

        .campo-hc-cats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 40px;
        }

        .campo-hc-cat {
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 14px;
          text-align: left;
        }

        .campo-hc-cat b {
          display: block;
          font-family: Outfit, sans-serif;
          color: var(--teal2);
          font-size: 15px;
          margin-bottom: 2px;
        }

        .campo-hc-cat span {
          font-family: Outfit, sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.25;
          display: block;
        }

        /* Question */
        .campo-hc-progress {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
          margin-bottom: 34px;
        }

        .campo-hc-progress i {
          height: 8px;
          border-radius: 4px;
          background: var(--navy3);
          transition: background 0.3s ease;
        }

        .campo-hc-progress i.done {
          background: var(--teal);
        }

        .campo-hc-progress i.now {
          background: var(--teal2);
          box-shadow: 0 0 8px rgba(98, 216, 188, 0.4);
        }

        .campo-hc-qhead {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .campo-hc-qnum {
          font-family: Outfit, sans-serif;
          font-weight: 800;
          background: var(--teal);
          color: var(--navy);
          border-radius: 12px;
          padding: 6px 12px;
          font-size: 18px;
        }

        .campo-hc-q h2 {
          font-size: clamp(30px, 4.2vw, 50px);
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .campo-hc-opts {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .campo-hc-opt {
          display: flex;
          align-items: center;
          gap: 18px;
          text-align: left;
          background: var(--navy2);
          border: 2px solid var(--line);
          border-radius: 20px;
          padding: 20px 24px;
          min-height: 76px;
          font-size: clamp(18px, 2.1vw, 24px);
          font-weight: 500;
          transition: border-color 0.15s, background 0.15s, transform 0.1s;
          user-select: none;
        }

        .campo-hc-opt:hover {
          border-color: var(--teal);
          background: rgba(35, 46, 90, 0.85);
        }

        .campo-hc-opt:active {
          transform: scale(0.99);
        }

        .campo-hc-opt .dot {
          flex: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2.5px solid var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .campo-hc-opt.sel {
          border-color: var(--teal);
          background: #1F4A55;
        }

        .campo-hc-opt.sel .dot {
          border-color: var(--teal);
          background: var(--teal);
        }

        .campo-hc-opt.sel .dot::after {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--navy);
        }

        .campo-hc-qfoot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 26px;
        }

        .campo-hc-counter {
          color: var(--muted);
          font-size: 16px;
        }

        /* Result */
        .campo-hc-result {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
        }

        .campo-hc-gauge {
          position: relative;
          width: min(340px, 80vw);
          aspect-ratio: 1;
          margin: 0 auto;
        }

        .campo-hc-gauge svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .campo-hc-gauge .val {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .campo-hc-gauge .val b {
          font-family: Outfit, sans-serif;
          font-size: clamp(64px, 9vw, 108px);
          font-weight: 800;
          line-height: 1;
        }

        .campo-hc-gauge .val span {
          color: var(--muted);
          font-size: 18px;
          margin-top: 4px;
        }

        .campo-hc-band {
          display: inline-block;
          margin-top: 18px;
          padding: 8px 18px;
          border-radius: 999px;
          font-family: Outfit, sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--navy);
        }

        .campo-hc-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 22px 0 24px;
        }

        .campo-hc-bar .lbl {
          display: flex;
          justify-content: space-between;
          font-family: Outfit, sans-serif;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .campo-hc-bar .lbl em {
          font-style: normal;
          color: var(--muted);
          font-weight: 500;
        }

        .campo-hc-bar .track {
          height: 14px;
          border-radius: 7px;
          background: var(--navy3);
          overflow: hidden;
        }

        .campo-hc-bar .fill {
          height: 100%;
          border-radius: 7px;
          transition: width 1s ease;
        }

        .campo-hc-insight {
          background: var(--navy2);
          border: 1px solid var(--line);
          border-left: 0;
          border-radius: 18px;
          padding: 18px 20px;
          font-size: 18px;
          line-height: 1.45;
          color: var(--soft);
          margin-bottom: 24px;
        }

        .campo-hc-insight b {
          color: var(--white);
          font-family: Outfit, sans-serif;
          display: block;
          font-size: 19px;
          margin-bottom: 4px;
        }

        /* Form */
        .campo-hc-form h2 {
          font-size: clamp(30px, 4vw, 46px);
          margin: 10px 0 8px;
        }

        .campo-hc-form p.sub {
          color: var(--soft);
          font-size: 19px;
          margin: 0 0 26px;
        }

        .campo-hc-grid2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .campo-hc-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .campo-hc-field label,
        .campo-hc-field .lab {
          font-weight: 600;
          font-size: 16px;
          color: var(--soft);
        }

        .campo-hc-field input {
          background: var(--navy2);
          border: 2px solid var(--line);
          border-radius: 16px;
          color: var(--white);
          font: inherit;
          font-size: 20px;
          padding: 14px 16px;
          min-height: 58px;
          outline: none;
          transition: border-color 0.15s;
        }

        .campo-hc-field input:focus {
          border-color: var(--teal);
        }

        .campo-hc-phone {
          display: flex;
          align-items: stretch;
          gap: 8px;
        }

        .campo-hc-phone span {
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: 16px;
          background: var(--navy3);
          font-size: 20px;
          font-weight: 600;
        }

        .campo-hc-phone input {
          flex: 1;
          min-width: 0;
        }

        .campo-hc-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .campo-hc-pill {
          background: var(--navy2);
          border: 2px solid var(--line);
          border-radius: 999px;
          padding: 10px 18px;
          min-height: 48px;
          font-size: 17px;
          font-weight: 500;
          transition: all 0.15s;
        }

        .campo-hc-pill:hover {
          border-color: var(--teal);
        }

        .campo-hc-pill.sel {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--navy);
          font-weight: 700;
        }

        .campo-hc-full {
          grid-column: 1 / -1;
        }

        .campo-hc-consent {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          font-size: 17px;
          color: var(--soft);
          line-height: 1.4;
          cursor: pointer;
        }

        .campo-hc-consent input {
          width: 28px;
          height: 28px;
          accent-color: var(--teal);
          flex: none;
          margin: 0;
        }

        .campo-hc-err {
          color: #ffb3ac;
          font-size: 16px;
          min-height: 22px;
          margin-top: 10px;
        }

        .campo-hc-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-top: 22px;
          flex-wrap: wrap;
        }

        /* Thanks */
        .campo-hc-thanks {
          text-align: center;
        }

        .campo-hc-tick {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--teal);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 26px;
          box-shadow: 0 0 30px rgba(67, 190, 162, 0.4);
        }

        .campo-hc-thanks h2 {
          font-size: clamp(36px, 5vw, 60px);
          margin-bottom: 14px;
        }

        .campo-hc-thanks p {
          font-size: clamp(18px, 2.2vw, 24px);
          color: var(--soft);
          margin: 0 0 10px;
        }

        .campo-hc-thanks .free {
          display: inline-block;
          margin: 22px 0 30px;
          padding: 14px 26px;
          border-radius: 20px;
          background: var(--navy2);
          border: 1.5px solid var(--teal);
          font-family: Outfit, sans-serif;
          font-size: 22px;
          font-weight: 600;
        }

        .campo-hc-thanks .free b {
          color: var(--teal2);
        }

        /* Staff */
        .campo-hc-staffbtn {
          position: fixed;
          right: 14px;
          bottom: 14px;
          background: rgba(35, 46, 90, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--muted);
          font-size: 13px;
          padding: 8px 16px;
          min-height: 40px;
          z-index: 40;
          transition: all 0.2s;
        }

        .campo-hc-staffbtn:hover {
          color: var(--white);
          border-color: var(--teal);
          background: var(--navy2);
        }

        .campo-hc-modal {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 30, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 20px;
        }

        .campo-hc-card {
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 28px;
          width: min(380px, 100%);
          text-align: center;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .campo-hc-card h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .campo-hc-pinrow {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 18px 0;
        }

        .campo-hc-pinrow i {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--muted);
          transition: all 0.15s;
        }

        .campo-hc-pinrow i.on {
          background: var(--teal);
          border-color: var(--teal);
          box-shadow: 0 0 10px rgba(67, 190, 162, 0.5);
        }

        .campo-hc-keypad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .campo-hc-keypad button {
          background: var(--navy3);
          border: 0;
          border-radius: 16px;
          font-size: 24px;
          font-weight: 600;
          min-height: 60px;
          transition: background 0.15s;
        }

        .campo-hc-keypad button:active {
          background: var(--teal);
          color: var(--navy);
        }

        .campo-hc-staff {
          max-width: 1200px;
        }

        .campo-hc-stafftop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .campo-hc-tabs {
          display: flex;
          gap: 8px;
        }

        .campo-hc-tabs button {
          background: var(--navy2);
          border: 1.5px solid var(--line);
          border-radius: 999px;
          padding: 10px 18px;
          min-height: 44px;
          font-weight: 600;
          transition: all 0.15s;
        }

        .campo-hc-tabs button.on {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--navy);
        }

        .campo-hc-kpis {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .campo-hc-kpi {
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 18px;
        }

        .campo-hc-kpi b {
          display: block;
          font-family: Outfit, sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: var(--teal2);
          line-height: 1.05;
        }

        .campo-hc-kpi span {
          color: var(--soft);
          font-size: 15px;
        }

        .campo-hc-facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .campo-hc-fact {
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 18px 20px;
        }

        .campo-hc-fact .c {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--teal2);
        }

        .campo-hc-fact h4 {
          font-family: Outfit, sans-serif;
          font-size: 19px;
          margin: 6px 0 12px;
          font-weight: 600;
        }

        .campo-hc-dist {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .campo-hc-drow {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 120px 48px;
          gap: 10px;
          align-items: center;
          font-size: 14px;
          color: var(--soft);
        }

        .campo-hc-drow .t {
          height: 10px;
          border-radius: 5px;
          background: var(--navy3);
          overflow: hidden;
        }

        .campo-hc-drow .t i {
          display: block;
          height: 100%;
          background: var(--teal);
        }

        .campo-hc-drow b {
          text-align: right;
          color: var(--white);
        }

        .campo-hc-tablewrap {
          overflow-x: auto;
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 20px;
        }

        .campo-hc-table {
          border-collapse: collapse;
          width: 100%;
          font-size: 14px;
          min-width: 900px;
        }

        .campo-hc-table th,
        .campo-hc-table td {
          padding: 12px 14px;
          text-align: left;
          border-bottom: 1px solid var(--line);
          white-space: nowrap;
        }

        .campo-hc-table th {
          color: var(--muted);
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .campo-hc-table td.num,
        .campo-hc-table th.num {
          text-align: right;
        }

        .campo-hc-note {
          color: var(--muted);
          font-size: 15px;
          margin: 12px 0 0;
        }

        .campo-hc-warn {
          background: #4a3a1c;
          border: 1px solid var(--amber);
          color: #ffe3ae;
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 15px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .campo-hc-labelbox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          background: var(--navy2);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 14px 18px;
          margin-bottom: 16px;
          font-size: 16px;
        }

        .campo-hc-tabcounts {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 0 18px;
        }

        .campo-hc-empty {
          color: var(--muted);
          text-align: center;
          padding: 40px;
          font-size: 17px;
        }

        @media (max-width: 760px) {
          .campo-hc-result {
            grid-template-columns: 1fr;
          }
          .campo-hc-grid2 {
            grid-template-columns: 1fr;
          }
          .campo-hc-cats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .campo-hc-kpis {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .campo-hc-facts {
            grid-template-columns: 1fr;
          }
          .campo-hc-tag {
            display: none;
          }
        }
      `}</style>

      <div className="campo-hc-root">
        {/* Top Header */}
        <header className="campo-hc-top">
          <div className="campo-hc-top-left">
            <button
              onClick={() => handleStartOver()}
              className="flex items-center gap-2 focus:outline-none"
              title="Campo Campus Health Check"
            >
              <CampoLogo variant="light" size="md" />
            </button>
            <div className="campo-hc-tag">AI-Powered Campus Operating System</div>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="campo-hc-nav-home"
              >
                <span>←</span> Back to Main Website
              </button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="campo-hc-main">
          {/* ====================================================
              1. WELCOME SCREEN
              ==================================================== */}
          {view === 'welcome' && (
            <section className="campo-hc-screen campo-hc-welcome">
              <div className="campo-hc-eyebrow">The 60-second Campus Health Check</div>
              <h1>
                How smart is <span>your campus?</span>
              </h1>
              <p className="lead">
                Answer 8 quick questions and get your Campus Score instantly.
              </p>

              <button
                type="button"
                className="campo-hc-btn"
                onClick={() => {
                  setView('q');
                  setQIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Start the check
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <div className="campo-hc-chips">
                <span className="campo-hc-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  About 60 seconds
                </span>

                <span className="campo-hc-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                  </svg>
                  Instant score
                </span>

                <span className="campo-hc-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="8" width="18" height="13" rx="2" />
                    <path d="M12 8v13M3 12h18M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z" />
                  </svg>
                  Free 90-day plan
                </span>
              </div>

              <div className="campo-hc-cats">
                {CATS.map((c) => (
                  <div key={c.key} className="campo-hc-cat">
                    <b>{c.n}</b>
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ====================================================
              2. QUESTIONNAIRE SCREEN
              ==================================================== */}
          {view === 'q' && (
            <section className="campo-hc-screen campo-hc-q">
              {/* 8-step progress bar */}
              <div className="campo-hc-progress" aria-hidden="true">
                {Q.map((_, k) => (
                  <i
                    key={k}
                    className={k < qIndex ? 'done' : k === qIndex ? 'now' : ''}
                  />
                ))}
              </div>

              {/* Category indicator */}
              <div className="campo-hc-qhead">
                <span className="campo-hc-qnum">{CATS[Q[qIndex].cat].n}</span>
                <span className="campo-hc-eyebrow">{CATS[Q[qIndex].cat].name}</span>
              </div>

              <h2>{Q[qIndex].q}</h2>

              {/* Options list */}
              <div
                className="campo-hc-opts"
                role="radiogroup"
                aria-label={Q[qIndex].q}
              >
                {Q[qIndex].o.map((opt, k) => {
                  const isSelected = ans[qIndex] === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      className={`campo-hc-opt ${isSelected ? 'sel' : ''}`}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleOptionSelect(k)}
                    >
                      <span className="dot" />
                      <span>{opt[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation */}
              <div className="campo-hc-qfoot">
                <button
                  type="button"
                  className="campo-hc-btn ghost"
                  onClick={() => {
                    if (qIndex === 0) {
                      handleStartOver();
                    } else {
                      setQIndex(qIndex - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {qIndex === 0 ? 'Home' : 'Back'}
                </button>
                <span className="campo-hc-counter">
                  Question {qIndex + 1} of {Q.length}
                </span>
              </div>
            </section>
          )}

          {/* ====================================================
              3. RESULT SCREEN
              ==================================================== */}
          {view === 'result' && (
            <section className="campo-hc-screen campo-hc-result">
              <div style={{ textAlign: 'center' }}>
                <div className="campo-hc-eyebrow">Your Campus Score</div>
                <div className="campo-hc-gauge" style={{ marginTop: '14px' }}>
                  <svg viewBox="0 0 320 320" aria-hidden="true">
                    <circle
                      cx="160"
                      cy="160"
                      r={R}
                      fill="none"
                      stroke="var(--navy3)"
                      strokeWidth="22"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r={R}
                      fill="none"
                      stroke={currentBand[1]}
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={strokeOffset}
                      style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                    />
                  </svg>
                  <div className="val">
                    <b>{counterNum}</b>
                    <span>out of 100</span>
                  </div>
                </div>

                <span
                  className="campo-hc-band"
                  style={{ background: currentBand[1] }}
                >
                  {currentBand[0]}
                </span>
              </div>

              <div>
                <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>
                  How your campus scores
                </h2>

                <div className="campo-hc-bars">
                  {CATS.map((c) => {
                    const scoreVal = docState?.result?.cs?.[c.key] || 0;
                    const fillCol =
                      scoreVal >= 20
                        ? 'var(--teal)'
                        : scoreVal >= 12.5
                        ? 'var(--amber)'
                        : 'var(--coral)';
                    const fillWidth = (scoreVal / 25) * 100;

                    return (
                      <div key={c.key} className="campo-hc-bar">
                        <div className="lbl">
                          <span>
                            {c.n} · {c.name}
                          </span>
                          <em>{Math.round(scoreVal)}/25</em>
                        </div>
                        <div className="track">
                          <div
                            className="fill"
                            style={{
                              width: `${fillWidth}%`,
                              background: fillCol,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="campo-hc-insight">
                  <b>{currentInsight[0]}</b>
                  {currentInsight[1]}
                </div>

                <div className="campo-hc-actions">
                  <button
                    type="button"
                    className="campo-hc-btn"
                    onClick={() => {
                      setView('form');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Get my full report + free 90-day plan
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="campo-hc-link"
                    onClick={handleStartOver}
                  >
                    No thanks, start over
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ====================================================
              4. LEAD CAPTURE FORM SCREEN
              ==================================================== */}
          {view === 'form' && (
            <section className="campo-hc-screen campo-hc-form">
              <div className="campo-hc-eyebrow">Almost done</div>
              <h2>Where should we send your report?</h2>
              <p className="sub">
                We'll WhatsApp your full Campus Health Report and activate your free
                90-day Campo plan.
              </p>

              <form onSubmit={handleFormSubmit} noValidate>
                <div className="campo-hc-grid2">
                  <div className="campo-hc-field">
                    <label htmlFor="hc-name">Your name</label>
                    <input
                      id="hc-name"
                      autoComplete="name"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      placeholder="e.g. Dr. Rajesh Sharma"
                      required
                    />
                  </div>

                  <div className="campo-hc-field">
                    <label htmlFor="hc-inst">Institution name</label>
                    <input
                      id="hc-inst"
                      autoComplete="organization"
                      value={contact.inst}
                      onChange={(e) =>
                        setContact({ ...contact, inst: e.target.value })
                      }
                      placeholder="e.g. St. Xavier's Engineering College"
                      required
                    />
                  </div>

                  <div className="campo-hc-field campo-hc-full">
                    <span className="lab" id="roleLabel">
                      Your role
                    </span>
                    <div
                      className="campo-hc-pills"
                      role="radiogroup"
                      aria-labelledby="roleLabel"
                    >
                      {ROLES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={`campo-hc-pill ${
                            contact.role === r ? 'sel' : ''
                          }`}
                          role="radio"
                          aria-checked={contact.role === r}
                          onClick={() => setContact({ ...contact, role: r })}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="campo-hc-field">
                    <label htmlFor="hc-mobile">Mobile (WhatsApp)</label>
                    <div className="campo-hc-phone">
                      <span>+91</span>
                      <input
                        id="hc-mobile"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel-national"
                        value={contact.mobile}
                        onChange={(e) => {
                          const sanitized = e.target.value
                            .replace(/\D/g, '')
                            .slice(0, 10);
                          setContact({ ...contact, mobile: sanitized });
                        }}
                        placeholder="98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="campo-hc-field">
                    <label htmlFor="hc-city">City</label>
                    <input
                      id="hc-city"
                      autoComplete="address-level2"
                      value={contact.city}
                      onChange={(e) =>
                        setContact({ ...contact, city: e.target.value })
                      }
                      placeholder="e.g. Hyderabad, Bengaluru"
                    />
                  </div>

                  <div className="campo-hc-field campo-hc-full">
                    <span className="lab" id="sizeLabel">
                      Student strength
                    </span>
                    <div
                      className="campo-hc-pills"
                      role="radiogroup"
                      aria-labelledby="sizeLabel"
                    >
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`campo-hc-pill ${
                            contact.size === s ? 'sel' : ''
                          }`}
                          role="radio"
                          aria-checked={contact.size === s}
                          onClick={() => setContact({ ...contact, size: s })}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="campo-hc-consent campo-hc-full">
                    <input
                      type="checkbox"
                      checked={contact.consent}
                      onChange={(e) =>
                        setContact({ ...contact, consent: e.target.checked })
                      }
                    />
                    <span>
                      I agree to Campo contacting me on WhatsApp or phone about my
                      report and the free plan.
                    </span>
                  </label>
                </div>

                {formErr && (
                  <div className="campo-hc-err" role="alert">
                    {formErr}
                  </div>
                )}

                <div className="campo-hc-actions">
                  <button type="submit" className="campo-hc-btn">
                    Send my report
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="campo-hc-btn ghost"
                    onClick={() => {
                      setView('result');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Back to my score
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ====================================================
              5. THANK YOU SCREEN
              ==================================================== */}
          {view === 'thanks' && (
            <section className="campo-hc-screen campo-hc-thanks">
              <div className="campo-hc-tick">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1B2447"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </div>

              <h2>Thank you, {contact.name.split(' ')[0] || 'Leader'}!</h2>
              <p>
                Our team will WhatsApp your full report to{' '}
                <b>
                  +91 {contact.mobile.slice(0, 5)} {contact.mobile.slice(5)}
                </b>
                .
              </p>
              <p>
                Your Campus Score:{' '}
                <b>{docState?.result?.total || currentTotal}/100</b>
              </p>

              <div className="free">
                Your <b>free 90-day plan</b> is reserved. Ask us for a live demo,
                right here.
              </div>

              <div>
                <button
                  type="button"
                  className="campo-hc-btn"
                  onClick={handleStartOver}
                >
                  Start a new check
                </button>
              </div>
            </section>
          )}

          {/* ====================================================
              6. STAFF ANALYTICS VIEW
              ==================================================== */}
          {view === 'staff' && (
            <section className="campo-hc-screen campo-hc-staff">
              <div className="campo-hc-stafftop">
                <div>
                  <div className="campo-hc-eyebrow">Staff view</div>
                  <h2 style={{ fontSize: '32px', marginTop: '4px' }}>
                    Campus Health Check results
                  </h2>
                </div>

                <div className="campo-hc-tabs">
                  <button
                    type="button"
                    className={staffTab === 'insights' ? 'on' : ''}
                    onClick={() => setStaffTab('insights')}
                  >
                    Live insights
                  </button>
                  <button
                    type="button"
                    className={staffTab === 'leads' ? 'on' : ''}
                    onClick={() => setStaffTab('leads')}
                  >
                    Leads ({leadsOnly.length})
                  </button>
                </div>
              </div>

              {/* Tablet selector */}
              <div className="campo-hc-labelbox">
                <div>
                  <b>This device / kiosk:</b>{' '}
                  <span style={{ color: 'var(--teal2)' }}>{currentTablet}</span>
                </div>
                <div className="campo-hc-pills">
                  {TABLETS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`campo-hc-pill ${currentTablet === t ? 'sel' : ''}`}
                      onClick={() => handleTabletChange(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {pendingCount > 0 && (
                <div className="campo-hc-warn">
                  <span>
                    {pendingCount} response{pendingCount > 1 ? 's are' : ' is'} buffered
                    locally on this device.
                  </span>
                  <button
                    type="button"
                    className="campo-hc-link"
                    style={{ color: '#FFE3AE', padding: '0 8px' }}
                    onClick={flushPending}
                  >
                    Sync to Cloud now
                  </button>
                </div>
              )}

              {/* Staff Tab: Live Insights */}
              {staffTab === 'insights' && (
                <>
                  <div className="campo-hc-kpis">
                    <div className="campo-hc-kpi">
                      <b>{allData.length}</b>
                      <span>Health checks taken</span>
                    </div>
                    <div className="campo-hc-kpi">
                      <b>{leadsOnly.length}</b>
                      <span>Leads with contact</span>
                    </div>
                    <div className="campo-hc-kpi">
                      <b>{allData.length ? avgScore : '—'}</b>
                      <span>Average Campus Score</span>
                    </div>
                    <div className="campo-hc-kpi">
                      <b
                        style={{
                          fontSize: '20px',
                          lineHeight: '1.2',
                          paddingTop: '8px',
                        }}
                      >
                        {topWeakName}
                      </b>
                      <span>Most common weak area</span>
                    </div>
                  </div>

                  {Object.keys(tabletCounts).length > 0 && (
                    <div className="campo-hc-tabcounts">
                      {Object.entries(tabletCounts)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([t, n]) => (
                          <span key={t} className="campo-hc-chip">
                            <b style={{ color: 'var(--teal2)' }}>{n}</b>
                            &nbsp;{t}
                          </span>
                        ))}
                    </div>
                  )}

                  {allData.length > 0 ? (
                    <div className="campo-hc-facts">
                      {Q.map((q, k) => {
                        const counts = q.o.map(() => 0);
                        let totalAnswersForQ = 0;

                        allData.forEach((r) => {
                          const a = r.answers && r.answers[k];
                          if (!a) return;
                          const optIdx = q.o.findIndex((o) => o[0] === a.answer);
                          if (optIdx >= 0) {
                            counts[optIdx]++;
                            totalAnswersForQ++;
                          }
                        });

                        return (
                          <div key={k} className="campo-hc-fact">
                            <div className="c">
                              {CATS[q.cat].n} · {CATS[q.cat].name.toUpperCase()}
                            </div>
                            <h4>{q.q}</h4>
                            <div className="campo-hc-dist">
                              {q.o.map((opt, i) => {
                                const pct = totalAnswersForQ
                                  ? Math.round((counts[i] / totalAnswersForQ) * 100)
                                  : 0;
                                return (
                                  <div key={i} className="campo-hc-drow">
                                    <span>{opt[0]}</span>
                                    <span className="t">
                                      <i style={{ width: `${pct}%` }} />
                                    </span>
                                    <b>{pct}%</b>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="campo-hc-empty">
                      No health checks recorded yet. As visitors complete the quiz,
                      live insights will appear here.
                    </div>
                  )}
                </>
              )}

              {/* Staff Tab: Leads Table */}
              {staffTab === 'leads' && (
                <>
                  {allData.length > 0 ? (
                    <div className="campo-hc-tablewrap">
                      <table className="campo-hc-table">
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Tablet</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Institution</th>
                            <th>City</th>
                            <th>Mobile</th>
                            <th>Students</th>
                            <th className="num">Score</th>
                            <th>Weakest area</th>
                            <th>WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allData.map((r) => {
                            const c = r.contact || {};
                            const t = new Date(r.createdAt);
                            const timeStr = isNaN(t.getTime())
                              ? ''
                              : t.toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                });
                            const weakestTitle =
                              (CATS.find((x) => x.key === r.weakest) || {}).name || '—';

                            return (
                              <tr key={r.id}>
                                <td>{timeStr}</td>
                                <td>{r.tablet || 'Unlabelled'}</td>
                                <td style={{ fontWeight: 600 }}>{c.name || '—'}</td>
                                <td>{c.role || '—'}</td>
                                <td>{c.inst || '—'}</td>
                                <td>{c.city || '—'}</td>
                                <td>{c.mobile ? `+91 ${c.mobile}` : '—'}</td>
                                <td>{c.size || '—'}</td>
                                <td
                                  className="num"
                                  style={{
                                    fontWeight: 700,
                                    color:
                                      r.total >= 80
                                        ? 'var(--teal2)'
                                        : r.total >= 50
                                        ? 'var(--amber)'
                                        : 'var(--coral)',
                                  }}
                                >
                                  {r.total}
                                </td>
                                <td>{weakestTitle}</td>
                                <td>
                                  {r.whatsapp?.status === 'sent' ? (
                                    <span style={{ color: 'var(--teal2)', fontWeight: 600 }}>✓ Sent</span>
                                  ) : r.whatsapp?.status === 'failed' ? (
                                    <span style={{ color: 'var(--coral)' }} title={r.whatsapp?.error || 'Failed'}>Failed</span>
                                  ) : r.whatsapp?.status === 'skipped' ? (
                                    <span style={{ color: 'var(--amber)' }} title="API keys not configured">Skipped</span>
                                  ) : (
                                    <span style={{ color: 'var(--muted)' }}>—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="campo-hc-empty">No responses recorded yet.</div>
                  )}
                </>
              )}

              {/* Staff Actions */}
              <div className="campo-hc-actions">
                <button
                  type="button"
                  className="campo-hc-btn"
                  onClick={exportCsv}
                  style={{ fontSize: '16px', minHeight: '48px', padding: '12px 24px' }}
                >
                  Download Excel (CSV)
                </button>
                <button
                  type="button"
                  className="campo-hc-btn ghost"
                  onClick={copyCsv}
                  style={{ fontSize: '16px', minHeight: '48px', padding: '12px 24px' }}
                >
                  Copy as CSV
                </button>
                <button
                  type="button"
                  className="campo-hc-link"
                  onClick={() => setView('welcome')}
                >
                  Back to Questionnaire
                </button>
                {expMsg && (
                  <span className="campo-hc-note" style={{ margin: 0 }}>
                    {expMsg}
                  </span>
                )}
              </div>
            </section>
          )}
        </main>

        {/* Staff Button (Fixed bottom right) */}
        <button
          type="button"
          className="campo-hc-staffbtn"
          onClick={() => {
            if (view === 'staff') {
              setView('welcome');
            } else {
              setPin('');
              setPinErr('');
              setShowPinModal(true);
            }
          }}
          aria-label="Staff administration"
        >
          {view === 'staff' ? 'Exit Staff View' : 'Staff Mode'}
        </button>

        {/* PIN Entry Modal */}
        {showPinModal && (
          <div className="campo-hc-modal" role="dialog" aria-modal="true">
            <div className="campo-hc-card">
              <h3>Staff Mode</h3>
              <div style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Enter the 4-digit PIN (default: 2580)
              </div>

              <div className="campo-hc-pinrow">
                {[0, 1, 2, 3].map((k) => (
                  <i key={k} className={k < pin.length ? 'on' : ''} />
                ))}
              </div>

              {pinErr && (
                <div
                  className="campo-hc-err"
                  style={{ margin: '0 0 12px', minHeight: 'auto' }}
                >
                  {pinErr}
                </div>
              )}

              <div className="campo-hc-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleKeypadPress(String(n))}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleKeypadPress('cancel')}
                  aria-label="Cancel"
                  style={{ fontSize: '18px', color: 'var(--muted)' }}
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('del')}
                  aria-label="Backspace"
                  style={{ fontSize: '18px', color: 'var(--muted)' }}
                >
                  ⌫
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
