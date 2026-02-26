function App() {
            const [menuOpen, setMenuOpen] = React.useState(false);

            const [cartCount, setCartCount] = React.useState(0);

            const [showLogin, setShowLogin] = React.useState(false);
            const [showRegister, setShowRegister] = React.useState(false);
            const [showForgot, setShowForgot] = React.useState(false);

            const [company, setCompany] = React.useState("");
            const [firstName, setFirstName] = React.useState("");
            const [lastName, setLastName] = React.useState("");
            const [email, setEmail] = React.useState("");
            const [emailError, setEmailError] = React.useState("");
            const [password, setPassword] = React.useState("");
            const [confirmPassword, setConfirmPassword] = React.useState("");
            const [passwordStrength, setPasswordStrength] = React.useState(0);

            const [forgotEmail, setForgotEmail] = React.useState("");
            const [forgotError, setForgotError] = React.useState("");

            const [showTopBar, setShowTopBar] = React.useState(false);

            const [language, setLanguage] = React.useState("ro"); // default RO
            const [dropdownOpen, setDropdownOpen] = React.useState(false);

            const [currentReview, setCurrentReview] = React.useState(0);
  
            const reviews = [
                { text: "Antrenamentele sunt fantastice! Am văzut rezultate reale în doar câteva săptămâni.", author: "Maria P." },
                { text: "Programul Pro mi-a schimbat complet rutina și stilul de viață. Recomand cu încredere!", author: "Alex D." },
                { text: "Trainerul este extrem de profesionist și atent la detalii. Experiență excelentă!", author: "Ioana S." },
                { text: "Abonamentul Elite m-a ajutat să ating obiective pe care nu le credeam posibile.", author: "Cristian M." },
                { text: "Atmosfera și suportul oferit sunt incredibile. Recomand tuturor celor serioși.", author: "Andreea T." }
            ];
            
            function checkPasswordStrength(pw) {
                let strength = 0;
                if(pw.length >= 6) strength++;
                if(/[A-Z]/.test(pw) && /[0-9]/.test(pw)) strength++;
                if(pw.length >= 8 && /[!@#$%^&*]/.test(pw)) strength++;
                return Math.min(strength, 2);
            }

            function nextReview() {
                setCurrentReview((prev) => (prev + 1) % reviews.length);
            }

            function prevReview() {
                setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
            }
            React.useEffect(() => {
                const handleScroll = () => {
                    if (window.scrollY > 400) { // apare după 100px scroll
                        setShowTopBar(true);
                    } else {
                        setShowTopBar(false);
                    }
                };
                window.addEventListener("scroll", handleScroll);
                return () => window.removeEventListener("scroll", handleScroll);
            }, []);
            // Optional: auto-slide la 5 secunde
            React.useEffect(() => {
                const interval = setInterval(() => {
                    nextReview();
                }, 5000);
                return () => clearInterval(interval);
            }, []);
            /* AUTO-SLIDESHOW LOGIC */
            React.useEffect(() => {
                const track = document.getElementById("packageTrack");
                if (!track) return;

                let scrollAmount = 0;
                let maxScroll = track.scrollWidth - track.clientWidth;

                const interval = setInterval(() => {
                    if (scrollAmount >= maxScroll) {
                        scrollAmount = 0;
                    } else {
                        scrollAmount += 300;
                    }
                    track.scrollTo({ left: scrollAmount, behavior: "smooth" });
                }, 3000);

                return () => clearInterval(interval);
            }, []);

            return (
                <div>

                    {/* ICONS */}
                    <i className="bi bi-person signin-logo" onClick={() => setShowLogin(true)}></i>
                    <a href="cartbutton.html" className="cart-button">
                    <i className="bi bi-cart"></i>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </a>                    

                    {/* MENU */}
                    <div className="menu-container">
                        <div className={`menu-button ${menuOpen ? "change" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        <div className="menu" style={{maxHeight: menuOpen ? "200px" : "0"}}>
                            <a href="#">Acasa</a>
                            <a href="#">Despre mine</a>
                            <a href="#">Abonamente</a>
                            <a href="#">Pachete</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                    <div className="language-switcher">
                     <i className="bi bi-globe2" onClick={() => setDropdownOpen(!dropdownOpen)}></i>

                    {/* Slide-down dropdown */}
                     <div 
                    className="language-dropdown" 
                    style={{
                        maxHeight: dropdownOpen ? "100px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.2s ease"
                    }}
                    >
                    <div onClick={() => { setLanguage("ro"); setDropdownOpen(false); }}>RO</div>
                    <div onClick={() => { setLanguage("en"); setDropdownOpen(false); }}>EN</div>
                    </div>
                    </div>
                    {/* ------------------------------------------------ */}
                    {/* LOGIN MODAL */}
                    {/* ------------------------------------------------ */}
                    {showLogin &&
                        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                            <div className="modal fancy" onClick={(e) => e.stopPropagation()}>
                                <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>

                                <h2><i className="bi bi-person-circle"></i></h2>
                                <p className="modal-subtitle">Loghează-te în contul tău</p>

                                <input type="text" placeholder="Username" className="modal-input" />
                                <input type="password" placeholder="Password" className="modal-input" />

                                <button className="login-btn">Login</button>

                                <p className="modal-footer">
                                    Ai uitat parola?{" "}
                                    <span className="modal-link" onClick={() => {
                                        setShowLogin(false);
                                        setShowForgot(true);
                                    }}>
                                        Resetează
                                    </span>
                                </p>

                                <p className="modal-footer">
                                    Nu ai cont?{" "}
                                    <span className="modal-link"
                                        onClick={() => {
                                            setShowLogin(false);
                                            setShowRegister(true);
                                        }}>
                                        Creează unul
                                    </span>
                                </p>
                            </div>
                        </div>
                    }

                    {/* ------------------------------------------------ */}
                    {/* FORGOT PASSWORD MODAL */}
                    {/* ------------------------------------------------ */}
                    {showForgot &&
                        <div className="modal-overlay" onClick={() => setShowForgot(false)}>
                            <div className="modal fancy" onClick={(e) => e.stopPropagation()}>
                                <button className="close-btn" onClick={() => setShowForgot(false)}>×</button>

                                <h2>Resetează parola</h2>
                                <p className="modal-subtitle">Introdu adresa ta de email</p>

                                <input type="email"
                                       className="modal-input"
                                       placeholder="Email"
                                       value={forgotEmail}
                                       onChange={(e)=>{ setForgotEmail(e.target.value); setForgotError(""); }}
                                />

                                {forgotError && <p className="error-msg">{forgotError}</p>}

                                <button className="login-btn" onClick={()=>{
                                    if (!forgotEmail.includes("@") || !forgotEmail.includes(".")) {
                                        setForgotError("Email invalid");
                                        return;
                                    }
                                    alert("Dacă email-ul există, vei primi un link de resetare!");
                                    setShowForgot(false);
                                }}>
                                    Trimite link-ul
                                </button>

                                <p className="modal-footer">
                                    <span className="modal-link"
                                        onClick={()=>{
                                            setShowForgot(false);
                                            setShowLogin(true);
                                        }}>
                                        Înapoi la Login
                                    </span>
                                </p>
                            </div>
                        </div>
                    }

                    {/* ------------------------------------------------ */}
                    {/* REGISTER MODAL */}
                    {/* ------------------------------------------------ */}
                    {showRegister &&
                        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
                            <div className="modal fancy" onClick={(e) => e.stopPropagation()}>
                                <button className="close-btn" onClick={() => setShowRegister(false)}>×</button>

                                <h2>Create Account</h2>
                                <p className="modal-subtitle">Înregistrează-te rapid</p>

                                <input type="text" placeholder="Company Name" className="modal-input" value={company} onChange={(e) => setCompany(e.target.value)} />
                                <input type="text" placeholder="First Name" className="modal-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <input type="text" placeholder="Last Name" className="modal-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                                <input type="email" placeholder="Email" className="modal-input" value={email}
                                    onChange={(e)=>{ setEmail(e.target.value); setEmailError(""); }} />
                                {emailError && <p className="error-msg">{emailError}</p>}

                                {/* PASSWORD */}
                                <div className="password-container">
                                    <input type="password" placeholder="Password" className="modal-input"
                                        value={password}
                                        onChange={(e)=>{
                                            setPassword(e.target.value);
                                            setPasswordStrength(checkPasswordStrength(e.target.value));
                                        }}
                                    />

                                    <div className="password-strength-inline">
                                        <span className={`circle ${passwordStrength >= 0 ? "weak" : ""}`}></span>
                                        <span className={`circle ${passwordStrength >= 1 ? "medium" : ""}`}></span>
                                        <span className={`circle ${passwordStrength >= 2 ? "strong" : ""}`}></span>
                                    </div>
                                </div>

                                <input type="password" placeholder="Confirm Password" className="modal-input"
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />

                                {confirmPassword.length > 0 && password !== confirmPassword &&
                                    <p className="error-msg">Parolele nu coincid</p>
                                }

                                <button className="login-btn" onClick={()=>{
                                    if (!email.includes("@")) { setEmailError("Email invalid"); return; }
                                    if(password !== confirmPassword){ return; }
                                }}>
                                    Sign Up
                                </button>

                                <p className="modal-footer">
                                    Ai deja cont?{" "}
                                    <span className="modal-link"
                                        onClick={()=>{
                                            setShowRegister(false);
                                            setShowLogin(true);
                                        }}>
                                        Login
                                    </span>
                                </p>
                            </div>
                        </div>
                    }
                    {/* BARA ALBĂ SUS */}
                    {showTopBar && (
                <div className="top-bar">
                    {/* Icon-uri */}
                    <i className="bi bi-person signin-logo" onClick={() => setShowLogin(true)}></i>
                    <a href="cartbutton.html" className="cart-button"><i className="bi bi-cart"></i></a>

                   
                </div>
)}




                    {/* ------------------------------------------------ */}
                    {/* LANDING PAGE */}
                    {/* ------------------------------------------------ */}

                    <div className="landing-hero">
                        <video src="hero.mp4" autoPlay loop muted></video>
                        <div className="landing-hero-text">Fitness pentru toată lumea</div>
                    </div>

                    <section className="landing-trainer">
                        <img src="trainer.jpg" alt="Trainer" />
                        <div className="landing-trainer-text">
                            <h2>Despre antrenor</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </section>

                    {/* PACKAGES */}
                    <section className="landing-packages">
                        <h2>Pachetele noastre</h2>

                        <div className="slideshow-wrapper">
                            <div className="slideshow-track" id="packageTrack">

                                <div className="landing-package-card">
                                <img src="package1.jpg" />
                                <h3>Basic</h3>
                                <p>Acces la programe generale</p>
                                <button onClick={() => setCartCount(cartCount + 1)}>
                                Adaugă în coș
                                </button>                               
                                 </div>

                                <div className="landing-package-card">
                                <img src="package2.jpg" />
                                <h3>Pro</h3>
                                <p>Plan personalizat + suport</p>
                                <button onClick={() => setCartCount(cartCount + 1)}>Adaugă în coș</button>
                                </div>

                                <div className="landing-package-card">
                                <img src="package3.jpg" />
                                <h3>Elite</h3>
                                <p>Programe avansate</p>
                                <button onClick={() => setCartCount(cartCount + 1)}>Adaugă în coș</button>
                                </div>

                                <div className="landing-package-card">
                                <img src="package4.jpg" />
                                <h3>VIP</h3>
                                <p>Mentorat + dietă</p>
                                <button onClick={() => setCartCount(cartCount + 1)}>Adaugă în coș</button>
                                </div>

                                <div className="landing-package-card">
                                <img src="package5.jpg" />
                                <h3>Ultimate</h3>
                                <p>Acces total</p>
                                <button onClick={() => setCartCount(cartCount + 1)}>Adaugă în coș</button>
                                </div>


                            </div>
                        </div>
                    </section>
                    <section class="text-image-section">
                        <div class="text-block">
                            <h2>Transformă-ți viața prin antrenamente inteligente</h2>
                         <p>
                            Programele mele sunt construite pentru rezultate reale și sustenabile.
                            Indiferent dacă vrei să slăbești, să pui masă musculară sau să-ți crești energia
                            de zi cu zi, te ajut pas cu pas.
                        </p>
                    <button class="cta-button">Începe acum</button>
                        </div>

                     <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001ab" 
                          class="side-image" 
                          alt="Fitness Motivation" />
                    </section>

                {/* ------------------------------------------------ */}
                {/* ABONAMENTE */}
                {/* ------------------------------------------------ */}
                <section className="landing-subscriptions">
                    <h2>Abonamentele noastre</h2>
                    <div className="subscriptions-grid">
                        <div className="subscription-card">
                            <h3>Basic</h3>
                            <p>Acces limitat la programe și resurse</p>
                            <button>Abonează-te</button>
                        </div>

                        <div className="subscription-card">
                            <h3>Pro</h3>
                            <p>Acces complet la programe + suport personalizat</p>
                            <button>Abonează-te</button>
                        </div>

                        <div className="subscription-card">
                            <h3>Elite</h3>
                            <p>Toate beneficiile Pro + sesiuni individuale cu antrenorul</p>
                            <button>Abonează-te</button>
                        </div>

                        
                    </div>
                </section>
                {/* ------------------------------------------------ */}
                {/* REVIEW-URI CARUSEL */}
                {/* ------------------------------------------------ */}
                <section className="landing-reviews-carousel">
                <h2>Ceea ce spun clienții noștri</h2>

                {reviews.length > 0 && (
                    <div className="review-carousel">
                        <button className="arrow prev" onClick={prevReview}>
                            &#10094; {/* săgeata stânga */}
                        </button>

                        <div className="review-card">
                            <p>"{reviews[currentReview].text}"</p>
                            <h4>- {reviews[currentReview].author}</h4>
                        </div>

                        <button className="arrow next" onClick={nextReview}>
                            &#10095; {/* săgeata dreapta */}
                        </button>
                    </div>
                )}
                </section>



                </div>
            );
        }

        ReactDOM.createRoot(document.getElementById("root")).render(<App />);
