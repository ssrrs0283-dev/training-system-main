import { useState } from "react";

const pages = [
  "الرئيسية",
  "الطلاب",
  "تقييم التقارير",
  "الزيارات الميدانية",
  "تقييم الطلاب",
  "الحضور والانصراف",
  "المحادثات",
  "البريد والرسائل",
];

const emptyText = "لا توجد بيانات حالياً. ستظهر البيانات بعد ربط النظام بقاعدة البيانات.";

export default function App() {
  const [page, setPage] = useState("الرئيسية");
  const [absenceRows, setAbsenceRows] = useState([]);
  const [chosenAbsence, setChosenAbsence] = useState(null);
  const [chatEntity, setChatEntity] = useState("");
  const [chatStudent, setChatStudent] = useState("");
  const [chatText, setChatText] = useState("");
  const [messageEntity, setMessageEntity] = useState("");
  const [messageStudent, setMessageStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");

  const card = "rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm";
  const input = "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  const label = "block text-sm font-semibold text-slate-700";
  const primary = "rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50";
  const secondary = "rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50";
  const empty = <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm leading-7 text-slate-500">{emptyText}</p>;

  function acceptExcuse(id, status) {
    setAbsenceRows(rows => rows.map(row => row.id === id ? { ...row, decision: status } : row));
    setChosenAbsence(null);
    setNotice(`تم تسجيل الحالة: ${status}. يلزم ربط الإجراء بالخادم لحفظه بشكل دائم.`);
  }

  function rejectExcuse(id) {
    setAbsenceRows(rows => rows.map(row => row.id === id ? { ...row, decision: "غياب كامل" } : row));
    setNotice("تم تحديد الحالة: غياب كامل. يلزم ربط الإجراء بالخادم لحفظه بشكل دائم.");
  }

  function sendChat(e) {
    e.preventDefault();
    if (!chatEntity || !chatStudent || !chatText.trim()) return;
    setNotice("واجهة المحادثة جاهزة، وسيتم إرسال الرسائل بعد ربط خدمة المحادثات.");
    setChatText("");
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!messageEntity || !messageStudent || !subject.trim() || !body.trim()) return;
    setNotice("تم تجهيز الرسالة في الواجهة. الإرسال الفعلي يتطلب ربط خدمة الرسائل.");
    setSubject("");
    setBody("");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f8f5] text-slate-800">
      <aside className="fixed right-0 top-0 z-20 hidden h-screen w-64 border-l border-emerald-100 bg-white p-5 shadow-sm md:block">
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-2xl text-white">✦</div>
          <h1 className="text-lg font-extrabold text-emerald-900">نظام التدريب التعاوني</h1>
          <p className="mt-2 text-xs leading-6 text-slate-500">بوابة المشرف الأكاديمي</p>
        </div>
        <p className="mb-3 px-3 text-xs font-bold text-slate-400">القائمة الرئيسية</p>
        <nav className="space-y-1">
          {pages.map(item => (
            <button key={item} onClick={() => { setPage(item); setNotice(""); }}
              className={`w-full rounded-xl px-4 py-3 text-right text-sm font-semibold transition ${page === item ? "bg-emerald-700 text-white shadow-sm" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-h-screen p-4 md:mr-64 md:p-8">
        <header className="mb-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-emerald-700">بوابة المشرف الأكاديمي</p>
              <h2 className="mt-1 text-2xl font-extrabold text-emerald-950">{page}</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">نظام إدارة التدريب التعاوني</span>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {pages.map(item => <button key={item} onClick={() => { setPage(item); setNotice(""); }}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${page === item ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}>{item}</button>)}
          </div>
        </header>

        {notice && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</div>}

        {page === "الرئيسية" && <div className="space-y-5">
          <section className="rounded-2xl bg-gradient-to-l from-emerald-800 to-emerald-600 p-6 text-white shadow-sm">
            <p className="text-sm text-emerald-100">مرحباً بك</p>
            <h3 className="mt-2 text-2xl font-extrabold">لوحة المشرف الأكاديمي</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-emerald-50">تابع بيانات الطلاب والتقارير والزيارات الميدانية والحضور والتواصل من مكان واحد.</p>
          </section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["الطلاب", "التقارير المرفوعة", "الزيارات الميدانية", "حالات الحضور"].map((title, index) => (
              <div className={card} key={title}><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{title}</p><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">{["♙", "▤", "⌖", "◷"][index]}</span></div><p className="mt-4 text-2xl font-bold text-emerald-900">—</p><p className="mt-1 text-xs text-slate-400">بانتظار ربط قاعدة البيانات</p></div>
            ))}
          </div>
          <section className={card}><h3 className="mb-3 font-bold text-emerald-950">ملخص النظام</h3><p className="text-sm leading-7 text-slate-600">ستُعرض هنا آخر التحديثات والتنبيهات بعد ربط واجهة المشرف الأكاديمي بقاعدة البيانات وواجهات جهة التدريب والطلاب.</p></section>
        </div>}

        {page === "الطلاب" && <section className={card}>
          <h3 className="mb-4 text-lg font-bold text-emerald-950">بيانات الطلاب</h3>
          {empty}
        </section>}

        {page === "تقييم التقارير" && <div className="space-y-5">
          <section className={card}>
            <h3 className="mb-3 text-lg font-bold text-emerald-950">التقارير الواردة من الطلاب</h3>
            <p className="mb-4 text-sm leading-6 text-slate-500">تظهر التقارير المرتبطة بملف الطالب وبياناته بعد رفعها من حساب الطالب وربطها بقاعدة البيانات.</p>
            {empty}
          </section>
          <section className={card}>
            <h3 className="mb-3 font-bold text-emerald-950">أنواع التقارير المعتمدة</h3>
            <div className="flex flex-wrap gap-2">{["أسبوعي", "نهائي", "عرض تقديمي"].map(type => <span key={type} className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">{type}</span>)}</div>
            <p className="mt-3 text-xs leading-6 text-slate-500">سيظهر زر التقييم وحقول الدرجة والملاحظات عند وصول تقرير فعلي.</p>
          </section>
        </div>}

        {page === "الزيارات الميدانية" && <section className={card}>
          <h3 className="mb-2 text-lg font-bold text-emerald-950">الزيارات حسب جهة التدريب</h3>
          <p className="mb-4 text-sm leading-6 text-slate-500">ستُرتب الجهات، وتحت كل جهة يظهر الطلاب التابعون لها ومواعيد الزيارات السابقة والقادمة واسم المشرف الميداني ورقم التواصل وحالة إتمام الزيارة والملاحظات.</p>
          {empty}
        </section>}

        {page === "تقييم الطلاب" && <section className={card}>
          <h3 className="mb-3 text-lg font-bold text-emerald-950">تقييم أداء الطلاب</h3>
          <p className="mb-4 text-sm leading-6 text-slate-500">تظهر بيانات الطالب وسجلات الزيارات والتقارير المرتبطة به، ثم يمكن للمشرف الأكاديمي إضافة التقييم بعد وصول البيانات.</p>
          {empty}
        </section>}

        {page === "الحضور والانصراف" && <div className="space-y-5">
          <section className={card}>
            <h3 className="mb-2 text-lg font-bold text-emerald-950">متابعة الحضور والانصراف</h3>
            <p className="mb-4 text-sm leading-6 text-slate-500">يعرض النظام سجلات الحضور والانصراف الواردة من جهة التدريب. المشرف الأكاديمي يطّلع على السجلات ويتابع الأعذار ولا يسجل الحضور نيابة عن الجهة.</p>
            {empty}
          </section>
          <section className={card}>
            <h3 className="mb-2 text-lg font-bold text-emerald-950">طلاب لم يسجلوا الانصراف في اليوم السابق</h3>
            <p className="mb-4 text-sm leading-6 text-slate-500">تظهر هنا الحالات التي ترسلها قاعدة البيانات عند عدم تسجيل الانصراف.</p>
            {absenceRows.length === 0 ? empty : absenceRows.map(row => (
              <div key={row.id} className="mb-3 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold">{row.student}</p><p className="mt-1 text-xs text-slate-500">{row.entity} · {row.date}</p></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{row.decision || "بانتظار الإجراء"}</span></div>
                {chosenAbsence === row.id ? <div className="mt-4 flex flex-wrap gap-2"><button className={primary} onClick={() => acceptExcuse(row.id, "مستأذن")}>مستأذن</button><button className={secondary} onClick={() => acceptExcuse(row.id, "بعذر")}>بعذر</button><button className="rounded-xl px-4 py-2 text-sm text-slate-500" onClick={() => setChosenAbsence(null)}>إلغاء</button></div> : <div className="mt-4 flex flex-wrap gap-2"><button className={primary} onClick={() => setChosenAbsence(row.id)}>قبول العذر</button><button className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50" onClick={() => rejectExcuse(row.id)}>رفض العذر</button></div>}
              </div>
            ))}
          </section>
        </div>}

        {page === "المحادثات" && <section className={`${card} flex min-h-[440px] flex-col`}>
          <h3 className="mb-4 text-lg font-bold text-emerald-950">المحادثات</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={label}>جهة التدريب<select className={input} value={chatEntity} onChange={e => setChatEntity(e.target.value)}><option value="">اختيار جهة التدريب بعد الربط</option></select></label>
            <label className={label}>الطالب<select className={input} value={chatStudent} onChange={e => setChatStudent(e.target.value)}><option value="">اختيار الطالب بعد الربط</option></select></label>
          </div>
          <div className="my-5 flex-1">{empty}</div>
          <form onSubmit={sendChat} className="flex flex-col gap-2 sm:flex-row"><input className={input + " mt-0"} value={chatText} onChange={e => setChatText(e.target.value)} placeholder="اكتب الرسالة..." /><button className={primary} disabled={!chatText.trim()}>إرسال</button></form>
        </section>}

        {page === "البريد والرسائل" && <div className="space-y-5">
          <section className={card}>
            <h3 className="mb-4 text-lg font-bold text-emerald-950">إنشاء رسالة أو طلب</h3>
            <form onSubmit={sendMessage} className="space-y-4">
              <label className={label}>جهة التدريب<select className={input} value={messageEntity} onChange={e => setMessageEntity(e.target.value)}><option value="">اختيار جهة التدريب بعد الربط</option></select></label>
              <label className={label}>الطالب<select className={input} value={messageStudent} onChange={e => setMessageStudent(e.target.value)}><option value="">اختيار الطالب بعد الربط</option></select></label>
              <label className={label}>عنوان الرسالة<input className={input} value={subject} onChange={e => setSubject(e.target.value)} placeholder="عنوان الرسالة" /></label>
              <label className={label}>محتوى الرسالة<textarea className={input} rows="4" value={body} onChange={e => setBody(e.target.value)} placeholder="اكتب محتوى الرسالة أو الطلب..." /></label>
              <button className={primary} disabled={!messageEntity || !messageStudent || !subject.trim() || !body.trim()}>إرسال الرسالة</button>
            </form>
          </section>
          <section className={card}><h3 className="mb-3 font-bold text-emerald-950">الرسائل الصادرة</h3>{empty}</section>
        </div>}

        <footer className="mt-8 py-4 text-center text-xs text-slate-400">© 2026 نظام إدارة التدريب التعاوني · بوابة المشرف الأكاديمي</footer>
      </main>
    </div>
  );
}
