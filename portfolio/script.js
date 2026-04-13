document.addEventListener("DOMContentLoaded", () => {

// <!-- ═══════════════ ██  JAVASCRIPT ══════════════════ -->
'use strict';

/* ════════════ ① CONFIG — change only this section for your portfolio ═════════════ */

const CONFIG = {
  githubUsername: 'iharshkaran', 
  githubMaxRepos: 6,
  cmsLoader: null,
};

/* ══════════════════════════════════════════════════════
   ② MANUAL PROJECTS ARRAY
      Add / remove objects here. Never touch HTML.
══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1, title: "Fashion Editorial",
    description: "A modern fashion editorial landing page with smooth scroll animations, bold typography, and premium UI design.",
    category: "frontend",
    tech: ["HTML","CSS","JavaScript"],
    link: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/01_fashionEditorial/",
    demoLink: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/01_fashionEditorial/",
    image: "assets/project1.png",
    color: 0xc44b2b, featured: true, source: "manual"
  },

  {
    id: 3, title: "Trendline",
    description: "A clean and modern fashion editorial landing page inspired by luxury brand websites, featuring minimal UI, bold typography, and smooth interactions.",
    category: "Frontend",
    tech: ["HTML","CSS","JavaScript"],
    link: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/02_trendline/", 
    demoLink: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/02_trendline/",
    image: "assets/project2.png",
    color: 0x2b5cc4, featured: false, source: "manual"
  },
  {
    id: 4, title: "Todo List App",
    description: "A simple and elegant todo list application with a clean UI and smooth user experience.",
    category: "frontend",
    tech: ["HTML","CSS","JavaScript"],
    link: "https://iharshkaran.github.io/frontend-mini-projects/02-javascript-projects/01_todo-list/", 
    demoLink: "https://iharshkaran.github.io/frontend-mini-projects/02-javascript-projects/01_todo-list/",
    image: "assets/project4.png",
    color: 0x4b8b3b, featured: false, source: "manual"
  },
  {
    id: 5, title: "Sportify Clone",
    description: "A fully functional Spotify-inspired music player with play/pause controls, playlist UI, and smooth user interactions.",
    category: "frontend",
    tech: ["HTML","CSS","JavaScript"],
    link: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/04_SpotifyClone/", 
    demoLink: "https://iharshkaran.github.io/frontend-mini-projects/01-ui-projects/04_SpotifyClone/",
    image: "assets/project3.png",
    color: 0x7c3bc4, featured: true, source: "manual"
  },
  {
    id: 6, title: "ShopFlux Commerce",
    description: "Headless e-commerce: custom checkout, inventory management, discount engine, Stripe integration.",
    category: "fullstack",
    tech: ["Next.js","Stripe","Prisma","PostgreSQL","Cloudflare"],
    link: "https://github.com/", demoLink: "https://github.com/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    color: 0xc48b2b, featured: false, source: "manual"
  },
  /* ── AI / ML ── */
  {
    id: 7, title: "DocuMind AI",
    description: "RAG-powered document intelligence — upload PDFs, ask questions, get cited answers with source highlighting.",
    category: "ai",
    tech: ["Python","LangChain","OpenAI","Pinecone","FastAPI","React"],
    link: "https://github.com/", demoLink: "https://github.com/",
    color: 0x2bc4a8, featured: true, source: "manual"
  },
  {
    id: 8, title: "CodeReview Bot",
    description: "GitHub Action that reviews PRs with GPT-4, flags security issues, suggests refactors, enforces conventions.",
    category: "ai",
    tech: ["Python","OpenAI","GitHub Actions","AST","YAML"],
    link: "https://github.com/", demoLink: null,
    color: 0xc44b8b, featured: false, source: "manual"
  },
  /* ── OTHERS ── */
  {
    id: 9, title: "Shader Playground",
    description: "Interactive GLSL shader editor with live preview, preset library, and export to video for creative coders.",
    category: "others",
    tech: ["WebGL","GLSL","JavaScript","Monaco Editor"],
    link: "https://github.com/", demoLink: "https://github.com/",
    color: 0xd4a843, featured: false, source: "manual"
  },
  {
    id: 10, title: "CLI Toolkit Pro",
    description: "Batteries-included CLI scaffolder generating opinionated starters for 12 frameworks with git, lint, and CI.",
    category: "others",
    tech: ["Node.js","Commander.js","Inquirer","Handlebars","npm"],
    link: "https://github.com/", demoLink: null,
    color: 0x8a8a7a, featured: false, source: "manual"
  }
];

/* ══════════════════════════════════════════════════════
   ③ CATEGORIES
══════════════════════════════════════════════════════ */
const CATEGORIES = [
  { key: "all",       label: "All"        },
  { key: "frontend",  label: "Frontend"   },
  { key: "backend",   label: "Backend"    },
  { key: "fullstack", label: "Full Stack" },
  { key: "ai",        label: "AI / ML"   },
  { key: "others",    label: "Others"     },
  { key: "github",    label: "GitHub ★"  }   /* auto-populated from API */
];

const MARQUEE_ITEMS = [
  "Three.js","GSAP","WebGL","TypeScript","Next.js","Python",
  "LangChain","Node.js","React","Docker","PostgreSQL","AI Tools",
  "Shader Art","Open Source","Full Stack","Freelance Available"
];

/* Runtime state */
let allProjects    = [...PROJECTS];  /* grows when GitHub repos are fetched */
let activeFilter   = 'all';
let searchQuery    = '';
let currentView    = 'grid';         /* 'grid' | 'list' */
let githubLoaded   = false;

/* ══════════════════════════════════════════════════════════════════
   DARK / LIGHT THEME TOGGLE  ✦ Feature 1
══════════════════════════════════════════════════════════════════ */
(function initTheme() {
  /* Restore saved preference */
  const saved = localStorage.getItem('nexus-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';

    /* Use View Transitions if available for a silky theme switch */
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('nexus-theme', next);
      });
    } else {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexus-theme', next);
    }
  });
})();


/* ══════════════════════════════════════════════════════════════════
   GITHUB API INTEGRATION  ✦ Feature 2
══════════════════════════════════════════════════════════════════ */

/* Map GitHub language → portfolio category */
function ghLangToCategory(lang) {
  const map = {
    JavaScript:'frontend', TypeScript:'frontend', CSS:'frontend', HTML:'frontend',
    Python:'ai', Jupyter:'ai', 'Jupyter Notebook':'ai',
    Go:'backend', Rust:'backend', Java:'backend', 'C++':'backend', C:'backend',
    Ruby:'backend', PHP:'backend', Swift:'backend', Kotlin:'backend',
  };
  return map[lang] || 'others';
}

/* Map GitHub repo → our project shape */
function ghRepoToProject(repo, idx) {
  return {
    id:          `gh-${repo.id}`,
    title:       repo.name.replace(/[-_]/g,' ').toUpperCase(),
    description: repo.description || 'A GitHub repository.',
    category:    ghLangToCategory(repo.language),
    tech:        [repo.language, 'GitHub', repo.topics?.[0]].filter(Boolean),
    link:        repo.html_url,
    demoLink:    repo.homepage || null,
    color:       [0xc44b2b,0xd4a843,0x2bc4a8,0x7c3bc4,0x2b5cc4,0x4b8b3b][idx % 6],
    featured:    false,
    source:      'github',
    stars:       repo.stargazers_count,
    forks:       repo.forks_count,
    lang:        repo.language,
    updatedAt:   new Date(repo.updated_at).toLocaleDateString('en-GB',{month:'short',year:'numeric'})
  };
}

/* Update nav GitHub status pill */
function setGhStatus(state) {
  const dot = document.getElementById('ghDot');
  const txt = document.getElementById('ghStatusTxt');
  if (state === 'live') {
    dot.classList.add('live');
    txt.textContent = 'GitHub ●';
  } else if (state === 'error') {
    dot.style.background = 'var(--rust)';
    txt.textContent = 'GitHub ✕';
  } else {
    dot.classList.remove('live');
    txt.textContent = 'GitHub';
  }
}

async function fetchGitHubRepos() {
  if (githubLoaded) { showToast('GitHub repos already loaded', 'success'); return; }

  const btn = document.getElementById('ghFetchBtn');
  btn.classList.add('loading');
  btn.innerHTML = `<svg class="spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg> Fetching…`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=${CONFIG.githubMaxRepos}&type=public`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();
    const ghProjects = repos
      .filter(r => !r.fork && r.description)   /* skip forks + repos without descriptions */
      .slice(0, CONFIG.githubMaxRepos)
      .map(ghRepoToProject);

    /* Merge: avoid duplicates by title */
    const existingTitles = new Set(allProjects.map(p => p.title));
    const fresh = ghProjects.filter(p => !existingTitles.has(p.title));
    allProjects = [...allProjects, ...fresh];

    githubLoaded = true;
    setGhStatus('live');
    showToast(`${fresh.length} GitHub repos loaded ✓`, 'success');

    /* Re-render with transitions */
    transitionRender();

  } catch (err) {
    console.warn('GitHub fetch failed:', err);
    setGhStatus('error');
    showToast('Could not fetch GitHub repos', 'error');
  } finally {
    btn.classList.remove('loading');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg> ${githubLoaded ? 'Reload GitHub' : 'Load GitHub Repos'}`;
  }
}

document.getElementById('ghFetchBtn').addEventListener('click', fetchGitHubRepos);

/* Spinner keyframe */
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin .8s linear infinite}`;
document.head.appendChild(spinStyle);


/* ══════════════════════════════════════════════════════════════════
   CMS ASYNC LOADER  ✦ Feature 3
   Drop a real async function in CONFIG.cmsLoader to override PROJECTS
══════════════════════════════════════════════════════════════════ */
async function loadProjects() {
  if (CONFIG.cmsLoader) {
    try {
      showSkeletons(6);
      const cmsProjects = await CONFIG.cmsLoader();
      allProjects = cmsProjects;
    } catch (e) {
      console.warn('CMS load failed, falling back to local data:', e);
    }
  }
  renderProjects();
}


/* ══════════════════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════════════════ */
(function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  const html  = MARQUEE_ITEMS.map(t =>
    `<span class="marquee-item">${t}</span><span class="marquee-item marquee-sep">✦</span>`
  ).join('');
  track.innerHTML = html + html;
})();


/* ══════════════════════════════════════════════════════════════════
   FILTER BAR
══════════════════════════════════════════════════════════════════ */
(function buildFilters() {
  const bar = document.getElementById('filterBar');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat.key === 'all' ? ' active' : '');
    btn.textContent = cat.label;
    btn.dataset.key = cat.key;
    btn.addEventListener('click', () => {
      activeFilter = cat.key;
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      transitionRender();
    });
    bar.appendChild(btn);
  });
})();


/* ══════════════════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════════════════ */
document.getElementById('project-search').addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase().trim();
  transitionRender();
});


/* ══════════════════════════════════════════════════════════════════
   VIEW TOGGLE (grid / list)
══════════════════════════════════════════════════════════════════ */
document.getElementById('viewGrid').addEventListener('click', () => switchView('grid'));
document.getElementById('viewList').addEventListener('click', () => switchView('list'));

function switchView(v) {
  currentView = v;
  const grid = document.getElementById('projectsGrid');
  grid.classList.toggle('list-view', v === 'list');
  document.getElementById('viewGrid').classList.toggle('active', v === 'grid');
  document.getElementById('viewList').classList.toggle('active', v === 'list');
}


/* ══════════════════════════════════════════════════════════════════
   VIEW TRANSITIONS WRAPPER  ✦ Feature 4
══════════════════════════════════════════════════════════════════ */
function transitionRender() {
  if (document.startViewTransition) {
    document.startViewTransition(() => renderProjects());
  } else {
    renderProjects();
  }
}


/* ══════════════════════════════════════════════════════════════════
   THREE.JS MINI SCENE FACTORY
══════════════════════════════════════════════════════════════════ */
function createCardScene(canvas, colorHex, index) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setClearColor(0x0d0d0d);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 300);
  camera.position.z = 18;

  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  });
  ro.observe(canvas);

  const type = index % 5;
  let mesh, particles;

  if (type === 0) {
    const N = 2800, p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      p[i*3]=(Math.random()-.5)*18; p[i*3+1]=(Math.random()-.5)*18; p[i*3+2]=(Math.random()-.5)*18;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p,3));
    particles = new THREE.Points(g, new THREE.PointsMaterial({ color:colorHex, size:.11, transparent:true, opacity:.85 }));
    scene.add(particles);
  } else if (type === 1) {
    mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(18,18,36,36),
      new THREE.MeshBasicMaterial({ color:colorHex, wireframe:true })
    );
    mesh.rotation.x = -.6; camera.position.z = 14;
    scene.add(mesh);
  } else if (type === 2) {
    mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(5,1), new THREE.MeshBasicMaterial({ color:colorHex, wireframe:true }));
    scene.add(mesh);
  } else if (type === 3) {
    mesh = new THREE.Mesh(new THREE.OctahedronGeometry(5,2), new THREE.MeshBasicMaterial({ color:colorHex, wireframe:true }));
    scene.add(mesh);
  } else {
    mesh = new THREE.Mesh(new THREE.TorusGeometry(4,1.8,12,60), new THREE.MeshBasicMaterial({ color:colorHex, wireframe:true }));
    scene.add(mesh);
  }

  let t = 0, rafId = null;
  function tick() {
    rafId = requestAnimationFrame(tick);
    t += .012;
    if (type===0 && particles) { particles.rotation.y=t*.18; particles.rotation.x=t*.09; }
    else if (type===1 && mesh) {
      const attr = mesh.geometry.attributes.position;
      for(let i=0;i<attr.count;i++){
        const x=attr.getX(i),y=attr.getY(i);
        attr.setZ(i, Math.sin(x*.35+t)*1.1+Math.cos(y*.35+t)*1.1);
      }
      attr.needsUpdate=true; mesh.rotation.z=t*.04;
    } else if (mesh) { mesh.rotation.x=t*.28; mesh.rotation.y=t*.35; }
    renderer.render(scene, camera);
  }

  return {
    start() { if (!rafId) tick(); },
    stop()  { cancelAnimationFrame(rafId); rafId=null; },
    dispose(){ this.stop(); ro.disconnect(); renderer.dispose(); }
  };
}


/* ══════════════════════════════════════════════════════════════════
   HERO THREE.JS SCENE
══════════════════════════════════════════════════════════════════ */
(function initHeroScene() {
  const canvas   = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
  camera.position.z = 25;

  const N=3500, pos=new Float32Array(N*3), col=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const r=18+Math.random()*32,t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);
    pos[i*3]=r*Math.sin(p)*Math.cos(t); pos[i*3+1]=r*Math.sin(p)*Math.sin(t); pos[i*3+2]=r*Math.cos(p);
    const hot=Math.random()>.75;
    col[i*3]=hot?.77:.06; col[i*3+1]=hot?.29:.06; col[i*3+2]=hot?.17:.06;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.28,vertexColors:true,transparent:true,opacity:.7}));
  scene.add(pts);

  const knot=new THREE.Mesh(
    new THREE.TorusKnotGeometry(6,1.4,140,16,2,3),
    new THREE.MeshBasicMaterial({color:0x181818,wireframe:true})
  );
  scene.add(knot);

  const rings=[];
  for(let i=0;i<5;i++){
    const rm=new THREE.Mesh(
      new THREE.TorusGeometry(9+i*3,.025,6,80),
      new THREE.MeshBasicMaterial({color:i===0?0xc44b2b:0x1e1e1e,transparent:true,opacity:.35-i*.05})
    );
    rm.rotation.x=Math.random()*Math.PI; rm.rotation.y=Math.random()*Math.PI;
    rings.push(rm); scene.add(rm);
  }

  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{ mx=(e.clientX/innerWidth-.5)*2; my=-(e.clientY/innerHeight-.5)*2; });
  window.addEventListener('resize',()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
  scene.position.x = 8;

  let t=0;
  (function tick(){
    requestAnimationFrame(tick); t+=.004;
    knot.rotation.x=t*.5+my*.3; knot.rotation.y=t*.3+mx*.3;
    pts.rotation.y=t*.04+mx*.08; pts.rotation.x=my*.06;
    rings.forEach((r,i)=>{ r.rotation.x+=.003*(i%2?1:-1); r.rotation.z+=.002*(i%3?1:-.5); });
    renderer.render(scene,camera);
  })();
})();


/* ══════════════════════════════════════════════════════════════════
   SKELETON LOADERS
══════════════════════════════════════════════════════════════════ */
function showSkeletons(n) {
  const grid  = document.getElementById('projectsGrid');
  const noRes = document.getElementById('noResults');
  grid.querySelectorAll('.project-card,.skeleton-card').forEach(el=>el.remove());
  for (let i=0;i<n;i++){
    const sk=document.createElement('div'); sk.className='skeleton-card';
    grid.insertBefore(sk, noRes);
  }
}


/* ══════════════════════════════════════════════════════════════════
   RENDER PROJECTS  ✦ Core renderer
══════════════════════════════════════════════════════════════════ */
const sceneRegistry = {};

function categoryLabel(key) {
  return CATEGORIES.find(c=>c.key===key)?.label || key;
}

function renderProjects() {
  const grid  = document.getElementById('projectsGrid');
  const noRes = document.getElementById('noResults');

  /* Filter */
  const filtered = allProjects.filter(p => {
    const matchCat = activeFilter==='all'
      || (activeFilter==='github' && p.source==='github')
      || p.category===activeFilter;
    const matchSrch = !searchQuery
      || p.title.toLowerCase().includes(searchQuery)
      || p.description.toLowerCase().includes(searchQuery)
      || (p.tech||[]).some(t=>t.toLowerCase().includes(searchQuery));
    return matchCat && matchSrch;
  });

  /* Dispose old scenes */
  Object.values(sceneRegistry).forEach(s=>s.dispose&&s.dispose());
  Object.keys(sceneRegistry).forEach(k=>delete sceneRegistry[k]);
  grid.querySelectorAll('.project-card,.skeleton-card').forEach(el=>el.remove());

  if (!filtered.length) { noRes.classList.add('visible'); return; }
  noRes.classList.remove('visible');

  /* Apply list/grid class */
  grid.classList.toggle('list-view', currentView==='list');

  filtered.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    /* Give each card a unique view-transition-name so the browser
       can animate individual cards between filter states */
    card.style.viewTransitionName = `card-${project.id}`;

    const tagsHTML = (project.tech||[])
      .map((t,i)=>`<span class="card-tag${i===0?' card-tag--highlight':''}">${t}</span>`)
      .join('');

    const starsHTML = project.stars != null
      ? `<span class="card-stars">★ ${project.stars}</span>`
      : '';

    /* ── IMAGE PREVIEW (Feature 5) ──
       If project.image is set: use CSS background + overlay.
       Otherwise fall back to Three.js canvas.                */
    let previewHTML;
    if (project.image) {
      previewHTML = `<div class="card-image-bg" style="background-image:url('${project.image}')"></div>`;
    } else {
      previewHTML = `<div class="card-canvas-wrap"><canvas id="cardCanvas${project.id}"></canvas></div>`;
    }

    card.innerHTML = `
      ${previewHTML}
      <span class="card-source${project.source==='github'?' gh':''}">${project.source==='github'?'GitHub':'Manual'}</span>
      <div class="card-overlay"></div>
      <div class="card-content">
        <div class="card-top">
          <span class="card-num">${String(idx+1).padStart(2,'0')}</span>
          <span class="card-category-badge">${categoryLabel(project.category)}</span>
        </div>
        <h3 class="card-title">${project.title}</h3>
        <p  class="card-desc">${project.description}</p>
        <div class="card-tags">${tagsHTML}${starsHTML}</div>
        <a class="card-link" href="${project.link}" target="_blank" rel="noopener">
          ${project.source==='github'?'View on GitHub':'View Project'}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
      </div>`;

    /* Click → modal */
    card.addEventListener('click', e => {
      if (e.target.closest('.card-link')) return;
      openModal(project);
    });

    grid.insertBefore(card, noRes);

    /* Boot Three.js only if no image */
    if (!project.image) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const canvasEl = document.getElementById(`cardCanvas${project.id}`);
          if (!canvasEl) return;
          if (entry.isIntersecting) {
            if (!sceneRegistry[project.id]) {
              const s = createCardScene(canvasEl, project.color, idx);
              s.start(); sceneRegistry[project.id] = s;
            } else { sceneRegistry[project.id].start(); }
          } else { sceneRegistry[project.id]?.stop(); }
        });
      }, { threshold:.1 });
      observer.observe(card);
    }

    /* Re-bind hover cursor */
    card.addEventListener('mouseenter', ()=>{ cursorDot.classList.add('hover'); cursorRing.classList.add('hover'); });
    card.addEventListener('mouseleave', ()=>{ cursorDot.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });

  /* GSAP stagger */
  gsap.from('.project-card', {
    opacity:0, y:36, stagger:.07, duration:.55, ease:'power3.out', clearProps:'all'
  });
}


/* ══════════════════════════════════════════════════════════════════
   MODAL  ✦ With image preview, GitHub stats, View Transitions
══════════════════════════════════════════════════════════════════ */
let modalScene = null;

function openModal(project) {
  const modal = document.getElementById('modal');

  /* Preview: image or Three.js canvas */
  const preview = document.getElementById('modalPreview');
  if (project.image) {
    preview.innerHTML = `<div class="modal-img-preview" style="background-image:url('${project.image}')"></div>`;
  } else {
    preview.innerHTML = `<div class="modal-canvas-wrap"><canvas id="modalCanvas"></canvas></div>`;
    /* Defer canvas boot after DOM insertion */
    requestAnimationFrame(() => {
      if (modalScene) { modalScene.dispose(); modalScene=null; }
      const mc = document.getElementById('modalCanvas');
      if (mc) { modalScene = createCardScene(mc, project.color, Number(String(project.id).replace('gh-',''))%5); modalScene.start(); }
    });
  }

  document.getElementById('mCategory').textContent = categoryLabel(project.category);
  document.getElementById('mNum').textContent      = project.source==='github' ? `GitHub Repo` : `Project #${project.id}`;
  document.getElementById('mTitle').textContent    = project.title;
  document.getElementById('mDesc').textContent     = project.description;

  /* GitHub stats row */
  const statsEl = document.getElementById('mStats');
  if (project.source==='github' && (project.stars!=null||project.forks!=null)) {
    statsEl.style.display = 'flex';
    statsEl.innerHTML = `
      ${project.stars!=null?`<div class="modal-stat-item"><strong>★ ${project.stars}</strong>Stars</div>`:''}
      ${project.forks!=null?`<div class="modal-stat-item"><strong>⑂ ${project.forks}</strong>Forks</div>`:''}
      ${project.lang?`<div class="modal-stat-item"><strong>${project.lang}</strong>Language</div>`:''}
      ${project.updatedAt?`<div class="modal-stat-item"><strong>${project.updatedAt}</strong>Updated</div>`:''}
    `;
  } else { statsEl.style.display='none'; }

  document.getElementById('mTags').innerHTML = (project.tech||[])
    .map(t=>`<span class="card-tag">${t}</span>`).join('');

  let actHTML = `<a href="${project.link}" target="_blank" rel="noopener" class="btn btn-primary" style="opacity:1">
    ${project.source==='github'?'View on GitHub':'View Project'} <span class="arrow">→</span></a>`;
  if (project.demoLink) {
    actHTML += `<a href="${project.demoLink}" target="_blank" rel="noopener" class="btn btn-outline" style="opacity:1">Live Demo</a>`;
  }
  document.getElementById('mActions').innerHTML = actHTML;

  /* Open with View Transitions if available */
  const doOpen = () => { modal.classList.add('open'); document.body.style.overflow='hidden'; };
  if (document.startViewTransition) { document.startViewTransition(doOpen); }
  else { doOpen(); }
}

function closeModal() {
  const doClose = () => {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow='';
    if (modalScene) { modalScene.dispose(); modalScene=null; }
  };
  if (document.startViewTransition) { document.startViewTransition(doClose); }
  else { doClose(); }
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', e=>{
  if (e.target===document.getElementById('modal')) closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });


/* ══════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 3200);
}


/* ══════════════════════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let cx=0,cy=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{ cx=e.clientX; cy=e.clientY; cursorDot.style.left=cx+'px'; cursorDot.style.top=cy+'px'; });
(function ringFollow(){ rx+=(cx-rx)*.12; ry+=(cy-ry)*.12; cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px'; requestAnimationFrame(ringFollow); })();

function bindCursorHover(selector) {
  document.querySelectorAll(selector).forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursorDot.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave',()=>{ cursorDot.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
}
bindCursorHover('a,button,.filter-btn,.theme-toggle,.domain-pill');


/* ══════════════════════════════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click',()=>{ const o=mobileNav.classList.toggle('open'); hamburger.classList.toggle('open',o); document.body.style.overflow=o?'hidden':''; });
function closeMobileNav(){ mobileNav.classList.remove('open'); hamburger.classList.remove('open'); document.body.style.overflow=''; }


/* ══════════════════════════════════════════════════════════════════
   NAV SCROLL + BACK-TO-TOP
══════════════════════════════════════════════════════════════════ */
const mainNav = document.getElementById('main-nav');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll',()=>{
  mainNav.classList.toggle('scrolled', scrollY>20);
  backTop.classList.toggle('visible', scrollY>600);
});


/* ══════════════════════════════════════════════════════════════════
   GSAP — ENTRANCE + SCROLL ANIMATIONS
══════════════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

/* Hero entrance */
gsap.timeline({ delay:.2 })
  .to('.hero-title .line span', { y:0, duration:1.1, stagger:.15, ease:'power4.out' })
  .to('.hero-eyebrow', { opacity:1, duration:.7 }, '-=.6')
  .to('.hero-sub',     { opacity:1, duration:.7 }, '-=.5')
  .to('.btn',          { opacity:1, stagger:.1, duration:.6 }, '-=.4')
  .to('.hero-stats',   { opacity:1, duration:.8 }, '-=.5');

/* Scroll reveals */
gsap.utils.toArray('.reveal').forEach(el=>{
  gsap.to(el,{ opacity:1,y:0,duration:.9,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'}
  });
});

/* Section labels */
gsap.utils.toArray('.section-label').forEach(el=>{
  gsap.from(el,{ opacity:0,x:-28,duration:.8,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 88%'}
  });
});

/* Hero parallax */
gsap.to('.hero-content',{ yPercent:-18,ease:'none',
  scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}
});

/* About stat counters */
gsap.utils.toArray('.stat-num').forEach(el=>{
  const raw = el.textContent;
  const num = parseInt(raw);
  if(isNaN(num)) return;
  const hasPl = raw.includes('+');
  gsap.from({val:0},{
    val:num, duration:1.8, ease:'power2.out',
    scrollTrigger:{trigger:el,start:'top 88%'},
    onUpdate(){ el.textContent = Math.round(this.targets()[0].val)+(hasPl?'+':''); }
  });
});


/* ══════════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════════ */
loadProjects();  /* handles CMS async or falls back to PROJECTS array */

});
