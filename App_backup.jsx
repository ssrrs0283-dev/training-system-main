import { useState } from "react";

const students = [
  { id: 1, name: "أحمد محمد", major: "تقنية المعلومات", company: "شركة التقنية", supervisor: "خالد العتيبي", phone: "0500000001", status: "قيد التدريب" },
  { id: 2, name: "سارة خالد", major: "نظم المعلومات", company: "مؤسسة المستقبل", supervisor: "نورة القحطاني", phone: "0500000002", status: "بانتظار التقييم" },
  { id: 3, name: "نورة عبدالله", major: "علوم الحاسب", company: "شركة الحلول الرقمية", supervisor: "محمد الحربي", phone: "0500000003", status: "تم التقييم" },
];
const pages = ["الرئيسية", "الطلاب", "تقييم التقارير", "الزيارات الميدانية", "تقييم الطلاب", "الحضور والانصراف", "المحادثات", "البريد والرسائل"];
const today = new Date().toISOString().slice(0, 10);

export default function App() {
  const [page, setPage] = useState("الرئيسية");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [reportGrade, setReportGrade] = useState("");
  const [reportFeedback, setReportFeedback] = useState("");
  const [visits, setVisits] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [visitStudent, setVisitStudent] = useState("");
  const [visitDate, setVisitDate] = useState(today);
  const [visitTime, setVisitTime] = useState("10:00");
  const [visitNotes, setVisitNotes] = useState("");
  const [evalStudent, setEvalStudent] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [studentNotes, setStudentNotes] = useState("");
  const [attStudent, setAttStudent] = useState("");
  const [attDate, setAttDate] = useState(today);
  const [attStatus, setAttStatus] = useState("حاضر");
  const [attTime, setAttTime] = useState("");
  const [messageTo, setMessageTo] = useState("الطلاب");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [chatTo, setChatTo] = useState("الطلاب");
  const [chatText, setChatText] = useState("");

  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
  const input = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm";
  const label = "block text-sm font-semibold text-slate-700";
  const btn = "rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800";

  function uploadReport(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const student = students.find(s => s.id === Number(data.get("student")));
    const file = data.get("file");
    if (!student || !file?.name) return alert("اختاري الطالبة والملف.");
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext)) return alert("ارفعي PDF أو Word فقط.");
    const item = { id: Date.now(), student: student.name, major: student.major, company: student.company, type: data.get("type"), name: file.name, url: URL.createObjectURL(file), date: new Date().toLocaleDateString("ar-SA"), grade: "", feedback: "", done: false };
    setReports(old => [item, ...old]);
    setSelectedReport(String(item.id));
    e.currentTarget.reset();
    alert("تم رفع التقرير في النسخة التجريبية.");
  }
  function saveReport(e) {
    e.preventDefault();
    const grade = Number(reportGrade);
    if (!selectedReport || reportGrade === "" || grade < 0 || grade > 100) return alert("اختاري تقريرًا وأدخلي درجة من 0 إلى 100.");
    setReports(old => old.map(r => String(r.id) === selectedReport ? { ...r, grade, feedback: reportFeedback, done: true } : r));
    alert("تم حفظ تقييم التقرير.");
  }
  function addVisit(e) {
    e.preventDefault();
    const s = students.find(x => x.id === Number(visitStudent));
    if (!s) return alert("اختاري الطالبة.");
    setVisits(old => [{ id: Date.now(), student: s.name, company: s.company, supervisor: s.supervisor, phone: s.phone, date: visitDate, time: visitTime, notes: visitNotes, done: false }, ...old]);
    setVisitNotes("");
    alert("تمت إضافة الزيارة.");
  }
  function saveEvaluation(e) {
    e.preventDefault();
    const s = students.find(x => x.id === Number(evalStudent));
    const grade = Number(studentGrade);
    if (!s || studentGrade === "" || grade < 0 || grade > 100) return alert("اختاري الطالبة وأدخلي درجة من 0 إلى 100.");
    setEvaluations(old => [{ id: Date.now(), student: s.name, grade, notes: studentNotes }, ...old]);
    setStudentGrade(""); setStudentNotes("");
    alert("تم حفظ تقييم الطالبة.");
  }
  function saveAttendance(e) {
    e.preventDefault();
    const s = students.find(x => x.id === Number(attStudent));
    if (!s) return alert("اختاري الطالبة.");
    setAttendance(old => [{ id: Date.now(), student: s.name, date: attDate, status: attStatus, time: attTime }, ...old]);
    alert("تم تسجيل الحضور والانصراف.");
  }
  function sendMessage(e) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return alert("اكتبي عنوان الرسالة ومحتواها.");
    setMessages(old => [{ id: Date.now(), to: messageTo, subject, body, date: new Date().toLocaleString("ar-SA") }, ...old]);
    setSubject(""); setBody("");
    alert("تم حفظ الرسالة في النسخة التجريبية.");
  }
  function sendChat(e) {
    e.preventDefault();
    if (!chatText.trim()) return;
    setChat(old => [...old, { id: Date.now(), to: chatTo, text: chatText }]);
    setChatText("");
  }

  const selected = reports.find(r => String(r.id) === selectedReport);
  const reportCount = reports.length;
  const pendingCount = reports.filter(r => !r.done).length;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-800">
      <aside className="fixed right-0 top-0 hidden h-screen w-64 bg-white p-5 shadow-lg md:block">
        <h1 className="text-xl font-extrabold text-blue-900">نظام التدريب التعاوني</h1>
        <p className="mb-7 mt-2 text-xs text-slate-500">بوابة عضو هيئة التدريس والمشرف الأكاديمي</p>
        <nav className="space-y-2">{pages.map(p => <button key={p} onClick={() => setPage(p)} className={`w-full rounded-xl px-4 py-3 text-right text-sm font-semibold ${page === p ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-blue-50"}`}>{p}</button>)}</nav>
      </aside>
      <main className="min-h-screen p-4 md:mr-64 md:p-8">
        <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">نظام إدارة التدريب التعاوني</p>
          <h2 className="text-xl font-bold text-blue-900">{page}</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">{pages.map(p => <button key={p} onClick={() => setPage(p)} className={`shrink-0 rounded-lg px-3 py-2 text-xs ${page === p ? "bg-blue-700 text-white" : "bg-slate-100"}`}>{p}</button>)}</div>
        </header>

        {page === "الرئيسية" && <div className="space-y-5">
          <h2 className="text-2xl font-bold text-blue-900">مرحبًا بك في لوحة المشرف الأكاديمي</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["إجمالي الطلاب", students.length], ["التقارير المرفوعة", reportCount], ["تقارير بانتظار التقييم", pendingCount], ["تقييمات الطلاب", evaluations.length]].map(([t,n]) => <div className={card} key={t}><p className="text-sm text-slate-500">{t}</p><p className="mt-3 text-3xl font-bold text-blue-800">{n}</p></div>)}</div>
          <section className={card}><h3 className="mb-3 font-bold">آخر الطلاب</h3>{students.map(s => <div key={s.id} className="border-b py-3 last:border-0"><b>{s.name}</b><p className="text-sm text-slate-500">{s.major} · {s.company} · {s.status}</p></div>)}</section>
        </div>}

        {page === "الطلاب" && <section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">قائمة الطلاب</h2><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-right text-sm"><thead className="bg-slate-100"><tr>{["الاسم","التخصص","جهة التدريب","المشرف الميداني","رقم التواصل","الحالة"].map(x => <th className="p-3" key={x}>{x}</th>)}</tr></thead><tbody>{students.map(s => <tr className="border-b" key={s.id}><td className="p-3">{s.name}</td><td className="p-3">{s.major}</td><td className="p-3">{s.company}</td><td className="p-3">{s.supervisor}</td><td className="p-3" dir="ltr">{s.phone}</td><td className="p-3">{s.status}</td></tr>)}</tbody></table></div></section>}

        {page === "تقييم التقارير" && <div className="space-y-5">
          <section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">رفع تقرير طالبة</h2>
            <form onSubmit={uploadReport} className="grid gap-4 md:grid-cols-2">
              <label className={label}>اسم الطالبة<select name="student" className={input} defaultValue=""><option value="">اختاري الطالبة</option>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
              <label className={label}>نوع التقرير<select name="type" className={input}><option>أسبوعي</option><option>نهائي</option><option>عرض تقديمي</option></select></label>
              <label className={`${label} md:col-span-2`}>ملف التقرير PDF أو Word<input className={input} name="file" type="file" accept=".pdf,.doc,.docx" /></label>
              <button className={btn}>رفع التقرير</button>
            </form>
          </section>
          <section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">التقارير المرفوعة</h2>
            {reports.length === 0 ? <p className="text-sm text-slate-500">لا توجد تقارير مرفوعة حتى الآن.</p> : reports.map(r => <div key={r.id} className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
              <div><b>{r.student} — {r.type}</b><p className="text-sm text-slate-500">{r.major} · {r.company} · {r.date}</p><p className="break-all text-sm text-blue-700">{r.name}</p><p className="text-sm">{r.done ? `تم التقييم: ${r.grade}/100` : "بانتظار التقييم"}</p></div>
              <div className="flex gap-2"><button type="button" className={btn} onClick={() => window.open(r.url, "_blank", "noopener,noreferrer")}>فتح الملف</button><button type="button" className="rounded-xl border border-blue-700 px-4 py-2 text-sm text-blue-700" onClick={() => {setSelectedReport(String(r.id));setReportGrade(r.grade === "" ? "" : String(r.grade));setReportFeedback(r.feedback);}}>تقييم التقرير</button></div>
            </div>)}
          </section>
          {selected && <section className={card}><h2 className="mb-3 text-xl font-bold text-blue-900">تقييم تقرير {selected.student}</h2><form onSubmit={saveReport} className="space-y-3">
            <label className={label}>الدرجة من 100<input className={input} type="number" min="0" max="100" value={reportGrade} onChange={e => setReportGrade(e.target.value)} /></label>
            <label className={label}>ملاحظات الدكتور<textarea className={input} rows="3" value={reportFeedback} onChange={e => setReportFeedback(e.target.value)} /></label>
            <button className={btn}>حفظ التقييم</button>
          </form></section>}
        </div>}

        {page === "الزيارات الميدانية" && <div className="space-y-5">
          <section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">طلب زيارة ميدانية</h2><form onSubmit={addVisit} className="grid gap-4 md:grid-cols-2">
            <label className={label}>الطالبة<select className={input} value={visitStudent} onChange={e => setVisitStudent(e.target.value)}><option value="">اختاري الطالبة</option>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <label className={label}>تاريخ الزيارة<input className={input} type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} /></label>
            <label className={label}>وقت الزيارة<input className={input} type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)} /></label>
            <label className={label}>ملاحظات<textarea className={input} value={visitNotes} onChange={e => setVisitNotes(e.target.value)} /></label><button className={btn}>إضافة الزيارة</button>
          </form></section>
          <section className={card}><h2 className="mb-3 text-xl font-bold text-blue-900">جدول الزيارات الميدانية</h2>{visits.length === 0 ? <p className="text-sm text-slate-500">لا توجد زيارات مسجلة.</p> : visits.map(v => <div key={v.id} className="border-b py-3 last:border-0"><b>{v.company} — {v.student}</b><p className="text-sm text-slate-500">المشرف: {v.supervisor} · التواصل: {v.phone}</p><p className="text-sm text-slate-500">الموعد: {v.date} الساعة {v.time}</p><p className="text-sm">{v.notes}</p><label className="mt-2 inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={v.done} onChange={() => setVisits(old => old.map(x => x.id === v.id ? {...x,done:!x.done} : x))} /> تمت الزيارة</label></div>)}</section>
        </div>}

        {page === "تقييم الطلاب" && <div className="space-y-5"><section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">تقييم الطالبة</h2><form onSubmit={saveEvaluation} className="space-y-3">
          <label className={label}>اسم الطالبة<select className={input} value={evalStudent} onChange={e => setEvalStudent(e.target.value)}><option value="">اختاري الطالبة</option>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
          <label className={label}>الدرجة من 100<input className={input} type="number" min="0" max="100" value={studentGrade} onChange={e => setStudentGrade(e.target.value)} /></label>
          <label className={label}>ملاحظات<textarea className={input} value={studentNotes} onChange={e => setStudentNotes(e.target.value)} /></label><button className={btn}>حفظ تقييم الطالبة</button>
        </form></section><section className={card}><h3 className="mb-3 font-bold">التقييمات المحفوظة</h3>{evaluations.length ? evaluations.map(x => <p className="border-b py-2 text-sm" key={x.id}>{x.student} — {x.grade}/100 — {x.notes}</p>) : <p className="text-sm text-slate-500">لا توجد تقييمات بعد.</p>}</section></div>}

        {page === "الحضور والانصراف" && <div className="space-y-5"><section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">تسجيل الحضور والانصراف</h2><form onSubmit={saveAttendance} className="grid gap-4 md:grid-cols-2">
          <label className={label}>اسم الطالبة<select className={input} value={attStudent} onChange={e => setAttStudent(e.target.value)}><option value="">اختاري الطالبة</option>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
          <label className={label}>التاريخ<input className={input} type="date" value={attDate} onChange={e => setAttDate(e.target.value)} /></label>
          <label className={label}>الحالة<select className={input} value={attStatus} onChange={e => setAttStatus(e.target.value)}><option>حاضر</option><option>غائب</option><option>متأخر</option><option>انصراف</option></select></label>
          <label className={label}>الوقت<input className={input} type="time" value={attTime} onChange={e => setAttTime(e.target.value)} /></label><button className={btn}>حفظ السجل</button>
        </form></section><section className={card}><h3 className="mb-3 font-bold">سجل الحضور والانصراف</h3>{attendance.length ? attendance.map(a => <p className="border-b py-2 text-sm" key={a.id}>{a.student} — {a.date} — {a.status} — {a.time}</p>) : <p className="text-sm text-slate-500">لا توجد سجلات.</p>}</section></div>}

        {page === "المحادثات" && <section className={`${card} flex min-h-[450px] flex-col`}><h2 className="mb-4 text-xl font-bold text-blue-900">المحادثات</h2><label className={label}>المحادثة مع<select className={input} value={chatTo} onChange={e => setChatTo(e.target.value)}><option>الطلاب</option><option>جهة التدريب</option></select></label><div className="my-4 flex-1 space-y-2 rounded-xl bg-slate-50 p-3">{chat.length ? chat.map(m => <p key={m.id} className="rounded-lg bg-white p-3 text-sm">{m.to}: {m.text}</p>) : <p className="text-sm text-slate-500">لا توجد رسائل.</p>}</div><form onSubmit={sendChat} className="flex gap-2"><input className={input} value={chatText} onChange={e => setChatText(e.target.value)} placeholder="اكتبي رسالتك..." /><button className={btn}>إرسال</button></form></section>}

        {page === "البريد والرسائل" && <div className="space-y-5"><section className={card}><h2 className="mb-4 text-xl font-bold text-blue-900">إرسال رسالة أو إشعار</h2><form onSubmit={sendMessage} className="space-y-3">
          <label className={label}>إرسال إلى<select className={input} value={messageTo} onChange={e => setMessageTo(e.target.value)}><option>الطلاب</option><option>جهة التدريب</option></select></label>
          <label className={label}>عنوان الرسالة<input className={input} value={subject} onChange={e => setSubject(e.target.value)} /></label>
          <label className={label}>محتوى الرسالة<textarea className={input} rows="4" value={body} onChange={e => setBody(e.target.value)} /></label><button className={btn}>حفظ الرسالة</button>
        </form></section><section className={card}><h3 className="mb-3 font-bold">الرسائل الصادرة</h3>{messages.length ? messages.map(m => <div className="border-b py-3" key={m.id}><b>{m.subject} — إلى {m.to}</b><p className="text-sm">{m.body}</p><p className="text-xs text-slate-400">{m.date}</p></div>) : <p className="text-sm text-slate-500">لا توجد رسائل.</p>}</section></div>}
        <footer className="mt-8 py-4 text-center text-xs text-slate-400">© 2026 نظام إدارة التدريب التعاوني</footer>
      </main>
    </div>
  );
}
