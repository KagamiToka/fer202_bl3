import { useReducer, useCallback } from 'react';

// Form action types
const FORM_ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_ALL_ERRORS: 'CLEAR_ALL_ERRORS',
  RESET_FORM: 'RESET_FORM',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_SUCCESS: 'CLEAR_SUCCESS'
};

// Initial form state
const createInitialFormState = (initialFields) => {
  const fields = {};
  const errors = {};
  
  Object.keys(initialFields).forEach(key => {
    fields[key] = initialFields[key];
    errors[key] = '';
  });
  
  return {
    fields,
    errors,
    showSuccess: false
  };
};

// Form reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.name]: action.payload.value
        }
      };
    
    case FORM_ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message
        }
      };
    
    case FORM_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: ''
        }
      };
    
    case FORM_ACTIONS.CLEAR_ALL_ERRORS:
      return {
        ...state,
        errors: Object.keys(state.errors).reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {})
      };
    
    case FORM_ACTIONS.RESET_FORM:
      return {
        ...state,
        fields: action.payload,
        errors: Object.keys(action.payload).reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {}),
        showSuccess: false
      };
    
    case FORM_ACTIONS.SET_SUCCESS:
      return {
        ...state,
        showSuccess: true
      };
    
    case FORM_ACTIONS.CLEAR_SUCCESS:
      return {
        ...state,
        showSuccess: false
      };
    
    default:
      return state;
  }
};

// Custom form hook
export const useForm = (initialFields, validationRules) => {
  const [state, dispatch] = useReducer(formReducer, createInitialFormState(initialFields));

  // Set field value
  const setField = useCallback((name, value) => {
    dispatch({
      type: FORM_ACTIONS.SET_FIELD,
      payload: { name, value }
    });
    
    // Clear error when user starts typing
    if (state.errors[name]) {
      dispatch({
        type: FORM_ACTIONS.CLEAR_ERROR,
        payload: name
      });
    }
  }, [state.errors]);

  // Validate single field
  const validateField = useCallback((fieldName) => {
    if (!validationRules[fieldName]) return true;
    
    const value = state.fields[fieldName];
    const rule = validationRules[fieldName];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      dispatch({
        type: FORM_ACTIONS.SET_ERROR,
        payload: { field: fieldName, message: rule.required }
      });
      return false;
    }
    
    if (rule.minLength && value && value.toString().length < rule.minLength) {
      dispatch({
        type: FORM_ACTIONS.SET_ERROR,
        payload: { field: fieldName, message: rule.minLength }
      });
      return false;
    }
    
    if (rule.min && value && Number(value) < rule.min) {
      dispatch({
        type: FORM_ACTIONS.SET_ERROR,
        payload: { field: fieldName, message: rule.min }
      });
      return false;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      dispatch({
        type: FORM_ACTIONS.SET_ERROR,
        payload: { field: fieldName, message: rule.pattern }
      });
      return false;
    }
    
    return true;
  }, [state.fields, validationRules]);

  // Validate all fields
  const validateForm = useCallback(() => {
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }, [validateField, validationRules]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setField(name, value);
  }, [setField]);

  // Reset form
  const resetForm = useCallback(() => {
    dispatch({
      type: FORM_ACTIONS.RESET_FORM,
      payload: initialFields
    });
  }, [initialFields]);

  // Set success message
  const setSuccess = useCallback(() => {
    dispatch({ type: FORM_ACTIONS.SET_SUCCESS });
  }, []);

  // Clear success message
  const clearSuccess = useCallback(() => {
    dispatch({ type: FORM_ACTIONS.CLEAR_SUCCESS });
  }, []);

  // Check if form has errors
  const hasErrors = Object.values(state.errors).some(error => error !== '');

  return {
    fields: state.fields,
    errors: state.errors,
    showSuccess: state.showSuccess,
    hasErrors,
    setField,
    handleInputChange,
    validateField,
    validateForm,
    resetForm,
    setSuccess,
    clearSuccess
  };
};
