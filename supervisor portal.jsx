import React, { useMemo, useState } from "react";

const INITIAL_SUPERVISORS = [
  {
    id: "SUP-101",
    name: "د. سارة المنصور",
    email: "s.almansour@university.edu.sa",
    department: "علوم الحاسب ونظم المعلومات",
    role: "مشرف أكاديمي",
  },
  {
    id: "SUP-102",
    name: "أ. نورة العتيبي",
    email: "n.alotaibi@university.edu.sa",
    department: "تقنية المعلومات",
    role: "مشرف أكاديمي",
  },
];

const INITIAL_ENTITIES = [
  {
    id: "ENT-1",
    name: "شركة الحلول الرقمية المتقدمة",
    city: "الرياض",
    availableSeats: 4,
    entityVisitReply: "بانتظار رد الجهة",
    entityVisitReport: "لم يُرفع تقرير زيارة من الجهة بعد",
  },
  {
    id: "ENT-2",
    name: "مؤسسة الابتكار التقني",
    city: "جدة",
    availableSeats: 3,
    entityVisitReply: "تمت الموافقة على الزيارة",
    entityVisitReport: "الجهة تؤكد التزام المتدرب بالحضور والانضباط الأسبوعي.",
  },
  {
    id: "ENT-3",
    name: "مركز البيانات والخدمات السحابية",
    city: "الخبر",
    availableSeats: 2,
    entityVisitReply: "مقترح موعد بديل من الجهة",
    entityVisitReport: "الجهة تشيد بسرعة تعلم المتدرب وتنفيذ المهام.",
  },
];

const INITIAL_STUDENTS = [
  {
    id: "STU-2026-01",
    name: "أروى القحطاني",
    universityId: "442001122",
    entityId: "ENT-1",
    entityName: "شركة الحلول الرقمية المتقدمة",
    nominationStatus: "مرشح ومعتمد",
    attendanceRate: 95,
    reportsCount: 3,
    warningsCount: 0,
    startDate: "2026-09-01",
    entityEvaluationForm2: "88 / 100 — التزام عالٍ ومهارات تحليل جيدة من تقييم الجهة.",
    finalScoreOutOf100: "",
    supervisorNotes: "",
    postTrainingEmployment: "مستمر في التدريب (بانتظار التقييم النهائي)",
    attendanceLog: [
      { id: "ATT-1", date: "2026-11-15", status: "حاضر", note: "حضور منتظم" },
      { id: "ATT-2", date: "2026-11-16", status: "حاضر", note: "إنجاز مهمة التوثيق" },
      { id: "ATT-3", date: "2026-11-17", status: "غائب بعذر", note: "إذن طبي معتمد" },
    ],
  },
  {
    id: "STU-2026-02",
    name: "لين الدوسري",
    universityId: "442001489",
    entityId: "ENT-2",
    entityName: "مؤسسة الابتكار التقني",
    nominationStatus: "مرشح ومعتمد",
    attendanceRate: 82,
    reportsCount: 2,
    warningsCount: 1,
    startDate: "2026-09-03",
    entityEvaluationForm2: "81 / 100 — أداء جيد مع حاجة لرفع نسبة الحضور المبكر.",
    finalScoreOutOf100: "",
    supervisorNotes: "",
    postTrainingEmployment: "مرشح للتوظيف بعد إتمام الساعات",
    attendanceLog: [
      { id: "ATT-4", date: "2026-11-15", status: "حاضر", note: "" },
      { id: "ATT-5", date: "2026-11-16", status: "غائب بدون عذر", note: "تم إصدار إنذار غياب" },
      { id: "ATT-6", date: "2026-11-17", status: "حاضر", note: "" },
    ],
  },
  {
    id: "STU-2026-03",
    name: "جنى الحربي",
    universityId: "442001877",
    entityId: "",
    entityName: "لم يتم الترشيح بعد",
    nominationStatus: "بانتظار الترشيح",
    attendanceRate: 100,
    reportsCount: 1,
    warningsCount: 0,
    startDate: "",
    entityEvaluationForm2: "لم يرد تقييم الجهة (نموذج 2) بعد.",
    finalScoreOutOf100: "",
    supervisorNotes: "",
    postTrainingEmployment: "لم يُحدد بعد",
    attendanceLog: [
      { id: "ATT-7", date: "2026-11-16", status: "حاضر", note: "مباشرة أولية" },
    ],
  },
];

const INITIAL_REPORTS = [
  {
    id: "REP-1",
    studentId: "STU-2026-01",
    studentName: "أروى القحطاني",
    title: "التقرير الميداني الأسبوعي الرابع",
    submittedAt: "2026-11-14",
    content:
      "قمت خلال هذا الأسبوع بتصميم مخطط قاعدة البيانات للمشروع التجريبي، ومراجعة متطلبات واجهة المستخدم مع فريق التطوير، وتوثيق نقاط الاختبار الأساسية.",
    status: "بانتظار المراجعة",
    reviewerComment: "",
  },
  {
    id: "REP-2",
    studentId: "STU-2026-02",
    studentName: "لين الدوسري",
    title: "تقرير متابعة المهام — الأسبوع الثالث",
    submittedAt: "2026-11-12",
    content:
      "عملت على إعداد تقارير المتابعة اليومية واختبار نماذج الإدخال والتحقق من صحة البيانات المدخلة في النظام.",
    status: "بانتظار المراجعة",
    reviewerComment: "",
  },
];

const INITIAL_WARNINGS = [
  {
    id: "WARN-1",
    studentId: "STU-2026-02",
    studentName: "لين الدوسري",
    date: "2026-11-16",
    reason: "تجاوز حد الغياب اليومي دون عذر مسبق",
    source: "المشرف الأكاديمي / سجل الحضور",
  },
];

const INITIAL_VISIT_REQUESTS = [
  {
    id: "VIS-101",
    entityId: "ENT-1",
    entityName: "شركة الحلول الرقمية المتقدمة",
    requestedDate: "2026-11-25",
    requestedTime: "10:30",
    notes: "طلب زيارة ميدانية من المشرف الأكاديمي لمتابعة سير التدريب والاطلاع على بيئة العمل.",
    requestStatus: "بانتظار رد جهة التدريب",
    entityReply: "لم ترد جهة التدريب بعد",
    entityVisitReport: "بانتظار إتمام الزيارة وتقرير الجهة",
  },
  {
    id: "VIS-102",
    entityId: "ENT-2",
    entityName: "مؤسسة الابتكار التقني",
    requestedDate: "2026-11-18",
    requestedTime: "11:00",
    notes: "زيارة تفقدية لمتابعة المتدربين ومناقشة نموذج التقييم.",
    requestStatus: "معتمدة من جهة التدريب",
    entityReply: "وافقت جهة التدريب على الموعد المحدد.",
    entityVisitReport: "تمت الزيارة؛ الجهة أفادت بانتظام المتدرب وتوفر بيئة عمل مناسبة.",
  },
];

const INITIAL_MESSAGES = [
  {
    id: "MSG-1",
    sender: "النظام الأكاديمي",
    recipient: "المشرف الأكاديمي",
    subject: "تحديث حالة التقارير المرفوعة",
    body: "يوجد تقريران بانتظار الاعتماد أو الرفض ضمن قسم التقارير.",
    time: "اليوم — 08:30 ص",
    unread: true,
  },
  {
    id: "MSG-2",
    sender: "جهة التدريب — مؤسسة الابتكار التقني",
    recipient: "المشرف الأكاديمي",
    subject: "رد على طلب الزيارة الميدانية (VIS-102)",
    body: "تمت الموافقة على موعد الزيارة وإرفاق إفادة الجهة.",
    time: "أمس — 01:15 م",
    unread: false,
  },
];

const INITIAL_JUSTIFICATIONS = [
  {
    id: "JUST-1",
    studentId: "STU-2026-01",
    studentName: "أروى القحطاني",
    date: "2026-11-19",
    reason: "تعذر تسجيل الانصراف في نهاية الدوام بسبب تحديث الشبكة الداخلية.",
    status: "لم يسجل انصراف",
  },
  {
    id: "JUST-2",
    studentId: "STU-2026-02",
    studentName: "لين الدوسري",
    date: "2026-11-19",
    reason: "خروج مبكر لظرف طارئ دون إتمام تسجيل الانصراف.",
    status: "لم يسجل انصراف",
  },
];

const NAV_ITEMS = [
  { key: "الرئيسية", label: "الرئيسية" },
  { key: "الترشيح", label: "الترشيح" },
  { key: "المتابعة", label: "المتابعة" },
  { key: "الحضور", label: "الحضور" },
  { key: "التقارير", label: "التقارير" },
  { key: "الزيارات", label: "الزيارات والإنذارات" },
  { key: "النماذج والتقييم", label: "النماذج والتقييم" },
  { key: "المراسلة", label: "الإشعارات والمراسلة" },
];

export default function App() {
  const [supervisors] = useState(INITIAL_SUPERVISORS);
  const [currentSupervisorId, setCurrentSupervisorId] = useState(INITIAL_SUPERVISORS[0].id);
  const [loginEmail, setLoginEmail] = useState(INITIAL_SUPERVISORS[0].email);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authNotice, setAuthNotice] = useState("");

  const currentSupervisor = useMemo(() => {
    return supervisors.find((s) => s.id === currentSupervisorId) || supervisors[0];
  }, [supervisors, currentSupervisorId]);

  const [activePage, setActivePage] = useState("الرئيسية");
  const [toastMessage, setToastMessage] = useState("");

  const [entities, setEntities] = useState(INITIAL_ENTITIES);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [warnings, setWarnings] = useState(INITIAL_WARNINGS);
  const [visitRequests, setVisitRequests] = useState(INITIAL_VISIT_REQUESTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [checkoutJustifications, setCheckoutJustifications] = useState(INITIAL_JUSTIFICATIONS);

  const [nominationStudentId, setNominationStudentId] = useState(INITIAL_STUDENTS[2].id);
  const [nominationEntityId, setNominationEntityId] = useState(INITIAL_ENTITIES[0].id);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(INITIAL_STUDENTS[0].id);
  const [attendanceStudentId, setAttendanceStudentId] = useState(INITIAL_STUDENTS[0].id);

  const [selectedReportId, setSelectedReportId] = useState(INITIAL_REPORTS[0].id);
  const [reportCommentDraft, setReportCommentDraft] = useState(INITIAL_REPORTS[0].reviewerComment);

  const [visitEntityId, setVisitEntityId] = useState(INITIAL_ENTITIES[0].id);
  const [visitDate, setVisitDate] = useState("2026-11-26");
  const [visitTime, setVisitTime] = useState("10:00");
  const [visitNotes, setVisitNotes] = useState("");

  const [warningStudentId, setWarningStudentId] = useState(INITIAL_STUDENTS[1].id);
  const [warningReason, setWarningReason] = useState("");
  const [entityReportEntityId, setEntityReportEntityId] = useState(INITIAL_ENTITIES[0].id);
  const [entityReportText, setEntityReportText] = useState("");

  const [evalStudentId, setEvalStudentId] = useState(INITIAL_STUDENTS[0].id);
  const selectedEvalStudent = useMemo(
    () => students.find((st) => st.id === evalStudentId) || students[0],
    [students, evalStudentId]
  );
  const [startDateInput, setStartDateInput] = useState(INITIAL_STUDENTS[0].startDate || "");
  const [scoreInput, setScoreInput] = useState(INITIAL_STUDENTS[0].finalScoreOutOf100 || "");
  const [notesInput, setNotesInput] = useState(INITIAL_STUDENTS[0].supervisorNotes || "");
  const [employmentInput, setEmploymentInput] = useState(INITIAL_STUDENTS[0].postTrainingEmployment);

  const [msgRecipient, setMsgRecipient] = useState("جهة التدريب — شركة الحلول الرقمية المتقدمة");
  const [msgSubject, setMsgSubject] = useState("");
  const [msgBody, setMsgBody] = useState("");

  const notify = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage((prev) => (prev === text ? "" : prev));
    }, 3500);
  };

  const pushNotification = (sender, recipient, subject, body) => {
    setMessages((prev) => [
      {
        id: `MSG-${Date.now()}`,
        sender,
        recipient,
        subject,
        body,
        time: "الآن",
        unread: true,
      },
      ...prev,
    ]);
  };

  const stats = useMemo(() => {
    const avgAttendance =
      students.length > 0
        ? Math.round(students.reduce((acc, s) => acc + Number(s.attendanceRate || 0), 0) / students.length)
        : 0;
    const pendingReports = reports.filter((r) => r.status === "بانتظار المراجعة").length;
    const unreadMessages = messages.filter((m) => m.unread).length;
    return {
      studentsCount: students.length,
      pendingReports,
      visitsCount: visitRequests.length,
      avgAttendance,
      warningsCount: warnings.length,
      unreadMessages,
    };
  }, [students, reports, visitRequests, warnings, messages]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const matched = supervisors.find(
      (s) => s.id === currentSupervisorId || s.email.toLowerCase() === loginEmail.trim().toLowerCase()
    );
    if (matched) {
      setCurrentSupervisorId(matched.id);
      setLoginEmail(matched.email);
      setIsLoggedIn(true);
      setAuthNotice("");
      notify(`تم تسجيل الدخول باسم ${matched.name}`);
    } else {
      setAuthNotice("يرجى اختيار حساب مشرف مسجل أو إدخال بريد جامعي صحيح.");
    }
  };

  const handleSwitchSupervisor = (id) => {
    const found = supervisors.find((s) => s.id === id);
    if (found) {
      setCurrentSupervisorId(found.id);
      setLoginEmail(found.email);
      setIsLoggedIn(true);
      notify(`تم التبديل إلى المشرف: ${found.name}`);
    }
  };

  const handleNominateStudent = (e) => {
    e.preventDefault();
    const targetEntity = entities.find((ent) => ent.id === nominationEntityId);
    const targetStudent = students.find((st) => st.id === nominationStudentId);
    if (!targetEntity || !targetStudent) return;

    setStudents((prev) =>
      prev.map((st) =>
        st.id === targetStudent.id
          ? {
              ...st,
              entityId: targetEntity.id,
              entityName: targetEntity.name,
              nominationStatus: "مرشح لجهة التدريب",
              startDate: st.startDate || "2026-11-22",
            }
          : st
      )
    );

    pushNotification(
      currentSupervisor.name,
      targetEntity.name,
      `ترشيح متدرب: ${targetStudent.name}`,
      `تم ترشيح الطالب ${targetStudent.name} (${targetStudent.universityId}) للجهة ${targetEntity.name}.`
    );
    notify(`تم ترشيح ${targetStudent.name} إلى ${targetEntity.name}`);
  };

  const handleJustificationDecision = (item, decision) => {
    const nextStatus = decision === "approve" ? "مستأذن / بعذر" : "غياب كامل";

    setCheckoutJustifications((prev) =>
      prev.map((j) => (j.id === item.id ? { ...j, status: nextStatus } : j))
    );

    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== item.studentId) return st;
        const updatedLog = [
          {
            id: `ATT-${Date.now()}`,
            date: item.date,
            status: nextStatus,
            note: `تبرير عدم تسجيل الانصراف: ${item.reason}`,
          },
          ...st.attendanceLog,
        ];
        const presentCount = updatedLog.filter((log) => log.status === "حاضر").length;
        const computedRate = Math.round((presentCount / updatedLog.length) * 100);
        return {
          ...st,
          attendanceLog: updatedLog,
          attendanceRate: computedRate,
          warningsCount: decision === "reject" ? st.warningsCount + 1 : st.warningsCount,
        };
      })
    );

    if (decision === "reject") {
      setWarnings((prev) => [
        {
          id: `WARN-${Date.now()}`,
          studentId: item.studentId,
          studentName: item.studentName,
          date: item.date,
          reason: "رفض تبرير عدم تسجيل الانصراف وتحويله إلى غياب كامل",
          source: currentSupervisor.name,
        },
        ...prev,
      ]);
    }

    pushNotification(
      currentSupervisor.name,
      item.studentName,
      `قرار تبرير الانصراف (${item.date}): ${nextStatus}`,
      `تم تحديث حالة عدم تسجيل الانصراف للمتدرب ${item.studentName} إلى "${nextStatus}".`
    );
    notify(`تم تحديث حالة ${item.studentName} إلى: ${nextStatus}`);
  };

  const selectedReport = useMemo(
    () => reports.find((r) => r.id === selectedReportId) || reports[0],
    [reports, selectedReportId]
  );

  const handleSelectReport = (rep) => {
    setSelectedReportId(rep.id);
    setReportCommentDraft(rep.reviewerComment || "");
  };

  const handleReportDecision = (decision) => {
    if (!selectedReport) return;
    setReports((prev) =>
      prev.map((rep) =>
        rep.id === selectedReport.id
          ? {
              ...rep,
              status: decision,
              reviewerComment: reportCommentDraft.trim(),
            }
          : rep
      )
    );
    pushNotification(
      currentSupervisor.name,
      selectedReport.studentName,
      `${decision}: ${selectedReport.title}`,
      reportCommentDraft.trim() || `تم تسجيل قرار (${decision}) على التقرير من قِبل ${currentSupervisor.name}.`
    );
    notify(`تم تحديث حالة التقرير إلى: ${decision}`);
  };

  const handleCreateVisitRequest = (e) => {
    e.preventDefault();
    const targetEntity = entities.find((ent) => ent.id === visitEntityId);
    if (!targetEntity) return;

    const newVisit = {
      id: `VIS-${Date.now().toString().slice(-4)}`,
      entityId: targetEntity.id,
      entityName: targetEntity.name,
      requestedDate: visitDate,
      requestedTime: visitTime,
      notes: visitNotes.trim() || "طلب زيارة ميدانية لمتابعة المتدربين.",
      requestStatus: "بانتظار رد جهة التدريب",
      entityReply: "لم ترد جهة التدريب بعد",
      entityVisitReport: "بانتظار إتمام الزيارة وتقرير الجهة",
    };

    setVisitRequests((prev) => [newVisit, ...prev]);
    setVisitNotes("");
    pushNotification(
      currentSupervisor.name,
      targetEntity.name,
      `طلب زيارة ميدانية بتاريخ ${visitDate}`,
      `أرسل المشرف ${currentSupervisor.name} طلب زيارة لجهة التدريب في ${visitDate} الساعة ${visitTime}.`
    );
    notify(`تم إرسال طلب الزيارة إلى جهة التدريب: ${targetEntity.name}`);
  };

  const handleSimulateEntityVisitResponse = (visitId, replyStatus) => {
    setVisitRequests((prev) =>
      prev.map((v) => {
        if (v.id !== visitId) return v;
        if (replyStatus === "معتمدة من جهة التدريب") {
          return {
            ...v,
            requestStatus: "معتمدة من جهة التدريب",
            entityReply: "وافقت جهة التدريب على الموعد وتم تأكيد الاستقبال.",
            entityVisitReport: v.entityVisitReport.startsWith("بانتظار")
              ? "تم اعتماد الزيارة وجارٍ إعداد تقرير الزيارة من جهة التدريب."
              : v.entityVisitReport,
          };
        }
        return {
          ...v,
          requestStatus: "مؤجلة / رد من جهة التدريب",
          entityReply: "أفادت جهة التدريب بطلب تعديل الموعد أو استكمال إجراء الزيارة.",
        };
      })
    );
    notify("تم تحديث رد جهة التدريب وحالة الزيارة");
  };

  const handleAddWarning = (e) => {
    e.preventDefault();
    const targetStudent = students.find((st) => st.id === warningStudentId);
    if (!targetStudent) return;

    const warnItem = {
      id: `WARN-${Date.now()}`,
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      date: "2026-11-20",
      reason: warningReason.trim() || "إنذار غياب صادر من المشرف الأكاديمي",
      source: currentSupervisor.name,
    };

    setWarnings((prev) => [warnItem, ...prev]);
    setStudents((prev) =>
      prev.map((st) =>
        st.id === targetStudent.id ? { ...st, warningsCount: st.warningsCount + 1 } : st
      )
    );
    setWarningReason("");
    notify(`تم إصدار إنذار غياب للمتدرب ${targetStudent.name}`);
  };

  const handleSaveEntityVisitReport = (e) => {
    e.preventDefault();
    if (!entityReportText.trim()) return;
    const targetEntity = entities.find((ent) => ent.id === entityReportEntityId);
    if (!targetEntity) return;

    setEntities((prev) =>
      prev.map((ent) =>
        ent.id === targetEntity.id ? { ...ent, entityVisitReport: entityReportText.trim() } : ent
      )
    );
    setVisitRequests((prev) =>
      prev.map((v) =>
        v.entityId === targetEntity.id ? { ...v, entityVisitReport: entityReportText.trim() } : v
      )
    );
    setEntityReportText("");
    notify(`تم حفظ تقرير الزيارة من جهة التدريب: ${targetEntity.name}`);
  };

  const handleSelectEvalStudent = (id) => {
    setEvalStudentId(id);
    const found = students.find((st) => st.id === id);
    if (found) {
      setStartDateInput(found.startDate || "");
      setScoreInput(found.finalScoreOutOf100 === "" ? "" : String(found.finalScoreOutOf100));
      setNotesInput(found.supervisorNotes || "");
      setEmploymentInput(found.postTrainingEmployment || "لم يُحدد بعد");
    }
  };

  const handleSaveEvaluationAndForms = (e) => {
    e.preventDefault();
    const numericScore = scoreInput === "" ? "" : Math.max(0, Math.min(100, Number(scoreInput)));

    setStudents((prev) =>
      prev.map((st) =>
        st.id === selectedEvalStudent.id
          ? {
              ...st,
              startDate: startDateInput,
              finalScoreOutOf100: numericScore,
              supervisorNotes: notesInput.trim(),
              postTrainingEmployment: employmentInput,
            }
          : st
      )
    );

    notify(`تم حفظ بيانات النموذج 1 والدرجة (من 100) والملاحظات للمتدرب ${selectedEvalStudent.name}`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgBody.trim()) return;
    pushNotification(currentSupervisor.name, msgRecipient, msgSubject.trim(), msgBody.trim());
    setMsgSubject("");
    setMsgBody("");
    notify("تم إرسال الرسالة وتسجيل الإشعار");
  };

  const handleMarkAllRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })));
    notify("تم تعليم جميع الإشعارات كمقروءة");
  };

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (st) =>
        st.name.toLowerCase().includes(q) ||
        st.universityId.toLowerCase().includes(q) ||
        st.entityName.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  const activeFollowUpStudent = useMemo(
    () => students.find((st) => st.id === selectedStudentId) || students[0],
    [students, selectedStudentId]
  );
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 font-bold text-white">
              ت م
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                نظام إدارة التدريب الميداني — بوابة المشرف الأكاديمي
              </h1>
              <p className="text-xs text-slate-500">
                {isLoggedIn
                  ? `المشرف الحالي: ${currentSupervisor.name} (${currentSupervisor.role}) • ${currentSupervisor.email}`
                  : "يرجى تسجيل الدخول لتحديد هوية المشرف"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="supervisor-switcher">
              تبديل المشرف
            </label>
            <select
              id="supervisor-switcher"
              value={currentSupervisorId}
              onChange={(e) => handleSwitchSupervisor(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-emerald-600 focus:outline-none"
            >
              {supervisors.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setIsLoggedIn((prev) => !prev)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {isLoggedIn ? "شاشة الدخول" : "العودة للبوابة"}
            </button>
          </div>
        </div>

        <nav aria-label="أقسام البوابة" className="border-t border-slate-100 bg-slate-50/90">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-2.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivePage(item.key)}
                  className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/60"
                  }`}
                >
                  {item.label}
                  {item.key === "المراسلة" && stats.unreadMessages > 0 && (
                    <span
                      className={`mr-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive ? "bg-white text-emerald-800" : "bg-emerald-700 text-white"
                      }`}
                    >
                      {stats.unreadMessages}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {toastMessage && (
        <div role="status" className="mx-auto mt-4 max-w-7xl px-4">
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage("")}
              className="text-xs text-emerald-700 underline"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        <main className="mx-auto max-w-lg px-4 py-10">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">تسجيل دخول المشرف الأكاديمي</h2>
            <p className="mt-1 text-sm text-slate-600">
              حددي حساب المشرف للتحقق من الهوية وربط الإجراءات والاعتمادات باسم المشرف الحالي.
            </p>

            {authNotice && (
              <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {authNotice}
              </p>
            )}

            <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  اختر المشرف الأكاديمي
                </label>
                <select
                  value={currentSupervisorId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setCurrentSupervisorId(id);
                    const found = supervisors.find((s) => s.id === id);
                    if (found) setLoginEmail(found.email);
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                >
                  {supervisors.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name} — {sup.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  البريد الإلكتروني الجامعي
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                دخول إلى البوابة
              </button>
            </form>
          </section>
        </main>
      ) : (
        <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
          {activePage === "الرئيسية" && (
            <div className="space-y-6">
              <section className="rounded-2xl bg-gradient-to-l from-emerald-800 to-emerald-600 p-6 text-white shadow-sm">
                <p className="text-xs font-semibold text-emerald-100">مرحباً بكِ</p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  لوحة المشرف الأكاديمي — {currentSupervisor.name}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-50">
                  متابعة ترشيح المتدربين، سجلات الحضور وطلبات التبرير، اعتماد أو رفض التقارير، إرسال طلبات الزيارة لجهات التدريب، ومتابعة النماذج والدرجة النهائية من 100 والملاحظات.
                </p>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">إجمالي المتدربين</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{stats.studentsCount}</p>
                  <p className="mt-1 text-xs text-emerald-700">مرتبط بصفحة المتابعة</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">تقارير بانتظار المراجعة</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{stats.pendingReports}</p>
                  <p className="mt-1 text-xs text-amber-700">تُعتمد أو تُرفض من قسم التقارير</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">طلبات الزيارة المرسلة</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{stats.visitsCount}</p>
                  <p className="mt-1 text-xs text-slate-600">الرد والاعتماد من جهة التدريب</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">متوسط نسبة الحضور</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{stats.avgAttendance}%</p>
                  <p className="mt-1 text-xs text-slate-600">الإنذارات المسجلة: {stats.warningsCount}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">ملخص حالة المتدربين</h3>
                  <button
                    type="button"
                    onClick={() => setActivePage("المتابعة")}
                    className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                  >
                    عرض صفحة المتابعة الكاملة
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-500">
                        <th className="py-2.5 pr-2">المتدرب</th>
                        <th className="py-2.5">جهة التدريب</th>
                        <th className="py-2.5">الحضور</th>
                        <th className="py-2.5">التقارير</th>
                        <th className="py-2.5">الإنذارات</th>
                        <th className="py-2.5 pl-2">الدرجة (100)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((st) => (
                        <tr key={st.id}>
                          <td className="py-3 pr-2 font-semibold text-slate-900">{st.name}</td>
                          <td className="py-3 text-slate-600">{st.entityName}</td>
                          <td className="py-3 font-semibold text-emerald-700">{st.attendanceRate}%</td>
                          <td className="py-3 text-slate-700">{st.reportsCount}</td>
                          <td className="py-3 text-rose-700">{st.warningsCount}</td>
                          <td className="py-3 pl-2 font-bold text-slate-800">
                            {st.finalScoreOutOf100 === "" ? "—" : `${st.finalScoreOutOf100} / 100`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activePage === "الترشيح" && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <form
                onSubmit={handleNominateStudent}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-900">ترشيح طالب لجهة التدريب</h2>
                <p className="text-xs leading-5 text-slate-600">
                  اختاري المتدرب وجهة التدريب المناسبة لإتمام الترشيح وتحديث بياناته في المتابعة.
                </p>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">المتدرب</label>
                  <select
                    value={nominationStudentId}
                    onChange={(e) => setNominationStudentId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.universityId}) — الحالة: {st.nominationStatus}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">جهة التدريب</label>
                  <select
                    value={nominationEntityId}
                    onChange={(e) => setNominationEntityId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {entities.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.name} — {ent.city} ({ent.availableSeats} مقاعد)
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  تأكيد ترشيح الطالب للجهة
                </button>
              </form>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">حالة الترشيح الحالية للمتدربين</h3>
                <div className="divide-y divide-slate-100">
                  {students.map((st) => (
                    <div key={st.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-bold text-slate-900">{st.name}</p>
                        <p className="text-xs text-slate-500">الجهة: {st.entityName}</p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                        {st.nominationStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activePage === "المتابعة" && (
            <section className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">متابعة المتدربين</h2>
                    <p className="text-xs text-slate-600">
                      عرض نسبة الحضور والتقارير والإنذارات لكل متدرب مع تفاصيل السجل.
                    </p>
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو الرقم الجامعي أو الجهة..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm sm:w-72"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-600">
                        <th className="p-3">المتدرب</th>
                        <th className="p-3">جهة التدريب</th>
                        <th className="p-3">نسبة الحضور</th>
                        <th className="p-3">التقارير</th>
                        <th className="p-3">الإنذارات</th>
                        <th className="p-3">التفاصيل</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((st) => (
                        <tr
                          key={st.id}
                          className={activeFollowUpStudent?.id === st.id ? "bg-emerald-50/50" : ""}
                        >
                          <td className="p-3 font-bold text-slate-900">{st.name}</td>
                          <td className="p-3 text-slate-700">{st.entityName}</td>
                          <td className="p-3 font-bold text-emerald-700">{st.attendanceRate}%</td>
                          <td className="p-3 text-slate-700">{st.reportsCount} تقارير</td>
                          <td className="p-3 font-semibold text-rose-700">{st.warningsCount} إنذارات</td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => setSelectedStudentId(st.id)}
                              className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100"
                            >
                              عرض السجل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {activeFollowUpStudent && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">
                    بطاقة متابعة: {activeFollowUpStudent.name}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-slate-500">تاريخ المباشرة (نموذج 1)</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {activeFollowUpStudent.startDate || "غير محدد"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-slate-500">الدرجة النهائية من 100</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {activeFollowUpStudent.finalScoreOutOf100 === ""
                          ? "لم تُرصد بعد"
                          : `${activeFollowUpStudent.finalScoreOutOf100} / 100`}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-slate-500">مؤشر التوظيف بعد التدريب</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {activeFollowUpStudent.postTrainingEmployment}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs">
                    <p className="font-bold text-slate-700">ملاحظات المشرف المحفوظة على المتدرب:</p>
                    <p className="mt-1 text-slate-600">
                      {activeFollowUpStudent.supervisorNotes || "لا توجد ملاحظات مسجلة حالياً."}
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          {activePage === "الحضور" && (
            <div className="space-y-6">
              {/* 1. طلبات التبرير / عدم تسجيل الانصراف */}
              <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      طلبات التبرير / عدم تسجيل الانصراف
                    </h2>
                    <p className="mt-1 text-xs text-slate-600">
                      مراجعة تبريرات الطلاب الذين لم يسجلوا انصراف والقرار بالقبول أو الرفض.
                    </p>
                  </div>
                  <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                    بانتظار القرار:{" "}
                    {checkoutJustifications.filter((j) => j.status === "لم يسجل انصراف").length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-600">
                        <th className="p-3">المتدرب</th>
                        <th className="p-3">التاريخ</th>
                        <th className="p-3">تبرير المتدرب</th>
                        <th className="p-3">الحالة</th>
                        <th className="p-3">إجراء المشرف</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {checkoutJustifications.map((item) => (
                        <tr key={item.id}>
                          <td className="p-3 font-bold text-slate-900">{item.studentName}</td>
                          <td className="p-3 text-xs text-slate-600">{item.date}</td>
                          <td className="p-3 text-xs leading-5 text-slate-700">{item.reason}</td>
                          <td className="p-3">
                            <span
                              className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                                item.status === "مستأذن / بعذر"
                                  ? "bg-emerald-50 text-emerald-800"
                                  : item.status === "غياب كامل"
                                  ? "bg-rose-50 text-rose-800"
                                  : "bg-amber-50 text-amber-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleJustificationDecision(item, "approve")}
                                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-800"
                              >
                                قبول التبرير
                              </button>
                              <button
                                type="button"
                                onClick={() => handleJustificationDecision(item, "reject")}
                                className="rounded-lg bg-rose-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-800"
                              >
                                رفض التبرير
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. حالة الحضور والغياب للمتدربين */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      حالة الحضور والغياب للمتدربين
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      عرض حالة المتدرب (حاضر / غائب / مستأذن) وسجل الأيام ونسبة الحضور.
                    </p>
                  </div>

                  <select
                    value={attendanceStudentId}
                    onChange={(e) => setAttendanceStudentId(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} (الحضور: {st.attendanceRate}%)
                      </option>
                    ))}
                  </select>
                </div>

                {students
                  .filter((st) => st.id === attendanceStudentId)
                  .map((st) => {
                    const latestStatus = st.attendanceLog[0]?.status || "غير محدد";
                    const isPresent = latestStatus === "حاضر";
                    return (
                      <div key={st.id} className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{st.name}</p>
                            <p className="text-xs text-slate-600">
                              جهة التدريب: {st.entityName} • نسبة الحضور: {st.attendanceRate}%
                            </p>
                          </div>
                          <span
                            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold ${
                              isPresent
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-rose-100 text-rose-900"
                            }`}
                          >
                            آخر حالة: {isPresent ? "حاضر" : latestStatus}
                          </span>
                        </div>

                        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                          {st.attendanceLog.map((log) => {
                            const rowPresent = log.status === "حاضر";
                            return (
                              <div
                                key={log.id}
                                className="flex flex-wrap items-center justify-between gap-2 p-3.5 text-xs"
                              >
                                <div>
                                  <p className="font-bold text-slate-800">{log.date}</p>
                                  {log.note && <p className="text-slate-500">{log.note}</p>}
                                </div>
                                <span
                                  className={`rounded-lg px-3 py-1 font-bold ${
                                    rowPresent
                                      ? "bg-emerald-50 text-emerald-800"
                                      : log.status.includes("عذر")
                                      ? "bg-amber-50 text-amber-800"
                                      : "bg-rose-50 text-rose-800"
                                  }`}
                                >
                                  {rowPresent
                                    ? "حاضر"
                                    : log.status.includes("غائب") || log.status.includes("غياب")
                                    ? `غائب (${log.status})`
                                    : log.status}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </section>
            </div>
          )}

          {activePage === "التقارير" && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-5">
                <h2 className="text-base font-bold text-slate-900">التقارير المرفوعة</h2>
                {reports.map((rep) => {
                  const active = selectedReport?.id === rep.id;
                  return (
                    <button
                      key={rep.id}
                      type="button"
                      onClick={() => handleSelectReport(rep)}
                      className={`w-full rounded-xl border p-3.5 text-right transition ${
                        active
                          ? "border-emerald-600 bg-emerald-50/70"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{rep.title}</span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            rep.status === "معتمد"
                              ? "bg-emerald-100 text-emerald-900"
                              : rep.status === "مرفوض"
                              ? "bg-rose-100 text-rose-900"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {rep.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">
                        المتدرب: {rep.studentName} • {rep.submittedAt}
                      </p>
                    </button>
                  );
                })}
              </div>

              {selectedReport && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{selectedReport.title}</h3>
                      <p className="text-xs text-slate-500">
                        مقدم من: {selectedReport.studentName} • تاريخ الرفع: {selectedReport.submittedAt}
                      </p>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
                      الحالة: {selectedReport.status}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-1.5 text-xs font-bold text-slate-500">محتوى التقرير:</p>
                    <p className="text-sm leading-7 text-slate-800">{selectedReport.content}</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      ملاحظة المشرف على التقرير
                    </label>
                    <textarea
                      rows={3}
                      value={reportCommentDraft}
                      onChange={(e) => setReportCommentDraft(e.target.value)}
                      placeholder="اكتبي ملاحظاتك حول التقرير قبل الاعتماد أو الرفض..."
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleReportDecision("معتمد")}
                      className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      اعتماد التقرير
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReportDecision("مرفوض")}
                      className="rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-800"
                    >
                      رفض التقرير
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {activePage === "الزيارات" && (
            <div className="space-y-6">
              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <form
                  onSubmit={handleCreateVisitRequest}
                  className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      طلب زيارة ميدانية لجهة التدريب
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      يقوم المشرف الأكاديمي بإرسال طلب زيارة وحجز موعد مع جهة التدريب، وتقوم جهة التدريب بالرد والاعتماد.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      جهة التدريب المطلوب زيارتها
                    </label>
                    <select
                      value={visitEntityId}
                      onChange={(e) => setVisitEntityId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                    >
                      {entities.map((ent) => (
                        <option key={ent.id} value={ent.id}>
                          {ent.name} ({ent.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">
                        تاريخ الزيارة المقترح
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">الوقت</label>
                      <input
                        type="time"
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      ملاحظات طلب الزيارة
                    </label>
                    <textarea
                      rows={2}
                      value={visitNotes}
                      onChange={(e) => setVisitNotes(e.target.value)}
                      placeholder="هدف الزيارة أو النقاط المطلوب مناقشتها مع جهة التدريب..."
                      className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    إرسال طلب الزيارة إلى جهة التدريب
                  </button>
                </form>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">
                    متابعة طلبات الزيارة ورد جهة التدريب
                  </h3>
                  <div className="space-y-3">
                    {visitRequests.map((v) => (
                      <div
                        key={v.id}
                        className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-900">{v.entityName}</span>
                          <span className="rounded-lg bg-emerald-100 px-2.5 py-1 font-bold text-emerald-900">
                            الحالة: {v.requestStatus}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          الموعد: {v.requestedDate} — الساعة {v.requestedTime}
                        </p>
                        <p className="font-semibold text-slate-800">رد الجهة: {v.entityReply}</p>
                        <p className="text-slate-600">تقرير زيارة الجهة: {v.entityVisitReport}</p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleSimulateEntityVisitResponse(v.id, "معتمدة من جهة التدريب")
                            }
                            className="rounded-lg border border-emerald-300 bg-white px-2.5 py-1 font-bold text-emerald-800 hover:bg-emerald-50"
                          >
                            تسجيل موافقة جهة التدريب
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSimulateEntityVisitResponse(v.id, "مؤجلة / رد من جهة التدريب")
                            }
                            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-bold text-slate-700 hover:bg-slate-100"
                          >
                            تسجيل رد / تعديل من الجهة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">إنذارات الغياب</h3>
                  <form onSubmit={handleAddWarning} className="flex flex-col gap-3 sm:flex-row">
                    <select
                      value={warningStudentId}
                      onChange={(e) => setWarningStudentId(e.target.value)}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold"
                    >
                      {students.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={warningReason}
                      onChange={(e) => setWarningReason(e.target.value)}
                      placeholder="سبب إنذار الغياب..."
                      className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800"
                    >
                      إصدار إنذار
                    </button>
                  </form>

                  <div className="divide-y divide-slate-100">
                    {warnings.map((w) => (
                      <div key={w.id} className="py-2.5 text-xs">
                        <p className="font-bold text-rose-800">
                          {w.studentName} — {w.date}
                        </p>
                        <p className="text-slate-700">{w.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">
                    تقارير الزيارة من جهة التدريب
                  </h3>
                  <form onSubmit={handleSaveEntityVisitReport} className="space-y-3">
                    <select
                      value={entityReportEntityId}
                      onChange={(e) => setEntityReportEntityId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold"
                    >
                      {entities.map((ent) => (
                        <option key={ent.id} value={ent.id}>
                          {ent.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={2}
                      value={entityReportText}
                      onChange={(e) => setEntityReportText(e.target.value)}
                      placeholder="إدخال أو تحديث ملخص تقرير الزيارة الوارد من جهة التدريب..."
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                    >
                      حفظ تقرير الزيارة من الجهة
                    </button>
                  </form>

                  <div className="divide-y divide-slate-100">
                    {entities.map((ent) => (
                      <div key={ent.id} className="py-2.5 text-xs">
                        <p className="font-bold text-slate-900">{ent.name}</p>
                        <p className="mt-0.5 text-slate-600">{ent.entityVisitReport}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activePage === "النماذج والتقييم" && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <form
                onSubmit={handleSaveEvaluationAndForms}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    نماذج المتدرب وتقييم المشرف الأكاديمي
                  </h2>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                    الدرجة النهائية من 100
                  </span>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    اختر المتدرب
                  </label>
                  <select
                    value={evalStudentId}
                    onChange={(e) => handleSelectEvalStudent(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} — {st.entityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      نموذج 1: تاريخ المباشرة
                    </label>
                    <input
                      type="date"
                      value={startDateInput}
                      onChange={(e) => setStartDateInput(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      الدرجة النهائية للمتدرب (من 100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={scoreInput}
                      onChange={(e) => setScoreInput(e.target.value)}
                      placeholder="0 إلى 100"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    التوظيف بعد التدريب (مؤشر أثر)
                  </label>
                  <select
                    value={employmentInput}
                    onChange={(e) => setEmploymentInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="لم يُحدد بعد">لم يُحدد بعد</option>
                    <option value="مستمر في التدريب (بانتظار التقييم النهائي)">
                      مستمر في التدريب (بانتظار التقييم النهائي)
                    </option>
                    <option value="مرشح للتوظيف بعد إتمام الساعات">
                      مرشح للتوظيف بعد إتمام الساعات
                    </option>
                    <option value="تم التوظيف بعد التدريب">تم التوظيف بعد التدريب</option>
                    <option value="لم يتم التوظيف">لم يتم التوظيف</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    ملاحظات المشرف على المتدرب (تُحفظ وتُعرض)
                  </label>
                  <textarea
                    rows={3}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="اكتبي ملاحظاتك على المتدرب وسيتم حفظها وعرضها في بطاقة المتابعة..."
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  حفظ تقييم الطالب والنماذج
                </button>
              </form>

              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5">
                <h3 className="text-base font-bold text-slate-900">
                  عرض تقييم الجهة للمتدرب (نموذج 2)
                </h3>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm leading-6 text-slate-800">
                  <p className="text-xs font-bold text-emerald-900">
                    جهة التدريب: {selectedEvalStudent.entityName}
                  </p>
                  <p className="mt-1.5">{selectedEvalStudent.entityEvaluationForm2}</p>
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
                  <p className="font-bold text-slate-800">البيانات المحفوظة حالياً للمتدرب:</p>
                  <p className="text-slate-700">
                    • تاريخ المباشرة (نموذج 1): {selectedEvalStudent.startDate || "غير محدد"}
                  </p>
                  <p className="text-slate-700">
                    • الدرجة من 100:{" "}
                    {selectedEvalStudent.finalScoreOutOf100 === ""
                      ? "لم تُدخل بعد"
                      : `${selectedEvalStudent.finalScoreOutOf100} / 100`}
                  </p>
                  <p className="text-slate-700">
                    • مؤشر التوظيف بعد التدريب: {selectedEvalStudent.postTrainingEmployment}
                  </p>
                  <p className="text-slate-700">
                    • الملاحظات المحفوظة: {selectedEvalStudent.supervisorNotes || "لا توجد ملاحظات"}
                  </p>
                </div>
              </div>
            </section>
          )}

          {activePage === "المراسلة" && (
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <form
                onSubmit={handleSendMessage}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5"
              >
                <h2 className="text-lg font-bold text-slate-900">إرسال رسالة / إشعار</h2>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">المرسل إليه</label>
                  <select
                    value={msgRecipient}
                    onChange={(e) => setMsgRecipient(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    <option value="جهة التدريب — شركة الحلول الرقمية المتقدمة">
                      جهة التدريب — شركة الحلول الرقمية المتقدمة
                    </option>
                    <option value="جهة التدريب — مؤسسة الابتكار التقني">
                      جهة التدريب — مؤسسة الابتكار التقني
                    </option>
                    <option value="أروى القحطاني">أروى القحطاني</option>
                    <option value="لين الدوسري">لين الدوسري</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">العنوان</label>
                  <input
                    type="text"
                    required
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    placeholder="عنوان الرسالة..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">نص الرسالة</label>
                  <textarea
                    rows={3}
                    required
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    placeholder="اكتبي محتوى الرسالة أو الإشعار..."
                    className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  إرسال الرسالة
                </button>
              </form>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">سجل الإشعارات والرسائل</h3>
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    تعليم الكل كمقروء
                  </button>
                </div>

                <div className="space-y-2.5">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-xl border p-3.5 text-xs ${
                        m.unread
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-slate-900">{m.subject}</span>
                        <span className="text-[11px] text-slate-500">{m.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                        من: {m.sender} • إلى: {m.recipient}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-700">{m.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}