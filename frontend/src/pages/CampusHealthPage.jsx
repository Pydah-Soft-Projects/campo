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

const LOGO_SRC =
  'data:image/png;base64,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';
const LOGO_RATIO = 0.2799;

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
    cat: 0,
    q: 'How are library books issued and returned?',
    o: [
      ['Scanned (RFID or barcode) in software', 12.5],
      ['Typed into software by staff', 6],
      ['Written in a register', 0],
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
    cat: 1,
    q: 'How is staff salary calculated each month?',
    o: [
      ['Automatically from attendance and leave', 12.5],
      ['In Excel by the accounts team', 5],
      ['Manually, or by an outside accountant', 0],
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
    cat: 2,
    q: 'How does the hostel mess know how many students to cook for?',
    o: [
      ['Daily count from hostel attendance', 12.5],
      ['Warden gives a rough count', 5],
      ['We cook a fixed quantity', 0],
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
  {
    cat: 3,
    q: 'How do students request certificates and ID cards?',
    o: [
      ['Online, and they can track the status', 12.5],
      ['Form at the office, then wait', 5],
      ['Queue at the office each time', 0],
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

const RECO = [
  ['Academics', 'AI attendance alerts flag a slipping section the same day, so you can act before it becomes a problem.'],
  ['Examinations', 'Scheduling, hall tickets, marks entry and results, all in one place with no Excel.'],
  ['Library', 'RFID issue and return, overdue alerts and online book reservation.'],
  ['Fee', 'Automatic fee reminders, concessions and online collection, with every due tracked.'],
  ['Admissions', 'Every enquiry captured, assigned to a counsellor and followed up until it converts.'],
  ['HR & Payroll', 'Salaries calculated from attendance and leave, with records and compliance in one place.'],
  ['Transport', 'Live bus tracking for parents, plus route, mileage and document-expiry alerts.'],
  ['Hostel, Maintenance & Stationery', 'Every request and stock issue logged, assigned and tracked to closure.'],
  ['Hostel', 'Daily hostel attendance gives the mess an exact count, so less food is wasted.'],
  ['Communications', 'SMS, WhatsApp and in-app notices that reach every parent, with read status.'],
  ['Student and Parent App', 'Fees, attendance, marks and notices in one app, in Telugu and other languages.'],
  ['Student Management', 'Online requests for certificates and ID cards, tracked until they\'re ready.'],
];

const TIP = {
  acad: "Campo's AI alerts flag a slipping section the same day, so you act early.",
  admin: 'Campo sends fee reminders and assigns every enquiry automatically.',
  campus: "Campo's live bus tracking and request logging stop the daily calls and complaints.",
  students: "Campo's parent app shows fees, attendance, marks and notices in one place.",
};

const SHORT = {
  acad: 'Academics',
  admin: 'Administrative',
  campus: 'Campus',
  students: 'Students',
};

const STRONG = 20;
const BENCH = 15;
const PAGE = { acad: 3, admin: 4, campus: 5, students: 6 };

function flagsOf(sc) {
  sc = sc || {};
  return CATS.map((c) => ({ key: c.key, v: +(sc[c.key] || 0) }))
    .filter((f) => f.v < STRONG)
    .map((f) => ({ key: f.key, v: f.v, level: f.v < BENCH ? 'attn' : 'grow' }))
    .sort((a, b) => a.v - b.v);
}

function catLabel(v) {
  return v >= STRONG ? 'Strong' : v >= BENCH ? 'Room to grow' : 'Needs attention';
}

function bandOf(t) {
  return t >= 80
    ? ['Smart campus', [67, 190, 162]]
    : t >= 50
    ? ['Room to grow', [245, 181, 68]]
    : ['Needs attention', [240, 113, 103]];
}

function catBand(v) {
  return v >= STRONG
    ? ['Strong', [67, 190, 162]]
    : v >= BENCH
    ? ['Room to grow', [245, 181, 68]]
    : ['Needs attention', [240, 113, 103]];
}

function safeText(t) {
  return String(t || '').replace(/[^\x20-\x7E\xA0-\xFF\u2013\u2014\u2018\u2019\u201C\u201D\u2022]/g, '');
}

function waAreas(sc) {
  const F = flagsOf(sc);
  const nm = (k) => (CATS.find((x) => x.key === k) || {}).name || '';
  if (!F.length) {
    return 'Your campus runs well across all four areas. Campo brings everything into one AI-powered system.';
  }
  if (F.length === 4) {
    return '*All four areas need attention.* Campo brings academics, administration, campus and students into one system, with AI alerts across all of them.';
  }
  return (
    (F.length === 1 ? 'Area that needs attention:' : 'Areas that need attention:') +
    '\n' +
    F.map((f) => `• *${nm(f.key)}* (${Math.round(f.v)}/25): ${TIP[f.key]}`).join('\n')
  );
}

function waText(r) {
  const c = r.contact || {};
  const sc = r.scores || {};
  const first = (c.name || '').split(' ')[0] || 'there';
  return `Hi ${first}, thank you for visiting Campo at the expo! 🎓

Your *Campus Score: ${r.total}/100*
• Academics: ${Math.round(sc.acad || 0)}/25
• Administrative: ${Math.round(sc.admin || 0)}/25
• Campus: ${Math.round(sc.campus || 0)}/25
• Students: ${Math.round(sc.students || 0)}/25

${waAreas(sc)}

Your *free 90-day Campo plan* is reserved for ${c.inst || 'your campus'}. Your full Campus Health Report is attached.

Reply *DEMO* to book a live demo at your campus.

Team Campo
www.campo.co.in | +91 70361 24568`;
}

function waLink(r) {
  const m = (r.contact && r.contact.mobile) || '';
  return 'https://wa.me/91' + m.replace(/\D/g, '') + '?text=' + encodeURIComponent(waText(r));
}

let jspdfPromise = null;
function loadJsPDF() {
  if (window.jspdf) return Promise.resolve(window.jspdf);
  if (!jspdfPromise) {
    jspdfPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => resolve(window.jspdf);
      script.onerror = () => {
        jspdfPromise = null;
        reject(new Error('Failed to load jsPDF library'));
      };
      document.head.appendChild(script);
    });
  }
  return jspdfPromise;
}

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
  const [generatingPdfId, setGeneratingPdfId] = useState('');

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

  // 12-question scoring logic normalized back to /25 for each category and /100 overall
  const computeScore = (answersArray) => {
    const cs = { acad: 0, admin: 0, campus: 0, students: 0 };
    Q.forEach((q, k) => {
      const chosenOpt = answersArray[k];
      if (chosenOpt != null && q.o[chosenOpt]) {
        cs[CATS[q.cat].key] += q.o[chosenOpt][1];
      }
    });

    CATS.forEach((c) => {
      const n = Q.filter((q) => CATS[q.cat].key === c.key).length;
      cs[c.key] = Math.round(((cs[c.key] * 25) / (12.5 * n)) * 10) / 10;
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

  const generateReportPdf = (r, avg) => {
    setGeneratingPdfId(r.id);
    loadJsPDF()
      .then((J) => {
        const doc = new J.jsPDF({ unit: 'mm', format: 'a4' });
        const c = r.contact || {};
        const sc = r.scores || {};
        const NAVY = [27, 36, 71];
        const TEAL = [67, 190, 162];
        const TD = [16, 120, 100];
        const INK = [40, 48, 80];
        const GREY = [98, 108, 135];
        const LIGHT = [240, 244, 250];
        const W = 210;

        // Header
        doc.setFillColor(...NAVY);
        doc.rect(0, 0, W, 46, 'F');
        doc.addImage(LOGO_SRC, 'PNG', 16, 12, 44, 44 * LOGO_RATIO);
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('CAMPUS HEALTH REPORT', W - 16, 15, { align: 'right' });
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(17);
        doc.text(safeText(c.inst || 'Your institution'), W - 16, 24, {
          align: 'right',
          maxWidth: 120,
        });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(220, 228, 245);
        const d = new Date(r.createdAt);
        doc.text(
          safeText(
            `Prepared for ${c.name || ''}${c.role ? ', ' + c.role : ''}${c.city ? ' · ' + c.city : ''}`
          ),
          W - 16,
          31,
          { align: 'right', maxWidth: 150 }
        );
        doc.text(
          isNaN(d.getTime())
            ? ''
            : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          W - 16,
          37,
          { align: 'right' }
        );

        // Score Block
        const b = bandOf(r.total);
        doc.setFillColor(...LIGHT);
        doc.roundedRect(16, 52, W - 32, 36, 4, 4, 'F');
        doc.setDrawColor(...b[1]);
        doc.setLineWidth(3);
        doc.circle(36, 70, 10.5, 'S');
        doc.setTextColor(...NAVY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text(String(r.total), 36, 72.3, { align: 'center' });
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...GREY);
        doc.text('out of 100', 36, 76.6, { align: 'center' });
        doc.setTextColor(...NAVY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Your Campus Score', 54, 61.5);
        doc.setFontSize(10);
        doc.setFillColor(...b[1]);
        doc.roundedRect(54, 64.5, doc.getTextWidth(b[0]) + 10, 7, 3.5, 3.5, 'F');
        doc.setTextColor(...NAVY);
        doc.text(b[0], 59, 69.3);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...INK);

        const F = flagsOf(sc);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...NAVY);
        const ln = !F.length
          ? 'All four areas are strong'
          : F.length === 4
          ? 'All four areas need attention'
          : `${F.length} of 4 areas to improve: ${F.map((f) => SHORT[f.key]).join(', ')}`;
        doc.setFontSize(9.5);
        doc.text(ln, 54, 77.2, { maxWidth: W - 70 });
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...INK);
        doc.setFontSize(9);
        if (avg) {
          doc.text(`Average score of institutions at the expo: ${avg}/100`, 54, 82.6);
        }

        // Categories 2x2 Grid
        let y0 = 96;
        doc.setTextColor(...NAVY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text('How your campus scores', 16, y0);
        y0 += 5;
        const cw = (W - 32 - 6) / 2;
        const ch = 47;

        CATS.forEach((cat, k) => {
          const x = 16 + (k % 2) * (cw + 6);
          const y = y0 + Math.floor(k / 2) * (ch + 4);
          const v = sc[cat.key] || 0;
          const cb = catBand(v);
          doc.setFillColor(...LIGHT);
          doc.roundedRect(x, y, cw, ch, 3, 3, 'F');
          doc.setTextColor(...TD);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.text(cat.n + '  ' + cat.name.toUpperCase(), x + 5, y + 7, {
            maxWidth: cw - 10,
          });
          doc.setTextColor(...NAVY);
          doc.setFontSize(15);
          doc.text(`${Math.round(v)}/25`, x + 5, y + 16);
          doc.setFillColor(...cb[1]);
          doc.setFontSize(8);
          doc.roundedRect(
            x + cw - 5 - doc.getTextWidth(cb[0]) - 6,
            y + 11,
            doc.getTextWidth(cb[0]) + 6,
            6.5,
            3,
            3,
            'F'
          );
          doc.setTextColor(...NAVY);
          doc.text(cb[0], x + cw - 5 - doc.getTextWidth(cb[0]) - 3, y + 15.5);
          doc.setFillColor(214, 222, 236);
          doc.roundedRect(x + 5, y + 20, cw - 10, 2.5, 1.2, 1.2, 'F');
          if (v > 0) {
            doc.setFillColor(...cb[1]);
            doc.roundedRect(x + 5, y + 20, ((cw - 10) * v) / 25, 2.5, 1.2, 1.2, 'F');
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...INK);

          let yy = y + 27;
          (r.answers || []).forEach((a) => {
            if (a.cat !== cat.key) return;
            doc.setFontSize(7.4);
            const lines = doc.splitTextToSize(safeText(a.question), cw - 10);
            doc.setTextColor(...GREY);
            doc.text(lines, x + 5, yy);
            yy += lines.length * 3.1;
            doc.setTextColor(...NAVY);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.8);
            doc.text(safeText(a.answer), x + 5, yy, { maxWidth: cw - 10 });
            doc.setFont('helvetica', 'normal');
            yy += 4.3;
          });
        });

        // Top Recommendations
        let y = y0 + 2 * (ch + 4) + 4;
        doc.setTextColor(...NAVY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text('Top recommendations for your campus', 16, y);
        y += 4;
        const recs = (r.answers || [])
          .map((a, qi) => ({ qi, p: a.points }))
          .filter((o) => o.p < 12.5)
          .sort((a, b) => a.p - b.p)
          .slice(0, 3);

        if (!recs.length) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(...INK);
          doc.text(
            'Your campus already runs well across all four areas. Campo can bring it all into one AI-powered system.',
            16,
            y + 6,
            { maxWidth: W - 32 }
          );
          y += 14;
        }

        recs.forEach((o, i) => {
          const rc = RECO[o.qi] || ['Campus Operations', 'Campo unifies your campus operations.'];
          doc.setFillColor(...TEAL);
          doc.circle(21, y + 6.5, 3.6, 'F');
          doc.setTextColor(...NAVY);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.text(String(i + 1), 21, y + 7.9, { align: 'center' });
          doc.setFontSize(11);
          doc.text(rc[0], 28, y + 6.5);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(...INK);
          const lines = doc.splitTextToSize(rc[1], W - 46);
          doc.text(lines, 28, y + 11.5);
          y += 7.5 + lines.length * 4 + 0.5;
        });

        // Next Steps & Reservation
        y = Math.min(Math.max(y + 2, 258), 263);
        doc.setFillColor(...NAVY);
        doc.roundedRect(16, y, W - 32, 24, 4, 4, 'F');
        doc.setTextColor(...TEAL);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12.5);
        doc.text('Your free 90-day Campo plan is reserved', 22, y + 8);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Reply DEMO on WhatsApp to book a live demo at your campus.', 22, y + 14.5);
        doc.text('www.campo.co.in   ·   hello@campo.co.in   ·   +91 70361 24568', 22, y + 20.5);
        doc.setTextColor(...GREY);
        doc.setFontSize(8.5);
        doc.text('Campo · AI-Powered Campus Operating System', W / 2, 292, { align: 'center' });

        const blob = doc.output('blob');
        const fname =
          'Campo-Health-Report-' +
          (safeText(c.inst || c.name || 'campus')
            .replace(/[^A-Za-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'campus') +
          '.pdf';

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        setExpMsg(`PDF Report for "${c.name || 'Campus'}" downloaded successfully.`);
        setGeneratingPdfId('');
      })
      .catch((err) => {
        console.error('[PDF Error]', err);
        setExpMsg('Failed to generate PDF. Please check your internet connection.');
        setGeneratingPdfId('');
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
      'Areas to improve',
      'Brochure pages',
    ].concat(Q.map((q, k) => `Q${k + 1} ${q.q}`));

    const lines = [head];
    allData.forEach((r) => {
      const c = r.contact || {};
      const sc = r.scores || {};
      const flags = flagsOf(sc);
      const areasStr = flags.map((f) => SHORT[f.key]).join(', ') || 'None';
      const pagesStr = flags.map((f) => PAGE[f.key]).join(', ') || 'None';
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
          areasStr,
          pagesStr,
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
    flagsOf(r.scores).forEach((f) => {
      weakCountMap[f.key] = (weakCountMap[f.key] || 0) + 1;
    });
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

  return (
    <>
      <SEO
        title="Campus Health Check — Free 90-Second Institutional Evaluation | Campo"
        description="Benchmark your campus across Academics, Administration, Transport, Hostels, and Student Engagement in 90 seconds. Get your instant Campo Campus Score and a free 90-day transformation plan."
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
          text-decoration: none;
        }

        .campo-hc-btn:active {
          transform: scale(0.97);
        }

        .campo-hc-btn:disabled {
          background: #4A5580;
          color: #9AA6C8;
          cursor: not-allowed;
        }

        .campo-hc-btn.ghost {
          background: transparent;
          color: var(--soft);
          border: 2px solid var(--line);
        }

        .campo-hc-btn.ghost:hover {
          border-color: var(--teal);
          color: var(--white);
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

        /* Question Progress Bar - 12 Questions */
        .campo-hc-progress {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
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
          border-radius: 18px;
          padding: 18px 20px;
          font-size: 17px;
          line-height: 1.45;
          color: var(--soft);
          margin-bottom: 24px;
        }

        .campo-hc-insight b {
          color: var(--white);
          font-family: Outfit, sans-serif;
          display: block;
          font-size: 19px;
          margin-bottom: 6px;
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
          transition: all 0.2s;
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
          min-width: 960px;
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

        .campo-hc-rowact {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .campo-hc-mini {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--teal);
          background: transparent;
          color: var(--teal2);
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .campo-hc-mini:hover {
          background: rgba(67, 190, 162, 0.15);
        }

        .campo-hc-mini.wa {
          background: var(--teal);
          color: var(--navy);
        }

        .campo-hc-mini.wa:hover {
          background: var(--teal2);
        }

        .campo-hc-mini:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .campo-hc-note {
          color: var(--muted);
          font-size: 15px;
          margin: 12px 0 0;
        }

        .campo-hc-warn {
          background: #4A3A1C;
          border: 1px solid var(--amber);
          color: #FFE3AE;
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
              <div className="campo-hc-eyebrow">The 90-second Campus Health Check</div>
              <h1>
                How smart is <span>your campus?</span>
              </h1>
              <p className="lead">
                Answer 12 quick questions and get your Campus Score instantly.
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
                  About 90 seconds
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
              2. QUESTIONNAIRE SCREEN (12 Questions)
              ==================================================== */}
          {view === 'q' && (
            <section className="campo-hc-screen campo-hc-q">
              {/* 12-step progress bar */}
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
                      scoreVal >= STRONG
                        ? 'var(--teal)'
                        : scoreVal >= BENCH
                        ? 'var(--amber)'
                        : 'var(--coral)';
                    const fillWidth = (scoreVal / 25) * 100;

                    return (
                      <div key={c.key} className="campo-hc-bar">
                        <div className="lbl">
                          <span>
                            {c.n} · {c.name}
                          </span>
                          <em>
                            {Math.round(scoreVal)}/25 · {catLabel(scoreVal)}
                          </em>
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

                {/* Intelligent Dynamic Insights matching exact multi-gap rules */}
                {(() => {
                  const F = flagsOf(docState?.result?.cs);
                  if (!F.length) {
                    return (
                      <div className="campo-hc-insight">
                        <b>Your campus runs well across all four areas</b>
                        Campo brings everything into one AI-powered system, so it stays that way as you grow.
                      </div>
                    );
                  }
                  if (F.length === 4) {
                    return (
                      <div className="campo-hc-insight">
                        <b>All four areas need attention</b>
                        Campo brings academics, administration, campus and students into one system, with AI alerts across all of them.
                        <div
                          style={{
                            marginTop: '10px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px 18px',
                          }}
                        >
                          {F.map((f) => (
                            <span key={f.key} style={{ display: 'inline-flex', alignItems: 'center' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  marginRight: '8px',
                                  background: f.level === 'attn' ? 'var(--coral)' : 'var(--amber)',
                                }}
                              />
                              {SHORT[f.key]} {Math.round(f.v)}/25
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="campo-hc-insight">
                      <b>{F.length === 1 ? '1 area to improve' : `${F.length} areas to improve`}</b>
                      {F.map((f) => (
                        <div key={f.key} style={{ marginTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: f.level === 'attn' ? 'var(--coral)' : 'var(--amber)',
                              }}
                            />
                            <b style={{ display: 'inline', fontSize: '17px', color: 'var(--white)' }}>
                              {(CATS.find((c) => c.key === f.key) || {}).name}
                            </b>
                            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                              · {Math.round(f.v)}/25 ({catLabel(f.v)})
                            </span>
                          </div>
                          <span
                            style={{
                              paddingLeft: '18px',
                              display: 'block',
                              color: 'var(--soft)',
                              marginTop: '2px',
                            }}
                          >
                            {TIP[f.key]}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}

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
                            <th>Follow up</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Tablet</th>
                            <th>Role</th>
                            <th>Institution</th>
                            <th>City</th>
                            <th>Mobile</th>
                            <th>Students</th>
                            <th className="num">Score</th>
                            <th>Areas to improve</th>
                            <th>WhatsApp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allData.map((r) => {
                            const c = r.contact || {};
                            const sc = r.scores || {};
                            const t = new Date(r.createdAt);
                            const timeStr = isNaN(t.getTime())
                              ? ''
                              : t.toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                });
                            const flags = flagsOf(sc);
                            const areasStr = flags.map((f) => SHORT[f.key]).join(', ') || 'None';

                            return (
                              <tr key={r.id}>
                                <td>
                                  {r.contact && r.contact.mobile ? (
                                    <div className="campo-hc-rowact">
                                      <button
                                        type="button"
                                        className="campo-hc-mini"
                                        disabled={generatingPdfId === r.id}
                                        onClick={() => generateReportPdf(r, avgScore)}
                                      >
                                        {generatingPdfId === r.id ? 'Making…' : 'Report PDF'}
                                      </button>
                                      <a
                                        className="campo-hc-mini wa"
                                        href={waLink(r)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        WhatsApp
                                      </a>
                                    </div>
                                  ) : (
                                    <span style={{ color: 'var(--muted)' }}>No contact</span>
                                  )}
                                </td>
                                <td style={{ fontWeight: 600 }}>{c.name || '—'}</td>
                                <td>{timeStr}</td>
                                <td>{r.tablet || 'Unlabelled'}</td>
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
                                <td>{areasStr}</td>
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
