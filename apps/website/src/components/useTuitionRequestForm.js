// src/hooks/useTuitionRequestForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const validateStep = (step, data) => {
    const newErrors = {};
    if (step === 1) {
        if (!data.name.trim()) newErrors.name = "Name is required.";
        if (!data.mobile.trim()) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!/^[689]\d{7}$/.test(data.mobile.trim())) {
            newErrors.mobile = "Please enter a valid 8-digit Singapore mobile number.";
        }
        if (!data.level.trim()) newErrors.level = "Level & Subject are required.";
    }
    if (step === 2) {
        if (!data.location.trim()) newErrors.location = "Location is required.";
    }
    // No validation needed for step 3 by default, but can be added here
    return newErrors;
};

const useTuitionRequestForm = (initialFormData) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

    const nextStep = () => {
        const newErrors = validateStep(currentStep, formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setErrors({}); // Clear errors when going back
        setCurrentStep(prev => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        
        // Clear the error for the field being edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: inputValue }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: inputValue }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allErrors = { ...validateStep(1, formData), ...validateStep(2, formData) };
        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            // Force user back to the step with the first error
            if (allErrors.name || allErrors.mobile || allErrors.level) {
                setCurrentStep(1);
            } else if (allErrors.location) {
                setCurrentStep(2);
            }
            return;
        }

        setStatus({ submitting: true, submitted: false, error: null });
        try {
            const response = await fetch('https://tuition-backend-afud.onrender.com/api/requestfortutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Form submission failed');
            }
            setStatus({ submitting: false, submitted: true, error: null });
        } catch (error) {
            setStatus({ submitting: false, submitted: false, error: error.message });
        }
    };
    
    const resetForm = () => {
        setFormData(initialFormData);
        setCurrentStep(1);
        setStatus({ submitting: false, submitted: false, error: null });
        setErrors({});
    }

    return {
        currentStep,
        formData,
        errors,
        status,
        nextStep,
        prevStep,
        handleChange,
        handleSubmit,
        resetForm
    };
};

export default useTuitionRequestForm;