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
            <input name="service" placeholder="Service" required />
            <input name="date" type="date" required />
            <input name="time" type="time" required />
            <select name="status" defaultValue="Pending">
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <input name="hmo" placeholder="HMO" />
            <input name="company" placeholder="Company" />
            <input name="validId" placeholder="Valid ID No." />
            <input name="occupation" placeholder="Occupation" />
            <input name="hmoProvider" placeholder="HMO Provider" />
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default NewAppointmentForm;