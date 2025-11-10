// src/hooks/useTuitionRequestForm.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Safe localStorage wrapper with error handling
const safeLocalStorage = {
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.warn('localStorage.getItem failed:', error);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn('localStorage.setItem failed:', error);
        }
    },
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('localStorage.removeItem failed:', error);
        }
    }
};

const STORAGE_KEY = 'tutorRequestDraft';

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

    // Load saved draft from localStorage on component mount
    useEffect(() => {
        const savedDraft = safeLocalStorage.getItem(STORAGE_KEY);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData(parsed);
            } catch (error) {
                console.error('Failed to parse form draft:', error);
                // If parsing fails, remove the corrupted data
                safeLocalStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    // Save form data to localStorage on changes (only if not submitted)
    useEffect(() => {
        if (!status.submitted) {
            try {
                safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            } catch (error) {
                console.error('Failed to save form draft:', error);
            }
        }
    }, [formData, status.submitted]);

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
            
            // Clear the saved draft from localStorage after successful submission
            safeLocalStorage.removeItem(STORAGE_KEY);
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