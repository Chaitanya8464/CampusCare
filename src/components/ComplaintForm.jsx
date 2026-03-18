import React, { useState, useCallback } from 'react';
import Slidebar from './Slidebar';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { validateComplaintForm, validateFile } from '../utils/validation';
import FormInput, { FormSelect, FormTextarea } from '../components/FormInput';

/**
 * Complaint Form Component
 * Allows students to submit grievances with proper validation
 */
const ComplaintForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    anonymous: false,
    issueRegarding: '',
    subIssue: '',
    otpMethod: '',
    contact: '',
    title: '',
    priority: '',
    location: '',
    description: '',
    file: null
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Issue categories
  const issueCategories = {
    Academics: ['Assignments', 'Exams', 'Result', 'Syllabus'],
    Facilities: ['Hostel', 'Classroom', 'Library', 'Labs'],
    Services: ['Transport', 'Canteen', 'Medical', 'IT Support'],
    Finance: [
      'Pending Fee Issue',
      'Fee Extension',
      'Scholarship Related',
      'Fee Adjustment Issue'
    ],
    Security: ['Lost / Found', 'Theft', 'Complaint', 'Feedback (Security)'],
    Other: ['Miscellaneous', 'Ragging', 'Suggestion', 'Feedback']
  };

  /**
   * Handle input changes
   */
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  /**
   * Handle file selection with validation
   */
  const handleFileChange = useCallback((e) => {
    const selected = e.target.files[0];
    const validation = validateFile(selected, {
      maxSize: 1024 * 1024,
      allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
      required: false
    });

    if (!validation.valid) {
      setErrors(prev => ({ ...prev, file: validation.message }));
      setFormData(prev => ({ ...prev, file: null }));
    } else {
      setFormData(prev => ({ ...prev, file: selected }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  }, []);

  /**
   * Generate unique ticket ID
   */
  const generateTicketId = () => {
    return `CMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  /**
   * Handle OTP request (mock implementation)
   */
  const handleOtpRequest = () => {
    if (!formData.otpMethod) {
      setErrors(prev => ({ ...prev, otpMethod: 'Please select Mobile or Email to receive OTP' }));
      return;
    }
    alert(`OTP sent to your ${formData.otpMethod}`);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateComplaintForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const newTicketId = generateTicketId();
      const docData = {
        ticketId: newTicketId,
        contact: formData.anonymous ? null : formData.contact,
        userEmail: auth.currentUser?.email,
        issueRegarding: formData.issueRegarding,
        subIssue: formData.subIssue,
        title: formData.title,
        priority: formData.priority,
        location: formData.location,
        description: formData.description,
        anonymous: formData.anonymous,
        otpMethod: formData.otpMethod,
        fileName: formData.file ? formData.file.name : null,
        createdAt: serverTimestamp(),
        status: 'Pending'
      };

      await addDoc(collection(db, 'complaints'), docData);

      setSuccessMsg(`✅ Complaint submitted successfully! Ticket ID: ${newTicketId}`);

      // Reset form
      setFormData({
        anonymous: false,
        issueRegarding: '',
        subIssue: '',
        otpMethod: '',
        contact: '',
        title: '',
        priority: '',
        location: '',
        description: '',
        file: null
      });
      setErrors({});

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error('Submit error:', err);
      let errorMessage = 'Failed to submit. Please try again.';

      if (err.message?.includes('timeout')) {
        errorMessage = 'Request timeout. Please check your internet connection.';
      } else if (err.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please contact support.';
      } else if (err.code === 'unavailable') {
        errorMessage = 'Service unavailable. Please try again later.';
      }

      setErrors(prev => ({ ...prev, submit: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-16 relative transition-colors duration-300">
      <Slidebar />

      {/* Loading Overlay */}
      {loading && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          role="status"
          aria-label="Submitting complaint"
        >
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div 
          className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in"
          role="alert"
        >
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div 
          className="fixed top-5 right-5 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in"
          role="alert"
        >
          {errors.submit}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow transition-colors duration-300"
        noValidate
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Submit a Grievance
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Report any issue or concern you have regarding campus facilities, services, or policies.
        </p>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">Anonymous Submission</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your identity will be kept confidential
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={formData.anonymous}
              onChange={() => handleInputChange('anonymous', !formData.anonymous)}
              aria-label="Enable anonymous submission"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                formData.anonymous ? 'translate-x-5' : ''
              }`}
            ></div>
          </label>
        </div>

        {/* Contact Information */}
        {!formData.anonymous && (
          <FormInput
            label="Contact Information"
            type="text"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            error={errors.contact}
            placeholder="Email or Phone Number"
            required
          />
        )}

        {/* Issue Category */}
        <FormSelect
          label="Issue Regarding"
          value={formData.issueRegarding}
          onChange={(e) => handleInputChange('issueRegarding', e.target.value)}
          error={errors.issueRegarding}
          options={Object.keys(issueCategories).map(key => ({
            value: key,
            label: key
          }))}
          required
          placeholder="Select category"
        />

        {/* Sub-Issue */}
        {formData.issueRegarding && (
          <FormSelect
            label="Related Issue"
            value={formData.subIssue}
            onChange={(e) => handleInputChange('subIssue', e.target.value)}
            error={errors.subIssue}
            options={issueCategories[formData.issueRegarding].map(opt => ({
              value: opt,
              label: opt
            }))}
            required
            placeholder="Select sub-category"
          />
        )}

        {/* Complaint Title */}
        <FormInput
          label="Complaint Title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={errors.title}
          placeholder="Brief title for your complaint"
          required
        />

        {/* Priority Level */}
        <FormSelect
          label="Priority Level"
          value={formData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
          error={errors.priority}
          options={[
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' }
          ]}
          required
          placeholder="Select priority level"
        />

        {/* Location */}
        <FormInput
          label="Location"
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          error={errors.location}
          placeholder="Where is the issue occurring?"
          required
        />

        {/* File Upload */}
        <div className="mb-4">
          <label 
            htmlFor="file-upload" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Upload File (PDF/JPEG, Max 1MB)
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={handleFileChange}
            className={`
              w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:bg-gray-700 dark:text-white transition-colors duration-300
              ${errors.file 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600'
              }
            `}
            aria-invalid={!!errors.file}
            aria-describedby={errors.file ? 'file-error' : undefined}
          />
          {formData.file && !errors.file && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">
              ✓ {formData.file.name}
            </p>
          )}
          {errors.file && (
            <p id="file-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.file}
            </p>
          )}
        </div>

        {/* Description */}
        <FormTextarea
          label="Detailed Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          error={errors.description}
          placeholder="Provide a detailed description of your complaint (minimum 20 characters)"
          required
          rows={5}
        />

        {/* OTP Section */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Receive OTP on <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4 mb-3">
            <label className="flex items-center gap-2 text-gray-800 dark:text-white cursor-pointer">
              <input
                type="radio"
                name="otp"
                value="Mobile"
                checked={formData.otpMethod === 'Mobile'}
                onChange={(e) => handleInputChange('otpMethod', e.target.value)}
                className="w-4 h-4"
              />
              Mobile
            </label>
            <label className="flex items-center gap-2 text-gray-800 dark:text-white cursor-pointer">
              <input
                type="radio"
                name="otp"
                value="Email"
                checked={formData.otpMethod === 'Email'}
                onChange={(e) => handleInputChange('otpMethod', e.target.value)}
                className="w-4 h-4"
              />
              Email
            </label>
            <button
              type="button"
              onClick={handleOtpRequest}
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Request OTP
            </button>
          </div>
          {errors.otpMethod && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.otpMethod}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-600 dark:from-white dark:to-gray-300 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-gray-900 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </span>
          ) : (
            'Submit Complaint'
          )}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
