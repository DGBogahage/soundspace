
import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  
const [selectedCategory, setSelectedCategory] = useState("All Equipment");
const [selectedProduct, setSelectedProduct] = useState(null);
const [showRentalForm, setShowRentalForm] = useState(false);
const [bookingSubmitted, setBookingSubmitted] = useState(false);
const [selectedCollection, setSelectedCollection] = useState(null);


  
  
const filteredProducts = products.filter((product) => {
  const isMainListingProduct = product.id !== 7 && product.id !== 8;

  const matchesCategory =
    selectedCategory === "All Equipment" ||
    product.category === selectedCategory;

  return isMainListingProduct && matchesCategory;
});



  const showCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);

    setTimeout(() => {
      document.getElementById("equipment")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">♪</span>
          SoundSpace
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#equipment">Equipment</a>
        </div>

        <button
          className="nav-button"
          onClick={() => showCategory("All Equipment")}
        >
          Explore Equipment
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR EVENT. YOUR SOUND. YOUR MOMENT.
            </span>

            <h1>
              Everything You Need
              <br />
              To <span>Make Some Noise.</span>
            </h1>

            <p>
              Rent musical instruments, professional sound systems,
              and event equipment all in one place.
            </p>

            

            <div className="hero-note">
              <span className="status-dot"></span>
              The right equipment for every occasion
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85"
              alt="Live music performance"
            />
            <div className="floating-card">
              <span className="floating-icon">♫</span>
              <div>
                <strong>Make it memorable</strong>
                <p>Music starts here.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="categories" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT ARE YOU LOOKING FOR?</span>
              <h2>Find Your Perfect Setup</h2>
            </div>
            <p>Everything for your next performance, party, or event.</p>
          </div>

          <div className="category-grid">
            <article className="category-card">
              <div className="category-icon">🎸</div>
              <h3>Musical Instruments</h3>
              <p>Guitars, keyboards, drums, and more.</p>
              <a
                href="#equipment"
                onClick={() => showCategory("Musical Instruments")}
              >
                See More →
              </a>
            </article>

            <article className="category-card">
              <div className="category-icon">🔊</div>
              <h3>Sound Equipment</h3>
              <p>Speakers, microphones, mixers, and amplifiers.</p>
              <a
                href="#equipment"
                onClick={() => showCategory("Sound Equipment")}
              >
                See More →
              </a>
            </article>

            <article className="category-card">
              <div className="category-icon">🎤</div>
              <h3>Event Equipment</h3>
              <p>Stage lighting, DJ gear, and event essentials.</p>
              <a
                href="#equipment"
                onClick={() => showCategory("Event Equipment")}
              >
                See More →
              </a>
            </article>
          </div>
        </section>

        <section className="equipment-section" id="equipment">
          <div className="equipment-heading">
            <div>
              <span className="eyebrow">OUR COLLECTION</span>
              <h2>
                {selectedProduct
                  ? selectedProduct.name
                  : selectedCategory === "All Equipment"
                  ? "Explore Our Equipment"
                  : selectedCategory}
              </h2>
              <p>
                {selectedProduct
                  ? "View the selected equipment details."
                  : "Find the right gear for your next performance or event."}
              </p>
            </div>
          </div>

          {!selectedProduct && (
            <div className="category-filters">
              {[
                "All Equipment",
                "Musical Instruments",
                "Sound Equipment",
                "Event Equipment",
              ].map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => showCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {selectedCollection ? (
  <div>
    <button
      className="rent-button"
      type="button"
      onClick={() => setSelectedCollection(null)}
    >
      ← Back to All Equipment
    </button>

    <h3>Choose Your Acoustic Guitar</h3>
    <div className="product-grid">
      {products
        .filter(
          (product) =>
            product.type === "acoustic-guitar" && product.id !== 1
        )
        .map((product) => (
          <article className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>

              <div className="product-bottom">
                <div className="product-price">
                  <strong>
                    LKR {product.price.toLocaleString("en-LK")}
                  </strong>
                  <span> / {product.unit}</span>
                </div>

                <button
                  className="rent-button"
                  type="button"
                  onClick={() => {
                    setSelectedCollection(null);
                    setSelectedProduct(product);
                    setShowRentalForm(false);
                    setBookingSubmitted(false);
                  }}
                >
                  View details →
                </button>
              </div>
            </div>
          </article>
        ))}
    </div>
  </div>
) : selectedProduct ? (
            <div className="product-detail">
              <button
                className="rent-button"
                type="button"
                onClick={() => {
                  setShowRentalForm(false);
                  setBookingSubmitted(false); 
                  setSelectedProduct(null);}}
              >
                ← Back to {selectedProduct.category}
              </button>

              <img
                className="product-image"
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <span className="product-category">
                {selectedProduct.category}
              </span>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>

              <p className="product-price">
                <strong>
                  LKR {selectedProduct.price.toLocaleString("en-LK")}
                </strong>
                <span> / {selectedProduct.unit}</span>
              </p>

              <button
  className="rent-button"
  type="button"
  onClick={() => {
  setBookingSubmitted(false);
  setShowRentalForm(true);

  setTimeout(() => {
    document.getElementById("rental-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}}
>
  Rent This Item →
</button>

{showRentalForm && (
  <form
    id="rental-form"
    className="rental-form"
    onSubmit={(event) => {
      event.preventDefault();
      setBookingSubmitted(true);
    }}
  >
    <h3>Rent {selectedProduct.name}</h3>
    <p>
      LKR {selectedProduct.price.toLocaleString("en-LK")} /{" "}
      {selectedProduct.unit}
    </p>

    <label htmlFor="renter-name">Full name</label>
    <input
      id="renter-name"
      name="name"
      type="text"
      placeholder="Enter your full name"
      required
    />

    <label htmlFor="renter-phone">Phone number</label>
    <input
      id="renter-phone"
      name="phone"
      type="tel"
      placeholder="Enter your phone number"
      required
    />

    <label htmlFor="renter-email">Email address</label>
    <input
      id="renter-email"
      name="email"
      type="email"
      placeholder="Enter your email"
      required
    />

    <label htmlFor="rental-start">Rental start date</label>
   <input
  id="rental-start"
  name="startDate"
  type="date"
  min={new Date().toLocaleDateString("en-CA")}
  required
  onChange={(event) => {
    const returnDate = document.getElementById("rental-end");
    if (returnDate) {
      returnDate.min = event.target.value;
      if (returnDate.value && returnDate.value < event.target.value) {
        returnDate.value = "";
      }
    }
  }}
/>

    <label htmlFor="rental-end">Return date</label>
    <input
      id="rental-end"
      name="endDate"
      type="date"
      required
    />

    <button className="rent-button" type="submit">
      Submit Rental Request →
    </button>

    {bookingSubmitted && (
      <p role="status">
        Your rental request has been submitted successfully!
      </p>
    )}
  </form>
)}

            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {product.description}
                    </p>

                    <div className="product-bottom">
                      <div className="product-price">
                        <strong>
                          LKR {product.price.toLocaleString("en-LK")}
                           {product.id === 1 ? " upwards" : ""}
                        </strong>
                        <span> / {product.unit}</span>
                      </div>

                      <button
                        className="rent-button"
                        type="button"
                        onClick={() => {
                          setShowRentalForm(false);
                          setBookingSubmitted(false);
                          if (product.id === 1) {
                            setSelectedCollection("acoustic-guitar");
                            setSelectedProduct(null);
                          } else {
                            setSelectedCollection(null);
                            setSelectedProduct(product);
                          }
}}
                      >
                        View details →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-icon">♪</span>
          SoundSpace
        </a>
        <p>Bring your events to life.</p>
        <span>© 2026 SoundSpace. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
