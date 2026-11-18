import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

const products = [
    {
    id: 10,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Mobiles",
    price: 69999,
    oldPrice: 79999,
    rating: 4.7,
    reviews: "1.8K",
    sold: "1.2K+",
    stock: 25,
    colors: ["Black", "Blue", "Violet", "Yellow"],
    keywords: "samsung galaxy s24 android phone smartphone mobile",
    image:
      "https://st.gsmarena.com/imgroot/news/23/09/samsung-galaxy-s24-design-renders/inline/-1200/gsmarena_001.jpg",
    thumb:
      "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/09/Samsung-Galaxy-S24-5K2-scaled.jpg?ssl=1&quality=80&w=300",
  },

  {
    id: 11,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Mobiles",
    price: 119999,
    oldPrice: 129999,
    rating: 4.8,
    reviews: "2.1K",
    sold: "1.5K+",
    stock: 18,
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
    keywords: "samsung s24 ultra galaxy android smartphone phone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rz1Rvi489n7rC8NQsnZhMq1z8EpJxA8HmEHYfOqBIQ&s=10",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rz1Rvi489n7rC8NQsnZhMq1z8EpJxA8HmEHYfOqBIQ&s=10",
  },

  {
    id: 12,
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    category: "Mobiles",
    price: 49999,
    oldPrice: 69999,
    rating: 4.6,
    reviews: "1.6K",
    sold: "1.1K+",
    stock: 30,
    colors: ["Black", "Cream", "Green", "Lavender"],
    keywords: "samsung galaxy s23 android smartphone mobile phone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1k-l7mRedL3ppuYrjibwP36rgPKhZQx6oFe5o9NUFiA&s",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1k-l7mRedL3ppuYrjibwP36rgPKhZQx6oFe5o9NUFiA&s",
  },

  {
    id: 13,
    name: "Apple iPhone 16",
    brand: "Apple",
    category: "Mobiles",
    price: 69999,
    oldPrice: 79999,
    rating: 4.8,
    reviews: "2.7K",
    sold: "2K+",
    stock: 22,
    colors: ["Black", "White", "Blue", "Pink", "Green"],
    keywords: "iphone 16 apple phone smartphone ios mobile",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZemdD0oo5X98EZ-PC47yO8nCJoPFpv5tzo027wd_fg&s",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZemdD0oo5X98EZ-PC47yO8nCJoPFpv5tzo027wd_fg&s",
  },

  {
    id: 14,
    name: "Apple iPhone 15 Pro",
    brand: "Apple",
    category: "Mobiles",
    price: 99999,
    oldPrice: 119999,
    rating: 4.8,
    reviews: "2.4K",
    sold: "1.8K+",
    stock: 20,
    colors: ["Black Titanium", "Blue Titanium", "Natural Titanium"],
    keywords: "iphone 15 pro apple ios smartphone mobile phone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdzndhFdG0CaigIqOIPw7zpLDsqgG15GwiVIy5Rx2kQA&s=10",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdzndhFdG0CaigIqOIPw7zpLDsqgG15GwiVIy5Rx2kQA&s=10",
  },

  {
    id: 15,
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    category: "Mobiles",
    price: 38999,
    oldPrice: 44999,
    rating: 4.5,
    reviews: "1.2K",
    sold: "900+",
    stock: 35,
    colors: ["Awesome Navy", "Awesome Lilac", "Awesome Iceblue"],
    keywords: "samsung galaxy a55 5g android smartphone mobile",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0OXLa0K7_3u2gAdF41EeeirkiQEqsc5RxELLRM2ElQ&s=10",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0OXLa0K7_3u2gAdF41EeeirkiQEqsc5RxELLRM2ElQ&s=10",
  },

  {
    id: 16,
    name: "Samsung Galaxy S24 Plus",
    brand: "Samsung",
    category: "Mobiles",
    price: 99999,
    oldPrice: 109999,
    rating: 4.7,
    reviews: "1.5K",
    sold: "1K+",
    stock: 24,
    colors: ["Cobalt Violet", "Onyx Black", "Marble Gray"],
    keywords: "samsung galaxy s24 plus android smartphone phone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK2L6GVULlCcWjQUQBBetTVUJnyFwa9XZZ2hAwwywjrA&s=10",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK2L6GVULlCcWjQUQBBetTVUJnyFwa9XZZ2hAwwywjrA&s=10",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    price: 24999,
    oldPrice: 34999,
    rating: 4.7,
    reviews: "3.2K",
    sold: "2.1K+",
    stock: 25,
    colors: ["Black", "Blue", "White"],
    keywords: "sony headphones headphone headset audio wireless",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    brand: "Nike",
    category: "Fashion",
    price: 3999,
    oldPrice: 6999,
    rating: 4.4,
    reviews: "2.4K",
    sold: "1.7K+",
    stock: 60,
    colors: ["Black", "White", "Red", "Blue"],
    keywords: "nike shoes footwear sneakers running fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 4,
    name: "HP Pavilion Laptop",
    brand: "HP",
    category: "Electronics",
    price: 62999,
    oldPrice: 74999,
    rating: 4.3,
    reviews: "980",
    sold: "760+",
    stock: 15,
    colors: ["Black", "Silver", "Blue"],
    keywords: "hp laptop computer notebook electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 5,
    name: "Smart Watch",
    brand: "FitPro",
    category: "Electronics",
    price: 2999,
    oldPrice: 4999,
    rating: 4.5,
    reviews: "2.1K",
    sold: "1.5K+",
    stock: 45,
    colors: ["Black", "Blue", "Pink", "Green"],
    keywords: "smart watch smartwatch wearable fitness electronics",
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 6,
    name: "SkyBag",
    brand: "UrbanGear",
    category: "Fashion",
    price: 1499,
    oldPrice: 2999,
    rating: 4.4,
    reviews: "1.7K",
    sold: "1.2K+",
    stock: 80,
    colors: ["Black", "Blue", "Grey", "Green"],
    keywords: "backpack bag travel fashion school office",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 7,
    name: "Modern Office Chair",
    brand: "HomePro",
    category: "Home",
    price: 5999,
    oldPrice: 8999,
    rating: 4.2,
    reviews: "620",
    sold: "400+",
    stock: 20,
    colors: ["Black", "Grey", "White"],
    keywords: "office chair furniture home work",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=180&q=80",
  },
  {
    id: 8,
    name: "Coffee Maker",
    brand: "BrewMate",
    category: "Home",
    price: 3499,
    oldPrice: 5999,
    rating: 4.3,
    reviews: "540",
    sold: "320+",
    stock: 35,
    colors: ["Black", "White", "Red"],
    keywords: "coffee maker kitchen appliance home",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTejGf6Is9H8Kb7taishBuink5rqgT4XHlnJac2MaVg&s=10",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTejGf6Is9H8Kb7taishBuink5rqgT4XHlnJac2MaVg&s=10",
  },
  {
    id: 9,
    name: "Cotton Hoodie",
    brand: "StreetWear",
    category: "Fashion",
    price: 1799,
    oldPrice: 2999,
    rating: 4.4,
    reviews: "1.3K",
    sold: "980+",
    stock: 70,
    colors: ["Black", "Grey", "Blue", "Red"],
    keywords: "hoodie sweatshirt clothes fashion cotton men women",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    thumb:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=180&q=80",
  },
];

const categories = [
  { name: "All", icon: "✦" },
  { name: "Mobiles", icon: "▣" },
  { name: "Fashion", icon: "♟" },
  { name: "Electronics", icon: "▰" },
  { name: "Home", icon: "⌂" },
];

const aliases = {
  Mobiles: "mobile phone smartphone phones",
  Fashion: "fashion clothes clothing footwear shoes",
  Electronics: "electronics gadget gadgets computer laptop headphones",
  Home: "home furniture kitchen appliance appliances",
};

function Icon({ name, size = 22, stroke = 1.8 }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    heart: (
      <path d="M20.8 8.9c0 5.2-8.8 10.1-8.8 10.1S3.2 14.1 3.2 8.9A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.7Z" />
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    explore: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.2 11h10.6l2-8H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.2" />
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="18" cy="19" r="2.2" />
        <path d="m8 11 8-5M8 13l8 5" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}


function ProductCard({
  product,
  wished,
  onWishlist,
  onOpen,
  onAdd,
}) {
  return (
    <article
      className="product-card"
    >
      <button
        className={`heart-button ${wished ? "active" : ""}`}
        onClick={() => onWishlist(product.id)}
      >
        <Icon
          name="heart"
          size={20}
          stroke={wished ? 2.4 : 1.7}
        />
      </button>

      <button
        className="product-image-wrap"
        onClick={() => onOpen(product)}
      >
        <img
           src={product.image}
           alt={product.name}
         />
      </button>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <button
          className="product-name"
          onClick={() => onOpen(product)}
        >
          {product.name}
        </button>

        <div className="rating-row">
          <span className="star">★</span>
          <span>{product.rating}</span>
          <span className="divider">|</span>
          <span>{product.reviews}</span>
        </div>

        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          <del>{formatPrice(product.oldPrice)}</del>
        </div>

        <div className="card-colors">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="mini-color"
              title={color}
              style={{
                backgroundColor:
                  color.toLowerCase() === "silver"
                    ? "#c5cbd3"
                    : color.toLowerCase() === "grey"
                    ? "#858b94"
                    : color.toLowerCase(),
              }}
            />
          ))}
        </div>

        <button
          className="small-add"
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

/* =====================================================
   SHOPKART VOICE AI ASSISTANT
===================================================== */

function useVoiceAssistant({
  search,
  setSearch,
  setCategory,
  setActiveTab,
  addToCart,
}) {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    let listening = false;

    const speak = (message) => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const speech =
          new SpeechSynthesisUtterance(message);

        speech.lang = "en-IN";
        speech.rate = 0.95;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
      }
    };

    const findProduct = (text) => {
      const query = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return products.find((product) => {
        const searchable = [
          product.name,
          product.brand,
          product.category,
          product.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return (
          searchable.includes(query) ||
          query
            .split(" ")
            .every((word) =>
              searchable.includes(word)
            )
        );
      });
    };

    const processCommand = (spokenText) => {
      const text = spokenText
        .toLowerCase()
        .trim();

      /* SEARCH */
      if (
        text.startsWith("search ") ||
        text.includes("search for ")
      ) {
        let query = text
          .replace(/^search\s+/i, "")
          .replace(/^search for\s+/i, "")
          .trim();

        if (query) {
          setSearch(query);
          setActiveTab("Home");

          speak(
            `Searching ShopKart for ${query}`
          );

          return;
        }
      }

      /* CLEAR SEARCH */
      if (
        text.includes("clear search") ||
        text.includes("remove search")
      ) {
        setSearch("");

        speak("Search cleared.");

        return;
      }

      /* HOME */
      if (
        text.includes("go home") ||
        text === "home" ||
        text.includes("open home")
      ) {
        setActiveTab("Home");

        speak("Opening ShopKart home.");

        return;
      }

      /* CART */
      if (
        text.includes("open cart") ||
        text === "cart" ||
        text.includes("show cart") ||
        text.includes("my cart")
      ) {
        setActiveTab("Cart");

        speak("Opening your cart.");

        return;
      }

      /* WISHLIST */
      if (
        text.includes("open wishlist") ||
        text.includes("show wishlist") ||
        text === "wishlist"
      ) {
        setActiveTab("Wishlist");

        speak("Opening your wishlist.");

        return;
      }

      /* PROFILE */
      if (
        text.includes("open profile") ||
        text.includes("my profile") ||
        text === "profile"
      ) {
        setActiveTab("Profile");

        speak("Opening your profile.");

        return;
      }

      /* MOBILE CATEGORY */
      if (
        text.includes("show mobiles") ||
        text.includes("show phones") ||
        text.includes("mobile phones")
      ) {
        setCategory("Mobiles");
        setActiveTab("Home");

        speak("Showing mobile phones.");

        return;
      }

      /* FASHION CATEGORY */
      if (
        text.includes("show fashion") ||
        text.includes("fashion products")
      ) {
        setCategory("Fashion");
        setActiveTab("Home");

        speak("Showing fashion products.");

        return;
      }

      /* ELECTRONICS CATEGORY */
      if (
        text.includes("show electronics") ||
        text.includes("electronics products")
      ) {
        setCategory("Electronics");
        setActiveTab("Home");

        speak("Showing electronics.");

        return;
      }

      /* ALL PRODUCTS */
      if (
        text.includes("show all products") ||
        text.includes("all products")
      ) {
        setCategory("All");
        setSearch("");
        setActiveTab("Home");

        speak(
          "Showing all ShopKart products."
        );

        return;
      }

      /* ADD PRODUCT TO CART */
      if (
        text.includes("add") &&
        text.includes("cart")
      ) {
        const cleaned = text
          .replace("add", "")
          .replace("to cart", "")
          .replace("cart", "")
          .trim();

        const product =
          findProduct(cleaned);

        if (product) {
          addToCart(product);

          speak(
            `${product.name} has been added to your cart.`
          );

          return;
        }

        speak(
          "I could not find that product. Please say the product name again."
        );

        return;
      }

      /* PRODUCT SEARCH FALLBACK */
      const product =
        findProduct(text);

      if (product) {
        setSearch(product.name);
        setActiveTab("Home");

        speak(
          `Showing ${product.name}.`
        );

        return;
      }

      /* NO RESULTS / UNKNOWN PRODUCT */
      if (
        text.includes("find") ||
        text.includes("show") ||
        text.includes("search") ||
        text.includes("looking for") ||
        text.includes("want") ||
        text.includes("need")
      ) {
        setSearch(text);
        setActiveTab("Home");

        speak(
          "No results found for that product."
        );

        const status =
          document.getElementById(
            "shopkart-voice-status"
          );

        if (status) {
          status.textContent =
            "No results found";
          status.classList.remove(
            "listening-status"
          );
        }

        return;
      }

      speak(
        "No results found. Please try another product."
      );
    };

    recognition.onstart = () => {
      listening = true;

      const button =
        document.getElementById(
          "shopkart-voice-button"
        );

      if (button) {
        button.classList.add(
          "voice-listening"
        );

        
      }

      const status =
        document.getElementById(
          "shopkart-voice-status"
        );

      if (status) {
        status.textContent = "Listening";
        status.classList.add("listening-status");
      }
    };

    recognition.onresult = (event) => {
      const result =
        event.results[
          event.results.length - 1
        ];

      const text =
        result[0].transcript;

      const status =
        document.getElementById(
          "shopkart-voice-status"
        );

      if (status) {
        status.textContent =
          `"${text}"`;
        status.classList.remove("listening-status");
      }

      processCommand(text);
    };

    recognition.onerror = () => {
      listening = false;

      const button =
        document.getElementById(
          "shopkart-voice-button"
        );

      if (button) {
        button.classList.remove(
          "voice-listening"
        );

        
      }

      const status =
        document.getElementById(
          "shopkart-voice-status"
        );

      if (status) {
        status.textContent = "Try again";
        status.classList.remove("listening-status");
      }
    };

    recognition.onend = () => {
      listening = false;

      const endedStatus =
        document.getElementById(
          "shopkart-voice-status"
        );

      if (endedStatus) {
        endedStatus.classList.remove("listening-status");
      }

      const button =
        document.getElementById(
          "shopkart-voice-button"
        );

      if (button) {
        button.classList.remove(
          "voice-listening"
        );

        
      }
    };

    /* CREATE FLOATING VOICE BUTTON */

    const oldAssistant =
      document.getElementById(
        "shopkart-voice-assistant"
      );

    if (oldAssistant) {
      oldAssistant.remove();
    }

    const assistant =
      document.createElement("div");

    assistant.id =
      "shopkart-voice-assistant";

    /*
       Keep the AI assistant at the TOP of the ShopKart
       home screen. Inline positioning makes this work
       even if the existing App.css has the old bottom
       positioning from an earlier version.
    */
    assistant.style.position = "fixed";
    assistant.style.top = "10px";
    assistant.style.right = "92px";
    assistant.style.bottom = "auto";
    assistant.style.zIndex = "99999";

    const assistantStyle = document.createElement("style");
    assistantStyle.textContent = `
      #shopkart-voice-assistant .voice-button {
        position: relative;
        width: 58px;
        height: 58px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: #fff;
        display: grid;
        place-items: center;
        overflow: visible;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(60,55,100,.20);
        transition: transform .2s ease, box-shadow .2s ease;
      }

      #shopkart-voice-assistant .voice-button:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 10px 26px rgba(60,55,100,.26);
      }

      #shopkart-voice-assistant .shopkart-bot-icon {
        position: relative;
        z-index: 3;
        width: 54px;
        height: 54px;
        display: block;
        transition: transform .2s ease;
      }

      #shopkart-voice-assistant .shopkart-bot-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Animated listening state: glowing rings + moving bot */
      #shopkart-voice-assistant .voice-button.voice-listening {
        animation: shopkartListeningBounce 1s ease-in-out infinite;
        box-shadow:
          0 0 0 4px rgba(124,58,237,.14),
          0 0 22px rgba(124,58,237,.42);
      }

      #shopkart-voice-assistant .voice-button.voice-listening::before,
      #shopkart-voice-assistant .voice-button.voice-listening::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 2px solid rgba(124,58,237,.55);
        transform: translate(-50%, -50%) scale(.82);
        pointer-events: none;
        z-index: 1;
        animation: shopkartListeningRing 1.5s ease-out infinite;
      }

      #shopkart-voice-assistant .voice-button.voice-listening::after {
        animation-delay: .72s;
      }

      #shopkart-voice-assistant .voice-button.voice-listening .shopkart-bot-icon {
        animation: shopkartBotFloat .75s ease-in-out infinite alternate;
      }

      #shopkart-voice-assistant .voice-button.voice-listening .shopkart-bot-icon svg {
        filter: drop-shadow(0 0 5px rgba(82,205,218,.65));
      }

      @keyframes shopkartListeningRing {
        0% {
          opacity: .85;
          transform: translate(-50%, -50%) scale(.82);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.75);
        }
      }

      @keyframes shopkartListeningBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.07); }
      }

      @keyframes shopkartBotFloat {
        from { transform: translateY(1px) scale(.96); }
        to { transform: translateY(-3px) scale(1.04); }
      }

      /* Animated "Listening..." dots */
      #shopkart-voice-assistant .voice-status {
        position: relative;
        font-weight: 800;
      }

      #shopkart-voice-assistant .voice-status.listening-status::after {
        content: " ...";
        display: inline-block;
        width: 18px;
        overflow: hidden;
        vertical-align: bottom;
        animation: shopkartListeningDots 1s steps(4, end) infinite;
      }

      @keyframes shopkartListeningDots {
        0% { width: 0; }
        25% { width: 6px; }
        50% { width: 12px; }
        75%, 100% { width: 18px; }
      }
    `;
    document.head.appendChild(assistantStyle);

    assistant.innerHTML = `
      <div
        id="shopkart-voice-status"
        class="voice-status"
      >
        Tap the mic and speak
      </div>

      <button
        id="shopkart-voice-button"
        class="voice-button"
        title="ShopKart AI Voice Assistant"
        aria-label="ShopKart AI Voice Assistant"
      >
        <span class="shopkart-bot-icon" aria-hidden="true">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="37" fill="#d9ebfb"/>
            <circle cx="40" cy="40" r="31" fill="#a9cbe8"/>
            <rect x="22" y="25" width="36" height="29" rx="13" fill="#171717"/>
            <rect x="18" y="34" width="5" height="13" rx="2.5" fill="#171717"/>
            <rect x="57" y="34" width="5" height="13" rx="2.5" fill="#171717"/>
            <circle cx="33" cy="38" r="3.5" fill="#58d6dd"/>
            <circle cx="47" cy="38" r="3.5" fill="#58d6dd"/>
            <path d="M33 46 Q40 52 47 46" fill="none" stroke="#58d6dd" stroke-width="3" stroke-linecap="round"/>
            <rect x="37" y="54" width="6" height="5" rx="1" fill="#171717"/>
            <rect x="30" y="59" width="20" height="4" rx="2" fill="#171717"/>
            <path d="M18 21 Q12 15 16 10 Q21 6 26 12" fill="#4c8ed0"/>
            <circle cx="17" cy="12" r="2" fill="white"/>
            <circle cx="22" cy="10" r="2" fill="white"/>
            <circle cx="27" cy="12" r="2" fill="white"/>
          </svg>
        </span>
      </button>
    `;

    document.body.appendChild(
      assistant
    );

    if (window.innerWidth <= 680) {
      assistant.style.top = "8px";
      assistant.style.right = "76px";
    }

    const voiceButton =
      document.getElementById(
        "shopkart-voice-button"
      );

    voiceButton.onclick = () => {
      if (listening) {
        recognition.stop();
        return;
      }

      try {
        recognition.start();
      } catch {
        // Recognition may already be starting.
      }
    };

    return () => {
      try {
        recognition.stop();
      } catch {}

      if (assistant.parentNode) {
        assistant.remove();
      }

      if (assistantStyle.parentNode) {
        assistantStyle.remove();
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAngle, setSelectedAngle] = useState(0);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("shopkart_user") || "null"
      );
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem("shopkart_token")
  );

  const [authMode, setAuthMode] = useState("login");

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [profileMessage, setProfileMessage] =
    useState("");

  const filteredProducts = useMemo(() => {
    const query = search
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return products.filter((product) => {
      const categoryMatch =
        category === "All" ||
        product.category === category;

      if (!categoryMatch) return false;

      if (!query) return true;

      const searchable = [
        product.name,
        product.brand,
        product.category,
        product.keywords,
        aliases[product.category] || "",
      ]
        .join(" ")
        .toLowerCase();

      return query
        .split(" ")
        .every((word) => searchable.includes(word));
    });
  }, [search, category]);

  /* =====================================================
     AUTH
  ===================================================== */

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    setAuthMessage("");
    setAuthLoading(true);

    const endpoint =
      authMode === "login"
        ? `${API}/auth/login`
        : `${API}/auth/register`;

    try {
      const body =
        authMode === "login"
          ? {
              email: authForm.email,
              password: authForm.password,
            }
          : {
              name: authForm.name,
              email: authForm.email,
              password: authForm.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Authentication failed"
        );
      }

      localStorage.setItem(
        "shopkart_token",
        data.token
      );

      localStorage.setItem(
        "shopkart_user",
        JSON.stringify(data.user)
      );

      setToken(data.token);
      setUser(data.user);

      setAuthForm({
        name: "",
        email: "",
        password: "",
      });

      setAuthMessage("");

      setActiveTab("Profile");
    } catch (error) {
      setAuthMessage(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("shopkart_token");
    localStorage.removeItem("shopkart_user");

    setToken(null);
    setUser(null);

    setCart([]);
    setWishlist([]);

    setActiveTab("Home");
  };

  const openProfile = () => {
    if (token && user) {
      setActiveTab("Profile");
    } else {
      setAuthMode("login");
      setAuthMessage("");
      setActiveTab("Profile");
    }
  };

  /* =====================================================
     CART
  ===================================================== */

  const addToCart = (
    product,
    color = "Black",
    qty = 1
  ) => {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id &&
          item.color === color
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id &&
          item.color === color
            ? {
                ...item,
                quantity:
                  item.quantity + qty,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          color,
          quantity: qty,
        },
      ];
    });

    setProfileMessage(
      `${product.name} added to cart`
    );

    setTimeout(
      () => setProfileMessage(""),
      1800
    );
  };

  /*
     Voice assistant is mounted globally from App,
     so it remains available on Home, Profile,
     Cart, Wishlist, Orders and Product Detail.
  */
  useVoiceAssistant({
    search,
    setSearch,
    setCategory,
    setActiveTab,
    addToCart,
  });

  const removeFromCart = (
    productId,
    color
  ) => {
    setCart((current) =>
      current.filter(
        (item) =>
          !(
            item.id === productId &&
            item.color === color
          )
      )
    );
  };

  const updateQuantity = (
    productId,
    color,
    change
  ) => {
    setCart((current) =>
      current.map((item) => {
        if (
          item.id === productId &&
          item.color === color
        ) {
          return {
            ...item,
            quantity: Math.max(
              1,
              item.quantity + change
            ),
          };
        }

        return item;
      })
    );
  };

  const cartCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0
  );

  /* =====================================================
     WISHLIST
  ===================================================== */

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };

  /* =====================================================
     PRODUCT
  ===================================================== */

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedAngle(0);

    setSelectedColor(
      product.colors?.[0] || "Black"
    );

    setQuantity(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSearch = () => setSearch("");

  /* =====================================================
     PROFILE / LOGIN PAGE
  ===================================================== */

  if (activeTab === "Profile") {
    if (!token || !user) {
      return (
        <div className="app-shell">
          <main className="home-page">
            <header className="app-header">
              <div>
                <div className="logo">
                  <span>Shop</span>Kart
                </div>

                <p>
                  {authMode === "login"
                    ? "Welcome Back"
                    : "Create Your Account"}
                </p>
              </div>

              <button
                className="simple-back"
                onClick={() =>
                  setActiveTab("Home")
                }
              >
                <Icon name="back" />
              </button>
            </header>

            <section className="auth-card">
              <div className="auth-icon">
                <Icon
                  name="user"
                  size={32}
                />
              </div>

              <h1>
                {authMode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </h1>

              <p className="auth-subtitle">
                {authMode === "login"
                  ? "Login to continue shopping with ShopKart."
                  : "Create your ShopKart account to start shopping."}
              </p>

              {authMessage && (
                <div className="auth-message">
                  {authMessage}
                </div>
              )}

              <form
                className="auth-form"
                onSubmit={
                  handleAuthSubmit
                }
              >
                {authMode ===
                  "register" && (
                  <div className="input-group">
                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={
                        authForm.name
                      }
                      onChange={(e) =>
                        setAuthForm(
                          {
                            ...authForm,
                            name: e
                              .target
                              .value,
                          }
                        )
                      }
                      required
                    />
                  </div>
                )}

                <div className="input-group">
                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={
                      authForm.email
                    }
                    onChange={(e) =>
                      setAuthForm(
                        {
                          ...authForm,
                          email: e
                            .target
                            .value,
                        }
                      )
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={
                      authForm.password
                    }
                    onChange={(e) =>
                      setAuthForm(
                        {
                          ...authForm,
                          password:
                            e.target
                              .value,
                        }
                      )
                    }
                    required
                  />
                </div>

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={
                    authLoading
                  }
                >
                  {authLoading
                    ? "Please wait..."
                    : authMode ===
                      "login"
                    ? "Login"
                    : "Create Account"}
                </button>
              </form>

              <div className="auth-switch">
                <span>
                  {authMode ===
                  "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>

                <button
                  onClick={() => {
                    setAuthMode(
                      authMode ===
                        "login"
                        ? "register"
                        : "login"
                    );

                    setAuthMessage(
                      ""
                    );
                  }}
                >
                  {authMode ===
                  "login"
                    ? "Register"
                    : "Login"}
                </button>
              </div>

              <div className="demo-admin">
                <b>Admin Login</b>

                <span>
                  admin@shopkart.com
                </span>

                <span>
                  Password:
                  Admin@12345
                </span>
              </div>
            </section>

            <nav className="bottom-nav">
              {[
                ["Home", "home"],
                ["Explore", "explore"],
                ["Cart", "cart"],
                ["Wishlist", "heart"],
                ["Profile", "user"],
              ].map(
                ([label, icon]) => (
                  <button
                    key={label}
                    className={
                      activeTab ===
                      label
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        label
                      )
                    }
                  >
                    <span className="nav-icon">
                      <Icon
                        name={icon}
                        size={21}
                      />

                      {label ===
                        "Cart" &&
                        cartCount >
                          0 && (
                          <em>
                            {
                              cartCount
                            }
                          </em>
                        )}
                    </span>

                    <small>
                      {label}
                    </small>
                  </button>
                )
              )}
            </nav>
          </main>
        </div>
      );
    }

    return (
      <div className="app-shell">
        <main className="home-page">
          <header className="app-header">
            <div>
              <div className="logo">
                <span>Shop</span>Kart
              </div>

              <p>
                My Profile
              </p>
            </div>

            <button
              className="simple-back"
              onClick={() =>
                setActiveTab("Home")
              }
            >
              <Icon name="back" />
            </button>
          </header>

          <section className="profile-card">
            <div className="profile-avatar">
              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <h1>{user.name}</h1>

            <p>{user.email}</p>

            <span className="role-badge">
              {user.role ===
              "admin"
                ? "ADMIN"
                : "SHOPKART USER"}
            </span>
          </section>

          {profileMessage && (
            <div className="profile-toast">
              {profileMessage}
            </div>
          )}

          <section className="profile-menu">
            <button
              onClick={() =>
                setActiveTab("Cart")
              }
            >
              <span className="menu-icon blue">
                <Icon
                  name="cart"
                  size={20}
                />
              </span>

              <span>
                <b>My Cart</b>
                <small>
                  {cartCount} items
                </small>
              </span>

              <strong>›</strong>
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "Wishlist"
                )
              }
            >
              <span className="menu-icon pink">
                <Icon
                  name="heart"
                  size={20}
                />
              </span>

              <span>
                <b>Wishlist</b>
                <small>
                  {wishlist.length} saved
                  products
                </small>
              </span>

              <strong>›</strong>
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "Orders"
                )
              }
            >
              <span className="menu-icon green">
                <Icon
                  name="bag"
                  size={20}
                />
              </span>

              <span>
                <b>My Orders</b>
                <small>
                  View your orders
                </small>
              </span>

              <strong>›</strong>
            </button>

            {user.role ===
              "admin" && (
              <button
                onClick={() =>
                  alert(
                    "Admin dashboard API is available at /api/admin/stats"
                  )
                }
              >
                <span className="menu-icon purple">
                  <Icon
                    name="explore"
                    size={20}
                  />
                </span>

                <span>
                  <b>
                    Admin Dashboard
                  </b>
                  <small>
                    Manage ShopKart
                  </small>
                </span>

                <strong>›</strong>
              </button>
            )}

            <button
              className="logout-button"
              onClick={logout}
            >
              <span className="menu-icon red">
                <span>↪</span>
              </span>

              <span>
                <b>Logout</b>
                <small>
                  Sign out of ShopKart
                </small>
              </span>

              <strong>›</strong>
            </button>
          </section>

          <nav className="bottom-nav">
            {[
              ["Home", "home"],
              ["Explore", "explore"],
              ["Cart", "cart"],
              ["Wishlist", "heart"],
              ["Profile", "user"],
            ].map(
              ([label, icon]) => (
                <button
                  key={label}
                  className={
                    activeTab ===
                    label
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      label
                    )
                  }
                >
                  <span className="nav-icon">
                    <Icon
                      name={icon}
                      size={21}
                    />

                    {label ===
                      "Cart" &&
                      cartCount >
                        0 && (
                        <em>
                          {
                            cartCount
                          }
                        </em>
                      )}
                  </span>

                  <small>
                    {label}
                  </small>
                </button>
              )
            )}
          </nav>
        </main>
      </div>
    );
  }

  /* =====================================================
     ORDERS PAGE
  ===================================================== */

  if (activeTab === "Orders") {
    if (!token || !user) {
      setActiveTab("Profile");
      return null;
    }

    return (
      <div className="app-shell">
        <main className="home-page">
          <header className="app-header">
            <div>
              <div className="logo">
                <span>Shop</span>Kart
              </div>

              <p>
                My Orders
              </p>
            </div>

            <button
              className="simple-back"
              onClick={() =>
                setActiveTab(
                  "Profile"
                )
              }
            >
              <Icon name="back" />
            </button>
          </header>

          <div className="empty-state">
            <div>📦</div>

            <h3>
              Orders are connected
            </h3>

            <p>
              Your orders will appear
              here after checkout.
            </p>

            <button
              onClick={() =>
                setActiveTab(
                  "Home"
                )
              }
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =====================================================
     CART PAGE
  ===================================================== */

  if (activeTab === "Cart") {
    return (
      <div className="app-shell">
        <main className="cart-page">
          <header className="detail-top">
            <button
              onClick={() =>
                setActiveTab("Home")
              }
            >
              <Icon name="back" />
            </button>

            <h2>My Cart</h2>

            <span className="cart-header-count">
              {cartCount} items
            </span>
          </header>

          {cart.length === 0 ? (
            <div className="empty-state">
              <div>🛒</div>

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add products to your
                cart to continue.
              </p>

              <button
                onClick={() =>
                  setActiveTab(
                    "Home"
                  )
                }
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <section className="cart-list">
                {cart.map((item) => (
                  <article
                    className="cart-item"
                    key={`${item.id}-${item.color}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-info">
                      <small>
                        {item.category}
                      </small>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Color:{" "}
                        <b>
                          {item.color}
                        </b>
                      </p>

                      <strong>
                        {formatPrice(
                          item.price
                        )}
                      </strong>

                      <div className="cart-controls">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.color,
                              -1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.color,
                              1
                            )
                          }
                        >
                          +
                        </button>

                        <button
                          className="remove-cart"
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.color
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className="checkout-box">
                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    {formatPrice(
                      cartTotal
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Delivery
                  </span>

                  <strong>
                    {cartTotal >=
                    500
                      ? "FREE"
                      : formatPrice(
                          50
                        )}
                  </strong>
                </div>

                <hr />

                <div className="grand-total">
                  <span>
                    Total
                  </span>

                  <strong>
                    {formatPrice(
                      cartTotal >=
                        500
                        ? cartTotal
                        : cartTotal + 50
                    )}
                  </strong>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    if (!token) {
                      setActiveTab(
                        "Profile"
                      );
                      setAuthMode(
                        "login"
                      );
                      return;
                    }

                    alert(
                      "Checkout and payment screen will use your logged-in account."
                    );
                  }}
                >
                  Proceed to Checkout
                </button>
              </section>
            </>
          )}
        </main>
      </div>
    );
  }

  /* =====================================================
     WISHLIST
  ===================================================== */

  if (activeTab === "Wishlist") {
    const wishedProducts =
      products.filter((product) =>
        wishlist.includes(
          product.id
        )
      );

    return (
      <div className="app-shell">
        <main className="home-page">
          <header className="app-header">
            <div>
              <div className="logo">
                <span>Shop</span>Kart
              </div>

              <p>
                My Wishlist
              </p>
            </div>

            <button
              className="simple-back"
              onClick={() =>
                setActiveTab("Home")
              }
            >
              <Icon name="back" />
            </button>
          </header>

          {wishedProducts.length ===
          0 ? (
            <div className="empty-state">
              <div>♡</div>

              <h3>
                Your wishlist is empty
              </h3>

              <p>
                Save products you
                love here.
              </p>

              <button
                onClick={() =>
                  setActiveTab(
                    "Home"
                  )
                }
              >
                Explore Products
              </button>
            </div>
          ) : (
            <section className="product-grid">
              {wishedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wished={true}
                    onWishlist={
                      toggleWishlist
                    }
                    onOpen={
                      openProduct
                    }
                    onAdd={
                      addToCart
                    }
                  />
                )
              )}
            </section>
          )}

          <nav className="bottom-nav">
            {[
              ["Home", "home"],
              ["Explore", "explore"],
              ["Cart", "cart"],
              ["Wishlist", "heart"],
              ["Profile", "user"],
            ].map(
              ([label, icon]) => (
                <button
                  key={label}
                  className={
                    activeTab ===
                    label
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      label
                    )
                  }
                >
                  <span className="nav-icon">
                    <Icon
                      name={icon}
                      size={21}
                    />

                    {label ===
                      "Cart" &&
                      cartCount >
                        0 && (
                        <em>
                          {
                            cartCount
                          }
                        </em>
                      )}
                  </span>

                  <small>
                    {label}
                  </small>
                </button>
              )
            )}
          </nav>
        </main>
      </div>
    );
  }

  /* =====================================================
     PRODUCT DETAIL
  ===================================================== */

  if (selectedProduct) {
    const p =
      selectedProduct;

    const discount =
      Math.round(
        (1 -
          p.price /
            p.oldPrice) *
          100
      );

    return (
      <div className="app-shell">
        <main className="detail-page">
          <header className="detail-top">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setSelectedAngle(0);
              }}
            >
              <Icon name="back" />
            </button>

            <div className="detail-actions">
              <button
                className={
                  wishlist.includes(
                    p.id
                  )
                    ? "pink"
                    : ""
                }
                onClick={() =>
                  toggleWishlist(
                    p.id
                  )
                }
              >
                <Icon
                  name="heart"
                  size={24}
                />
              </button>

              <button>
                <Icon name="share" />
              </button>

              <button
                className="bag-wrap"
                onClick={() =>
                  setActiveTab(
                    "Cart"
                  )
                }
              >
                <Icon name="bag" />

                {cartCount >
                  0 && (
                  <span>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          <section className="detail-image-area">
            <div className="thumb-column">
              {[
                { label: "Front", transform: "none" },
                { label: "Back", transform: "scaleX(-1)" },
                { label: "Side", transform: "perspective(900px) rotateY(-28deg) rotateX(1deg) scale(.9)" },
                { label: "Angle", transform: "perspective(900px) rotateY(25deg) rotateX(3deg) scale(.92)" },
              ].map((angle, i) => (
                <button
                  type="button"
                  className={`thumb ${selectedAngle === i ? "selected" : ""}`}
                  key={angle.label}
                  onClick={() => setSelectedAngle(i)}
                  title={`${p.name} - ${angle.label} View`}
                >
                  <img
                    src={p.thumb || p.image}
                    alt={`${p.name} ${angle.label} view`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: angle.transform,
                      transition: "transform 0.35s ease",
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="main-detail-image">
              <img
                key={`${p.id}-${selectedAngle}`}
                src={p.image}
                alt={`${p.name} ${["Front", "Back", "Side", "Angle"][selectedAngle]} view`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "transform 0.45s ease",
                  transform: [
                    "none",
                    "scaleX(-1)",
                    "perspective(900px) rotateY(-28deg) rotateX(1deg) scale(.9)",
                    "perspective(900px) rotateY(25deg) rotateX(3deg) scale(.92)",
                  ][selectedAngle] || "none",
                }}
              />
            </div>
          </section>

          <div className="dots">
            {[0, 1, 2, 3].map((i) => (
              <button
                type="button"
                key={i}
                className={selectedAngle === i ? "active" : ""}
                onClick={() => setSelectedAngle(i)}
                aria-label={`Show ${i + 1} of 4 product views`}
              />
            ))}
          </div>

          <section className="detail-content">
            <div className="product-category">
              {p.category}
            </div>

            <h1>{p.name}</h1>

            <div className="detail-rating">
              <span className="star">
                ★
              </span>

              <b>{p.rating}</b>

              <span>|</span>

              <span>
                {p.reviews} Reviews
              </span>

              <span>|</span>

              <span>
                {p.sold} Sold
              </span>
            </div>

            <div className="detail-price">
              <strong>
                {formatPrice(
                  p.price
                )}
              </strong>

              <del>
                {formatPrice(
                  p.oldPrice
                )}
              </del>

              <span>
                {discount}% OFF
              </span>
            </div>

            <div className="tabs">
              <button className="active">
                About Item
              </button>

              <button>
                Reviews
              </button>
            </div>

            <div className="spec-row">
              <span>
                Brand:
              </span>

              <b>{p.brand}</b>

              <span>
                Stock:
              </span>

              <b>{p.stock}</b>
            </div>

            <div className="option-section">
              <label>
                Color:
                <b className="selected-color-name">
                  {" "}
                  {selectedColor}
                </b>
              </label>

              <div className="color-options">
                {p.colors.map(
                  (color) => (
                    <button
                      key={color}
                      className={`color-choice ${
                        selectedColor ===
                        color
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedColor(
                          color
                        )
                      }
                    >
                      <span
                        style={{
                          backgroundColor:
                            color.toLowerCase() ===
                            "silver"
                              ? "#c5cbd3"
                              : color.toLowerCase() ===
                                "grey"
                              ? "#858b94"
                              : color.toLowerCase(),
                        }}
                      />

                      <small>
                        {color}
                      </small>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="option-section quantity-section">
              <label>
                Quantity:
              </label>

              <div className="quantity">
                <button
                  onClick={() =>
                    setQuantity(
                      (q) =>
                        Math.max(
                          1,
                          q - 1
                        )
                    )
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      (q) =>
                        Math.min(
                          p.stock,
                          q + 1
                        )
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </section>

          <div className="detail-bottom">
            <div className="bottom-price">
              <strong>
                {formatPrice(
                  p.price *
                    quantity
                )}
              </strong>

              <del>
                {formatPrice(
                  p.oldPrice *
                    quantity
                )}
              </del>
            </div>

            <button
              className="outline-buy"
              onClick={() =>
                addToCart(
                  p,
                  selectedColor,
                  quantity
                )
              }
            >
              <Icon
                name="cart"
                size={20}
              />
              Add to Cart
            </button>

            <button
              className="buy-now"
              onClick={() => {
                addToCart(
                  p,
                  selectedColor,
                  quantity
                );

                setSelectedProduct(
                  null
                );

                setActiveTab(
                  "Cart"
                );
              }}
            >
              Buy Now
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =====================================================
     HOME
  ===================================================== */

  return (
    <>
      <div className="app-shell">
        <main className="home-page">
        <header className="app-header">
          <div>
            <div className="logo">
              <span>Shop</span>Kart
            </div>

            <p>
              Smart Shopping
            </p>
          </div>

          <div className="header-actions">
            <button>
              <Icon
                name="bell"
                size={23}
              />

              <i />
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "Cart"
                )
              }
              className="bag-wrap"
            >
              <Icon
                name="bag"
                size={23}
              />

              {cartCount >
                0 && (
                <span>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        <div className="search-box">
          <Icon
            name="search"
            size={19}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search products, brands and more..."
          />

          {search && (
            <button
              className="clear-search"
              onClick={
                clearSearch
              }
            >
              ×
            </button>
          )}
        </div>

        <section className="sale-banner">
          <div className="sale-copy">
            <small>
              #SHOPKART DAY
            </small>

            <h2>
              UP TO
              <br />
              70% OFF
            </h2>

            <p>
              Discover amazing
              products
              <br />
              at special prices.
            </p>

            <button
              onClick={() =>
                setCategory(
                  "All"
                )
              }
            >
              Shop Now
            </button>
          </div>

          <div className="clothes-art">
            <div className="rack" />
            <div className="cloth c1" />
            <div className="cloth c2" />
            <div className="cloth c3" />
            <div className="cloth c4" />
          </div>
        </section>

        <section className="category-row">
          {categories.map(
            (item) => (
              <button
                key={item.name}
                className={
                  category ===
                  item.name
                    ? "category active"
                    : "category"
                }
                onClick={() =>
                  setCategory(
                    item.name
                  )
                }
              >
                <span className="category-icon">
                  {item.icon}
                </span>

                <small>
                  {item.name}
                </small>
              </button>
            )
          )}
        </section>

        <section className="section-heading">
          <h2>
            {search
              ? "Search Results"
              : "Best Sale Products"}
          </h2>

          <span>
            {
              filteredProducts.length
            }{" "}
            items
          </span>
        </section>

        {filteredProducts.length ===
        0 ? (
          <div className="empty-state">
            <div>⌕</div>

            <h3>
              No products found
            </h3>

            <p>
              Try another product
              name, brand or
              category.
            </p>

            <button
              onClick={() => {
                clearSearch();
                setCategory(
                  "All"
                );
              }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <section className="product-grid">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wished={wishlist.includes(
                    product.id
                  )}
                  onWishlist={
                    toggleWishlist
                  }
                  onOpen={
                    openProduct
                  }
                  onAdd={
                    addToCart
                  }
                />
              )
            )}
          </section>
        )}

        <section className="service-row">
          <div>
            <b>✓</b>
            <span>
              Secure
              <br />
              Payment
            </span>
          </div>

          <div>
            <b>↻</b>
            <span>
              Easy
              <br />
              Returns
            </span>
          </div>

          <div>
            <b>⚡</b>
            <span>
              Fast
              <br />
              Delivery
            </span>
          </div>
        </section>

        <nav className="bottom-nav">
          {[
            ["Home", "home"],
            ["Explore", "explore"],
            ["Cart", "cart"],
            ["Wishlist", "heart"],
            ["Profile", "user"],
          ].map(
            ([label, icon]) => (
              <button
                key={label}
                className={
                  activeTab ===
                  label
                    ? "active"
                    : ""
                }
                onClick={() => {
                  if (
                    label ===
                    "Profile"
                  ) {
                    openProfile();
                  } else {
                    setActiveTab(
                      label
                    );
                  }
                }}
              >
                <span className="nav-icon">
                  <Icon
                    name={icon}
                    size={21}
                  />

                  {label ===
                    "Cart" &&
                    cartCount >
                      0 && (
                      <em>
                        {
                          cartCount
                        }
                      </em>
                    )}
                </span>

                <small>
                  {label}
                </small>
              </button>
            )
          )}
        </nav>
      </main>
    </div>
    </>
  );
}