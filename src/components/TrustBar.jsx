const benefits = [
  ['01', 'Fast Local Delivery', 'From our door to yours, without the wait.'],
  ['02', '30-Day Hassle-Free Returns', 'Changed your mind? We make it easy.'],
  ['03', '100% Secure Checkout', 'Protected payment from start to finish.'],
  ['04', 'Direct WhatsApp Support', 'Real help from a real Marketly person.'],
]

function TrustBar() {
  return <section className="border-y border-slate-200 bg-white" aria-label="Marketly benefits"><div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:px-8 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">{benefits.map(([number, title, description]) => <div className="flex gap-4 py-6 md:px-6 lg:first:pl-0 lg:last:pr-0" key={title}><span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{number}</span><div><h2 className="text-sm font-bold text-blue-950">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>)}</div></section>
}

export default TrustBar
