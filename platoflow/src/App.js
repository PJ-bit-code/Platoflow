import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [program, setProgram] = useState("");

  const [selectedRice, setSelectedRice] = useState("");
  const [riceQty, setRiceQty] = useState(0);

  const [selectedViand, setSelectedViand] = useState("");
  const [viandQty, setViandQty] = useState(0);

  const [selectedDessert, setSelectedDessert] = useState("");
  const [dessertQty, setDessertQty] = useState(0);

  const [selectedDrink, setSelectedDrink] = useState("");
  const [drinkQty, setDrinkQty] = useState(0);

  const [showQR, setShowQR] = useState(false);

  const totalItems = riceQty + viandQty + dessertQty + drinkQty;

  const qrData = `
Platoflow Order
Name: ${name}
Student ID: ${studentId}
Program: ${program}
Rice: ${selectedRice} x ${riceQty}
Viand: ${selectedViand} x ${viandQty}
Dessert: ${selectedDessert} x ${dessertQty}
Drink: ${selectedDrink} x ${drinkQty}
`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    qrData
  )}`;

  return (
    <div className="app">
      <div className="container">
        <h2 className="logo">🍽️ Platoflow</h2>

        {page === 1 && (
          <div className="hero card">
            <h1>Welcome to Platoflow</h1>
            <p>A QR-based student food ordering system for faster canteen service.</p>
            <button onClick={() => setPage(2)}>Get Started</button>
          </div>
        )}

        {page === 2 && (
          <div className="card">
            <h1>Flow of the System</h1>

            <div className="flow">
              <Flow icon="🛒" title="Select" />
              <span>→</span>
              <Flow icon="🔳" title="Generate QR" />
              <span>→</span>
              <Flow icon="📱" title="Scan" />
              <span>→</span>
              <Flow icon="😋" title="Eat" />
            </div>

            <button onClick={() => setPage(1)} className="secondary">
              Back
            </button>
            <button onClick={() => setPage(3)}>Next</button>
          </div>
        )}

        {page === 3 && (
          <div className="card form-card">
            <h1>Student Login</h1>

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <select value={program} onChange={(e) => setProgram(e.target.value)}>
              <option value="">Select Course / Program</option>
              <option value="BSCpE">BSCpE</option>
              <option value="BSCE">BSCE</option>
              <option value="BSABE">BSABE</option>
              <option value="BSECE">BSECE</option>
              <option value="BSIS">BSIS</option>
              <option value="BSCS">BSCS</option>
              <option value="BLIS">BLIS</option>
            </select>

            <button onClick={() => setPage(2)} className="secondary">
              Back
            </button>

            <button
              onClick={() => setPage(4)}
              disabled={!name || !studentId || !program}
            >
              Continue
            </button>
          </div>
        )}

        {page === 4 && (
          <div className="grid">
            <div className="card">
              <h1>Selection of Items</h1>
              <p>
                Hello, <b>{name}</b> — {program}
              </p>

              <div className="item clickable" onClick={() => setPage(6)}>
                <div>
                  <h3>🍚 Rice</h3>
                  <p>
                    {selectedRice
                      ? `${selectedRice} — ${riceQty} serving(s)`
                      : "Click to choose rice"}
                  </p>
                </div>
                <div className="counter">
                  <span>{riceQty}</span>
                </div>
              </div>

              <div className="item clickable" onClick={() => setPage(5)}>
                <div>
                  <h3>🍗 Viands</h3>
                  <p>
                    {selectedViand
                      ? `${selectedViand} — ${viandQty} serving(s)`
                      : "Click to choose viand"}
                  </p>
                </div>
                <div className="counter">
                  <span>{viandQty}</span>
                </div>
              </div>

              <div className="item clickable" onClick={() => setPage(8)}>
                <div>
                  <h3>🍰 Desserts</h3>
                  <p>
                    {selectedDessert
                      ? `${selectedDessert} — ${dessertQty} serving(s)`
                      : "Click to choose dessert"}
                  </p>
                </div>
                <div className="counter">
                  <span>{dessertQty}</span>
                </div>
              </div>

              <div className="item clickable" onClick={() => setPage(7)}>
                <div>
                  <h3>🥤 Drinks</h3>
                  <p>
                    {selectedDrink
                      ? `${selectedDrink} — ${drinkQty} serving(s)`
                      : "Click to choose drink"}
                  </p>
                </div>
                <div className="counter">
                  <span>{drinkQty}</span>
                </div>
              </div>
            </div>

            <div className="card summary">
              <h1>Order Summary</h1>

              <p>Rice: {selectedRice || "None"} x {riceQty}</p>
              <p>Viand: {selectedViand || "None"} x {viandQty}</p>
              <p>Dessert: {selectedDessert || "None"} x {dessertQty}</p>
              <p>Drink: {selectedDrink || "None"} x {drinkQty}</p>

              <h2>Total Items: {totalItems}</h2>

              <button onClick={() => setPage(3)} className="secondary">
                Back
              </button>

              <button onClick={() => setShowQR(true)} disabled={totalItems === 0}>
                Generate QR
              </button>

              {showQR && (
                <div className="qr-box">
                  <h2>Your QR Code</h2>
                  <img src={qrUrl} alt="Platoflow QR Code" />
                  <p>Show this QR code at the claiming counter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {page === 5 && (
          <SelectionPage
            title="Choose Your Viand"
            items={[
              "Fried Chicken",
              "Chicken Adobo",
              "Beef Steak",
              "Bulalo",
              "Chicken Teriyaki",
            ]}
            selected={selectedViand}
            setSelected={setSelectedViand}
            qty={viandQty}
            setQty={setViandQty}
            backPage={4}
            setPage={setPage}
          />
        )}

        {page === 6 && (
          <SelectionPage
            title="Choose Your Rice"
            items={["Plain Rice", "Pastil", "Spicy Pastil"]}
            selected={selectedRice}
            setSelected={setSelectedRice}
            qty={riceQty}
            setQty={setRiceQty}
            backPage={4}
            setPage={setPage}
          />
        )}

        {page === 7 && (
          <SelectionPage
            title="Choose Your Drink"
            items={["Coke", "Pepsi", "Royal", "Royal Lemon", "Mountain Dew"]}
            selected={selectedDrink}
            setSelected={setSelectedDrink}
            qty={drinkQty}
            setQty={setDrinkQty}
            backPage={4}
            setPage={setPage}
          />
        )}

        {page === 8 && (
          <SelectionPage
            title="Choose Your Dessert"
            items={["Graham Bar", "Cheese Bar", "Banana Cue", "Turon", "Sandwich"]}
            selected={selectedDessert}
            setSelected={setSelectedDessert}
            qty={dessertQty}
            setQty={setDessertQty}
            backPage={4}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

function Flow({ icon, title }) {
  return (
    <div className="flow-card">
      <div>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

function SelectionPage({
  title,
  items,
  selected,
  setSelected,
  qty,
  setQty,
  backPage,
  setPage,
}) {
  return (
    <div className="card">
      <h1>{title}</h1>
      <p>Select one item and choose how many servings.</p>

      {items.map((item) => {
        const isSelected = selected === item;

        return (
          <div
            key={item}
            className={isSelected ? "item selected" : "item clickable"}
            onClick={() => {
              setSelected(item);
              if (!isSelected) setQty(1);
            }}
          >
            <div>
              <h3>🍽️ {item}</h3>
              <p>{isSelected ? "Selected" : "Click to select"}</p>
            </div>

            <div className="counter">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSelected) setQty(Math.max(0, qty - 1));
                }}
              >
                -
              </button>

              <span>{isSelected ? qty : 0}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(item);
                  setQty(isSelected ? qty + 1 : 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        );
      })}

      <button onClick={() => setPage(backPage)} className="secondary">
        Back
      </button>

      <button onClick={() => setPage(backPage)} disabled={!selected || qty === 0}>
        Confirm
      </button>
    </div>
  );
}

export default App;