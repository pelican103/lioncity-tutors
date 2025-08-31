const REVIEWS = [
  { name: "Sharon T.", text: "Matched a great O-Level Math tutor within a day. Clear updates and very professional." },
  { name: "Mr Lim", text: "No fees for parents and fast response. My son’s grades improved in 6 weeks." },
  { name: "A. Rahman", text: "Appreciate the MOE-familiar tutors and the follow-up after first lesson." },
];

export default function ReviewStrip() {
  return (
    <section className="px-4 py-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="text-yellow-500">★★★★★</div>
            <p className="mt-2 text-gray-800">“{r.text}”</p>
            <p className="mt-2 text-sm text-gray-600">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
