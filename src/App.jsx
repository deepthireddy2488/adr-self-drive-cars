import { useState } from 'react'
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import './App.css'

const WHATSAPP_NUMBER = '919666389784'

const cars = [
  {
    id: 'thar',
    name: 'Mahindra Thar',
    year: 2024,
    color: 'Black',
    price12: 2000,
    price24: 3500,
    images: [
      '/cars/thar/thar-1.jpg.jpeg',
      '/cars/thar/thar-2.jpg.jpeg',
      '/cars/thar/thar-3.jpg.jpeg',
      '/cars/thar/thar-4.jpg.jpeg',
      '/cars/thar/thar-5.jpg.jpeg',
      '/cars/thar/thar-6.jpg.jpeg',
      '/cars/thar/thar-7.jpg.jpeg',
      '/cars/thar/thar-8.jpg.jpeg',
      '/cars/thar/thar-9.jpg.jpeg',
      '/cars/thar/thar-10.jpg.jpeg',
      '/cars/thar/thar-11.jpg.jpeg',
      '/cars/thar/thar-12.jpg.jpeg',
    ],
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    year: 2023,
    color: 'Brown',
    price12: 1500,
    price24: 2000,
    images: [
      '/cars/ertiga/ertiga-1.jpg.jpeg',
      '/cars/ertiga/ertiga-2.jpg.jpeg',
      '/cars/ertiga/ertiga-3.jpg.jpeg',
      '/cars/ertiga/ertiga-4.jpg.jpeg',
      '/cars/ertiga/ertiga-5.jpg.jpeg',
    ],
  },
  {
    id: 'baleno',
    name: 'Maruti Suzuki Baleno',
    year: 2026,
    color: 'Maroon',
    price12: 1300,
    price24: 1800,
    images: [
      '/cars/baleno/baleno-1.jpg.jpeg',
      '/cars/baleno/baleno-2.jpg.jpeg',
      '/cars/baleno/baleno-3.jpg.jpeg',
      '/cars/baleno/baleno-4.jpg.jpeg',
      '/cars/baleno/baleno-5.jpg.jpeg',
      '/cars/baleno/baleno-6.jpg.jpeg',
    ],
  },
]

const steps = [
  {
    number: '01',
    title: 'Choose Your Car',
    text: 'Select the car that fits your trip and requirements.',
  },
  {
    number: '02',
    title: 'Select Your Schedule',
    text: 'Choose your rental duration, pickup date and pickup time.',
  },
  {
    number: '03',
    title: 'Send Booking Request',
    text: 'Your booking details are prepared automatically for WhatsApp.',
  },
  {
    number: '04',
    title: 'Confirm & Drive',
    text: 'We confirm availability and guide you through the pickup process.',
  },
]

const faqs = [
  {
    question: 'Which cars are available?',
    answer:
      'ADR Self Drive Cars currently offers Mahindra Thar, Maruti Suzuki Ertiga and Maruti Suzuki Baleno.',
  },
  {
    question: 'What rental durations are available?',
    answer:
      'Currently, you can choose either a 12-hour rental or a 24-hour rental.',
  },
  {
    question: 'How is my return time calculated?',
    answer:
      'You only select your pickup date, pickup time and rental duration. The website automatically calculates the return date and time.',
  },
  {
    question: 'How does booking work?',
    answer:
      'Select your car and schedule, review the booking details and click Book on WhatsApp. WhatsApp will open with your booking information ready to send.',
  },
  {
    question: 'Is the booking automatically confirmed?',
    answer:
      'No. WhatsApp sends your booking request to us. We will check availability and confirm the booking with you.',
  },
]

function formatPrice(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function convertTo24Hour(hour, minute, period) {
  let hourNumber = Number(hour)

  if (period === 'AM') {
    if (hourNumber === 12) {
      hourNumber = 0
    }
  } else {
    if (hourNumber !== 12) {
      hourNumber += 12
    }
  }

  return (
    String(hourNumber).padStart(2, '0') +
    ':' +
    String(minute).padStart(2, '0')
  )
}

function calculateReturnDate(
  date,
  hour,
  minute,
  period,
  duration,
) {
  if (!date || !hour || !minute || !period) {
    return null
  }

  const time24 = convertTo24Hour(
    hour,
    minute,
    period,
  )

  const pickup = new Date(
    date + 'T' + time24 + ':00',
  )

  if (Number.isNaN(pickup.getTime())) {
    return null
  }

  pickup.setHours(
    pickup.getHours() + Number(duration),
  )

  return pickup
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  const [selectedCar, setSelectedCar] = useState(cars[0])
  const [duration, setDuration] = useState('12')

  const [pickupDate, setPickupDate] = useState('')

  const [pickupHour, setPickupHour] = useState('10')
  const [pickupMinute, setPickupMinute] = useState('00')
  const [pickupPeriod, setPickupPeriod] = useState('AM')

  const [bookingMessage, setBookingMessage] = useState('')

  const returnDate = calculateReturnDate(
    pickupDate,
    pickupHour,
    pickupMinute,
    pickupPeriod,
    duration,
  )

  const selectedPrice =
    duration === '12'
      ? selectedCar.price12
      : selectedCar.price24

  function scrollTo(id) {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      })
    }

    setMobileMenu(false)
  }

  function getPickupDateObject() {
    if (!pickupDate) {
      return null
    }

    const time24 = convertTo24Hour(
      pickupHour,
      pickupMinute,
      pickupPeriod,
    )

    const pickup = new Date(
      pickupDate + 'T' + time24 + ':00',
    )

    if (Number.isNaN(pickup.getTime())) {
      return null
    }

    return pickup
  }

  function openWhatsApp() {
    if (!pickupDate) {
      setBookingMessage(
        'Please select your pickup date first.',
      )
      return
    }

    const pickup = getPickupDateObject()

    if (!pickup || !returnDate) {
      setBookingMessage(
        'Please check your pickup date and time.',
      )
      return
    }

    const message = [
      'Welcome to ADR Cars',
      '',
      'Car: ' + selectedCar.name,
      'Model Year: ' + selectedCar.year,
      'Rental Duration: ' + duration + ' Hours',
      'Pickup: ' +
        formatDate(pickup) +
        ' at ' +
        formatTime(pickup),
      'Return: ' +
        formatDate(returnDate) +
        ' at ' +
        formatTime(returnDate),
      '',
      'Please confirm availability and booking details.',
    ].join('\n')

    const whatsappUrl =
      'https://wa.me/' +
      WHATSAPP_NUMBER +
      '?text=' +
      encodeURIComponent(message)

    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="site">
      <header className="navbar">
        <div className="container nav-inner">
          <button
            className="brand"
            onClick={() => scrollTo('home')}
          >
            <span className="brand-icon">
              <CarFront size={22} />
            </span>

            <span className="brand-text">
              <strong>ADR</strong>
              <small>SELF DRIVE CARS</small>
            </span>
          </button>

          <nav
            className={
              mobileMenu
                ? 'nav-links open'
                : 'nav-links'
            }
          >
            <button onClick={() => scrollTo('home')}>
              Home
            </button>

            <button onClick={() => scrollTo('cars')}>
              Cars
            </button>

            <button onClick={() => scrollTo('booking')}>
              Booking
            </button>

            <button onClick={() => scrollTo('pricing')}>
              Pricing
            </button>

            <button
              onClick={() => scrollTo('how-it-works')}
            >
              How It Works
            </button>

            <button onClick={() => scrollTo('faq')}>
              FAQ
            </button>

            <button
              className="nav-book"
              onClick={() => scrollTo('booking')}
            >
              <MessageCircle size={17} />
              Book Now
            </button>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? (
              <X size={25} />
            ) : (
              <span>☰</span>
            )}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-overlay" />

          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                SELF DRIVE CAR RENTALS
              </div>

              <h1>
                Drive Your Way.
                <br />
                <em>Explore Freely.</em>
              </h1>

              <p>
                Reliable self-drive cars for your trips,
                weekends, work and everyday journeys.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-btn"
                  onClick={() => scrollTo('cars')}
                >
                  Explore Cars
                  <ChevronRight size={19} />
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => scrollTo('booking')}
                >
                  <CalendarDays size={19} />
                  Start Booking
                </button>
              </div>

              <div className="hero-trust">
                <div>
                  <ShieldCheck size={19} />
                  <span>Trusted Cars</span>
                </div>

                <div>
                  <Clock3 size={19} />
                  <span>12h / 24h</span>
                </div>

                <div>
                  <Star size={19} />
                  <span>Easy Booking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-grid">
            <div>
              <strong>03</strong>
              <span>Cars Available</span>
            </div>

            <div>
              <strong>12h / 24h</strong>
              <span>Rental Options</span>
            </div>

            <div>
              <strong>WhatsApp</strong>
              <span>Easy Booking</span>
            </div>
          </div>
        </section>

        <section
          id="cars"
          className="section cars-section"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-label">
                OUR CARS
              </span>

              <h2>Choose Your Ride</h2>

              <p>
                Explore our available self-drive cars and
                choose the one that suits your journey.
              </p>
            </div>

            <div className="cars-grid">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onSelect={() => {
                    setSelectedCar(car)
                    scrollTo('booking')
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="section booking-section"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-label">
                BOOK YOUR CAR
              </span>

              <h2>Plan Your Drive</h2>

              <p>
                Select your car and schedule. Your return
                time will be calculated automatically.
              </p>
            </div>

            <div className="booking-layout">
              <div className="booking-card">
                <div className="booking-step">
                  <span>01</span>

                  <div>
                    <small>SELECT CAR</small>
                    <h3>{selectedCar.name}</h3>
                  </div>
                </div>

                <div className="car-select-grid">
                  {cars.map((car) => (
                    <button
                      key={car.id}
                      className={
                        selectedCar.id === car.id
                          ? 'car-select active'
                          : 'car-select'
                      }
                      onClick={() => {
                        setSelectedCar(car)
                        setBookingMessage('')
                      }}
                    >
                      <CarFront size={20} />

                      <span>{car.name}</span>

                      {selectedCar.id === car.id && (
                        <CheckCircle2 size={18} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="booking-step">
                  <span>02</span>

                  <div>
                    <small>RENTAL DURATION</small>
                    <h3>
                      How long do you need it?
                    </h3>
                  </div>
                </div>

                <div className="duration-grid">
                  <button
                    className={
                      duration === '12'
                        ? 'duration-option active'
                        : 'duration-option'
                    }
                    onClick={() => setDuration('12')}
                  >
                    <strong>12 Hours</strong>

                    <span>
                      ₹{formatPrice(selectedCar.price12)}
                    </span>
                  </button>

                  <button
                    className={
                      duration === '24'
                        ? 'duration-option active'
                        : 'duration-option'
                    }
                    onClick={() => setDuration('24')}
                  >
                    <strong>24 Hours</strong>

                    <span>
                      ₹{formatPrice(selectedCar.price24)}
                    </span>
                  </button>
                </div>

                <div className="booking-step">
                  <span>03</span>

                  <div>
                    <small>PICKUP SCHEDULE</small>
                    <h3>When will you pick up?</h3>
                  </div>
                </div>

                <div className="form-grid">
                  <label>
                    <span>Pickup Date</span>

                    <div className="input-wrap">
                      <CalendarDays size={18} />

                      <input
                        type="date"
                        value={pickupDate}
                        min={
                          new Date()
                            .toISOString()
                            .split('T')[0]
                        }
                        onChange={(event) => {
                          setPickupDate(event.target.value)
                          setBookingMessage('')
                        }}
                      />
                    </div>
                  </label>

                  <label>
                    <span>Pickup Time</span>

                    <div className="time-select-wrap">
                      <Clock3 size={18} />

                      <select
                        value={pickupHour}
                        onChange={(event) => {
                          setPickupHour(event.target.value)
                          setBookingMessage('')
                        }}
                      >
                        {Array.from(
                          { length: 12 },
                          (_, index) => {
                            const hour = String(
                              index + 1,
                            ).padStart(2, '0')

                            return (
                              <option
                                key={hour}
                                value={hour}
                              >
                                {hour}
                              </option>
                            )
                          },
                        )}
                      </select>

                      <span>:</span>

                      <select
                        value={pickupMinute}
                        onChange={(event) => {
                          setPickupMinute(
                            event.target.value,
                          )
                          setBookingMessage('')
                        }}
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>

                      <select
                        value={pickupPeriod}
                        onChange={(event) => {
                          setPickupPeriod(
                            event.target.value,
                          )
                          setBookingMessage('')
                        }}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </label>
                </div>

                {returnDate && (
                  <div className="return-box">
                    <div>
                      <small>AUTOMATIC RETURN</small>

                      <strong>
                        {formatDate(returnDate)}
                      </strong>
                    </div>

                    <div>
                      <small>RETURN TIME</small>

                      <strong>
                        {formatTime(returnDate)}
                      </strong>
                    </div>
                  </div>
                )}

                {bookingMessage && (
                  <p className="booking-error">
                    {bookingMessage}
                  </p>
                )}

                <button
                  className="whatsapp-booking"
                  onClick={openWhatsApp}
                >
                  <MessageCircle size={21} />
                  Book on WhatsApp
                </button>

                <p className="booking-note">
                  Your booking request will open in
                  WhatsApp. Availability will be confirmed
                  by ADR Self Drive Cars.
                </p>
              </div>

              <aside className="booking-summary">
                <span className="summary-label">
                  BOOKING SUMMARY
                </span>

                <div className="summary-image">
                  <img
                    src={selectedCar.images[0]}
                    alt={selectedCar.name}
                  />
                </div>

                <div className="summary-car">
                  <span>{selectedCar.year}</span>

                  <h3>{selectedCar.name}</h3>

                  <p>{selectedCar.color}</p>
                </div>

                <div className="summary-details">
                  <div>
                    <span>Duration</span>
                    <strong>{duration} Hours</strong>
                  </div>

                  <div>
                    <span>Pickup</span>

                    <strong>
                      {pickupDate && getPickupDateObject()
                        ? formatDate(
                            getPickupDateObject(),
                          ) +
                          ' at ' +
                          formatTime(
                            getPickupDateObject(),
                          )
                        : 'Select date'}
                    </strong>
                  </div>

                  <div>
                    <span>Price</span>

                    <strong>
                      ₹{formatPrice(selectedPrice)}
                    </strong>
                  </div>
                </div>

                <div className="summary-total">
                  <span>Total Rental Price</span>

                  <strong>
                    ₹{formatPrice(selectedPrice)}
                  </strong>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="section pricing-section"
        >
          <div className="container">
            <div className="section-heading light">
              <span className="section-label">
                PRICING
              </span>

              <h2>Simple & Transparent</h2>

              <p>
                Choose your car and rental duration. No
                confusing pricing.
              </p>
            </div>

            <div className="pricing-grid">
              {cars.map((car) => (
                <div
                  className="price-card"
                  key={car.id}
                >
                  <div className="price-top">
                    <span>{car.year}</span>
                    <CarFront size={23} />
                  </div>

                  <h3>{car.name}</h3>

                  <div className="price-row">
                    <div>
                      <small>12 HOURS</small>

                      <strong>
                        ₹{formatPrice(car.price12)}
                      </strong>
                    </div>

                    <div>
                      <small>24 HOURS</small>

                      <strong>
                        ₹{formatPrice(car.price24)}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCar(car)
                      scrollTo('booking')
                    }}
                  >
                    Choose Car
                    <ChevronRight size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="section how-section"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-label">
                HOW IT WORKS
              </span>

              <h2>Book. Pick Up. Drive.</h2>

              <p>
                Getting your self-drive car is simple.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <div
                  className="step-card"
                  key={step.number}
                >
                  <span className="step-number">
                    {step.number}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="section faq-section"
        >
          <div className="container faq-container">
            <div className="section-heading">
              <span className="section-label">
                FAQ
              </span>

              <h2>Frequently Asked Questions</h2>

              <p>
                Everything you need to know before booking.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={
                    activeFaq === index
                      ? 'faq-item active'
                      : 'faq-item'
                  }
                  key={faq.question}
                >
                  <button
                    onClick={() =>
                      setActiveFaq(
                        activeFaq === index
                          ? null
                          : index,
                      )
                    }
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={20} />
                  </button>

                  {activeFaq === index && (
                    <p>{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="container contact-box">
            <div>
              <span className="section-label">
                READY TO DRIVE?
              </span>

              <h2>Let's Get You On The Road.</h2>

              <p>
                Choose your car, select your schedule and
                send your booking request directly through
                WhatsApp.
              </p>
            </div>

            <div className="contact-actions">
              <button
                className="whatsapp-btn"
                onClick={() => scrollTo('booking')}
              >
                <MessageCircle size={21} />
                Start Booking
              </button>

              <a
                href="tel:+919666389784"
                className="phone-btn"
              >
                <Phone size={19} />
                9666389784
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-icon">
                <CarFront size={20} />
              </span>

              <span className="brand-text">
                <strong>ADR</strong>
                <small>SELF DRIVE CARS</small>
              </span>
            </div>

            <p>
              Simple, reliable self-drive car rentals for
              your journey.
            </p>
          </div>

          <div className="footer-links">
            <button onClick={() => scrollTo('cars')}>
              Cars
            </button>

            <button onClick={() => scrollTo('booking')}>
              Booking
            </button>

            <button onClick={() => scrollTo('pricing')}>
              Pricing
            </button>

            <button onClick={() => scrollTo('faq')}>
              FAQ
            </button>
          </div>

          <div className="footer-contact">
            <MapPin size={17} />
            <span>ADR Self Drive Cars</span>
          </div>
        </div>

        <div className="container copyright">
          © {new Date().getFullYear()} ADR Self Drive
          Cars. All rights reserved.
        </div>
      </footer>

      <button
        className="floating-whatsapp"
        onClick={() => scrollTo('booking')}
        aria-label="Book on WhatsApp"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  )
}

function CarCard({ car, onSelect }) {
  const [current, setCurrent] = useState(0)

  function previous() {
    setCurrent((value) =>
      value === 0
        ? car.images.length - 1
        : value - 1,
    )
  }

  function next() {
    setCurrent((value) =>
      value === car.images.length - 1
        ? 0
        : value + 1,
    )
  }

  return (
    <article className="car-card">
      <div className="car-gallery">
        <img
          src={car.images[current]}
          alt={car.name + ' ' + car.year}
        />

        <button
          className="gallery-arrow left"
          onClick={previous}
          aria-label="Previous image"
        >
          <ChevronLeft size={21} />
        </button>

        <button
          className="gallery-arrow right"
          onClick={next}
          aria-label="Next image"
        >
          <ChevronRight size={21} />
        </button>

        <div className="gallery-count">
          {current + 1} / {car.images.length}
        </div>
      </div>

      <div className="car-info">
        <div className="car-title">
          <div>
            <span>{car.year}</span>

            <h3>{car.name}</h3>
          </div>

          <span className="car-color">
            {car.color}
          </span>
        </div>

        <div className="car-prices">
          <div>
            <small>12 HOURS</small>

            <strong>
              ₹{formatPrice(car.price12)}
            </strong>
          </div>

          <div>
            <small>24 HOURS</small>

            <strong>
              ₹{formatPrice(car.price24)}
            </strong>
          </div>
        </div>

        <button
          className="book-car-btn"
          onClick={onSelect}
        >
          <CalendarDays size={18} />
          Book This Car
        </button>
      </div>
    </article>
  )
}

export default App