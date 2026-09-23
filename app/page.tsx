'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft, Phone, MapPin, Menu, X, Pause, Play, ChevronDown, Check, MoveUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

const slides = [
  { eyebrow: 'ZAWIERCIE · SZKOLIMY OD 1992 ROKU', title: 'TWÓJ RUCH.', accent: 'TWOJA DROGA.', text: 'Od ponad 30 lat pomagamy kursantom ruszyć w drogę. Zacznij od rozmowy o kursie dopasowanym do Ciebie.', image: 'interior.jpg', tag: '01 / START W DOBRYM KIERUNKU' },
  { eyebrow: 'KATEGORIE A · A1 · A2', title: 'MNIEJ GRANIC.', accent: 'WIĘCEJ WOLNOŚCI.', text: 'Dwa koła. Nowa perspektywa. Zacznij swoją motocyklową przygodę od solidnych podstaw.', image: 'motorcycle.jpg', tag: '02 / POCZUJ WOLNOŚĆ' },
  { eyebrow: 'SPOKOJNIE. KROK PO KROKU.', title: 'OD PIERWSZEJ', accent: 'DO WŁASNEJ JAZDY.', text: 'Nie musisz umieć wszystkiego od razu. Tu jest miejsce na pytania, ćwiczenie i nabieranie pewności.', image: 'learner-car.png', tag: '03 / ZŁAP PEWNOŚĆ ZA KIEROWNICĄ' },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    api.on('select', update); update();
    return () => { api.off('select', update); };
  }, [api]);
  useEffect(() => {
    if (!api || paused || hover || reduced) return;
    const timer = setInterval(() => { if (!document.hidden) api.scrollNext(); }, 6500);
    return () => clearInterval(timer);
  }, [api, paused, hover, reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const navigate = () => setMenu(false);
  return (
    <>
      <a href="#kursy" className="skip-link">Przejdź do oferty kursów</a>
      <header id="top" className="header">
        <a href="#top" className="brand" aria-label="Kowal — strona główna"><span className="brand-mark">K<span>↗</span></span><span>KOWAL<small>NAUKA JAZDY · ZAWIERCIE</small></span></a>
        <nav className={menu ? 'nav open' : 'nav'} aria-label="Nawigacja główna">
          <a href="#kursy" onClick={navigate}>Nasze kursy</a><a href="#szkola" onClick={navigate}>Dlaczego Kowal?</a><a href="#start" onClick={navigate}>Jak zacząć</a><a href="#kontakt" onClick={navigate}>Kontakt</a>
        </nav>
        <a className="header-cta" href="tel:+48666023120"><Phone size={16}/> <span>666 023 120</span><ArrowUpRight size={18}/></a>
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label={menu ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button>
      </header>
      <main>
        <Carousel opts={{ loop: true, duration: 40 }} setApi={setApi} className="hero" aria-label="Poznaj szkołę jazdy Kowal" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setPaused(true)}>
          <CarouselContent className="hero-track">
            {slides.map((slide, index) => <CarouselItem key={slide.image} className={`hero-slide ${active === index ? 'is-active' : ''}`} aria-label={`${index + 1} z 3`} aria-hidden={active !== index} inert={active !== index}>
              <img className="hero-image" src={`/images/${slide.image}`} alt="" fetchPriority={index === 0 ? 'high' : 'auto'}/>
              <div className="hero-shade"/>
              <div className="hero-copy">
                <div className="eyebrow"><span className="status-dot"/>{slide.eyebrow}</div>
                {index === 0 ? <h1>{slide.title}<br/><em>{slide.accent}</em></h1> : <h2>{slide.title}<br/><em>{slide.accent}</em></h2>}
                <p>{slide.text}</p>
                <div className="hero-actions"><a className="button lime" href="#kursy">Wybierz swój kurs <ArrowUpRight size={22}/></a><a className="text-link" href="#szkola">Poznaj nas <ArrowRight size={19}/></a></div>
              </div>
              <div className="image-note">ZDJĘCIE ILUSTRACYJNE</div>
            </CarouselItem>)}
          </CarouselContent>
          <div className="hero-bottom">
            <a href="#kursy" className="scroll-hint"><span><ChevronDown size={18}/></span> DALEJ ZACZYNA SIĘ TWOJA DROGA</a>
            <div className="slider-controls"><span className="slide-count">0{active + 1}<span>/ 03</span></span><div className="slide-dots">{slides.map((_, i) => <button key={i} aria-label={`Pokaż slajd ${i + 1}`} aria-current={active === i ? 'true' : undefined} className={active === i ? 'selected' : ''} onClick={() => {api?.scrollTo(i); setPaused(true);}}/>)}</div><button aria-label="Poprzedni slajd" onClick={() => api?.scrollPrev()}><ArrowLeft size={19}/></button><button aria-label="Następny slajd" onClick={() => api?.scrollNext()}><ArrowRight size={19}/></button><button aria-label={paused || reduced ? 'Włącz automatyczne slajdy' : 'Zatrzymaj automatyczne slajdy'} onClick={() => {setPaused(!(paused || reduced)); setReduced(false);}}>{paused || reduced ? <Play size={15}/> : <Pause size={15}/>}</button></div>
          </div>
          <div className="hero-side">KIERUNEK: SAMODZIELNOŚĆ</div>
        </Carousel>
        <div className="belief-strip"><span>NIE BOIMY SIĘ TRUDNYCH PRZYPADKÓW.</span><ArrowUpRight/><span>TY TEŻ NIE MUSISZ.</span><ArrowUpRight/><span className="strip-extra">KOWAL. I JEDZIESZ DALEJ.</span></div>
        <section id="kursy" className="section courses">
          <div className="section-heading reveal"><div><div className="eyebrow dark">01 / WYBIERZ KIERUNEK</div><h2>Wolność ma<br/>różne <span className="serif">kategorie.</span></h2></div><p>Kurs podstawowy, indywidualny lub jazdy dodatkowe. Zapytaj, która forma szkolenia będzie dla Ciebie odpowiednia.</p></div>
          <div className="course-grid">
            <a href="#kontakt" className="course-card reveal"><div className="course-top"><span>01 / SAMOCHÓD</span><ArrowUpRight/></div><div className="category">B<span>↗</span></div><h3>Twoja codzienność.<br/>Na własnych zasadach.</h3><p>Kurs kategorii B oraz jazdy dodatkowe. Teoria, plac i jazda po mieście przygotowują do egzaminu i samodzielnej drogi.</p><div className="course-foot"><span>Zapytaj o kategorię B</span><ArrowRight size={21}/></div></a>
            <a href="#kontakt" className="course-card motorcycle reveal"><div className="course-top"><span>02 / MOTOCYKL</span><ArrowUpRight/></div><div className="category">A<span className="subcategories">A1 / A2</span></div><h3>Dwa koła.<br/>Cały świat przed Tobą.</h3><p>Kursy kategorii A, A1 i A2 oraz jazdy dodatkowe. Zapytaj, którą kategorię możesz wybrać i jak wygląda szkolenie.</p><div className="course-foot"><span>Zapytaj o kurs motocyklowy</span><ArrowRight size={21}/></div></a>
          </div>
        </section>
        <section id="szkola" className="about section">
          <div className="about-photo reveal"><img src="/images/interior.jpg" alt="Widok z wnętrza samochodu — fotografia ilustracyjna" loading="lazy"/><span className="photo-caption">DOBRA JAZDA ZACZYNA SIĘ OD SPOKOJU.</span><div className="photo-sticker">OD 1992<br/>W ZAWIERCIU.<ArrowUpRight size={36}/></div></div>
          <div className="about-copy reveal"><div className="eyebrow dark">02 / POZNAJ KOWALA</div><h2>Najpierw człowiek.<br/>Potem <span className="serif">kierowca.</span></h2><p>Szkolimy w Zawierciu od 1992 roku. Od początku stawiamy na cierpliwość, indywidualne podejście i pomoc także wtedy, gdy nauka jazdy wydaje się trudna.</p><p>Liczy się dla nas nie tylko egzamin, lecz także pewność za kierownicą po jego zdaniu. Dlatego łączymy teorię, ćwiczenia na placu i jazdę w ruchu drogowym.</p><ul><li><Check/> Kursy samochodowe i motocyklowe</li><li><Check/> Kursy indywidualne i jazdy dodatkowe</li><li><Check/> Nauka manewrów na własnym placu</li></ul><a className="text-link dark-link" href="#kontakt">Porozmawiajmy o Twoim kursie <ArrowUpRight size={20}/></a></div>
        </section>
        <section id="start" className="start section"><div className="section-heading reveal"><div><div className="eyebrow">03 / PROŚCIEJ, NIŻ MYŚLISZ</div><h2>Nie odkładaj.<br/><span className="serif">Ruszaj.</span></h2></div><a href="tel:+48666023120" className="button lime">Zrób pierwszy krok <ArrowUpRight size={22}/></a></div><div className="steps">{[{n:'01',title:'Daj nam znać.',text:'Zadzwoń lub napisz. Zapytaj o kurs, jazdy dodatkowe, aktualny termin i cenę.'},{n:'02',title:'Ustal szczegóły.',text:'Dowiedz się, jakie dokumenty będą potrzebne i jak przygotować się do rozpoczęcia szkolenia.'},{n:'03',title:'Wsiadaj. Uczymy.',text:'Teoria, plac manewrowy i miasto. Krok po kroku budujesz umiejętności i pewność.'}].map(step => <div key={step.n} className="step reveal"><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
        <section id="kontakt" className="contact section"><div className="reveal"><div className="eyebrow dark">04 / DO ZOBACZENIA ZA KIEROWNICĄ</div><h2>To co,<br/><span className="serif">jedziemy?</span><MoveUpRight className="contact-arrow"/></h2><a className="big-phone" href="tel:+48666023120">666 023 120 <ArrowUpRight/></a><a className="email" href="mailto:arturkowal@naukajazdyzawiercie.pl">arturkowal@naukajazdyzawiercie.pl</a></div><div className="contact-info reveal"><MapPin size={28}/><h3>Spotkajmy się<br/>w Zawierciu.</h3><p>MOK Centrum<br/>ul. Piastowska 1</p><p className="muted">Zadzwoń, żeby potwierdzić miejsce spotkania oraz zapytać o aktualne terminy i ceny kursów.</p><a className="text-link dark-link" href="https://www.google.com/maps/search/?api=1&query=MOK+Centrum+Piastowska+1+Zawiercie" target="_blank" rel="noreferrer">Pokaż trasę <ArrowUpRight size={20}/></a></div></section>
      </main>
      <footer><a href="#top" className="footer-logo">KOWAL<span>↗</span></a><span>NAUKA JAZDY · ZAWIERCIE</span><small>Nieoficjalna koncepcja strony · zdjęcia ilustracyjne</small><a href="#top">Do góry ↑</a></footer>
    </>
  );
}
