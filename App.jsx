 import { useState, useEffect } from "react";

function App() {
   const [visitRequests, setVisitRequests] = useState({});

  const [page, setPage] = useState("الرئيسية");
  const [visitStatus, setVisitStatus] = useState(
    "بانتظار موافقة المشرف الميداني"
  );
  const [reportStatus, setReportStatus] = useState({});
  const [studentRatings, setStudentRatings] = useState({});
  const [studentNotes, setStudentNotes] = useState({});
  const [studentName, setStudentName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [notes, setNotes] = useState("");

  const students = [
    { id: 1, name: "أحمد محمد", major: "تقنية المعلومات", status: "بانتظار التقييم" },
    { id: 2, name: "سارة خالد", major: "نظم المعلومات", status: "بانتظار التقييم" },
    { id: 3, name: "نورة عبدالله", major: "علوم الحاسب", status: "تم التقييم" },
  ];

  const menu = [
    "الرئيسية",
    "الطلاب",
    "تقييم التقارير",
    "الزيارات الميدانية",
    "طلبات الزيارة",
    "تقييم الطلاب",
  ];

  const cardClass =
    "rounded-2xl bg-white p-5 shadow-sm border border-slate-200";

  const buttonClass =
    "rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800";

  function requestVisit() {
    if (!studentName || !visitDate || !visitTime) {
      alert("فضلاً أدخلي اسم الطالب وتاريخ الزيارة ووقتها");
      return;
    }

    setVisitStatus("بانتظار موافقة المشرف الميداني");
    alert("تم إرسال طلب الزيارة بنجاح، بانتظار موافقة المشرف الميداني");
  }

  function evaluateReport(id) {
    setReportStatus((old) => ({ ...old, [id]: "تم التقييم" }));
    alert("تم تسجيل تقييم التقرير بنجاح");
  }

  function evaluateStudent(id) {
    if (!studentRatings[id]) {
      alert("اختاري تقييم الطالب أولاً");
      return;
    }

   console.log("ملاحظات الطالب:", studentNotes[id]);
    alert("تم تسجيل تقييم الطالب بنجاح");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-800">
      <aside className="fixed right-0 top-0 hidden h-screen w-64 bg-white p-6 shadow-md md:block">
        <h1 className="text-xl font-bold text-blue-700">
          نظام التدريب التعاوني
        </h1>
        <p className="mb-8 mt-2 text-sm text-slate-500">
          بوابة المشرف الأكاديمي
        </p>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`w-full rounded-xl px-4 py-3 text-right ${
                page === item
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="p-4 md:mr-64 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-blue-800">{page}</h2>
            <p className="mt-2 text-sm text-slate-500">
              مرحباً بك في لوحة المشرف الأكاديمي
            </p>
          </div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-800">
            المشرف الأكاديمي
          </span>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm ${
                page === item
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {page === "الرئيسية" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className={cardClass}>
                <p className="text-slate-500">إجمالي الطلاب</p>
                <p className="mt-3 text-3xl font-bold text-blue-700">12</p>
              </div>
              <div className={cardClass}>
                <p className="text-slate-500">تقارير بانتظار التقييم</p>
                <p className="mt-3 text-3xl font-bold text-amber-600">5</p>
              </div>
              <div className={cardClass}>
                <p className="text-slate-500">تقارير تم تقييمها</p>
                <p className="mt-3 text-3xl font-bold text-green-600">7</p>
              </div>
            </div>

            <section className={`${cardClass} mt-6`}>
              <h3 className="mb-4 text-lg font-bold">آخر تقارير التدريب</h3>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-wrap items-center justify-between gap-3 border-b py-4 last:border-0"
                >
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.major}</p>
                  </div>
                  <span className="text-sm text-amber-700">
                    {reportStatus[student.id] || student.status}
                  </span>
                </div>
              ))}
            </section>
          </>
        )}

        {page === "الطلاب" && (
          <section className={cardClass}>
            <h3 className="mb-4 text-lg font-bold">قائمة الطلاب</h3>
            {students.map((student) => (
              <div key={student.id} className="border-b py-4 last:border-0">
                <p className="font-semibold">{student.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  التخصص: {student.major}
                </p>
              </div>
            ))}
          </section>
        )}
{page === "طلبات الزيارة" && (
  <section className={cardClass}>
    <h3 className="mb-4 text-lg font-bold text-blue-700">
      طلبات الزيارة الميدانية
    </h3>

    {students.map((student) => (
      <div
        key={student.id}
        className="mb-4 rounded-xl border p-4"
      >
        <p className="font-semibold">{student.name}</p>
        <p className="mt-2 text-sm text-slate-600">
       حالة الطلب: {visitRequests[student.id] || "بانتظار موافقة المشرف الميداني"}
        </p>

        <div className="mt-3 flex gap-2">
          
          <button
  onClick={() => {
    setVisitRequests((old) => ({
      ...old,
      [student.id]: "تمت الموافقة",
    }));
  }}
  className={buttonClass}
>
  موافقة
</button>

          <button
  onClick={() => {
    setVisitRequests((old) => ({
      ...old,
      [student.id]: "تم الرفض",
    }));
  }}
  className="rounded-lg bg-red-600 px-4 py-2 text-white"
>
  رفض
</button>
        </div>
      </div>
    ))}
  </section>
)}
        {page === "تقييم التقارير" && (
          <section className={cardClass}>
            <h3 className="mb-4 text-lg font-bold">تقييم تقارير التدريب</h3>
            {students.map((student) => (
              <div
                key={student.id}
                className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
              >
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-slate-500">{student.major}</p>
                  <p className="mt-2 text-sm text-blue-700">
                    {reportStatus[student.id] || student.status}
                  </p>
                </div>
                <button
                  className={buttonClass}
                  onClick={() => evaluateReport(student.id)}
                >
                  تقييم التقرير
                </button>
              </div>
            ))}
          </section>
        )}

        {page === "الزيارات الميدانية" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className={cardClass}>
              <h3 className="mb-5 text-lg font-bold text-blue-700">
                طلب زيارة ميدانية
              </h3>

              <label className="mb-2 block">اسم الطالب</label>
              <select
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="mb-4 w-full rounded-lg border p-3"
              >
                <option value="">اختاري الطالب</option>
                {students.map((student) => (
                  <option key={student.id} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>

              <label className="mb-2 block">تاريخ الزيارة</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="mb-4 w-full rounded-lg border p-3"
              />

              <label className="mb-2 block">وقت الزيارة</label>
              <input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="mb-4 w-full rounded-lg border p-3"
              />

              <label className="mb-2 block">ملاحظات الزيارة</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="اكتبي أي ملاحظات"
                rows="3"
                className="mb-4 w-full rounded-lg border p-3"
              />

              <button onClick={requestVisit} className={buttonClass}>
                إرسال طلب الزيارة
              </button>

              <p className="mt-4 text-sm text-amber-700">
                حالة الطلب: {visitStatus}
              </p>

            </section>

            <section className={cardClass}>
              <h3 className="mb-4 text-lg font-bold text-blue-700">
                حجز موعد زيارة ميدانية
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                حددي الموعد المناسب لمتابعة تدريب الطالب.
              </p>
              <p className="rounded-xl bg-blue-50 p-4 text-blue-800">
                بعد إرسال الطلب، ينتظر الموعد موافقة المشرف الميداني.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                نتطلع إلى لقائكم قريباً.
              </p>
            </section>
          </div>
        )}

        {page === "تقييم الطلاب" && (
          <section className={cardClass}>
            <h3 className="mb-4 text-lg font-bold">تقييم الطالب بعد الزيارة</h3>
            {students.map((student) => (
              <div
                key={student.id}
                className="mb-4 rounded-xl border p-4 last:mb-0"
              >
                <p className="mb-3 font-semibold">{student.name}</p>
                <label className="mb-2 block text-sm">التقييم</label>
                <select
                  value={studentRatings[student.id] || ""}
                  onChange={(e) =>
                    setStudentRatings((old) => ({
                      ...old,
                      [student.id]: e.target.value,
                    }))
                  }
                  className="mb-3 w-full rounded-lg border p-3"
                >
                  <option value="">اختاري التقييم</option>
                  <option value="ممتاز">ممتاز</option>
                  <option value="جيد جداً">جيد جداً</option>
                  <option value="جيد">جيد</option>
                  <option value="يحتاج إلى تحسين">يحتاج إلى تحسين</option>
                </select>
                <textarea
  value={studentNotes[student.id] || ""}
  onChange={(e) =>
    setStudentNotes({
      ...studentNotes,
      [student.id]: e.target.value,
    })
  }
  placeholder="اكتبي ملاحظاتك عن الطالب"
  className="mt-2 w-full rounded-lg border p-2"
  rows="2"
/>
                <button
                  onClick={() => evaluateStudent(student.id)}
                  className={buttonClass}
                >
                  
                </button>
              </div>
            ))}
          </section>
        )}

        <footer className="mt-8 text-center text-sm text-slate-500">
          نظام إدارة التدريب التعاوني © 2026
        </footer>
      </main>
    </div>
  );
}

export default App;