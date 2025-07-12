import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./Booking.module.css"; // Import CSS module
import "../components/Footer.css";
import "../components/Navbar.css";
import { createBooking } from "../bookingApi";

function Booking() {
  const [isHmo, setIsHmo] = React.useState(false);

  const handleHmoChange = (e) => {
    setIsHmo(e.target.value === "yes");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const selectedTime = form.time.value;
    if (selectedTime < "10:00" || selectedTime > "18:00") {
      alert("Please select a time between 10:00 AM and 6:00 PM.");
      return;
    }


    const bookingData = {
      name: `${form.Fname.value} ${form.Lname.value}`,
      email: form.email.value,
      contact: form.phone.value,
      service: form.service.value,
      date: form.date.value,
      time: form.time.value,
      hmo: form.hmo ? (form.hmo.value === "yes" ? "Yes" : "No") : "No",
      company: form.hmoName?.value || "",
      validId: form.hmoId?.value || "",
      occupation: form.occupation?.value || "",
      hmoProvider: form.hmoProvider?.value || "",
      status: "Pending",
    };

    try {
      const { data, error } = await createBooking(bookingData);
      if (error) throw error;
      alert("Booking submitted successfully!");
      form.reset();
      setIsHmo(false);
    } catch (error) {
      console.error("Error submitting booking:", error);

      const isTimeConflict =
        error?.message?.includes("conflcting key value") ||
        error?.message?.includes("conflicts with existing key") ||
        error?.code === "23P01"; // PostgreSQL unique constraint violation

        if( isTimeConflict) {
            alert("This time slot is already booked. Please choose a different time/date.");
        } else {
            alert("Failed to submit booking. Please try again.");
        }
      // alert(JSON.stringify(error, null, 2)); // Temporarily display error for debugging
      // alert("Failed to submit booking. Please try again.");
      form.reset();
      setIsHmo(false); // reset HMO state
    }
  };

  return (
    <div className={styles["booking-container"]}>
      <div className={styles["hero-section-booking"]}>
        <h1>Book Now!</h1>
        <p>It’s Time to Smile Brighter—Schedule Your Check-Up.</p>
      </div>
      <Navbar />
      <div className={styles["booking-form"]}>
        <div className={styles["bookingform-container"]}>
          <form className={styles.booking} onSubmit={handleSubmit}>
            <div className={styles["form-row"]}>
              <label htmlFor="Fname">First Name:</label>
              <input type="text" id="Fname" name="Fname" required />
              <label htmlFor="Lname">Last Name:</label>
              <input type="text" id="Lname" name="Lname" required />
            </div>

            <div className={styles["form-row"]}>
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" required />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>

            <div className={styles["form-row"]}>
              <label htmlFor="date">Preferred Date:</label>
              <input type="date" id="date" name="date" required min={new Date().toISOString().split("T")[0]} />

              <label htmlFor="time">Preferred Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                required
                min="10:00"
                max="18:00"
                step="1800" // 30-minute steps in seconds
              />
            </div>

            <div className={styles["form-row"]}>
              <label htmlFor="service">Service:</label>
              <select id="service" name="service" required>
                <option value="">Select a service</option>
                <option value="Consultation">Consultation</option>
                <option value="Oral Prophylaxis">Oral Prophylaxis</option>
                <option value="Oral prophylaxis with Fluoride">
                  Oral Prophylaxis with Fluoride
                </option>
                <option value="Deep Scaling">Deep Scaling</option>
                <option value="Panoramic Radiograph">
                  Panoramic Radiograph
                </option>
                <option value="Complicated Tooth Filing">
                  Complicated Tooth Filling
                </option>
                <option value="Odontectomy">Odontectomy</option>
                <option value="Temporary Filling">Temporary Filling</option>
                <option value="Root Canal Treatment">
                  Root Canal Treatment
                </option>
                <option value="Periapical Radiograph">
                  Periapical Radiograph
                </option>
                <option value="Teeth Whitening">Teeth Whitening</option>
                <option value="Simple Tooth Filing">Simple Tooth Filing</option>
                <option value="Pit and Fissure Sealant">
                  Pit and Fissure Sealant
                </option>
                <option value="Dental Implant">Dental Implant</option>
                <option value="Complicated Tooth Extraction">
                  Complicated Tooth Extraction
                </option>
                <option value="Simple Tooth Extraction">
                  Simple Tooth Extraction
                </option>
              </select>
            </div>

            <div className={styles["hmo-row"]}>
              <label>Are you affiliated with any HMO?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="hmo"
                    value="yes"
                    checked={isHmo}
                    onChange={handleHmoChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hmo"
                    value="no"
                    checked={!isHmo}
                    onChange={handleHmoChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {isHmo && (
              <>
                <div className={styles["form-row-id"]}>
                  <label htmlFor="companyName">Company:</label>
                  <input type="text" id="companyName" name="hmoName" required />

                  <label htmlFor="hmoId">Valid ID Number:</label>
                  <input type="text" id="hmoId" name="hmoId" required />
                </div>

                <div className={styles["form-row-id"]}>
                  <label htmlFor="occupation">Occupation:</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    required
                  />
                </div>

                <div className={styles["form-row"]}>
                  <label htmlFor="hmoProvider">HMO Provider:</label>
                  <select id="hmoProvider" name="hmoProvider" required>
                    <option value="">Select HMO Provider</option>
                    <option value="Maxicare">Maxicare</option>
                    <option value="PhilCare">PhilCare</option>
                    <option value="Cocolife">Cocolife</option>
                    <option value="EtiQa">EtiQa</option>
                  </select>
                </div>


                <div className={styles["form-row-hmo"]}>
                  <label htmlFor="insuranceId">
                    Valucare / Filipino Doctors / Cocolife ID No. / Inlife ID
                    No. / Etiqa ID No.:
                  </label>
                  <input
                    type="text"
                    id="insuranceId"
                    name="insuranceId"
                    required
                  />
                </div>

                <div className={styles["form-row"]}>
                  <label htmlFor="validIdType">Valid ID:</label>
                  <select id="validIdType" name="validIdType" required>
                    <option value="">Select ID</option>
                    <option value="philID">
                      Philippine National ID (PhilID/ePhilID)
                    </option>
                    <option value="passport">Passport</option>
                    <option value="driverLicense">Driver's License</option>
                    <option value="sssID">
                      Social Security System (SSS) ID
                    </option>
                    <option value="umID">
                      Unified Multi-Purpose ID (UMID)
                    </option>
                    <option value="prcID">
                      Professional Regulation Commission (PRC) ID
                    </option>
                    <option value="phID">PhilHealth ID</option>
                  </select>
                </div>
              </>
            )}

            <div className={styles["submit-row"]}>
              <button type="submit" className={styles["submit-button"]}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
