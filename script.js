document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // 2. Tab Switcher (Students & Parents vs Teachers)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const stepsStudents = document.getElementById("stepsStudents");
  const stepsTeachers = document.getElementById("stepsTeachers");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const target = button.getAttribute("data-tab");
      if (target === "students") {
        stepsStudents.classList.remove("d-none");
        stepsTeachers.classList.add("d-none");
      } else {
        stepsStudents.classList.add("d-none");
        stepsTeachers.classList.remove("d-none");
      }
    });
  });

  // 3. Step Arrows & Walkthrough Modal
  const stepDetailsData = {
    "1": {
      badge: "STEP 01 — SEARCH & FILTER",
      title: "1. Search & Filter",
      desc: "Tell us your subject, location and budget. Explore teachers who fit your specific learning goals, languages, and preferred consultation formats.",
      action: "Explore Teachers"
    },
    "2": {
      badge: "STEP 02 — DATE & FORMAT",
      title: "2. Select Date & Format",
      desc: "Pick a calendar slot and choose online or in-person learning. Select Google Meet/Zoom or an agreed-upon local learning space.",
      action: "Check Availability"
    },
    "3": {
      badge: "STEP 03 — PAYMENT",
      title: "3. Secure Payment",
      desc: "Review the session price and payment details before you confirm. Upfront transparent pricing with complete payment protection.",
      action: "Review Pricing Terms"
    },
    "4": {
      badge: "STEP 04 — ATTEND & REVIEW",
      title: "4. Attend & Review",
      desc: "Meet your teacher, start learning and share a review after your session to guide future students and parents.",
      action: "View Guidelines"
    },
    "teacher-1": {
      badge: "TEACHER STEP 01",
      title: "1. Build Profile",
      desc: "Register and showcase your subjects, qualifications, and teaching experience to reach learners directly.",
      action: "Start Profile"
    },
    "teacher-2": {
      badge: "TEACHER STEP 02",
      title: "2. Submit Verification",
      desc: "Upload your academic credentials and ID for internal review and platform badge approval.",
      action: "Upload Documents"
    },
    "teacher-3": {
      badge: "TEACHER STEP 03",
      title: "3. Set Schedule",
      desc: "Define your availability calendar and set your session rates with complete control.",
      action: "Open Schedule"
    },
    "teacher-4": {
      badge: "TEACHER STEP 04",
      title: "4. Teach & Earn",
      desc: "Accept booking requests, consult via Google Meet or in person, and track payouts transparently.",
      action: "Explore Payouts"
    }
  };

  const infoModal = document.getElementById("infoModal");
  const modalBadge = document.getElementById("modalStepBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalActionBtn = document.getElementById("modalActionBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  document.querySelectorAll(".step-card").forEach(card => {
    card.addEventListener("click", () => {
      const stepKey = card.getAttribute("data-step");
      const info = stepDetailsData[stepKey];

      if (info && infoModal) {
        modalBadge.textContent = info.badge;
        modalTitle.textContent = info.title;
        modalDesc.textContent = info.desc;
        modalActionBtn.textContent = info.action;
        infoModal.classList.add("open");
      }
    });
  });

  if (modalCloseBtn && infoModal) {
    modalCloseBtn.addEventListener("click", () => infoModal.classList.remove("open"));
    modalActionBtn.addEventListener("click", () => infoModal.classList.remove("open"));
    infoModal.addEventListener("click", (e) => {
      if (e.target === infoModal) infoModal.classList.remove("open");
    });
  }

  // 4. FAQ Accordion Single Toggle
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-toggle-icon");

    questionBtn.addEventListener("click", () => {
      const isOpen = answer.classList.contains("show");

      faqItems.forEach(otherItem => {
        otherItem.querySelector(".faq-answer").classList.remove("show");
        otherItem.querySelector(".faq-toggle-icon").textContent = "+";
        otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        answer.classList.add("show");
        icon.textContent = "−";
        questionBtn.setAttribute("aria-expanded", "true");
      } else {
        answer.classList.remove("show");
        icon.textContent = "+";
        questionBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 5. Video Preview Initialization
  initMockVideoCanvas("studentVideoCanvas", "#1e3a8a", "Student Story • Class 10");
  initMockVideoCanvas("lecturerVideoCanvas", "#064e3b", "Educator Story • Physics Dept");

  document.querySelectorAll(".video-thumbnail-container").forEach(container => {
    container.addEventListener("click", () => {
      const overlay = container.querySelector(".video-overlay");
      const videoType = container.getAttribute("data-video");
      overlay.style.background = "rgba(0, 0, 0, 0.85)";
      overlay.innerHTML = `
        <div style="text-align: center; color: white; padding: 20px;">
          <div style="font-size: 2rem; margin-bottom: 8px;">▶</div>
          <p style="font-weight: 700; font-size: 1rem;">Playing ${videoType === 'student' ? 'Student' : 'Lecturer'} Feedback</p>
          <span style="font-size: 0.8rem; opacity: 0.8;">Sample player active</span>
        </div>
      `;
    });
  });

  // 6. Interactive Click for Mascot Logo
  const logo = document.getElementById("interactiveLogo");
  if (logo) {
    logo.addEventListener("click", () => {
      const leaves = logo.querySelectorAll(".flipping-leaf");
      leaves.forEach(leaf => {
        leaf.style.animationDuration = "0.6s";
        setTimeout(() => {
          leaf.style.animationDuration = "";
        }, 1300);
      });
    });
  }
});

function initMockVideoCanvas(canvasId, bgColor, textLabel) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 640, 360);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, "#0f172a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 640, 360);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(50, 140 + i * 20);
    ctx.bezierCurveTo(200, 100 + i * 25, 400, 180 + i * 15, 590, 140 + i * 20);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(textLabel, 40, 310);

  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Click to play sample video", 40, 335);
}
// Profile Hotspot Modal Trigger
const hotspotBtn = document.getElementById("openProfileHotspot");
const profileModal = document.getElementById("profileModal");
const closeProfileBtn = document.getElementById("closeProfileModal");
const modalHowItWorksBtn = document.getElementById("modalHowItWorksBtn");
const modalBookBtn = document.getElementById("modalBookNowBtn");

if (hotspotBtn && profileModal) {
  hotspotBtn.addEventListener("click", () => {
    profileModal.classList.add("open");
    profileModal.setAttribute("aria-hidden", "false");
  });

  const closeModal = () => {
    profileModal.classList.remove("open");
    profileModal.setAttribute("aria-hidden", "true");
  };

  if (closeProfileBtn) closeProfileBtn.addEventListener("click", closeModal);
  if (modalHowItWorksBtn) modalHowItWorksBtn.addEventListener("click", closeModal);

  if (modalBookBtn) {
    modalBookBtn.addEventListener("click", () => {
      alert("Consultation request initiated for Ananya Rao. Redirecting to schedule selection...");
      closeModal();
    });
  }

  profileModal.addEventListener("click", (e) => {
    if (e.target === profileModal) closeModal();
  });
}