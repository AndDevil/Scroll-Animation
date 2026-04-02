# ITZFIZZ - Interactive Car Scroll Experience

A high-performance, scroll-driven hero section built with **Next.js**, **GSAP**, and **Tailwind CSS**. This project features a synchronized 3D-style car animation that "paints" the road and reveals hidden messaging as the user scrolls.

## 🚀 Key Features

* **Stealth Reveal Headline:** The "WELCOME ITZFIZZ" headline starts invisible (matching the road color) and is revealed dynamically as the car's white road-fill passes behind it.
* **Pixel-Perfect Synchronization:** * The **Road Fill** is mathematically synced to the car's back bumper.
    * **Milestone Cards** are synced to trigger exactly as the car's front bumper passes their horizontal position.
* **Persistent Milestones:** Impact metrics fade and scale in with premium easing and remain visible for the duration of the experience.
* **Hardware Accelerated:** Optimized using CSS `transform` (GPU-based) and `will-change` properties to ensure a smooth 60fps experience even on mobile devices.
* **Adaptive Contrast:** Utilizes `mix-blend-mode` (or high-contrast layering) to ensure text remains readable as the background colors shift.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Animations:** [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
* **React Integration:** [@gsap/react](https://www.npmjs.com/package/@gsap/react) (for safe hook-based cleanup)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/)

## 📦 Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AndDevil/Scroll-Animation.git](https://github.com/AndDevil/Scroll-Animation.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📖 Project Structure

* `/app/page.tsx`: Contains the core GSAP Master Timeline and ScrollTrigger logic.
* `/public/car.png`: The car asset used for the scroll animation.
* `tailwind.config.ts`: Custom configurations for gradients and animations.

## 📜 Credits

Inspired by the creative scroll mechanics of the [Paras Chaturvedi car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation).

---
Developed by [Shrish Kumar](https://github.com/AndDevil)
