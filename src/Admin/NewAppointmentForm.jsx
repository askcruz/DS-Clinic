// NewAppointmentForm.jsx
import React from 'react';

function NewAppointmentForm({ onSubmit, onClose }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newBooking = {
            name: form.name.value,
            contact: form.contact.value,
            service: form.service.value,
            date: form.date.value,
            time: form.time.value,
            status: form.status.value,
            hmo: form.hmo.value,
            company: form.company.value,
            validId: form.validId.value,
            occupation: form.occupation.value,
            hmoProvider: form.hmoProvider.value,
        };
        onSubmit(newBooking);
        form.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" required />
            <input name="contact" placeholder="Contact" required />
            <select name="service" required defaultValue="">
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
            <input name="date" type="date" required />
            <input name="time" type="time" required />
            <select name="status" defaultValue="Pending">
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <select name="hmo" defaultValue="">
                <option value="">No</option>
                <option value="Maxicare">Yes</option>
            </select>
            <input name="company" placeholder="Company" />
            <input name="validId" placeholder="Valid ID No." />
            <input name="occupation" placeholder="Occupation" />
            <select name="hmoProvider" defaultValue="">
                <option value="">HMO Provider</option>
                <option value="Maxicare">Valuecare</option>
                <option value="PhilCare">PhilCare</option>
                <option value="Cocolife">Cocolife</option>
                <option value="EtiQa">EtiQa</option>
                {/* Add more HMO options if needed */}
            </select>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default NewAppointmentForm;