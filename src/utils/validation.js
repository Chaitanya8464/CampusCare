/**
 * Form Validation Utilities
 * Professional validation functions for form inputs
 */

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { valid: false, message: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }

  return { valid: true, message: "" };
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  if (!password || password.length === 0) {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }

  return { valid: true, message: "" };
};

/**
 * Validates a required field
 * @param {string} value - Field value
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = "Field") => {
  if (!value || value.toString().trim().length === 0) {
    return { valid: false, message: `${fieldName} is required` };
  }

  return { valid: true, message: "" };
};

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { valid: true, message: "" }; // Phone is optional
  }

  const phoneRegex = /^[\d\s-+()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: "Please enter a valid phone number" };
  }

  return { valid: true, message: "" };
};

/**
 * Validates a file
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 1024 * 1024, // 1MB default
    allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    required = false
  } = options;

  if (!file) {
    if (required) {
      return { valid: false, message: "File is required" };
    }
    return { valid: true, message: "" };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message: `File size must be less than ${maxSize / 1024 / 1024}MB`
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "File type not allowed. Please upload PDF or image files only"
    };
  }

  return { valid: true, message: "" };
};

/**
 * Validates a complaint form
 * @param {Object} formData - Form data object
 * @returns {Object} Validation result with errors object
 */
export const validateComplaintForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Validate title
  const titleValidation = validateRequired(formData.title, "Title");
  if (!titleValidation.valid) {
    errors.title = titleValidation.message;
    isValid = false;
  }

  // Validate issue regarding
  const issueValidation = validateRequired(formData.issueRegarding, "Issue category");
  if (!issueValidation.valid) {
    errors.issueRegarding = issueValidation.message;
    isValid = false;
  }

  // Validate sub-issue
  const subIssueValidation = validateRequired(formData.subIssue, "Sub-issue");
  if (!subIssueValidation.valid) {
    errors.subIssue = subIssueValidation.message;
    isValid = false;
  }

  // Validate description
  const descValidation = validateRequired(formData.description, "Description");
  if (!descValidation.valid) {
    errors.description = descValidation.message;
    isValid = false;
  } else if (formData.description.length < 20) {
    errors.description = "Description must be at least 20 characters";
    isValid = false;
  }

  // Validate location
  const locationValidation = validateRequired(formData.location, "Location");
  if (!locationValidation.valid) {
    errors.location = locationValidation.message;
    isValid = false;
  }

  // Validate priority
  if (!formData.priority) {
    errors.priority = "Please select a priority level";
    isValid = false;
  }

  // Validate contact if not anonymous
  if (!formData.anonymous) {
    const contactValidation = validateEmail(formData.contact);
    if (!contactValidation.valid) {
      errors.contact = contactValidation.message;
      isValid = false;
    }
  }

  return { valid: isValid, errors };
};

export default {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePhone,
  validateFile,
  validateComplaintForm
};
