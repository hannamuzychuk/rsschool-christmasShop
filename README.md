# 🎄 Christmas Shop — Responsive Design (Part 2)

A responsive two-page website created as part of the **RS School Front-End Course**.  
The project represents a festive-themed gift shop and focuses on building a **fully adaptive layout across multiple screen sizes**.

---

## 🚀 Live Demo

👉 https://hannamuzychuk.github.io/rsschool-christmasShop/christmas-shop/gifts.html

---

## 📁 Project Structure

/project-root  
│── index.html  
│── gifts.html  
│── css/  
│   └── style.css  
│── js/  
│   └── script.js  
│── image/  
│── icons/  
│── favicon.svg 

---

## 🖥️ Pages

### 🏠 Home Page (`index.html`)
- Hero section  
- About section  
- Slider section  
- Best Gifts section  
- CTA section (Subscribe + Countdown)  
- Footer with contacts  

### 🎁 Gifts Page (`gifts.html`)
- Hero section with category tabs  
- Gifts catalog (responsive grid)  
- Footer with contacts  

---

## 🎯 Task Goal

Adapt the layout created in Part 1 to be fully responsive and match the Figma design at different screen sizes.

---

## 📱 Responsive Design

The layout is optimized for:

- **1440px (Desktop)**
- **768px (Tablet)**
- **380px (Mobile)**

### ✅ Key Features

- Responsive layout using **Flexbox & CSS Grid**
- Relative units (`%`, `rem`, `vh`)
- No horizontal scroll at widths ≤ 380px
- All content preserved (no cropping or shifting)
- Images maintain correct aspect ratios
- No extra white space on the right
- Smooth resizing from 1440px to 380px

---

## 🍔 Navigation

- At **≤ 768px**:
  - Navigation menu is hidden
  - Burger menu icon is displayed
- Desktop navigation is shown above 768px

---

## ✨ Interactivity

- Hover effects (desktop only):
  - Navigation links  
  - Gift cards  
  - Footer cards  
- Hover disabled on mobile devices  
- Smooth scrolling navigation  
- Clickable elements:
  - Phone (`tel:`)
  - Email (`mailto:`)
  - Google Maps (new tab)

---

## 🎨 Technologies Used

- HTML5  
- CSS3 (Flexbox, Grid)  
- JavaScript (basic)  
- Google Fonts (Allura, Montserrat)  

---

## 🧪 Validation

- ✅ W3C Valid HTML (no errors)  
- ✅ Semantic HTML5 structure  
- ✅ One `<h1>` per page  
- ✅ Clean and structured code  

---

## 📊 CrossCheck Criteria Coverage

✔ Layout matches design at **1440px, 768px, 380px**  
✔ All required sections implemented on both pages  
✔ No horizontal scroll across all breakpoints  
✔ Smooth responsive behavior without layout breaking  
✔ Burger menu displayed correctly at 768px  
✔ Hover effects active on desktop, disabled on mobile  
✔ Fully validated via W3C Validator  

---

## 📌 Notes

- Tested in DevTools Responsive Mode  
- Verified against design using PerfectPixel  
- Minor deviations within acceptable ±10px  

---

## 📜 License

Created for educational purposes as part of the **RS School curriculum**.
