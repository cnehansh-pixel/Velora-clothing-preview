import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  {
    id: 'p1', slug: 'oversized-black-t-shirt', name: 'Oversized Black T-Shirt', price: 799, category: 'T-Shirts', image: '/images/black-tee.jpg', tag: 'New in', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Jet black',
    description: 'A considered everyday layer with a boxy silhouette and a soft, structured hand feel.', details: ['240 GSM compact cotton', 'Dropped shoulder construction', 'Relaxed oversized fit'], material: '100% cotton'
  },
  {
    id: 'p2', slug: 'premium-white-oxford-shirt', name: 'Premium White Oxford Shirt', price: 1499, category: 'Shirts', image: '/images/white-oxford.jpg', tag: 'Essential', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Optic white',
    description: 'The clean-lined Oxford, cut with enough ease for a modern wardrobe and finished for everyday polish.', details: ['Textured Oxford weave', 'Button-down collar', 'Regular fit'], material: '100% cotton'
  },
  {
    id: 'p3', slug: 'beige-relaxed-fit-trousers', name: 'Beige Relaxed-Fit Trousers', price: 1299, category: 'Trousers', image: '/images/beige-trousers.jpg', tag: 'New in', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Sandstone',
    description: 'A quiet trouser with a relaxed leg, considered drape, and an easy neutral tone.', details: ['Relaxed straight leg', 'Mid-rise waist', 'Two side pockets'], material: 'Cotton twill blend'
  },
  {
    id: 'p4', slug: 'classic-blue-denim-jeans', name: 'Classic Blue Denim Jeans', price: 1599, category: 'Jeans', image: '/images/blue-denim.jpg', tag: 'Best seller', sizes: ['28', '30', '32', '34', '36'], tone: 'Washed indigo',
    description: 'A dependable five-pocket jean with a straight leg and a lived-in wash that improves with wear.', details: ['12 oz denim', 'Classic straight fit', 'Brushed metal hardware'], material: '99% cotton, 1% elastane'
  },
  {
    id: 'p5', slug: 'olive-casual-shirt', name: 'Olive Casual Shirt', price: 1199, category: 'Shirts', image: '/images/olive-shirt.jpg', tag: 'New in', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Field olive',
    description: 'A soft utility-inspired shirt for off-duty days, shaped with an effortless ease through the body.', details: ['Soft brushed cotton', 'Twin chest pockets', 'Relaxed fit'], material: '100% cotton'
  },
  {
    id: 'p6', slug: 'black-polo-t-shirt', name: 'Black Polo T-Shirt', price: 999, category: 'Polos', image: '/images/black-polo.jpg', tag: 'Best seller', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Ink black',
    description: 'A refined polo with a clean placket and a smooth pique texture that moves from desk to dinner.', details: ['Premium pique knit', 'Two-button placket', 'Regular fit'], material: 'Cotton pique'
  },
  {
    id: 'p7', slug: 'beige-co-ord-set', name: 'Beige Co-ord Set', price: 2499, category: 'Co-ord Sets', image: '/images/beige-coord.jpg', tag: 'Limited', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Warm oat',
    description: 'A complete tonal set with a relaxed shirt and trouser pairing made for considered ease.', details: ['Two-piece set', 'Relaxed shirt and trouser', 'Elasticated trouser waist'], material: 'Linen-cotton blend'
  },
  {
    id: 'p8', slug: 'charcoal-formal-shirt', name: 'Charcoal Formal Shirt', price: 1399, category: 'Shirts', image: '/images/charcoal-formal.jpg', tag: 'Essential', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tone: 'Graphite',
    description: 'A sharper everyday shirt in a deep charcoal tone, made to hold its line from morning onward.', details: ['Easy-care finish', 'Spread collar', 'Slim-straight fit'], material: 'Cotton-poly blend'
  }
];

const categories = ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Polos', 'Co-ord Sets'];
const categoryMeta = {
  Shirts: { image: '/images/white-oxford.jpg', eyebrow: 'The edit', label: 'Shirts' },
  'T-Shirts': { image: '/images/black-tee.jpg', eyebrow: 'Off-duty', label: 'T-Shirts' },
  Jeans: { image: '/images/blue-denim.jpg', eyebrow: 'Everyday', label: 'Jeans' },
  Trousers: { image: '/images/beige-trousers.jpg', eyebrow: 'The foundation', label: 'Trousers' },
  Polos: { image: '/images/black-polo.jpg', eyebrow: 'Modern classic', label: 'Polos' },
  'Co-ord Sets': { image: '/images/beige-coord.jpg', eyebrow: 'Full look', label: 'Co-ord Sets' }
};

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const getProduct = (ref) => products.find((product) => product.slug === ref || product.id === ref);
const readCart = () => {
  try { return JSON.parse(localStorage.getItem('velora-cart') || '[]'); } catch { return []; }
};

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  const paths = {
    search: <><circle cx="11" cy="11" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
    bag: <><path d="M5.5 8.5h13l1 11h-15l1-11Z" /><path d="M9 9V6.7a3 3 0 0 1 6 0V9" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    trash: <><path d="M5 7h14" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="m9 7 .6-2h4.8l.6 2" /><path d="M7 7l.7 13h8.6L17 7" /></>,
    chevron: <path d="m7 9 5 5 5-5" />,
    check: <path d="m5 12 4 4L19 6" />,
    back: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
    pin: <><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    mail: <><rect x="3.5" y="5" width="17" height="14" rx="1" /><path d="m4 6 8 6 8-6" /></>,
    phone: <path d="M6.7 3.5 9 3l1.4 4-2 1.3a13 13 0 0 0 7.3 7.3l1.3-2 4 1.4-.5 2.3c-.3 1.5-1.7 2.4-3.1 2C10.6 17.8 6.2 13.4 4.7 7.6c-.4-1.5.5-2.8 2-3.1Z" />
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function BrandMark({ compact = false }) {
  return <img className={compact ? 'brand-logo compact' : 'brand-logo'} src="/images/velora-logo.png" alt="VELORA" />;
}

function Header({ cartCount, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const go = (path) => { setMobileOpen(false); setSearchOpen(false); onNavigate(path); };
  const submitSearch = (event) => { event.preventDefault(); go(`/shop?search=${encodeURIComponent(query.trim())}`); };
  return <>
    <div className="announcement"><span>Complimentary shipping on orders over ₹1,999</span><span className="announcement-right">Demo storefront · No real orders processed</span></div>
    <header className="site-header">
      <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}><Icon name={mobileOpen ? 'close' : 'menu'} /></button>
      <button className="wordmark" onClick={() => go('/')} aria-label="VELORA CLOTHING home"><BrandMark /><span>VELORA<br /><i>CLOTHING</i></span></button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <button onClick={() => go('/')}>Home</button><button onClick={() => go('/shop')}>Shop</button><button onClick={() => go('/new-arrivals')}>New Arrivals</button><button onClick={() => go('/collections')}>Collections</button>
      </nav>
      <div className="header-actions">
        <button className="icon-button search-trigger" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Icon name="search" /></button>
        <button className="cart-button" onClick={() => go('/cart')} aria-label={`Cart, ${cartCount} items`}><Icon name="bag" /><span className="cart-label">Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
      </div>
    </header>
    {searchOpen && <div className="search-panel"><form onSubmit={submitSearch}><Icon name="search" size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" /><button type="button" onClick={() => setSearchOpen(false)}><Icon name="close" size={18} /></button></form></div>}
    {mobileOpen && <div className="mobile-nav"><button onClick={() => go('/')}>Home <Icon name="arrow" size={16} /></button><button onClick={() => go('/shop')}>Shop <Icon name="arrow" size={16} /></button><button onClick={() => go('/new-arrivals')}>New Arrivals <Icon name="arrow" size={16} /></button><button onClick={() => go('/collections')}>Collections <Icon name="arrow" size={16} /></button><button onClick={() => go('/cart')}>Cart <span>{cartCount} items</span></button></div>}
  </>;
}

function Button({ children, onClick, variant = 'dark', className = '', type = 'button' }) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>{children}<Icon name="arrow" size={16} /></button>;
}

function ProductCard({ product, onNavigate, onAdd }) {
  return <article className="product-card">
    <button className="product-image-button" onClick={() => onNavigate(`/product/${product.slug}`)} aria-label={`View ${product.name}`}>
      <div className="product-image-wrap"><img src={product.image} alt={product.name} /><span className="product-tag">{product.tag}</span><span className="quick-add">View piece <Icon name="arrow" size={15} /></span></div>
    </button>
    <div className="product-card-info"><div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div><strong>{money(product.price)}</strong></div>
    <button className="text-add" onClick={() => onAdd(product)}>Add to bag <Icon name="plus" size={15} /></button>
  </article>;
}

function ProductRow({ title, eyebrow, items, onNavigate, onAdd, action }) {
  return <section className="section product-section"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && <button className="section-link" onClick={action}>View all <Icon name="arrow" size={15} /></button>}</div><div className="product-grid product-grid-four">{items.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAdd={onAdd} />)}</div></section>;
}

function CategoryStrip({ onNavigate }) {
  return <section className="section category-section"><div className="section-heading"><div><p className="eyebrow">Shop by edit</p><h2>Built for the everyday.</h2></div><p className="heading-note">Six considered categories, one easy point of view.</p></div><div className="category-grid">{categories.map((category) => { const meta = categoryMeta[category]; return <button className="category-card" key={category} onClick={() => onNavigate(`/shop?category=${encodeURIComponent(category)}`)}><img src={meta.image} alt="" /><span className="category-overlay"><small>{meta.eyebrow}</small><strong>{meta.label}</strong><Icon name="arrow" size={16} /></span></button>; })}</div></section>;
}

function Home({ onNavigate, onAdd }) {
  return <>
    <main>
      <section className="hero-section"><div className="hero-copy"><p className="eyebrow light">The new everyday</p><h1>Not every hero<br /><em>wears capes.</em></h1><p className="hero-description"><strong>Some wear VELORA.</strong> Modern menswear with a quieter confidence. Designed in India, made for wherever you are going next.</p><div className="hero-actions"><Button variant="light" onClick={() => onNavigate('/shop')}>Shop collection</Button><button className="underlined-link" onClick={() => onNavigate('/new-arrivals')}>Explore new arrivals <Icon name="arrow" size={15} /></button></div><div className="hero-index"><span>01</span><div className="index-line"><b /></div><span>03</span></div></div><div className="hero-image"><img src="/images/hero.jpg" alt="Model in a considered black jacket" /><span className="hero-caption">Velora / Chapter 01<br /><small>Objects for the modern wardrobe</small></span></div></section>
      <div className="service-bar"><span>01 / Thoughtful materials</span><span>02 / Designed in India</span><span>03 / Made for movement</span><span>04 / Easy returns</span></div>
      <ProductRow title="New arrivals" eyebrow="Just landed" items={products.filter((p) => p.tag === 'New in')} onNavigate={onNavigate} onAdd={onAdd} action={() => onNavigate('/new-arrivals')} />
      <CategoryStrip onNavigate={onNavigate} />
      <ProductRow title="Best sellers" eyebrow="The most wanted" items={products.filter((p) => p.tag === 'Best seller').concat(products.filter((p) => p.tag === 'Essential')).slice(0, 4)} onNavigate={onNavigate} onAdd={onAdd} action={() => onNavigate('/shop')} />
      <section className="story-section"><div className="story-image"><img src="/images/olive-shirt.jpg" alt="Menswear details in a field olive tone" /><span>VELORA / 2026</span></div><div className="story-copy"><p className="eyebrow">The Velora point of view</p><h2>Good clothes<br /><em>hold their ground.</em></h2><p>We make modern essentials with the kind of restraint that lets the person wearing them take the lead. Clear silhouettes. Honest materials. An instinct for the details that stay with you.</p><button className="section-link" onClick={() => onNavigate('/collections')}>Read our story <Icon name="arrow" size={15} /></button><div className="story-signature">V<span>.</span></div></div></section>
      <section className="quote-section"><p>“The best wardrobe is the one that lets you move through the day without thinking twice.”</p><span>— Velora studio notes, 01</span></section>
    </main><Footer onNavigate={onNavigate} />
  </>;
}

function ShopPage({ mode = 'shop', onNavigate, onAdd }) {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('search') || '');
  const [category, setCategory] = useState(params.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const title = mode === 'new' ? 'New arrivals' : mode === 'collections' ? 'Collections' : 'The collection';
  const eyebrow = mode === 'new' ? 'Just landed' : mode === 'collections' ? 'Explore the edits' : 'Shop Velora';
  const visible = useMemo(() => {
    let list = [...products];
    if (mode === 'new') list = list.filter((product) => product.tag === 'New in' || product.tag === 'Limited');
    if (category !== 'All') list = list.filter((product) => product.category === category);
    if (query.trim()) list = list.filter((product) => `${product.name} ${product.category} ${product.tone}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, mode, query, sort]);
  const reset = () => { setQuery(''); setCategory('All'); setSort('featured'); onNavigate(mode === 'new' ? '/new-arrivals' : mode === 'collections' ? '/collections' : '/shop'); };
  return <><main className="catalog-page"><div className="catalog-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}<span className="catalog-count">{String(visible.length).padStart(2, '0')}</span></h1></div><p className="catalog-intro">A measured wardrobe of pieces that bring clarity to the everyday. Designed to be worn together, often.</p></div><div className="catalog-toolbar"><div className="filter-tabs"><button className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}>All</button>{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="catalog-tools"><label className="catalog-search"><Icon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" aria-label="Search pieces" /></label><label className="sort-select"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select><Icon name="chevron" size={15} /></label></div></div>{visible.length ? <div className="product-grid catalog-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAdd={onAdd} />)}</div> : <div className="empty-state"><span>—</span><h2>No pieces found.</h2><p>Try another search or return to the full collection.</p><button className="section-link" onClick={reset}>Reset filters <Icon name="arrow" size={15} /></button></div>}</main><Footer onNavigate={onNavigate} /></>;
}

function ProductPage({ product, onNavigate, onAdd }) {
  const [size, setSize] = useState(product.sizes[1] || product.sizes[0]);
  const [added, setAdded] = useState(false);
  const add = () => { onAdd(product, size); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  return <main className="product-page"><button className="back-link" onClick={() => onNavigate('/shop')}><Icon name="back" size={16} /> Back to collection</button><div className="product-detail"><div className="detail-image"><img src={product.image} alt={product.name} /><span className="detail-image-note">{product.category} / {product.tone}</span></div><div className="detail-copy"><p className="eyebrow">{product.tag} / {product.category}</p><h1>{product.name}</h1><p className="detail-price">{money(product.price)}</p><p className="detail-description">{product.description}</p><div className="detail-rule" /><div className="size-header"><span>Select size</span><button>Size guide</button></div><div className="size-picker">{product.sizes.map((item) => <button key={item} className={size === item ? 'selected' : ''} onClick={() => setSize(item)}>{item}</button>)}</div><button className={`add-button ${added ? 'added' : ''}`} onClick={add}>{added ? <><Icon name="check" size={17} /> Added to bag</> : <>Add to bag <Icon name="arrow" size={17} /></>}</button><p className="demo-note">Demo item · No payment is collected</p><div className="accordions"><details open><summary>Details <Icon name="chevron" size={16} /></summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details><details><summary>Materials & care <Icon name="chevron" size={16} /></summary><p>{product.material}. Wash with similar colours and air dry where possible.</p></details><details><summary>Delivery & returns <Icon name="chevron" size={16} /></summary><p>Complimentary delivery over ₹1,999. Easy returns within 7 days on unworn pieces.</p></details></div></div></div><ProductRow title="You may also like" eyebrow="Continue exploring" items={products.filter((item) => item.id !== product.id).slice(0, 4)} onNavigate={onNavigate} onAdd={onAdd} /></main>;
}

function CartPage({ cart, onNavigate, onUpdate, onRemove }) {
  const lines = cart.map((item) => ({ ...item, product: getProduct(item.productId) })).filter((item) => item.product);
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
  const total = subtotal + shipping;
  return <main className="cart-page"><div className="page-title"><p className="eyebrow">Your selection</p><h1>Shopping bag <span>{String(lines.length).padStart(2, '0')}</span></h1></div>{lines.length ? <div className="cart-layout"><section className="cart-lines"><div className="cart-table-head"><span>Piece</span><span>Quantity</span><span>Total</span></div>{lines.map(({ product, size, quantity }) => <div className="cart-line" key={`${product.id}-${size}`}><button className="cart-line-image" onClick={() => onNavigate(`/product/${product.slug}`)}><img src={product.image} alt={product.name} /></button><div className="cart-line-info"><button onClick={() => onNavigate(`/product/${product.slug}`)}><strong>{product.name}</strong><span>{product.category} · Size {size}</span></button><button className="remove-mobile" onClick={() => onRemove(product.id, size)}>Remove</button></div><div className="quantity-control"><button onClick={() => onUpdate(product.id, size, quantity - 1)} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button><span>{quantity}</span><button onClick={() => onUpdate(product.id, size, quantity + 1)} aria-label="Increase quantity"><Icon name="plus" size={14} /></button></div><strong className="line-total">{money(product.price * quantity)}</strong><button className="remove-desktop" onClick={() => onRemove(product.id, size)} aria-label={`Remove ${product.name}`}><Icon name="trash" size={16} /></button></div>)}<button className="continue-shopping" onClick={() => onNavigate('/shop')}><Icon name="back" size={15} /> Continue shopping</button></section><aside className="summary-card"><p className="eyebrow">Summary</p><h2>Ready when you are.</h2><div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Delivery</span><strong>{shipping === 0 ? 'Complimentary' : money(shipping)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><Button onClick={() => onNavigate('/checkout')}>Proceed to demo checkout</Button><p className="summary-note">This is a front-end demo. No payment or personal details are transmitted.</p></aside></div> : <div className="empty-state cart-empty"><span><Icon name="bag" size={29} /></span><h2>Your bag is quiet.</h2><p>Add a few pieces and they will appear here.</p><Button onClick={() => onNavigate('/shop')}>Explore the collection</Button></div>}</main>;
}

function CheckoutPage({ cart, onNavigate, onClear }) {
  const [payment, setPayment] = useState('cod');
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const lines = cart.map((item) => ({ ...item, product: getProduct(item.productId) })).filter((item) => item.product);
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
  const total = subtotal + shipping;
  const submit = (event) => { event.preventDefault(); setOrderSummary({ total, itemCount: lines.reduce((sum, item) => sum + item.quantity, 0) }); setSubmitted(true); onClear(); };
  if (submitted) return <Confirmation total={orderSummary?.total || 0} itemCount={orderSummary?.itemCount || 0} onNavigate={onNavigate} />;
  if (!lines.length) return <main className="empty-state checkout-empty"><span>—</span><h2>Your bag is empty.</h2><p>Choose a few pieces before heading to checkout.</p><Button onClick={() => onNavigate('/shop')}>Back to shop</Button></main>;
  return <main className="checkout-page"><div className="page-title checkout-title"><p className="eyebrow">Demo checkout</p><h1>Almost yours.</h1><p>Complete the form to see the order confirmation. Nothing is submitted, stored, or charged.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><section className="form-section"><div className="form-section-heading"><span>01</span><div><h2>Contact details</h2><p>We only use these fields to preview the flow.</p></div></div><div className="field-grid"><label>Full name *<input name="name" required placeholder="Your full name" /></label><label>Phone number *<input name="phone" type="tel" required placeholder="10-digit mobile number" pattern="[0-9]{10}" /></label><label className="full-field">Email <span>(optional)</span><input name="email" type="email" placeholder="you@example.com" /></label></div></section><section className="form-section"><div className="form-section-heading"><span>02</span><div><h2>Delivery address</h2><p>Use any sample details you like — they will not be retained.</p></div></div><div className="field-grid"><label className="full-field">Address *<textarea name="address" required placeholder="House number, street, area" rows="3" /></label><label>City *<input name="city" required placeholder="Mumbai" /></label><label>State *<input name="state" required placeholder="Maharashtra" /></label><label>PIN code *<input name="pin" required placeholder="400001" inputMode="numeric" pattern="[0-9]{6}" /></label></div></section><section className="form-section"><div className="form-section-heading"><span>03</span><div><h2>Payment method</h2><p>Demo selection only. No real gateway is connected.</p></div></div><div className="payment-options"><label className={payment === 'cod' ? 'payment-option selected' : 'payment-option'}><input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} /><span><strong>Cash on Delivery</strong><small>Pay when your imaginary order arrives.</small></span><i><Icon name="check" size={15} /></i></label><label className={payment === 'online' ? 'payment-option selected' : 'payment-option'}><input type="radio" name="payment" value="online" checked={payment === 'online'} onChange={() => setPayment('online')} /><span><strong>Online Payment</strong><small>Preview only — no payment will be processed.</small></span><i><Icon name="check" size={15} /></i></label></div></section><label className="demo-consent"><input type="checkbox" required /> <span>I understand this is a demo and no order or personal information will be sent or stored.</span></label><button className="add-button checkout-submit" type="submit">Place demo order <Icon name="arrow" size={17} /></button></form><aside className="checkout-summary"><p className="eyebrow">Your selection</p>{lines.map(({ product, size, quantity }) => <div className="checkout-line" key={`${product.id}-${size}`}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{quantity} × {size}</span></div><b>{money(product.price * quantity)}</b></div>)}<div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Delivery</span><strong>{shipping === 0 ? 'Complimentary' : money(shipping)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div></aside></div></main>;
}

function Confirmation({ total, itemCount, onNavigate }) {
  return <main className="confirmation-page"><div className="confirmation-mark"><Icon name="check" size={32} /></div><p className="eyebrow">Demo order complete</p><h1>That’s a good<br /><em>look.</em></h1><p className="confirmation-copy">Your sample order for {itemCount} {itemCount === 1 ? 'piece' : 'pieces'} is ready in the preview universe. No payment was taken and no personal information was saved.</p><div className="confirmation-meta"><span>Demo total <strong>{money(total)}</strong></span><span>Reference <strong>VL-2026-01</strong></span></div><Button onClick={() => onNavigate('/shop')}>Continue shopping</Button><button className="section-link" onClick={() => onNavigate('/')}>Return home <Icon name="arrow" size={15} /></button></main>;
}

function Footer({ onNavigate }) {
  return <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><button className="wordmark footer-wordmark" onClick={() => onNavigate('/')}><BrandMark /><span>VELORA<br /><i>CLOTHING</i></span></button><p>Modern menswear for a life well lived.</p></div><div className="footer-column"><span>Explore</span><button onClick={() => onNavigate('/shop')}>Shop all</button><button onClick={() => onNavigate('/new-arrivals')}>New arrivals</button><button onClick={() => onNavigate('/collections')}>Collections</button></div><div className="footer-column"><span>Help</span><button onClick={() => onNavigate('/cart')}>Shopping bag</button><button onClick={() => onNavigate('/shop')}>Shipping & returns</button><button onClick={() => onNavigate('/shop')}>Size guide</button></div><div className="footer-column footer-newsletter"><span>Stay in the know</span><p>Notes on new drops, considered pieces, and the good stuff in between.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Email address" aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" size={16} /></button></form></div></div><div className="footer-bottom"><span>© 2026 Velora Clothing</span><span>Designed for the everyday</span><span>Instagram &nbsp; / &nbsp; Pinterest</span></div></footer>;
}

function App() {
  const [route, setRoute] = useState(`${window.location.pathname}${window.location.search}`);
  const [cart, setCart] = useState(readCart);
  const [toast, setToast] = useState('');
  useEffect(() => { const onPopState = () => setRoute(`${window.location.pathname}${window.location.search}`); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  useEffect(() => { localStorage.setItem('velora-cart', JSON.stringify(cart)); }, [cart]);
  const navigate = (path) => { window.history.pushState({}, '', path); setRoute(path); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const addToCart = (product, size = product.sizes[1] || product.sizes[0]) => { setCart((current) => { const existing = current.find((item) => item.productId === product.id && item.size === size); return existing ? current.map((item) => item.productId === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { productId: product.id, size, quantity: 1 }]; }); setToast(`${product.name} added to bag`); setTimeout(() => setToast(''), 2200); };
  const updateCart = (productId, size, quantity) => setCart((current) => quantity < 1 ? current.filter((item) => !(item.productId === productId && item.size === size)) : current.map((item) => item.productId === productId && item.size === size ? { ...item, quantity } : item));
  const removeFromCart = (productId, size) => setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size)));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = window.location.pathname;
  const slug = pathname.startsWith('/product/') ? pathname.split('/product/')[1] : '';
  const product = getProduct(slug);
  let content;
  if (pathname === '/shop') content = <ShopPage onNavigate={navigate} onAdd={addToCart} />;
  else if (pathname === '/new-arrivals') content = <ShopPage mode="new" onNavigate={navigate} onAdd={addToCart} />;
  else if (pathname === '/collections') content = <ShopPage mode="collections" onNavigate={navigate} onAdd={addToCart} />;
  else if (pathname === '/cart') content = <CartPage cart={cart} onNavigate={navigate} onUpdate={updateCart} onRemove={removeFromCart} />;
  else if (pathname === '/checkout') content = <CheckoutPage cart={cart} onNavigate={navigate} onClear={() => setCart([])} />;
  else if (pathname === '/confirmation') content = <Confirmation total={0} itemCount={0} onNavigate={navigate} />;
  else if (product) content = <ProductPage product={product} onNavigate={navigate} onAdd={addToCart} />;
  else content = <Home onNavigate={navigate} onAdd={addToCart} />;
  return <div className="app-shell"><Header cartCount={cartCount} onNavigate={navigate} />{content}{toast && <div className="toast"><Icon name="check" size={16} /> {toast}<button onClick={() => navigate('/cart')}>View bag</button></div>}</div>;
}

createRoot(document.getElementById('root')).render(<App />);
