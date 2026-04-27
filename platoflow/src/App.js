import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Minus,
  Plus,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  UserRound,
} from "lucide-react";
import "./App.css";

const menu = {
  Rice: [
    { id: "plain-rice", name: "Plain Rice", price: 10 },
    { id: "java-rice", name: "Java Rice", price: 10 },
    { id: "garlic-rice", name: "Garlic Rice", price: 10 },
    { id: "pastil", name: "Pastil", price: 15 },
  ],
  Viands: [
    { id: "fried-chicken", name: "Fried Chicken", price: 15 },
    { id: "adobo", name: "Chicken Adobo", price: 15 },
    { id: "hotdog", name: "Hotdog", price: 15 },
    { id: "egg", name: "Egg", price: 15 },
  ],
  Desserts: [
    { id: "graham", name: "Graham Dessert", price: 15 },
    { id: "leche-flan", name: "Leche Flan", price: 15 },
    { id: "fruit-salad", name: "Fruit Salad", price: 15 },
  ],
  Drinks: [
    { id: "water", name: "Bottled Water", price: 15 },
    { id: "iced-tea", name: "Iced Tea", price: 15 },
    { id: "juice", name: "Juice", price: 15 },
    { id: "softdrinks", name: "Soft Drinks", price: 15 },
  ],
};

const programs = [
  "BS Information Technology",
  "BS Computer Science",
  "BS Computer Engineering",
  "BS Civil Engineering",
  "BS Agricultural Bio-system Engineering",
  "BS Information System",
  "BS Nursing",
  "BS Accountancy",
];

const flowSteps = [
  { title: "Select", description: "Choose meals, drinks, desserts, and custom requests.", icon: ShoppingBag },
  { title: "Generate", description: "Platoflow creates a verified QR code for the order.", icon: QrCode },
  { title: "Scan", description: "The QR code is scanned at the claiming area.", icon: ScanLine },
  { title: "Claim", description: "The student receives the prepared food order.", icon: Utensils },
];

function makeQrUrl(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=${encodeURIComponent(data)}`;
}

export default function App() {
  const [page, setPage] = useState(0);
  const [student, setStudent] = useState({ name: "", studentId: "", program: "" });
  const [cart, setCart] = useState({});
  const [customItems, setCustomItems] = useState({ Rice: "", Viands: "", Desserts: "", Drinks: "" });
  const [order, setOrder] = useState(null);

  const allItems = Object.entries(menu).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  );

  const selectedItems = allItems
    .map((item) => ({ ...item, quantity: cart[item.id] || 0 }))
    .filter((item) => item.quantity > 0);

  const typedItems = Object.entries(customItems)
    .filter(([, value]) => value.trim())
    .map(([category, value]) => ({
      id: `custom-${category}`,
      category,
      name: value.trim(),
      price: category === "Rice" ? 10 : 15,
      quantity: 1,
      custom: true,
    }));

  const orderItems = [...selectedItems, ...typedItems];
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const canLogin = student.name.trim() && student.studentId.trim() && student.program;
  const canGenerate = canLogin && orderItems.length > 0;

  const qrData = useMemo(() => {
    if (!order) return "";
    return JSON.stringify({
      system: "Platoflow",
      orderId: order.orderId,
      student: order.student,
      items: order.items,
      total: order.total,
      status: "For claiming",
    });
  }, [order]);

  function updateQuantity(id, amount) {
    setCart((current) => ({ ...current, [id]: Math.max((current[id] || 0) + amount, 0) }));
  }

  function generateOrder() {
    if (!canGenerate) return;

    setOrder({
      orderId: `PF-${Date.now().toString().slice(-6)}`,
      student: { ...student },
      items: orderItems,
      total,
      createdAt: new Date().toLocaleString(),
    });
  }

  return (
    <main className="appShell">
      <div className="orb orbOne" />
      <div className="orb orbTwo" />

      <section className="layout">
        <nav className="navGlass">
          <div className="brandWrap">
            <div className="brandMark"><Utensils size={24} /></div>
            <div>
              <h1>Platoflow</h1>
              <p>QR-Based Student Food Ordering System</p>
            </div>
          </div>

          <div className="navMenu">
            {["Welcome", "Flow", "Login", "Selection"].map((label, index) => (
              <button key={label} onClick={() => setPage(index)} className={page === index ? "navActive" : "navItem"}>
                {label}
              </button>
            ))}
          </div>
        </nav>

        {page === 0 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="heroPanel gridTwo">
            <div>
              <p className="eyebrow">Premium Student Canteen System</p>
              <h2>Welcome to <span>Platoflow</span></h2>
              <p className="leadText">
                A modern food ordering website designed for faster student transactions, organized item selection, and QR-based claiming.
              </p>
              <button className="mainButton" onClick={() => setPage(1)}>
                View System Flow <ArrowRight size={20} />
              </button>
            </div>

            <div className="premiumCard">
              <ShieldCheck size={52} />
              <h3>Verified Order Experience</h3>
              <p>Each order is summarized, calculated, and converted into a QR code for smoother claiming.</p>
            </div>
          </motion.div>
        )}

        {page === 1 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glassPanel">
            <div className="sectionHeader">
              <h2>Flow of the System</h2>
              <p>Platoflow follows a simple and efficient order process.</p>
            </div>

            <div className="flowGrid">
              {flowSteps.map((step, index) => (
                <div className="flowCard" key={step.title}>
                  <div className="flowIcon"><step.icon size={38} /></div>
                  <p>STEP {index + 1}</p>
                  <h3>{step.title}</h3>
                  <span>{step.description}</span>
                </div>
              ))}
            </div>

            <div className="centerAction">
              <button className="mainButton" onClick={() => setPage(2)}>Proceed to Login</button>
            </div>
          </motion.div>
        )}

        {page === 2 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="loginPanel">
            <div className="sectionHeader compact">
              <div className="loginIcon"><UserRound size={34} /></div>
              <h2>Student Login</h2>
              <p>Enter your student information to continue.</p>
            </div>

            <div className="fieldGroup">
              <label>Full Name</label>
              <input placeholder="Enter full name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
            </div>

            <div className="fieldGroup">
              <label>Student ID</label>
              <input placeholder="Enter student ID" value={student.studentId} onChange={(e) => setStudent({ ...student, studentId: e.target.value })} />
            </div>

            <div className="fieldGroup">
              <label>Course / Program</label>
              <select value={student.program} onChange={(e) => setStudent({ ...student, program: e.target.value })}>
                <option value="">Select course/program</option>
                {programs.map((program) => <option key={program} value={program}>{program}</option>)}
              </select>
            </div>

            <button disabled={!canLogin} onClick={() => setPage(3)} className="mainButton fullWidth">Continue to Selection</button>
          </motion.div>
        )}

        {page === 3 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="selectionLayout">
            <div className="glassPanel">
              <h2>Selection of Items</h2>
              <p className="muted">Select multiple food items, adjust quantity, or type a custom request.</p>

              {Object.entries(menu).map(([category, items]) => (
                <section className="menuSection" key={category}>
                  <div className="menuTitle">
                    <h3>{category}</h3>
                    <span>{category === "Rice" ? "₱10 to ₱15" : "₱15 each"}</span>
                  </div>

                  <div className="itemGrid">
                    {items.map((item) => (
                      <div className="itemCard" key={item.id}>
                        <div>
                          <h4>{item.name}</h4>
                          <p>₱{item.price} per serving</p>
                        </div>
                        <div className="quantityBox">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                          <strong>{cart[item.id] || 0}</strong>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="fieldGroup customField">
                    <label>Other {category} Request</label>
                    <input
                      placeholder={`Type other ${category.toLowerCase()} request`}
                      value={customItems[category]}
                      onChange={(e) => setCustomItems({ ...customItems, [category]: e.target.value })}
                    />
                    <small>Custom rice is ₱10. Other custom requests are ₱15.</small>
                  </div>
                </section>
              ))}
            </div>

            <aside className="summaryPanel">
              <h2>Order Summary</h2>
              <p className="muted">{student.name || "Student not logged in"}</p>

              <div className="summaryList">
                {orderItems.length === 0 ? (
                  <div className="emptyState">No selected items yet.</div>
                ) : (
                  orderItems.map((item) => (
                    <div className="summaryItem" key={item.id}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.category} {item.custom ? "custom request" : "item"}</p>
                        <small>{item.quantity} serving(s) x ₱{item.price}</small>
                      </div>
                      <strong>₱{item.quantity * item.price}</strong>
                    </div>
                  ))
                )}
              </div>

              <div className="totalPanel">
                <span>Total Amount</span>
                <strong>₱{total}</strong>
              </div>

              <button disabled={!canGenerate} onClick={generateOrder} className="mainButton fullWidth">Generate QR Code</button>

              {order && (
                <div className="qrPanel">
                  <h3>QR Code Generated</h3>
                  <img src={makeQrUrl(qrData)} alt="Order QR Code" />
                  <p>Order ID: {order.orderId}</p>
                  <small>Present this QR code at the claiming area.</small>
                </div>
              )}
            </aside>
          </motion.div>
        )}
      </section>
    </main>
  );
}
